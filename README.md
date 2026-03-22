# Nido Film Festival (Nuxt 4)

Nuxt 4 + Vue 3 implementation of the Nido Film Festival site. It powers the marketing pages, localized content, and the filmmaker submission flow.

## Key Features

- Nuxt 4 application with Tailwind CSS, GSAP-powered effects, and shared UI components.
- Authenticated submission form using `better-auth` + Google OAuth.
- Prize selection with direct submission (no payment required).
- Admin view for reviewing all submissions.

## Tech Stack

- **Framework:** Nuxt 4 / Vue 3
- **Styling:** Tailwind CSS 4, custom components
- **Auth:** better-auth with Google social login
- **Database:** SQLite for local dev, PostgreSQL (via `pg`) in production

## Prerequisites

- Node.js 20+ (Bun 1.1+ is recommended but optional)
- SQLite (bundled) or a PostgreSQL connection string for production

## Installation & Scripts

```fish
# install dependencies
bun install        # or: npm install / pnpm install

# start a local dev server
bun run dev        # or: npm run dev

# type-safe build & preview
bun run build
bun run preview

# lint the project
bun run lint
```

Nuxt automatically runs `nuxt prepare` after installs (see `postinstall`).

## Environment Variables

Create a `.env` file at the project root. The following variables are used across auth and database layers:

| Variable               | Required | Description                                                                                                    |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | ✅       | OAuth client ID for Google Sign-In via better-auth.                                                            |
| `GOOGLE_CLIENT_SECRET` | ✅       | OAuth client secret paired with the above ID.                                                                  |
| `DATABASE_URL`         | ➖       | PostgreSQL connection string (Neon, Supabase, etc.). If omitted, the server falls back to a local `sqlite.db`. |

### Database Behavior

- Local development: SQLite file `sqlite.db` is auto-created.
- Production: set `DATABASE_URL` to any Postgres-compatible URL; a single connection pool (`pg.Pool`) is reused.

## Submission Flow Overview

1. User selects a prize tier on `/submission`.
2. Clicking submit sends the form directly to `/api/submission`.
3. The server validates required fields and stores the submission.

## Useful Commands

- `bun run lint` – run ESLint over the Nuxt project.
- `bun run build && bun run preview` – create a production build and preview it locally.
- `bun run dev` – Nuxt dev server with hot module replacement.

## Troubleshooting

- **Missing auth session:** ensure Google OAuth credentials exist and match your permitted redirect origins.

Run linting before submitting PRs and manually verify the submission flow until automated end-to-end coverage is added.
