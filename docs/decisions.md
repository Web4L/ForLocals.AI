# Decisions Log

Running log of product, architecture, and strategic decisions. Newest at top.
Re-read this before re-opening a settled question.

## 2026-06-08

### Go-to-market / monetization (first GTM decisions)

Full playbook: `docs/strategy/go-to-market.md`. ForLocals.AI had a product thesis
but no GTM; these are the first customer-acquisition + pricing calls.

- **Lead with the lowest-friction hook, not the highest-value app.** Get in the
  door with something we can deliver **free before the prospect says yes**, that
  needs **no system access and no customer data**, then **expand** each account
  into the revenue-leak apps once trust exists. *(Decided)*
- **Lead offer = free week of on-brand social posts → $99/mo flat, cancel
  anytime.** Content is honestly a *soft* sell (weak ROI attribution), so it's
  positioned as the **door-opener**, never oversold as a revenue driver. $99 is a
  deliberate **hook price** — the goal is the relationship + logo + expansion, not
  social profit. *(Decided)*
- **Texting offers are deferred, not abandoned.** Reactivation / missed-call
  text-back is high-$ but starts with SMS → **A2P 10DLC registration + TCPA
  consent + handing over the customer database** = wrong thing to put in front of
  a stranger you're closing this week. Texting becomes an **expansion offer** for
  accounts that already trust us. *(Decided 2026-06-08, supersedes the 2026-06-03
  "reactivation = next build" guidance as the* first *paid motion — reactivation
  is still the eventual expansion, just not the cold entry.)*
- **Channel = cold outreach, gift-first ("deliver before yes").** Send finished
  work, not a pitch; never lead with "AI." *(Decided)*
- **Demo artifact is tiered:** finished posts cold (fast, the "this week" engine);
  a hosted dashboard preview (reusing the shared renderer) only for warm
  prospects who reply. *(Decided)*
- **Pricing wedge = transparent, published, AI-native** vs. quote-gated
  incumbents ($300–500/mo): start at $99, expand visibly toward the bundle band.
  *(Decided)*
- **Target = broad local service / brick-and-mortar** (~$500K–$2M) for the hook —
  no vertical gating, since the sample works from any public footprint. *(Decided)*

> **⚠ Open divergence (2026-06-08):** the public marketing site below leads with the **AI-COO /
> revenue** angle, which pulls against the hook-first GTM above (lead with the $99 free-social hook;
> defer revenue / texting to expansion). Both were decided the same day in parallel sessions. The
> user chose to **deploy the site as-is and reconcile the two afterward** — treat neither as
> overriding the other until reconciled.

### Public marketing website — positioning + structure (settled, pending reconciliation)

Built the first public, prospect-facing site (separate from the internal homebase).
Five positioning forks were decided in-session and should not be re-litigated:

- **Angle / hero = "AI COO that runs your business on autopilot."** Operator-relief
  framing leads; the old "library of content automations" bandwidth pitch does NOT
  headline the public site. *(Settled)*
- **ICP = founder-dependent owner-operators, vertical-agnostic.** Rejected both
  gym-only and the broad "$500K–2M / 8 verticals" framings for the site's voice.
  *(Settled)*
- **Business model = a ladder:** free *Revenue Leak Audit* (tripwire) → revenue-leak
  **bundle** ($/mo) → premium **done-with-you AI COO** tier. *(Settled)*
- **Lead capture = no-backend form** (Formspree/Tally), keeping the site static. Each
  form carries a hidden `interest` field (`coo`/`social`/`revenue`) to tag the play.
  *(Settled — revisit if/when we add a backend.)*
- **ForLocals.AI gets its own brand** (only businesses had one before): premium
  minimal / editorial — *Fraunces* serif + *Inter*, deep-evergreen accent — defined as
  CSS tokens in `site/marketing.css`. The dark "operator console" dashboard theme is
  unchanged and separate. *(Settled; accent/serif retunable.)*
- **Momentum = the proof case, not the product.** Public pages cite it as "we run this
  ourselves," consistent with the flagship-lab decision. Content (social) is the
  always-on hook, not the lead. *(Settled)*

