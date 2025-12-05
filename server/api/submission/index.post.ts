import { Pool } from "pg";
import Database from "better-sqlite3";
import { getDatabase } from "../../db";
import { auth } from "../../utils/auth";
import { verifyWebpayCheckout } from "../../utils/payments";
import { getPrizeOptionsByKeys } from "../../../lib/prizes";

type ExistingSubmission = {
  prize_category: string | null;
  prize_categories: string | null;
  prize_amount: number | null;
  payment_provider: string | null;
  payment_reference: string | null;
};

type PaymentProof = {
  webpayToken: string | null;
};

const extractPaymentProof = (body: Record<string, any>): PaymentProof => {
  const webpayToken =
    typeof body.webpayToken === "string" && body.webpayToken.trim().length > 0
      ? body.webpayToken.trim()
      : null;
  return { webpayToken };
};

const sortPrizeKeys = (keys: string[]) => [...new Set(keys)].sort();

const normalizePrizeKeysInput = (input: unknown): string[] => {
  if (!Array.isArray(input)) return [];
  return sortPrizeKeys(
    input
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.trim())
      .filter((value) => value.length > 0)
  );
};

const parseStoredPrizeKeys = (existing: ExistingSubmission | null): string[] => {
  if (!existing) return [];
  if (existing.prize_categories) {
    try {
      const parsed = JSON.parse(existing.prize_categories) as string[];
      return Array.isArray(parsed) ? sortPrizeKeys(parsed) : [];
    } catch (error) {
      console.error("Failed to parse stored prize categories", error);
    }
  }
  if (existing.prize_category) {
    return sortPrizeKeys([existing.prize_category]);
  }
  return [];
};

