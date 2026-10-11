# Changelog

All notable changes to 2d-barcode are documented here.
Format follows Keep a Changelog. Dates in UTC.

## [Unreleased]
### Added
- Execution plan moved to gitignored `PLAN.local.md` with staged manual commits.
- Target stack defined: Svelte 5 + Vite + `qrcode` + Supabase Auth + Postgres.

### Changed
- `.gitignore` extended: `build/`, `.svelte-kit/`, `.vercel/`, `.env*`, `PLAN.local.md`.

## [1.0.0] - 2026-10-11
### Added
- React + Vite client-side QR generator: text/URL input, live counter, PNG download.
- Customisation: size 256-1024, EC L/M/Q/H, dark/light colours.
- History in `localStorage` (20 items, dedupe, restore/download/delete/clear).
- Toast notifications, dark theme, BEM-ish CSS.
