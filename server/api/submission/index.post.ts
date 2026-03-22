import { Pool } from "pg";
import Database from "better-sqlite3";
import { getDatabase } from "../../db";
import { auth } from "../../utils/auth";
import { getPrizeOptionsByKeys } from "../../../lib/prizes";

const sortPrizeKeys = (keys: string[]) => [...new Set(keys)].sort();

const normalizePrizeKeysInput = (input: unknown): string[] => {
  if (!Array.isArray(input)) return [];
  return sortPrizeKeys(
    input
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.trim())
      .filter((value) => value.length > 0),
  );
};

export default defineEventHandler(async (event) => {
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
    throw createError({
      statusCode: 400,
      statusMessage: "Please select at least one award.",
    });
  }

  const prizeOptions = getPrizeOptionsByKeys(submittedPrizeKeys);
  if (!prizeOptions) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid award selection.",
    });
  }

  const primaryPrizeKey = submittedPrizeKeys[0] || null;
  const serializedPrizeCategories = JSON.stringify(submittedPrizeKeys);

  const db = getDatabase();

  try {
    if (db instanceof Pool) {
      const query = `
        INSERT INTO submissions (
          user_id, prize_category, prize_categories,
          full_name, social_link, film_name, synopsis, genre, runtime,
          production_dates, budget, shooting_format, aspect_ratio, language,
          country, past_screenings, additional_info, updated_at
        ) VALUES (
          $1, $2, $3,
          $4, $5, $6, $7, $8, $9,
          $10, $11, $12, $13, $14,
          $15, $16, $17, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          prize_category = EXCLUDED.prize_category,
          prize_categories = EXCLUDED.prize_categories,
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
    }

    if (db instanceof Database) {
      const query = `
        INSERT INTO submissions (
          user_id, prize_category, prize_categories,
          full_name, social_link, film_name, synopsis, genre, runtime,
          production_dates, budget, shooting_format, aspect_ratio, language,
          country, past_screenings, additional_info, updated_at
        ) VALUES (
          ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, CURRENT_TIMESTAMP
        )
        ON CONFLICT(user_id) DO UPDATE SET
          prize_category = excluded.prize_category,
          prize_categories = excluded.prize_categories,
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
