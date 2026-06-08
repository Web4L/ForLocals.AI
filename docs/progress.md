# Progress Log

Running log of what's been built. Newest at top.

## 2026-06-08

### Built
- **First real prospect — BL918AUTO (Tulsa) warm-tier dashboard preview.** Ran the
  GTM kit end-to-end on a live prospect: **BL918AUTO** (= B&L Muffler & Brake, a
  family-owned Tulsa exhaust/muffler/brake shop, est. 1994, mid re-brand).
  Researched their real public footprint (4.5★/150+ reviews; honest/fast/fair;
  custom-exhaust specialty) and generated a free week of on-brand posts, then built
  the **hosted dashboard preview** per `docs/strategy/outreach/warm-dashboard-howto.md`.
  - **New (unlisted) business** `businesses/bl918auto/` — slug-agnostic landing
    page + `business.json` + `brand/` (brand.json, voice.md). Shells copied
    **byte-identical** from the templates (verified via `diff`).
  - **Social-media dashboard instance** `businesses/bl918auto/apps/social-media/`
    (shared renderer + `manifest.json`). Content: a **June 20 Re-Brand Open House
    campaign** (7-post countdown to drive foot traffic — free BBQ + giveaways,
    11am–2pm Sat Jun 20, per their Facebook), an always-on **sample weekly**
    (7 posts), plus an overview. **Deliberately withheld the prompt library /
    Master Context Block** from the client-facing preview — handing over the
    generation system would remove the reason to pay for the $99/mo service.
  - **Deliberately NOT added to the root `BUSINESSES` array** — it's an unlisted
    sales preview, not a launched client (per the warm-preview playbook).
  - **Placeholders flagged:** accent color (`#e23b2e`) + logo are stand-ins
    pending B&L's real re-brand art; giveaway specifics to confirm before posting.
    No invented prices/promos/stats.
  - Verified: all JSON valid; both shells byte-identical; every
    manifest-referenced file + theme + shared renderer serve **HTTP-200**.
- **Go-to-market playbook + cold-outreach kit (first GTM, no code/site change).**
  ForLocals.AI had a product thesis but no plan to get paying customers; this is
  that plan. All Markdown under `docs/strategy/` — nothing touches the live Pages
  render.
  - **`docs/strategy/go-to-market.md`** — the active GTM: thesis (lead with the
    lowest-friction hook, expand into revenue-leak apps), why-not-texting-first
    (A2P/TCPA/list-trust), the **lead offer (free social week → $99/mo flat)**,
    target (broad local service), cold-outreach close, the pricing/expansion
    ladder + transparent-vs-quote-gated wedge, and a **first-week sprint** to land
    customer #1.
  - **`docs/strategy/outreach/`** — the kit you actually run:
    `cold-outreach-templates.md` (DM/email/follow-up, gift-first, no "AI"),
    `prospect-sample-prompt.md` (a **rapid brand-inference** prompt that turns a
    prospect's *public* info into a free week of posts — reuses the social
    Master Context Block pattern), and `warm-dashboard-howto.md` (spin a hosted
    preview for warm replies by copying `apps/social-media/template/` — no new
    code).
  - **Decisions logged** in `docs/decisions.md` (2026-06-08): hook-first GTM,
    free-social → $99/mo, texting deferred, cold/gift-first, tiered artifact,
    transparent-pricing wedge, broad-local-service target.
  - **Why social, not the higher-$ apps:** it's the lowest-trust/lowest-friction
    cold offer AND the most-built thing in the repo (`apps/social-media/` +
    shared renderer), so the play is *assembly, not new product* — fastest path
    to a customer this week.

### Known gaps / issues (as of 2026-06-08)
- **No customer landed yet** — the kit exists; the next action is running it on
  real prospects.
- **Posting on a client's behalf** (vs. them pasting) still needs a social-account
  access handoff — define once a paying client wants it.
- **Reactivation/texting** (the highest-$ play) remains **deferred** behind A2P +
  consent + trust; it's an expansion offer, not the entry.
- Content is a **soft-ROI** offer — keep it positioned as the hook, expand into
  Review Responses (next no-texting app to productize) for the revenue story.

### Next steps
- **▶ START HERE:** name one real local-business prospect and generate their free
  sample week with `docs/strategy/outreach/prospect-sample-prompt.md`, then send
  it cold — that's the "land a customer this week" action.
- After the first conversion: productize **AI Review Responses** as expansion
  offer #2 (also no-texting / public-data).
