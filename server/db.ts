import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import Database from "better-sqlite3";

let _sqlite: Database.Database | Kysely<any> | null = null;

// Lazy-load the database connection - call this function to get the database
export function getDatabase() {
  if (!_sqlite) {
    // Initialize on first access, when env vars are available
    const isProduction = process.env.NODE_ENV === "production";
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    if (isProduction && tursoUrl && tursoToken) {
      _sqlite = new Kysely({
        dialect: new LibsqlDialect({
          url: tursoUrl,
          authToken: tursoToken,
        }),
      });
    } else {
      _sqlite = new Database("sqlite.db");
    }
  }
  return _sqlite;
}
