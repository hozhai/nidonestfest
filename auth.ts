import { betterAuth } from "better-auth";
import { Pool } from "pg";
import Database from "better-sqlite3";

// Use PostgreSQL if DATABASE_URL is set (for migrations), otherwise SQLite
const db = process.env.DATABASE_URL
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