- COO Morning Briefing → real data (the pre-existing Phase 1 next step) remains
  open whenever the focus shifts back to Momentum ops.

## 2026-06-04

### Built
- **COO OS Phase 1 — Morning Briefing scaffolded (app + Momentum instance).**
  Built the read-only, low-risk first automation of the COO OS, rendering in the
  existing dashboard with **zero new infra** (no backend on the public site).
  - **New reusable app** `apps/coo-briefing/` (`app.json` status `ready`,
    `README.md`, `prompts/morning-briefing-prompt.md`, `src/`). Added to the root
    `APP_CATALOG` so it shows in the homebase catalog.
  - **Momentum instance** `businesses/momentum-fitness/apps/coo-briefing/` using
    the shared renderer (shell **byte-identical** to the canonical one) +
    `manifest.json`. Content: `README.md`, `sop.md` (daily run), a one-page
    `briefing-template.md`, `briefings/latest.md` (a **sample** brief rendered
    from sample data, clearly labelled), `tools/prompt-library.md`, and
    `integration-hooks.md`.
  - **Data contract** — `data/SCHEMA.md` documents the fixed Sheet→JSON / API
    shape (MindBody: sign-ups, attendance, no-shows, cancellations, expiring
    contracts, sales; GHL: new leads, stalled pipeline, unanswered conversations)
    so the prompt never changes when the source upgrades. `data/briefing-sample.json`
    is the reference sample the dashboard renders today.
  - **Wired in** `business.json` (`coo-briefing` first in `enabledApps` +
    `appConfig`), so it leads Momentum's landing page.
  - Verified: all JSON valid, root + landing inline JS pass `node --check`, shell
    byte-identical to canonical, **every manifest-referenced file + the data file
    HTTP-200** (local server).
  - **Automation Coverage:** still 0% — sample data only; counts once the
    Mini-Phase 0.5 export feeds it real numbers. **Not done:** the Sheet→JSON
    export itself, GHL token / MindBody go-live (Phase 0), optional `src/` build.

- **Momentum COO Operating System — spec + repo scaffold landed.** Landed the
  COO OS build spec (v1.2) at `docs/strategy/momentum-coo-os.md` (new
  `docs/strategy/` folder): three-layer architecture (MindBody = record, GHL =
  engagement, Claude = COO brain), a 6-phase + Mini-Phase 0.5 rollout, Phase 0
  credentials checklist, guardrails, and §7 decisions. Then scaffolded the
  structure the spec defines (no backend logic yet, public-safe):
  - **New top-level `integrations/`** with a `README.md` (explains the deliberate
    backend exception) and a committed **`.env.example`** (GHL + MindBody +
    sandbox toggle, no real secrets).
  - **Root `.gitignore`** added — ignores `.env`/secrets (the repo had none).
  - **`integration-hooks.md`** in both built Momentum apps
    (`apps/social-media/`, `apps/newsletter/`) documenting their MindBody/GHL
    touchpoints and which COO-OS phase each maps to. Marked "planned — not wired."
  - **Decisions logged** — §7 ratified into `docs/decisions.md` (three-layer
    architecture, text-first, community MCPs sandbox-first, official GHL MCP not
    prod yet, hybrid bridge, deliberate backend-threshold exception scoped to
    `integrations/`, Momentum as flagship lab).
  - **Automation Coverage %:** 0% — nothing automated/runnable yet; this is the
    spec + scaffold groundwork. Tracking metric per spec §5.9.
  - **Not done (human/out-of-band):** GHL token + MindBody go-live request, the
    Sheet→JSON pipeline, Phase 1 Morning Briefing dashboard, bridge trial. The
    `integrations/` logic service is a future backend (off the static site).

- **`/new-session` now reads context from `origin/main` (tooling).** It recurred: this
  session opened on `claude/compassionate-ritchie-F6WLt`, again cut from a stale commit, and
  the opening briefing again reported the newsletter app "not built." Root cause: the prior
  sync guard reported branch divergence but still *loaded* its docs from the local checkout
  (`@CLAUDE.md`/`@docs/progress.md`), so a stale branch still briefed off stale files.
  Fast-forwarded onto `origin/main`, then hardened `/new-session` so it can't happen again:
  - **Step 0 fetches `origin/main` first**, before reading anything.
  - **Steps 1–2 read all canonical context FROM `origin/main`** (`git show origin/main:…`
    for `CLAUDE.md`/`CONVENTIONS.md`/`decisions.md`/`progress.md`) and **verify the real
    built state from the `main` tree** — dumping each `businesses/*/business.json` and
    listing actual `apps/` folders — so "what's built" comes from live data, not prose.
  - Added `git show:*` / `git ls-tree:*` to the command's allowed-tools.
  - Note: GolfProAI's `/new-session` was the intended model but its repo is out of this
    session's scope (`web4l/forlocals.ai` only) and can't be read, so the pattern was
    rebuilt natively. Logged in `docs/decisions.md` (2026-06-04).

