import { betterAuth } from "better-auth";
import postgres from "postgres";
import Database from "better-sqlite3";

// Use PostgreSQL if DATABASE_URL is set (for migrations), otherwise SQLite
const db = process.env.DATABASE_URL
  ? postgres(process.env.DATABASE_URL)
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
