# Decisions Log

Running log of product, architecture, and strategic decisions. Newest at top.
Re-read this before re-opening a settled question.

## 2026-06-03

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

- **Working branch:** `claude/sharp-lovelace-ddbLb`. `main` is the live Pages branch —
  push to `main` only on explicit say-so (it deploys the site).
