# How to use this template

This folder is the **copy-me instance scaffold** for the Newsletter app. It is NOT rendered
in place — it's the starting point you copy into a business.

## Onboarding a business to the Newsletter app
1. Copy this whole folder into the business:
   `cp -r apps/newsletter/template businesses/<business-slug>/apps/newsletter`
2. Edit `manifest.json` — the only file that drives the dashboard chrome:
   - `tag`, `hero.eyebrow/title/subcopy`, `stats`, and the `nav` groups → section files.
   - `title`/`subcopy` accept inline markdown (`*em*`, `**strong**`).
   - Leave `awards` out to inherit `brand.json` → `awards`, or set it here to override the chips.
3. Replace the placeholder markdown (`README.md`, `strategy.md`, `issues/…`, `templates/…`,
   `calendar/…`, `tools/prompt-library.md`, `analytics/…`) with the business's real content.
   Fill the `{{TOKENS}}`: `{{BUSINESS_NAME}}`, `{{LOCATION}}`, `{{OFFER}}`, `{{CTA_KEYWORD}}`,
   `{{HERO_HEADLINE}}`.
4. Enable it in the business's `business.json`:
   add `"newsletter"` to `enabledApps` and an `appConfig.newsletter` block with
   `"dashboard": "apps/newsletter/index.html"`.

## What you do NOT edit
- `index.html` — the shared shell, byte-identical for every business + app. It loads the
  shared renderer from `../../../../dashboard/` and themes itself from the business's
  `brand.json`. Don't add markup here.
- The shared CSS/JS live in `/dashboard/` and are never copied.

Delete this `HOW-TO-USE.md` from the business copy once you've onboarded (it isn't in the
manifest, so it won't render either way).
