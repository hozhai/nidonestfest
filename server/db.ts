import postgres from "postgres";
import Database from "better-sqlite3";

let _db: Database.Database | ReturnType<typeof postgres> | null = null;

// Lazy-load the database connection - call this function to get the database
export function getDatabase() {
  if (!_db) {
    // Initialize on first access, when env vars are available
    const isProduction = process.env.NODE_ENV === "production";
    const databaseUrl = process.env.DATABASE_URL;

    if (isProduction && databaseUrl) {
      // Use PostgreSQL (Neon) in production
      _db = postgres(databaseUrl);
    } else {
      // Use SQLite in development
      _db = new Database("sqlite.db");
    }
  }
  return _db;
}
