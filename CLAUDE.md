# ForLocals.AI — AI-Native Automation Platform for Local Businesses

## What this project is
ForLocals.AI is a library of high-value **automations ("apps") for local
business owners** — social media content, newsletters, SEO blogs, review
handling, and more — each run against that business's own **brand context**
(tone, voice, colors, offers). Every business gets a single **homebase
dashboard** that surfaces all of its enabled apps in one place.

It is currently a **static site hosted on GitHub Pages** — vanilla HTML/JS that
renders Markdown + JSON straight from the repo. No backend, no framework, no
build step (yet). First and reference business: **Momentum Fitness** (Pantego, TX).

This is NOT the old "5-Day Lead Flood" plumber-sprint idea — we pivoted away
from that. Don't resurrect it.

## Non-negotiable product principles
1. **Brand context is the single source of truth.** A business's tone, colors,
   voice, and offers are defined **once** in `businesses/<slug>/brand/` and read
   by every app. Never duplicate brand details into app folders.
2. **Apps are code; businesses are data.** `apps/` holds business-agnostic,
   reusable automations. `businesses/` holds per-client context and outputs.
   Keep these two axes separate — never nest one business's context inside an app.
3. **Every business is a self-contained homebase** with its own URL
   (`…/businesses/<slug>/`). Adding a business is a folder copy, not a code change.
4. **Stay simple and static until complexity is truly required.** Vanilla HTML +
   JS + `marked.js`, JSON config, Markdown content. Do not introduce a framework,
   bundler, or backend until a real need (e.g. logins) forces it.
5. **One business done well before scaling.** Momentum Fitness is the reference
   implementation; prove patterns there before generalizing.
6. **Apps are mix-friendly.** An app can be prompt-only, code, or both — each app
   folder supports both paths from day one (`prompts/` and `src/`).

## Tech stack
**Current (locked for now):**
- Static site: vanilla HTML + vanilla JS, `marked.js` (CDN) for Markdown rendering
- Content/config: Markdown + JSON (`business.json`, `brand.json`, `app.json`)
- Hosting: GitHub Pages, served from `main`, with a root `.nojekyll`

**Planned / deferred (not built yet — do not add without a decision):**
- Per-business **logins**: Vercel + Clerk (middleware, per-path scoping) **or**
  Cloudflare Pages + Access (no-code, per-path/subdomain email policies)
- Possibly Next.js if real auth/app behavior is needed
- Per-business **subdomains** (e.g. `momentum.forlocals.ai`) — needs the host move above

## Architecture & how-to
The repo has two independent dimensions:
- `apps/<slug>/` — a reusable automation: `README.md`, `app.json`, `prompts/`, `src/`
- `businesses/<slug>/` — one client's homebase: `index.html` (its landing page),
  `business.json` (manifest), `brand/` (single source of truth), `apps/<slug>/`
  (that business's config + generated content)
- `/index.html` — root homebase listing all businesses + the app catalog
- `dashboard/` — reserved for future shared dashboard code

Two manual registries in `/index.html`: the `BUSINESSES` array and the
`APP_CATALOG` array. Everything else is read from the JSON files.

**Full conventions — read before adding an app or onboarding a business:**
`CONVENTIONS.md`.

## What we're building first
1. Flesh out more apps for Momentum (e.g. newsletter, review handling) using the
   social-media app as the pattern.
2. Make onboarding a 2nd business clean (copy `businesses/_template`, fill brand,
   add slug to `BUSINESSES`).
3. The Momentum logo asset (`businesses/momentum-fitness/brand/assets/momentum-logo.png`).

## What we're explicitly NOT building (right now)
- Any backend / server / database
- Authentication or private access (deferred — site is currently fully public)
- A frontend framework, bundler, or build pipeline
- The abandoned "5-Day Lead Flood" plumber product
- Custom domains / subdomains (until we move hosting)

## Deferred decisions (don't re-litigate; revisit when we move hosts)
- **Logins:** access model is **both** — you/your team see all businesses; each
  client is scoped to only their own dashboard. Implement on Vercel+Clerk or
  Cloudflare Access. **Until then, treat the whole site as public.**
- **Subdomains:** `momentum.forlocals.ai`-style URLs wait for the host move.

## How to work with me
- Give me finished work with plain-English explanations.
- Make decisions yourself unless they're genuine business choices.
- 1–3 steps at a time, not a firehose.
- When in doubt, re-read `docs/decisions.md` — don't re-litigate settled calls.
- **Previews / screenshots:** this environment can't run a headless browser
  (network-restricted), so I can't screenshot the rendered site here. To verify I
  use HTTP-200 checks (`python3 -m http.server`) + `node --check` on inline JS.
  When you want to *see* something rendered, the reliable path is the live GitHub
  Pages URL, or I commit an asset and share a GitHub blob URL under
  `Web4L/ForLocals.AI` (inline images don't render reliably in the client).

## Session hygiene
At the end of every session, before closing, run this checklist:
1. `git status` — show what changed.
2. Update `docs/progress.md` (what was built, known issues, next step).
3. Update `docs/decisions.md` if new decisions were made (show diffs before
   writing, wait for approval).
4. `git status` again — confirm all intended changes are staged.
5. Commit with format: `[feature] brief summary`.
6. Push to the working branch `claude/sharp-lovelace-ddbLb`. Push to `main` only
   when I explicitly say so — **`main` is the live GitHub Pages branch, so pushing
   to it deploys the site.**
7. Show the commit hash to confirm.

Never skip steps. Never commit without showing diffs first.
