import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import Database from "better-sqlite3";

// Use Turso ONLY in production (Vercel sets NODE_ENV=production)
export const sqlite =
  process.env.NODE_ENV === "production"
    ? new Kysely({
        dialect: new LibsqlDialect({
          url: process.env.TURSO_DATABASE_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN,
        }),
      })
    : new Database("sqlite.db");
