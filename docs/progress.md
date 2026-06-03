# Progress Log

Running log of what's been built. Newest at top.

## 2026-06-03

### Built
- **Newsletter app — built & live (2nd Momentum app).** Promoted `apps/newsletter/`
  from scaffold to `status: "ready"` (sharpened `app.json` + `README.md`, added reusable
  `prompts/newsletter-prompts.md`). Built a full Momentum instance at
  `businesses/momentum-fitness/apps/newsletter/` mirroring the social-media pattern:
  a styled dashboard (`index.html`), `strategy.md` (cadence, 3 audience segments, issue
  anatomy), two ready-to-send issues, `templates/` (issue structure + subject-line
  library), an editorial-calendar template, an analytics tracker, and a `prompt-library.md`
  with a newsletter-specific Master Context Block. Wired into `business.json`
  (`enabledApps` + `appConfig`), so it auto-appears on Momentum's landing page and shows
  "ready" in the root catalog. Verified: JSON valid, inline JS passes `node --check`,
  21/21 files serve HTTP-200.
- **Deep-research brief** — `docs/automation-research.md`: the 10 highest-value local-
  business automations (5-angle research, confidence-flagged). Key finding: lead with
  revenue-leak apps (speed-to-lead, reputation engine, no-show reduction, reactivation)
  over bandwidth/content apps. Newsletter validated as the nurture/retention "glue."
- **Branch-name reconcile** — updated the stale working-branch reference
  `claude/sharp-lovelace-ddbLb` → `claude/upbeat-bardeen-cPbNl` in `CLAUDE.md`
  (session hygiene), `docs/decisions.md` (working-branch note), and
  `.claude/commands/new-session.md` (branch check). Docs now match the active branch.
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
- 2 of 10 apps are built for Momentum (social-media, newsletter); the other 8 are
  scaffolded definitions.
- Newsletter issues use bracketed placeholders ([Coach Name], member stories) — fill before
  sending. The "PHYSICS" keyword should be confirmed as the live one.
- This environment can't run a headless browser, so no rendered screenshots — verified via
  HTTP-200 checks + JS syntax checks.

### Next steps
- Per `docs/automation-research.md`, the highest-value next build is a **revenue-leak** app
  rather than another content app — for Momentum that's **Reactivation/Win-Back**
  (at-risk-member re-engagement, matches their #1 churn pain), or the broadly applicable
  **Reputation Engine** (review requests + AI responses).
- Add the Momentum logo asset.
- When ready: port hosting to Vercel/Cloudflare to add per-business logins.
