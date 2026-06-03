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

## Two levels of dashboard
- **Root homebase** (`/index.html`) — lists every business + the full app catalog.
- **Per-business landing page** (`businesses/<slug>/index.html`) — each business's own URL
  at `…/businesses/<slug>/`, showing just that business's brand header + enabled apps. It's
  slug-agnostic (derives the business from its own path, all relative links), so the copy
  shipped in `businesses/_template/` works unedited for any new business.

## Adding to it
- **New business:** add its slug to the `BUSINESSES` array in `/index.html` (after creating
  the folder per `CONVENTIONS.md`). Its landing page comes for free from the template.
- **New app:** add its slug to the `APP_CATALOG` array in `/index.html`.

These two arrays are the only manual registry — everything else is read from the JSON files.

## Serving
Must be served over HTTP (it uses `fetch`). Locally: `python3 -m http.server` from the repo
root, then open `http://localhost:8000/`. In production: GitHub Pages (a root `.nojekyll` is
included so files are served as-is). The first app's own dashboard lives at
`businesses/momentum-fitness/apps/social-media/index.html` and is linked from the homebase.

## Shared app-dashboard renderer (this folder)

Every per-app dashboard (`businesses/<biz>/apps/<app>/index.html`) is now a thin shell that
loads one shared, self-theming renderer from this folder — so adding a dashboard is **config +
content, not copied HTML/CSS/JS**.

- **`app-dashboard.css`** — the universal dark "operator console" stylesheet. Grays, shadows,
  and spacing are fixed defaults; the **accent color and fonts are CSS variables** themed per
  business at runtime.
- **`app-dashboard.js`** — reads the business's `brand.json` (`../../brand/brand.json`) for
  theme (accent via `colors.yellow|accent|primary`, `fonts`, `name`, `awards`, `logo`) and the
  instance's `manifest.json` (`./manifest.json`) for content, then renders the topbar/logo,
  hero, stats, nav, and all markdown sections (via marked.js), with scroll-spy + mobile menu.
- **`index.html`** — the canonical thin shell. It is **byte-identical for every business +
  app** and contains no per-app strings. Instances reference shared code at
  `../../../../dashboard/…` (4 levels up) and resolve `manifest.json` + content paths relative
  to their own page.

### `manifest.json` schema (per instance)
```jsonc
{
  "tag": "Physics 101 · Content System",   // topbar pill
  "docTitleSuffix": "Content System",        // <title> = "<brand.name> — <suffix>"
  "hero": { "eyebrow": "...", "title": "Headline with *em*", "subcopy": "**Brand** — ..." },
  "stats": [ { "n": "5", "l": "Content Pillars" } ],
  "nav": [ { "group": "Start Here",
             "items": [ { "id": "overview", "title": "Overview", "file": "README.md", "pill": "Intro" } ] } ],
  "awards": [ "Living Magazine **Best of 2024**" ],  // optional; else inherits brand.awards
  "footer": "..."                                     // optional; derived if absent
}
```
`hero.title`/`subcopy`/`awards` accept inline markdown (`*em*`, `**strong**`). `nav` `file`
paths are relative to the instance page (so `../../brand/*.md` and `content/…` work).

To add a dashboard to a business, copy that app's `apps/<slug>/template/` folder — it ships a
ready-to-edit `manifest.json`, the shell, and placeholder content. See `CONVENTIONS.md`.
