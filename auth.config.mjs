import { betterAuth } from "better-auth";
import pkg from "pg";
const { Pool } = pkg;
import Database from "better-sqlite3";

// Use PostgreSQL if DATABASE_URL is set AND we are in production, otherwise SQLite
// Or if we explicitly want to use Postgres (e.g. for prod migrations from local)
const usePostgres = process.env.NODE_ENV === "production" ||
  process.env.USE_POSTGRES === "true";

const db = (usePostgres && process.env.DATABASE_URL)
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Database("sqlite.db");

export const auth = betterAuth({
  database: db,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
