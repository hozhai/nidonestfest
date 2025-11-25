import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const sqlite = new Database("sqlite.db");

export const auth = betterAuth({
  database: sqlite,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