const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody<Record<string, any>>(event);
  const userId = session.user.id;
  const allowServerTestMode = Boolean(config.payments?.allowTestMode);
  const wantsTestBypass = allowServerTestMode && body.testPaymentBypass === true;

  const mandatoryFields = [
    "fullName",
    "filmName",
    "synopsis",
    "genre",
    "runtime",
    "productionDates",
    "shootingFormat",
    "aspectRatio",
    "language",
    "country",
    "pastScreenings",
    "prizeCategories",
  ];

  for (const field of mandatoryFields) {
    if (!body[field]) {
      const statusMessage =
        field === "prizeCategories"
          ? "Award selection is required."
          : `Missing mandatory field: ${field}`;
      throw createError({
        statusCode: 400,
        statusMessage,
      });
    }
  }

  const {
    fullName,
    socialLink,
    filmName,
    synopsis,
    genre,
    runtime,
    productionDates,
    budget,
    shootingFormat,
    aspectRatio,
    language,
    country,
    pastScreenings,
    additionalInfo,
  } = body;

  const submittedPrizeKeys = normalizePrizeKeysInput(body.prizeCategories);
  if (submittedPrizeKeys.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Please select at least one award." });
  }

  const prizeOptions = getPrizeOptionsByKeys(submittedPrizeKeys);
  if (!prizeOptions) {
    throw createError({ statusCode: 400, statusMessage: "Invalid award selection." });
  }

  const submittedPrizeTotal = prizeOptions.reduce((sum, prize) => sum + prize.entryFee, 0);

  const { webpayToken } = extractPaymentProof(body);

  const db = getDatabase();

  let existingSubmission: ExistingSubmission | null = null;

  if (db instanceof Pool) {
    const existingResult = await db.query<ExistingSubmission>(
      "SELECT prize_category, prize_categories, prize_amount, payment_provider, payment_reference FROM submissions WHERE user_id = $1",
      [userId]
    );
    existingSubmission = existingResult.rows[0] || null;
  } else if (db instanceof Database) {
    const existingStmt = db.prepare(
      "SELECT prize_categories, prize_amount, payment_provider, payment_reference FROM submissions WHERE user_id = ?"
    );
    const row = existingStmt.get(userId) as
      | { prize_categories: string | null; prize_amount: number | null; payment_provider: string | null; payment_reference: string | null }
      | undefined;
    existingSubmission = row
      ? {
          prize_category: null,
          prize_categories: row.prize_categories,
          prize_amount: row.prize_amount,
          payment_provider: row.payment_provider,
          payment_reference: row.payment_reference,
        }
      : null;
  }

  const existingPrizeKeys = parseStoredPrizeKeys(existingSubmission);
  const hasLockedAwards = existingPrizeKeys.length > 0;
  const canApplyTestBypass = wantsTestBypass;

  const missingLocked = existingPrizeKeys.filter((key) => !submittedPrizeKeys.includes(key));
  if (missingLocked.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Previously paid awards cannot be removed.",
    });
  }

  const newPrizeKeys = submittedPrizeKeys.filter((key) => !existingPrizeKeys.includes(key));
  const newPrizeOptions = getPrizeOptionsByKeys(newPrizeKeys);
  if (!newPrizeOptions && newPrizeKeys.length > 0) {
    throw createError({ statusCode: 400, statusMessage: "Invalid award selection." });
  }
  const newPrizeTotal = newPrizeOptions?.reduce((sum, prize) => sum + prize.entryFee, 0) || 0;

  let finalPrizeCategories: string[] = hasLockedAwards ? existingPrizeKeys : [];
  let finalPrizeAmount: number = existingSubmission?.prize_amount || 0;
  let paymentProvider: string | null = existingSubmission?.payment_provider || null;
  let paymentReference: string | null = existingSubmission?.payment_reference || null;

  const handlePaymentError = (err: any) => {
    const message = err?.message || "Payment verification failed";
    const statusCode = Number(err?.statusCode) || 400;
    throw createError({ statusCode, statusMessage: message });
  };

  if (webpayToken) {
    try {
      const verification = await verifyWebpayCheckout({ token: webpayToken, userId });
      const sortedPrizeKeys = sortPrizeKeys(verification.prizeKeys);
      if (!arraysEqual(sortedPrizeKeys, submittedPrizeKeys)) {
        throw new Error("Payment does not match the selected awards.");
      }
      finalPrizeCategories = sortedPrizeKeys;
      finalPrizeAmount = (existingSubmission?.prize_amount || 0) + verification.amount;
      paymentProvider = verification.provider;
      paymentReference = verification.reference;
    } catch (err) {
      handlePaymentError(err);
    }
  } else if (canApplyTestBypass && newPrizeKeys.length > 0) {
    finalPrizeCategories = submittedPrizeKeys;
    finalPrizeAmount = (existingSubmission?.prize_amount || 0) + newPrizeTotal;
    paymentProvider = "test";
    paymentReference = `TEST-${Date.now().toString(36).toUpperCase()}`;
  } else if (newPrizeKeys.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payment is required before you can submit for these awards.",
    });
  } else {
    finalPrizeCategories = submittedPrizeKeys;
    finalPrizeAmount = existingSubmission?.prize_amount ?? submittedPrizeTotal;
  }

  if (!finalPrizeCategories.length || !finalPrizeAmount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Award selection is required.",
    });
  }

  const primaryPrizeKey = finalPrizeCategories[0] || null;
  const serializedPrizeCategories = JSON.stringify(finalPrizeCategories);

  try {
    if (db instanceof Pool) {
      const query = `
        INSERT INTO submissions (
          user_id, prize_category, prize_categories, prize_amount, payment_provider, payment_reference,
          full_name, social_link, film_name, synopsis, genre, runtime,
          production_dates, budget, shooting_format, aspect_ratio, language,
          country, past_screenings, additional_info, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11, $12,
          $13, $14, $15, $16, $17,
          $18, $19, $20, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          prize_category = EXCLUDED.prize_category,
          prize_categories = EXCLUDED.prize_categories,
          prize_amount = EXCLUDED.prize_amount,
          payment_provider = EXCLUDED.payment_provider,
          payment_reference = EXCLUDED.payment_reference,
          full_name = EXCLUDED.full_name,
          social_link = EXCLUDED.social_link,
          film_name = EXCLUDED.film_name,
          synopsis = EXCLUDED.synopsis,
          genre = EXCLUDED.genre,
          runtime = EXCLUDED.runtime,
          production_dates = EXCLUDED.production_dates,
          budget = EXCLUDED.budget,
          shooting_format = EXCLUDED.shooting_format,
          aspect_ratio = EXCLUDED.aspect_ratio,
          language = EXCLUDED.language,
          country = EXCLUDED.country,
          past_screenings = EXCLUDED.past_screenings,
          additional_info = EXCLUDED.additional_info,
          updated_at = NOW()
        RETURNING *;
      `;
      const values = [
        userId,
        primaryPrizeKey,
        serializedPrizeCategories,
        finalPrizeAmount,
        paymentProvider,
        paymentReference,
        fullName,
        socialLink || null,
        filmName,
        synopsis,
        genre,
        runtime,
        productionDates,
        budget || null,
        shootingFormat,
        aspectRatio,
        language,
        country,
        pastScreenings,
        additionalInfo || null,
      ];
      const result = await db.query(query, values);
      return result.rows[0];
    } else if (db instanceof Database) {
      const query = `
        INSERT INTO submissions (
          user_id, prize_category, prize_categories, prize_amount, payment_provider, payment_reference,
          full_name, social_link, film_name, synopsis, genre, runtime,
          production_dates, budget, shooting_format, aspect_ratio, language,
          country, past_screenings, additional_info, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, CURRENT_TIMESTAMP
        )
        ON CONFLICT(user_id) DO UPDATE SET
          prize_category = excluded.prize_category,
          prize_categories = excluded.prize_categories,
          prize_amount = excluded.prize_amount,
          payment_provider = excluded.payment_provider,
          payment_reference = excluded.payment_reference,
          full_name = excluded.full_name,
          social_link = excluded.social_link,
          film_name = excluded.film_name,
          synopsis = excluded.synopsis,
          genre = excluded.genre,
          runtime = excluded.runtime,
          production_dates = excluded.production_dates,
          budget = excluded.budget,
          shooting_format = excluded.shooting_format,
          aspect_ratio = excluded.aspect_ratio,
          language = excluded.language,
          country = excluded.country,
          past_screenings = excluded.past_screenings,
          additional_info = excluded.additional_info,
          updated_at = CURRENT_TIMESTAMP
      `;
      const stmt = db.prepare(query);
      stmt.run(
        userId,
        primaryPrizeKey,
        serializedPrizeCategories,
        finalPrizeAmount,
        paymentProvider,
        paymentReference,
        fullName,
        socialLink || null,
        filmName,
        synopsis,
        genre,
        runtime,
        productionDates,
        budget || null,
        shootingFormat,
        aspectRatio,
        language,
        country,
        pastScreenings,
        additionalInfo || null
      );

      const getStmt = db.prepare("SELECT * FROM submissions WHERE user_id = ?");
      return getStmt.get(userId);
    }
  } catch (error) {
    console.error("Error saving submission:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
