import { Pool } from "pg";
import Database from "better-sqlite3";

let _db: Database.Database | Pool | null = null;

// Lazy-load the database connection - call this function to get the database
export function getDatabase() {
  if (!_db) {
    // Initialize on first access, when env vars are available
    const isProduction = process.env.NODE_ENV === "production";
    const databaseUrl = process.env.DATABASE_URL;

    if (isProduction && databaseUrl) {
      // Use PostgreSQL (Neon) in production
      _db = new Pool({ connectionString: databaseUrl });
    } else {
      // Use SQLite in development
      _db = new Database("sqlite.db");
    }
  }
  return _db;
}
