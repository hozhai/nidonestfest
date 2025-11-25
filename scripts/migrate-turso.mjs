import { createClient } from "@libsql/client";
import { readFileSync } from "fs";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const sql = readFileSync(
  "./better-auth_migrations/2025-11-25T11-16-13.976Z.sql",
  "utf-8",
);

// Split by statement and execute each
const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

console.log(`Executing ${statements.length} statements...`);

for (const statement of statements) {
  try {
    await client.execute(statement);
    console.log("✓", statement.substring(0, 50) + "...");
  } catch (error) {
    console.error("✗", statement.substring(0, 50) + "...");
    console.error("Error:", error.message);
  }
}

console.log("\nMigration complete!");
await client.close();
