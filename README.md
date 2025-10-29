# Nido Film Festival (SvelteKit)

This project migrates the previous static site to the latest SvelteKit app.

## What changed

- SvelteKit scaffold with Vite 6 and Svelte 5
- Global layout with language switcher, navigation, and footer
- Pages migrated to Svelte routes:
  - `/` (home with countdown)
  - `/about`
  - `/submission` (Google Form embedded)
  - `/judges`
  - `/timeline`
  - `/videos`
- Styles moved to `src/app.css`
- Font Awesome loaded in `src/app.html`
- Legacy static files kept in `legacy/` for reference

## Run locally

```fish
# install deps
npm install

# start dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

## Notes

- Language switching preserves the original data-en/data-es attributes and updates text on the client.
- The home page countdown is implemented with Svelte reactivity.
- If you plan to deploy, choose an adapter (e.g., `@sveltejs/adapter-node`, `adapter-static`, or a platform-specific adapter) and update `svelte.config.js`.
