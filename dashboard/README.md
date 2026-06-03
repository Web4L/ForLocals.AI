# Dashboard (Homebase)

This is the planned **cross-app homebase**: a single view per business that lists every app
in that business's `business.json` → `enabledApps` and links into each one.

**Not built yet.** Scope so far has been the folder structure plus the first business's
first app. The first app already ships a working, on-brand dashboard you can use as the
design reference:

- `businesses/momentum-fitness/apps/social-media/index.html`

It renders Markdown straight from the repo via a `MANIFEST`, uses the business's brand
colors (black / metallic silver / lemon-yellow), and reads brand context from
`businesses/momentum-fitness/brand/`.

## Intended behavior
- Read `businesses/*/business.json` to discover each business and its enabled apps.
- Render a homebase per business: brand header (from `brand/brand.json`) + a card/link per
  enabled app.
- Each app card links into that app's own view (e.g. the social-media `index.html`).

Reuse the styling and Markdown-rendering approach already proven in the social-media
dashboard rather than starting from scratch.
