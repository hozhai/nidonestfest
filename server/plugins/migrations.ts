import { getDatabase } from "../db";
import { Pool } from "pg";
import Database from "better-sqlite3";

export default defineNitroPlugin(async (nitroApp) => {
  const db = getDatabase();

  const createTableSQLPostgres = `
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
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

  try {
    if (db instanceof Pool) {
      await db.query(createTableSQLPostgres);
      console.log("PostgreSQL: 'submissions' table checked/created.");
    } else if (db instanceof Database) {
      db.prepare(createTableSQLSQLite).run();
      console.log("SQLite: 'submissions' table checked/created.");
    }
  } catch (error) {
    console.error("Error creating submissions table:", error);
  }
});
