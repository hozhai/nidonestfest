import Database from "better-sqlite3";
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

export const sqlite =
  process.env.NODE_ENV === "production" && process.env.TURSO_DATABASE_URL
    ? new Kysely({
      dialect: new LibsqlDialect({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }),
    })
    : new Database("sqlite.db");
