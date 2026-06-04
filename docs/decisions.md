# Decisions Log

Running log of product, architecture, and strategic decisions. Newest at top.
Re-read this before re-opening a settled question.

## 2026-06-04

- **Session branches must sync with `main` at start.** A session opened on a `claude/*`
  branch that was cut from a stale commit, so it lacked the newsletter app already live on
  `main` and the opening briefing reported wrong state. Fix: `/new-session` now fetches
  `origin/main` and reports how far the working branch diverges from it; if the branch is
  behind `main`, rebase onto `origin/main` before doing new work.
- **Don't hardcode the working-branch name.** The per-session `claude/*` branch name kept
  drifting across `CLAUDE.md`, `docs/decisions.md`, and the `/new-session` command, so the
  docs were perpetually stale. The branch is now derived from `git status` rather than
  pinned to a literal name anywhere.

## 2026-06-03

- **Shared app-dashboard renderer (architecture).** Per-app dashboards are no longer
  standalone HTML — each is a thin `index.html` shell + a per-instance `manifest.json` that
  load one shared, self-theming renderer in `/dashboard/` (`app-dashboard.css` +
  `app-dashboard.js`). The renderer themes from the business's `brand.json` (accent, fonts,
  name, awards, logo) and reads content/nav from `manifest.json`. Rationale: the app
  dashboards were ~95% identical; this kills the duplication and makes a new dashboard
  *config + content, not copied code*. Each app ships a copy-me `template/` scaffold, so
  onboarding a dashboard is a folder copy + manifest edit.

- **Dashboard theming = shared dark theme + per-brand accent.** The dashboard UI (grays,
  shadows, spacing) is a fixed universal "operator console" look; only the accent color and
  fonts are themed per business from `brand.json`. We deliberately did NOT make every gray
  brand-configurable — a business sets an accent, not a full palette. Revisit if a client
  needs a light theme.

- **App prioritization is "revenue-leak first" (guidance).** Per the 5-angle research in
  `docs/automation-research.md`, the highest-value next builds are revenue-leak automations
  (speed-to-lead / missed-call, reputation engine, no-show reduction, reactivation) over
  bandwidth/content apps. Content apps (social, newsletter) stay the low-friction "always-on"
  hook, not the lead pitch. We built newsletter + generalized the dashboard pattern first to
  harden the platform; the next *new* app should be a revenue-leak one.

- **Pivot:** Dropped the single-purpose "5-Day Lead Flood" plumber-sprint product.
  ForLocals.AI is now a library of reusable automations ("apps") for local businesses,
  each run against per-business brand context, surfaced on a homebase dashboard.

- **Architecture — two separate axes.** `apps/` = business-agnostic automations (code/
  prompts). `businesses/` = per-client context + outputs. We rejected nesting businesses
  inside app folders because it would duplicate brand context and scatter each client.

- **Brand context is the single source of truth.** Defined once per business in
  `businesses/<slug>/brand/`; every app reads from it; never duplicated into app folders.

- **10 starter apps:** social-media, newsletter, blog-seo, review-responder,
  review-requests, ad-copy, lead-followup, gbp-posts, support-faq, proposals. Easy to
  add/remove since each is a self-contained folder.

- **First business: Momentum Fitness** (Pantego, TX). Onboarded from the existing
  `Web4L/momentum-fitness-social` repo; it's the reference implementation.

- **Stay static on GitHub Pages for now.** Vanilla HTML/JS + JSON/markdown, no framework
  or backend. Served from `main`; `.nojekyll` added.

- **Per-business URLs are path-based** (`…/businesses/<slug>/`) via a slug-agnostic
  landing-page `index.html`. Subdomains (`momentum.forlocals.ai`) are deferred.

- **Auth deferred.** Desired model is **both** — owner/team see all businesses; each client
  scoped to only their own dashboard. To be implemented later via Vercel + Clerk
  (middleware, per-path) or Cloudflare Pages + Access (no-code, per-path/subdomain). Until
  then the site is fully public.

- **Working branch:** whatever `claude/*` branch the current session is on (the name is
  assigned per session, so don't hardcode it — read it from `git status`). `main` is the
  live Pages branch — push to `main` only on explicit say-so (it deploys the site).
