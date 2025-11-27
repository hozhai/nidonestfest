import { betterAuth } from "better-auth";
import { Pool } from "pg";
import Database from "better-sqlite3";

// Use PostgreSQL if DATABASE_URL is set AND we are in production, otherwise SQLite
const usePostgres = process.env.NODE_ENV === "production" || process.env.USE_POSTGRES === "true";

const db = (usePostgres && process.env.DATABASE_URL)
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Database("sqlite.db");

export const auth = betterAuth({
  database: db,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
