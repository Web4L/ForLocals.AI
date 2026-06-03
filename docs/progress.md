# Progress Log

Running log of what's been built. Newest at top.

## 2026-06-03

### Built
- **Repo scaffold** — `apps/` (10 reusable automation definitions + `_template`) and
  `businesses/` (`_template` + first business). Each app has `README.md`, `app.json`,
  `prompts/`, `src/`. Root `README.md` + `CONVENTIONS.md` document the structure.
- **Momentum Fitness onboarded** as the first business, populated from the
  `Web4L/momentum-fitness-social` repo:
  - Brand context (single source of truth) at `businesses/momentum-fitness/brand/`:
    `voice-tone.md`, `key-messaging.md`, `content-pillars.md`, `move-framework.md`,
    `brand.json` (colors, fonts, awards, Physics 101 offer, "PHYSICS" CTA).
  - **Social-media app** at `businesses/momentum-fitness/apps/social-media/` — content,
    calendar, ads, analytics, prompt library, and a working dashboard (`index.html`).
- **Root homebase** (`/index.html`) — lists all businesses (styled in each one's accent
  color) + an app catalog. Reads `business.json` / `brand.json` / `app.json` live.
- **Per-business landing pages** — slug-agnostic `index.html` at
  `businesses/<slug>/index.html` (in Momentum + `_template`), giving each business its own
  URL `…/businesses/<slug>/`.
- **GitHub Pages** — published from `main` (root `.nojekyll` added). Live root:
  `https://web4l.github.io/ForLocals.AI/`.
- **CLAUDE.md + docs logs** — project memory + this log + `docs/decisions.md`.
- **`/new-session` command** — `.claude/commands/new-session.md`; on invocation it loads
  `CLAUDE.md`, `CONVENTIONS.md`, `docs/decisions.md`, `docs/progress.md`, embeds git
  status + recent log, then briefs the session and proposes a next step before changing
  anything. (Drafted fresh — GolfProAI's version was private/out of scope to copy.)

### Known gaps / issues
- No `momentum-logo.png` yet — dashboards fall back to a CSS wordmark. Drop the PNG in
  `businesses/momentum-fitness/brand/assets/`.
- Site is **fully public** — no auth (deferred). Don't put anything sensitive in the repo.
- Only 1 app (social-media) is actually built; the other 9 are scaffolded definitions.
- This environment can't run a headless browser, so no rendered screenshots — verified via
  HTTP-200 checks + JS syntax checks.

### Next steps
- Build a second app for Momentum (e.g. newsletter or review-responder) using social-media
  as the pattern.
- Add the Momentum logo asset.
- When ready: port hosting to Vercel/Cloudflare to add per-business logins.
