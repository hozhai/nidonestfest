# Deploying to Cloudflare Pages

Since `better-sqlite3` requires a local file system (not available on Cloudflare Pages), you need to use an external database for production.

## Recommended: Use Turso (LibSQL)

Turso is a hosted LibSQL database that works great with Cloudflare Pages.

### Setup Steps:

1. **Create a Turso account and database**:
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   turso auth signup
   turso db create nidonestfest
   turso db show nidonestfest
   turso db tokens create nidonestfest
   ```

2. **Get your credentials**:
   - Database URL: `libsql://your-db.turso.io`
   - Auth Token: (from the tokens create command)

3. **Your database config is already set up**:
   The `server/db.ts` file already handles both local and production environments:
   - **Local**: Uses `better-sqlite3` with a local `sqlite.db` file
   - **Production**: Uses Turso with Kysely + LibSQL when `NODE_ENV=production`

4. **Install production dependencies**:
   ```bash
   bun add kysely @libsql/client @libsql/kysely-libsql
   ```

5. **Set environment variables in Cloudflare Pages**:
   - `NODE_ENV=production`
   - `TURSO_DATABASE_URL=libsql://your-db.turso.io`
   - `TURSO_AUTH_TOKEN=your-auth-token`
   - `BETTER_AUTH_SECRET=your-secret`
   - `BETTER_AUTH_URL=https://your-site.pages.dev`
   - `GOOGLE_CLIENT_ID=your-client-id`
   - `GOOGLE_CLIENT_SECRET=your-client-secret`

6. **Run migrations on Turso**:
   The migration script has already been created at `scripts/migrate-turso.mjs`.
   
   Simply run:
   ```bash
   node --env-file=.env scripts/migrate-turso.mjs
   ```
   
   This will execute the SQL migration file from `better-auth_migrations/` on your Turso database.

## Alternative: Cloudflare D1

If you prefer Cloudflare D1, you'll need to create a custom adapter since better-auth doesn't have official D1 support yet.

For now, I recommend using **Turso** as it's the easiest solution that works with better-auth and Cloudflare Pages.
