import { getDatabase } from "../../db";
import { auth } from "../../utils/auth";
import { Pool } from "pg";
import Database from "better-sqlite3";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const db = getDatabase();
  const userId = session.user.id;

  try {
    if (db instanceof Pool) {
      const result = await db.query(
        "SELECT * FROM submissions WHERE user_id = $1",
        [userId]
      );
      return result.rows[0] || null;
    } else if (db instanceof Database) {
      const stmt = db.prepare("SELECT * FROM submissions WHERE user_id = ?");
      return stmt.get(userId) || null;
    }
  } catch (error) {
    console.error("Error fetching submission:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
