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

  const body = await readBody(event);
  const userId = session.user.id;

  // Validation
  const mandatoryFields = [
    "fullName",
    "filmName",
    "synopsis",
    "genre",
    "runtime",
    "productionDates",
    "shootingFormat",
    "aspectRatio",
    "language",
    "country",
    "pastScreenings",
  ];

  for (const field of mandatoryFields) {
    if (!body[field]) {
      throw createError({
        statusCode: 400,
        statusMessage: `Missing mandatory field: ${field}`,
      });
    }
  }

  const db = getDatabase();

  const {
    fullName,
    socialLink,
    filmName,
    synopsis,
    genre,
    runtime,
    productionDates,
    budget,
    shootingFormat,
    aspectRatio,
    language,
    country,
    pastScreenings,
    additionalInfo,
  } = body;

  try {
    if (db instanceof Pool) {
      const query = `
        INSERT INTO submissions (
          user_id, full_name, social_link, film_name, synopsis, genre, runtime,
          production_dates, budget, shooting_format, aspect_ratio, language,
          country, past_screenings, additional_info, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          social_link = EXCLUDED.social_link,
          film_name = EXCLUDED.film_name,
          synopsis = EXCLUDED.synopsis,
          genre = EXCLUDED.genre,
          runtime = EXCLUDED.runtime,
          production_dates = EXCLUDED.production_dates,
          budget = EXCLUDED.budget,
          shooting_format = EXCLUDED.shooting_format,
          aspect_ratio = EXCLUDED.aspect_ratio,
          language = EXCLUDED.language,
          country = EXCLUDED.country,
          past_screenings = EXCLUDED.past_screenings,
          additional_info = EXCLUDED.additional_info,
          updated_at = NOW()
        RETURNING *;
      `;
      const values = [
        userId,
        fullName,
        socialLink || null,
        filmName,
        synopsis,
        genre,
        runtime,
        productionDates,
        budget || null,
        shootingFormat,
        aspectRatio,
        language,
        country,
        pastScreenings,
        additionalInfo || null,
      ];
      const result = await db.query(query, values);
      return result.rows[0];
    } else if (db instanceof Database) {
      const query = `
        INSERT INTO submissions (
          user_id, full_name, social_link, film_name, synopsis, genre, runtime,
          production_dates, budget, shooting_format, aspect_ratio, language,
          country, past_screenings, additional_info, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP
        )
        ON CONFLICT(user_id) DO UPDATE SET
          full_name = excluded.full_name,
          social_link = excluded.social_link,
          film_name = excluded.film_name,
          synopsis = excluded.synopsis,
          genre = excluded.genre,
          runtime = excluded.runtime,
          production_dates = excluded.production_dates,
          budget = excluded.budget,
          shooting_format = excluded.shooting_format,
          aspect_ratio = excluded.aspect_ratio,
          language = excluded.language,
          country = excluded.country,
          past_screenings = excluded.past_screenings,
          additional_info = excluded.additional_info,
          updated_at = CURRENT_TIMESTAMP
      `;
      const stmt = db.prepare(query);
      stmt.run(
        userId,
        fullName,
        socialLink || null,
        filmName,
        synopsis,
        genre,
        runtime,
        productionDates,
        budget || null,
        shootingFormat,
        aspectRatio,
        language,
        country,
        pastScreenings,
        additionalInfo || null
      );
      
      // Fetch the updated record to return
      const getStmt = db.prepare("SELECT * FROM submissions WHERE user_id = ?");
      return getStmt.get(userId);
    }
  } catch (error) {
    console.error("Error saving submission:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
