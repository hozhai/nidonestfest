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

  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim());
  if (!adminEmails.includes(session.user.email)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }

  const db = getDatabase();

  try {
    if (db instanceof Pool) {
      const query = `
        SELECT s.*, u.email, u.name as user_name, u.image as user_image
        FROM submissions s
        JOIN "user" u ON s.user_id = u.id
        ORDER BY s.created_at DESC
      `;
      const result = await db.query(query);
      return result.rows;
    } else if (db instanceof Database) {
      const query = `
        SELECT s.*, u.email, u.name as user_name, u.image as user_image
        FROM submissions s
        JOIN user u ON s.user_id = u.id
        ORDER BY s.created_at DESC
      `;
      const stmt = db.prepare(query);
      return stmt.all();
    }
  } catch (error) {
    console.error("Error fetching all submissions:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