- **Session-start sync guard + branch-name de-hardcoding (tooling).** This session opened on
  `claude/eloquent-euler-wUnfa`, a branch cut from a stale commit that lacked the newsletter
  app already live on `main` — so the opening briefing reported wrong state. Rebased the
  branch onto `origin/main` (clean fast-forward) to recover the missing work, then fixed the
  root cause two ways:
  - **A — `/new-session` now syncs with `main`.** Added `git fetch:*`/`git rev-list:*` to the
    command's allowed-tools; new step 2 fetches `origin/main` and prints divergence both ways;
    step 3 ("Branch sync") flags when the branch is behind `main`, treats `progress.md` as
    possibly stale, and offers to rebase before any new work.
  - **B — stopped hardcoding the per-session branch name.** `CLAUDE.md`, `docs/decisions.md`,
    and the `/new-session` command now derive the `claude/*` branch from `git status` instead
    of pinning a literal name that drifts every session. Both decisions logged in
    `docs/decisions.md` (2026-06-04).

### Known gaps / issues (as of 2026-06-04)
- **COO Morning Briefing runs on SAMPLE data** — `briefings/latest.md` and
  `data/briefing-sample.json` are illustrative, not real Momentum numbers.
  Nothing is operational until a real daily export feeds the contract.
- **Automation Coverage % = 0** — nothing in the COO OS runs on live data yet.
- Phase 0 credentials are **not pulled** (GHL token + Location ID) and MindBody
  go-live is **not requested** — both are human/out-of-band steps.
- `integrations/` is a **scaffold only** (README + `.env.example`); no bridge,
  reconciliation, or adapters built.
- Site is still **fully public** — no auth (deferred). Sample data only, no PII.

### Next steps
- **▶ START HERE NEXT SESSION (user request, 2026-06-04):** Duncan wants a
  walkthrough of **how to actually use the COO Morning Briefing and get it
  operational ASAP.** Open the next session by explaining, in plain English:
  (1) how to produce a real daily export in the `data/SCHEMA.md` shape — the
  fastest path is the **Mini-Phase 0.5 Google Sheet → JSON**, no MindBody go-live
  needed; (2) how to run the prompt in `tools/prompt-library.md` to generate the
  brief; (3) how to publish it to `briefings/latest.md`. Then help him do the
  first real one. Treat "get it operational ASAP" as the priority over building
  Phase 2.
- After Phase 1 is live on real data: **Phase 2 (early-churn detection →
  win-back)** — the highest-$ revenue-leak automation, matches Momentum's #1 pain.
- Pull GHL token + Location ID; submit the MindBody go-live request (Phase 0, §3
  of the spec) so the live data path can replace the manual Sheet export.
- Add the Momentum logo asset (`brand/assets/momentum-logo.png`).
- When ready: port hosting to Vercel/Cloudflare for per-business logins.

## 2026-06-03

### Built
- **Shared app-dashboard renderer (platform refactor).** Extracted the duplicated ~370-line
  per-app dashboard into one self-theming renderer in the reserved `/dashboard/` folder:
  `app-dashboard.css` (dark theme; accent + fonts are CSS vars), `app-dashboard.js` (reads
  `brand.json` for theme + `manifest.json` for content; renders topbar/logo, hero, stats, nav,
  markdown, scroll-spy, mobile menu), and a canonical thin `index.html` shell. Each business
  app dashboard is now `shell + manifest.json` — Momentum's **social-media** and **newsletter**
  both migrated (index.html went from ~370 lines → 28; no content/look change). Added copy-me
  `apps/<slug>/template/` scaffolds for both apps so onboarding a dashboard is a folder copy +
  manifest edit. brand.json gained an optional `logo` field. Docs updated (`dashboard/README`,
  `CONVENTIONS`, `_template/README`, `CLAUDE.md`). Verified: `node --check`, 11/11 theming
  unit tests, JSON valid, every manifest-referenced file HTTP-200, homebase + landing pages
  untouched. **Visual fidelity not screenshot-verifiable here — confirm on live Pages.**
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
