# Business Template

Copy this folder to onboard a new business:

```
cp -r businesses/_template businesses/<business-slug>
```

Then:
1. Fill in `brand/brand.json`, `brand/voice.md`, and add any other brand context files
   (e.g. `key-messaging.md`, `content-pillars.md`, a signature-method doc). Drop a logo in
   `brand/assets/`.
2. List the apps this business uses in `business.json` → `enabledApps` (slugs must match
   folders under the top-level `apps/`).
3. For each enabled app, add a dashboard by copying that app's template:
   `cp -r ../../apps/<slug>/template apps/<slug>` — then edit `apps/<slug>/manifest.json`
   (hero, stats, nav) and replace the placeholder markdown with real content. The dashboard's
   `index.html` is the shared shell and is not edited; it themes itself from `brand/brand.json`.
   Point `business.json` → `appConfig.<slug>.dashboard` at `apps/<slug>/index.html`.

`brand/` is this business's **single source of truth** — every app reads from it, so never
duplicate brand details inside app folders. See `../../CONVENTIONS.md`.
