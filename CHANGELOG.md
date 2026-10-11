# Changelog

All notable changes to 2d-barcode are documented here.
Format follows Keep a Changelog. Dates in UTC.

## [Unreleased]
### Added
- Execution plan moved to gitignored `PLAN.local.md` with staged manual commits.
- Target stack defined: Svelte 5 + Vite + `qrcode` + Supabase Auth + Postgres.
- Stage 1 scaffold: Svelte 5 shell (`src/main.js`, `src/App.svelte`), `vite.config.js` (svelte only), `vercel.json` (dist).
- Stage 2 design system: `src/lib/tokens.css` central tokens, `src/lib/app.css` BEM semantic layout.

### Changed
- `.gitignore` extended: `build/`, `.svelte-kit/`, `.vercel/`, `.env*`, `PLAN.local.md`.
- Stage 0 purge: removed React (`react`, `react-dom`, `@types/*`, `@vitejs/plugin-react`, `eslint*`, `globals`), `src/*.jsx`, `eslint.config.js`, `package-lock.json`, `dist/` logs.

## [1.0.0] - 2026-10-11
### Added
- React + Vite client-side QR generator: text/URL input, live counter, PNG download.
- Customisation: size 256-1024, EC L/M/Q/H, dark/light colours.
- History in `localStorage` (20 items, dedupe, restore/download/delete/clear).
- Toast notifications, dark theme, BEM-ish CSS.
