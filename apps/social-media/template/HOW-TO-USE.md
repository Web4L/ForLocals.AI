# How to use this template

This folder is the **copy-me instance scaffold** for the Social Media app. It is NOT rendered
in place — it's the starting point you copy into a business.

## Onboarding a business to the Social Media app
1. Copy this whole folder into the business:
   `cp -r apps/social-media/template businesses/<business-slug>/apps/social-media`
2. Edit `manifest.json` — drives the dashboard chrome: `tag`, `hero.eyebrow/title/subcopy`,
   `stats`, and the `nav` groups → section files. `title`/`subcopy` accept inline markdown.
   Leave `awards` out to inherit `brand.json` → `awards`, or set it here to override.
3. Replace the placeholder markdown (`README.md`, `content/…`, `calendar/…`,
   `tools/prompt-library.md`) with the business's real content. Fill the `{{TOKENS}}`:
   `{{BUSINESS_NAME}}`, `{{LOCATION}}`, `{{OFFER}}`, `{{CTA_KEYWORD}}`, `{{HERO_HEADLINE}}`.
4. Enable it in the business's `business.json`: add `"social-media"` to `enabledApps` and an
   `appConfig.social-media` block with `"dashboard": "apps/social-media/index.html"`.

## What you do NOT edit
- `index.html` — the shared shell, byte-identical for every business + app. It loads the
  shared renderer from `../../../../dashboard/` and themes itself from the business's
  `brand.json`. Don't add markup here.
- The shared CSS/JS live in `/dashboard/` and are never copied.

Delete this `HOW-TO-USE.md` from the business copy once you've onboarded.
