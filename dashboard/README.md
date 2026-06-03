# Dashboard (Homebase)

The cross-app **homebase** is built and lives at the repository root: **`/index.html`**.
It's the site's landing page.

## What it does
- Reads `businesses/*/business.json` + `businesses/*/brand/brand.json` to discover each
  business and render it in its own brand accent color.
- Shows each business's `enabledApps` as cards, with an **Open →** button that links into
  that app's own view (via `appConfig.<app>.dashboard` in `business.json`).
- Renders an **App Catalog** of all available automations (from `apps/*/app.json`) with a
  ready/planned status.

## Adding to it
- **New business:** add its slug to the `BUSINESSES` array in `/index.html` (after creating
  the folder per `CONVENTIONS.md`).
- **New app:** add its slug to the `APP_CATALOG` array in `/index.html`.

These two arrays are the only manual registry — everything else is read from the JSON files.

## Serving
Must be served over HTTP (it uses `fetch`). Locally: `python3 -m http.server` from the repo
root, then open `http://localhost:8000/`. In production: GitHub Pages (a root `.nojekyll` is
included so files are served as-is). The first app's own dashboard lives at
`businesses/momentum-fitness/apps/social-media/index.html` and is linked from the homebase.

This `dashboard/` folder is reserved for future shared dashboard assets/code.
