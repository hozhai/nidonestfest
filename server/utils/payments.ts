import { createHash } from "node:crypto";
import transbankPkg from "transbank-sdk";

const {
  Options,
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  WebpayPlus,
} = transbankPkg as typeof import("transbank-sdk");
import { Pool } from "pg";
import Database from "better-sqlite3";
import { getDatabase } from "../db";

export type PaymentMethod = "webpay";

type PaymentIntentRecord = {
  token: string;
  user_id: string;
  provider: PaymentMethod;
  prize_keys: string;
  amount: number;
};

type PaymentIntent = {
  token: string;
  userId: string;
  provider: PaymentMethod;
  prizeKeys: string[];
  amount: number;
};

const serializePrizeKeys = (keys: string[]) => JSON.stringify([...new Set(keys)].sort());

const parsePrizeKeys = (value: string | null | undefined) => {
  try {
    const parsed = value ? (JSON.parse(value) as string[]) : [];
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((key) => typeof key === "string" && key.length > 0))].sort();
  } catch (error) {
    console.error("Failed to parse prize keys from payment intent", error);
    return [];
  }
};

const mapIntentRow = (row?: PaymentIntentRecord | null): PaymentIntent | null => {
  if (!row) return null;
  return {
    token: row.token,
    userId: row.user_id,
    provider: row.provider,
    prizeKeys: parsePrizeKeys(row.prize_keys),
    amount: row.amount,
  };
};

const upsertPaymentIntent = async (intent: PaymentIntent) => {
  const db = getDatabase();
  const serializedKeys = serializePrizeKeys(intent.prizeKeys);
  if (db instanceof Pool) {
    await db.query(
      `INSERT INTO payment_intents (token, user_id, provider, prize_keys, amount)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (token) DO UPDATE SET
         user_id = EXCLUDED.user_id,
         provider = EXCLUDED.provider,
         prize_keys = EXCLUDED.prize_keys,
         amount = EXCLUDED.amount,
         created_at = CURRENT_TIMESTAMP`,
      [intent.token, intent.userId, intent.provider, serializedKeys, intent.amount]
    );
  } else if (db instanceof Database) {
    const stmt = db.prepare(
      `INSERT INTO payment_intents (token, user_id, provider, prize_keys, amount, created_at)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(token) DO UPDATE SET
         user_id = excluded.user_id,
         provider = excluded.provider,
         prize_keys = excluded.prize_keys,
         amount = excluded.amount,
         created_at = CURRENT_TIMESTAMP`
    );
    stmt.run(intent.token, intent.userId, intent.provider, serializedKeys, intent.amount);
  }
};

const getPaymentIntent = async (token: string) => {
  const db = getDatabase();
  if (db instanceof Pool) {
    const result = await db.query<PaymentIntentRecord>(
      "SELECT * FROM payment_intents WHERE token = $1",
      [token]
    );
    return mapIntentRow(result.rows[0] || null);
  }
  const stmt = (db as any).prepare("SELECT * FROM payment_intents WHERE token = ?");
  return mapIntentRow(stmt.get(token) as PaymentIntentRecord | undefined);
};

const deletePaymentIntent = async (token: string) => {
  const db = getDatabase();
  if (db instanceof Pool) {
    await db.query("DELETE FROM payment_intents WHERE token = $1", [token]);
  } else {
    (db as any).prepare("DELETE FROM payment_intents WHERE token = ?").run(token);
  }
};

const hashUserId = (userId: string) =>
  createHash("sha256").update(userId).digest("hex").slice(0, 12);

const buildWebpaySessionId = (userId: string) => hashUserId(userId);

const parseWebpaySessionId = (sessionId: string) => {
  const [userHash] = sessionId.split("-");
  return { userHash };
};

const buildWebpayOptions = () => {
  const targetEnv = (process.env.WEBPAY_ENV || "integration").toLowerCase();
  const isProduction = targetEnv.startsWith("prod");
  const commerceCode =
    process.env.WEBPAY_COMMERCE_CODE || IntegrationCommerceCodes.WEBPAY_PLUS;
  const apiKey = process.env.WEBPAY_API_KEY || IntegrationApiKeys.WEBPAY;

  if (isProduction && (!process.env.WEBPAY_COMMERCE_CODE || !process.env.WEBPAY_API_KEY)) {
    throw new Error("Webpay production credentials are not configured.");
  }

  return new Options(
    commerceCode,
    apiKey,
    isProduction ? Environment.Production : Environment.Integration
  );
};

const getWebpayTransaction = () => new WebpayPlus.Transaction(buildWebpayOptions());

export const createWebpayCheckout = async (params: {
  userId: string;
  prizeKeys: string[];
  amount: number;
  returnUrl: string;
}) => {
  const { userId, prizeKeys, amount, returnUrl } = params;
  const transaction = getWebpayTransaction();
  const sessionId = buildWebpaySessionId(userId);
  const timestampPart = Date.now().toString().slice(-8);
  const randomPart = Math.random().toString(36).slice(-5).toUpperCase();
  const buyOrder = `${hashUserId(userId)}${timestampPart}${randomPart}`.slice(0, 26);
  const response = await transaction.create(buyOrder, sessionId, amount, returnUrl);
  await upsertPaymentIntent({
    token: response.token,
    userId,
    provider: "webpay",
    prizeKeys,
    amount,
  });
  return {
    token: response.token,
    url: response.url,
  };
};

export const verifyWebpayCheckout = async (params: { token: string; userId: string }) => {
  const { token, userId } = params;
  const intent = await getPaymentIntent(token);
  if (!intent) {
    throw new Error("Webpay payment metadata is missing.");
  }
  if (intent.userId !== userId) {
    throw new Error("Webpay payment does not belong to this user.");
  }
  const transaction = getWebpayTransaction();
  const response = await transaction.commit(token);

  if (response.response_code !== 0) {
    throw new Error("Webpay returned a non-success response code.");
  }

  const { userHash } = parseWebpaySessionId(response.session_id);
  if (!userHash || userHash !== hashUserId(userId)) {
    throw new Error("Webpay payment does not belong to this user.");
  }

  if (Math.round(response.amount) < intent.amount) {
    throw new Error("Webpay payment amount does not match the required fee.");
  }

  await deletePaymentIntent(token);

  return {
    prizeKeys: intent.prizeKeys,
    amount: intent.amount,
    provider: "webpay" as PaymentMethod,
    reference: response.buy_order || token,
  };
};
