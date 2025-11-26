import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

// Use Turso in production, better-sqlite3 only in development
export const sqlite =
  process.env.NODE_ENV === "production" || process.env.TURSO_DATABASE_URL
    ? new Kysely({
        dialect: new LibsqlDialect({
          url: process.env.TURSO_DATABASE_URL!,
          authToken: process.env.TURSO_AUTH_TOKEN,
        }),
      })
    : await import("better-sqlite3").then((mod) => new mod.default("sqlite.db"));
