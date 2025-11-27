# Nido Film Festival (Nuxt 4)

Nuxt 4 + Vue 3 implementation of the Nido Film Festival site. It powers the marketing pages, localized content, and the filmmaker submission flow with paid prize entries backed by Webpay Plus (Transbank).

## Key Features

- Nuxt 4 application with Tailwind CSS, GSAP-powered effects, and shared UI components.
- Authenticated submission form using `better-auth` + Google OAuth.
- Prize selection that requires a successful Webpay payment before persisting (contact the team directly if you need an alternative method).
- Admin view for reviewing all submissions, including payment provider/reference info.
- Server-side utilities for Webpay checkout creation and verification, plus automatic DB migrations for new payment columns.

## Tech Stack

- **Framework:** Nuxt 4 / Vue 3
- **Styling:** Tailwind CSS 4, custom components
- **Auth:** better-auth with Google social login
- **Database:** SQLite for local dev, PostgreSQL (via `pg`) in production
- **Payments:** Transbank Webpay Plus (`transbank-sdk`)

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

Create a `.env` file at the project root. The following variables are used across auth, database, and payment layers:

| Variable | Required | Description |
| --- | --- | --- |
| `GOOGLE_CLIENT_ID` | ✅ | OAuth client ID for Google Sign-In via better-auth. |
| `GOOGLE_CLIENT_SECRET` | ✅ | OAuth client secret paired with the above ID. |
| `DATABASE_URL` | ➖ | PostgreSQL connection string (Neon, Supabase, etc.). If omitted, the server falls back to a local `sqlite.db`. |
| `WEBPAY_COMMERCE_CODE` | ✅ (prod) | Transbank commerce code. Optional in integration mode. |
| `WEBPAY_API_KEY` | ✅ (prod) | Transbank API key. Optional in integration mode. |
| `WEBPAY_ENV` | ➖ | `integration` (default) or `production`. Controls which Transbank endpoints/options are used. |
| `PAYMENTS_ALLOW_TEST_MODE` | ➖ | Set to `true` to let the server accept simulated payments (useful locally/staging). |
| `NUXT_PUBLIC_PAYMENT_TEST_MODE` | ➖ | Set to `true` to surface the “Simulate payment” toggle in the submission form UI. |
### Payment Sandbox Notes

- In **integration**, Webpay defaults to Transbank’s public test credentials when custom codes/keys are not provided.
- When both test-mode env vars are true, the submission page shows a “Simulate payment” checkbox. Selecting it bypasses Webpay and records the payment provider as `test` with a fake reference.

### Database Behavior

- Local development: SQLite file `sqlite.db` is auto-created.
- Production: set `DATABASE_URL` to any Postgres-compatible URL; a single connection pool (`pg.Pool`) is reused.

## Payment Flow Overview

1. User selects a prize tier on `/submission`.
2. Clicking submit without an existing payment triggers `/api/payment/create-session`, which returns Webpay’s `token_ws` + redirect URL. The frontend posts `token_ws` to Transbank and waits for the user to be redirected back with `token_ws` in the query string.
3. After redirect, the frontend auto-resubmits the form with `webpayToken`.
4. `/api/submission` verifies the payment via `server/utils/payments.ts`, persists `payment_provider` + `payment_reference`, and finally stores the submission data.

## Useful Commands

- `bun run lint` – run ESLint over the Nuxt project.
- `bun run build && bun run preview` – create a production build and preview it locally.
- `bun run dev` – Nuxt dev server with hot module replacement.

## Troubleshooting

- **Missing auth session:** ensure Google OAuth credentials exist and match your permitted redirect origins.
- **Webpay errors:** double-check `WEBPAY_ENV` and that production credentials are set before flipping to production. Integration mode works with the defaults.
- **Need another payment method?** Reach out to the organizers directly so they can help you complete the submission.

Tests for the payment flow are pending; run linting before submitting PRs and manually verify the Webpay path until automated coverage is added.