### Site structure / hosting

- **Marketing site is the new front door; the homebase moved down.** New root
  `index.html` = marketing home; the old homebase was **renamed at root** to
  `homebase.html` (not nested) so its relative data-paths stay intact. Clean
  `/social` + `/revenue` URLs come from folder `index.html` files — no router/build,
  staying inside the static-stack rule. *(Decided)*
- **Custom domain = `forlocals.ai` via apex on GitHub Pages.** DNS at Namecheap
  (4 A records → GitHub Pages, 4 AAAA for IPv6, `www` CNAME → `web4l.github.io`);
  Pages custom-domain set; root `CNAME` committed. Consequence: marketing pages use
  **root-relative paths**, which are correct on the apex root but **break on the old
  `web4l.github.io/ForLocals.AI/` project URL** — so preview on the apex domain only.
  `CNAME` is read only on `main`, so the domain goes live on deploy to `main`.
  *(Decided)*

## 2026-06-04

### Momentum COO Operating System (build spec landed)

Full spec: `docs/strategy/momentum-coo-os.md`. Decisions ratified from its §7:

- **Three-layer architecture.** **MindBody** = system of record (member truth);
  **GoHighLevel** = engagement engine (SMS/email/workflows); **Claude** = COO
  reasoning layer (briefings, analysis, drafts, SOPs) — all behind a human-approve
  gate. Never collapse the source of truth into the engagement engine. *(Settled)*
- **v1 is text-first; no voice AI.** Voice is the most over-promised category
  (latency + hallucination unsolved); ship SMS/text, treat voice as experimental
  only. *(Settled)*
- **Community MCPs are the convenience layer.** `vespo92/mindbody-mcp` and a GHL
  community server are accepted for early phases, with **sandbox-first testing**
  and **env-var-only secrets**. They grant full account access — scope, monitor,
  rotate. *(Settled)*
- **Official GHL MCP is NOT the production path** until its 422 errors
  (contacts/opportunities/calendar) resolve. *(Settled — revisit if/when fixed)*
- **Bridge = third-party connector + Claude Code hybrid**, not a fully custom
  bridge: APIANT AppConnect / Appy Pie Automate for bidirectional sync + dedup,
  plus a lightweight custom logic service for routing/reconciliation. *(Decided)*
- **The COO OS deliberately crosses the backend threshold** that the static
  ForLocals.AI site still defers — scoped to `integrations/`, nothing there
  deploys to GitHub Pages. This is the logged exception, not drift; the static
  public site stays backend-free. *(Decided)*
- **Momentum = flagship case study + dev lab**, not a paying customer. Prove each
  pattern on real Momentum data before generalizing into a ForLocals.AI app.
  *(Settled)*

### Platform / tooling

- **Session branches must sync with `main` at start.** A session opened on a `claude/*`
  branch that was cut from a stale commit, so it lacked the newsletter app already live on
  `main` and the opening briefing reported wrong state. Fix: `/new-session` now fetches
  `origin/main` and reports how far the working branch diverges from it; if the branch is
  behind `main`, rebase onto `origin/main` before doing new work.
- **`/new-session` reads its context from `origin/main`, not the local tree.** The fix
  above still wasn't enough: it reported divergence but *loaded* the canonical docs with
  `@CLAUDE.md`/`@docs/progress.md` from the local checkout, so a stale branch still briefed
  off stale docs and again missed the newsletter app. Stronger rule: `/new-session` now
  fetches first, then reads `CLAUDE.md`, `CONVENTIONS.md`, `docs/decisions.md`,
  `docs/progress.md` **from `origin/main`** (via `git show origin/main:…`), and verifies
  the real built state by dumping each `businesses/*/business.json` and listing actual
  `apps/` folders straight from the `main` tree. The briefing is now grounded in live data,
  so a stale checkout can no longer change what it sees. (GolfProAI's `/new-session` was the
  intended model but is unreachable from this repo's session scope, so the pattern was
  rebuilt natively.)
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
