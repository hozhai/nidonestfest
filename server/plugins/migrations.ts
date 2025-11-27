import { getDatabase } from "../db";
import { Pool } from "pg";
import Database from "better-sqlite3";

export default defineNitroPlugin(async (nitroApp) => {
  const db = getDatabase();

  const createTableSQLPostgres = `
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      prize_category TEXT,
      prize_categories TEXT,
      prize_amount INTEGER,
      payment_provider TEXT,
      payment_reference TEXT,
      full_name TEXT NOT NULL,
      social_link TEXT,
      film_name TEXT NOT NULL,
      synopsis TEXT NOT NULL,
      genre TEXT NOT NULL,
      runtime TEXT NOT NULL,
      production_dates TEXT NOT NULL,
      budget TEXT,
      shooting_format TEXT NOT NULL,
      aspect_ratio TEXT NOT NULL,
      language TEXT NOT NULL,
      country TEXT NOT NULL,
      past_screenings TEXT NOT NULL,
      additional_info TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createTableSQLSQLite = `
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL UNIQUE,
      prize_category TEXT,
      prize_categories TEXT,
      prize_amount INTEGER,
      payment_provider TEXT,
      payment_reference TEXT,
      full_name TEXT NOT NULL,
      social_link TEXT,
      film_name TEXT NOT NULL,
      synopsis TEXT NOT NULL,
      genre TEXT NOT NULL,
      runtime TEXT NOT NULL,
      production_dates TEXT NOT NULL,
      budget TEXT,
      shooting_format TEXT NOT NULL,
      aspect_ratio TEXT NOT NULL,
      language TEXT NOT NULL,
      country TEXT NOT NULL,
      past_screenings TEXT NOT NULL,
      additional_info TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const alterTableSQLPostgres = [
    "ALTER TABLE submissions ADD COLUMN IF NOT EXISTS payment_provider TEXT",
    "ALTER TABLE submissions ADD COLUMN IF NOT EXISTS payment_reference TEXT",
    "ALTER TABLE submissions ADD COLUMN IF NOT EXISTS prize_categories TEXT",
  ];

  const createPaymentIntentsPostgres = `
    CREATE TABLE IF NOT EXISTS payment_intents (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      prize_keys TEXT NOT NULL,
      amount INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createPaymentIntentsSQLite = `
    CREATE TABLE IF NOT EXISTS payment_intents (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      prize_keys TEXT NOT NULL,
      amount INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const ensureSQLiteColumn = (dbInstance: Database, column: string, type: string) => {
    const columns = dbInstance.prepare("PRAGMA table_info(submissions)").all() as Array<{ name: string }>;
    if (!columns.some((col) => col.name === column)) {
      dbInstance.prepare(`ALTER TABLE submissions ADD COLUMN ${column} ${type}`).run();
    }
  };

  try {
    if (db instanceof Pool) {
      await db.query(createTableSQLPostgres);
      await db.query(createPaymentIntentsPostgres);
      for (const statement of alterTableSQLPostgres) {
        await db.query(statement);
      }
      console.log("PostgreSQL: 'submissions' table checked/created.");
    } else if (db instanceof Database) {
      db.prepare(createTableSQLSQLite).run();
      db.prepare(createPaymentIntentsSQLite).run();
      ensureSQLiteColumn(db, "payment_provider", "TEXT");
      ensureSQLiteColumn(db, "payment_reference", "TEXT");
      ensureSQLiteColumn(db, "prize_categories", "TEXT");
      console.log("SQLite: 'submissions' table checked/created.");
    }
  } catch (error) {
    console.error("Error creating submissions table:", error);
  }
});
