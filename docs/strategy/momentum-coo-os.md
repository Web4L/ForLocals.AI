# Momentum Fitness — COO Operating System (Build Spec)
**Status:** Draft v1.2 · **Owner:** Duncan Fletcher (incoming COO)
**Last updated:** 2026-06-04
**Location in repo:** `docs/strategy/momentum-coo-os.md`
**Related docs:** `CLAUDE.md`, `docs/decisions.md`, `docs/progress.md`,
`docs/automation-research.md` ("10 Automatic Yes" brief),
`businesses/momentum-fitness/brand/`
---
## 0. Purpose & strategic frame
This spec defines the Momentum Fitness COO Operating System: a set of
automations, dashboards, and SOPs that run the gym's recurring operations with
minimal founder involvement while hitting its targets.
Two things are true at once; keep both front of mind:
1. **This is the Momentum COO job.** Deliver a gym that runs on documented
   systems instead of on Chase, hits its ~30% margin target, and plugs the leaks
   already identified in the CAC/attribution analysis: new-client retention
   ~75% vs repeat ~87.85%, blended CAC ~$301, lead-attribution gaps.
2. **This is also the ForLocals.AI live lab.** Every automation below maps to a
   Tier 1 app in the "10 Automatic Yes" research. Built and battle-tested on a
   real P&L, the working versions become the productized templates ForLocals.AI
   sells. Momentum is the flagship case study **and** the dev environment — not
   a paying customer.
**Core rule:** prove the pattern on real Momentum data before generalizing into
a reusable ForLocals.AI app.
---
## 1. Architecture mental model
Three layers. Keep them conceptually separate; never collapse the source of
truth into the engagement engine.
| Layer | System | Role | Owns |
|---|---|---|---|
| System of record | **MindBody** | The truth | Members, bookings, attendance, contracts, sales, payroll |
| Engagement engine | **GoHighLevel (GHL)** | The actions | SMS/email/calls, workflows, pipelines, reviews |
| Reasoning / COO brain | **Claude** (Claude Code / Cowork) | The judgment | Briefings, analysis, drafting, SOPs — with human approval |
**Flow:** MindBody *events* → GHL *triggers* → outbound *actions*; GHL *actions*
→ MindBody *records*; Claude reads from both and produces COO-grade output for
human approval.
```
 MindBody (record) ──webhook/event──▶  Bridge  ──▶ GHL (trigger → SMS/email)
        ▲                                              │
        │                                              ▼
   GHL action ◀── API write ──────── Bridge ◀── workflow/outbound webhook
        ▲
        │ read
     Claude (briefings, churn analysis, drafts, SOPs) ──▶ human approves ──▶ action
```
---
## 2. Integration layer
### 2.1 MindBody
- **API:** Public API v6 — read/write clients, schedules, sales, contracts,
  payroll/commissions, sign clients into services. Plus a **Webhooks API** for
  events (client created/updated/deactivated, booking new/updated/cancelled,
  contract changes, schedule changes).
- **Webhook gotcha (design around this):** events are **not stored** — the
  subscription must be active at the moment the event fires, or the event is
  lost. Always pair webhooks with a scheduled **API reconciliation sync** as a
  fallback so a dropped subscription never silently loses data.
- **MCP (optional convenience layer):** `vespo92/mindbody-mcp` — a **community**
  (not official) MCP server, ~50+ tools across class/client/sales/staff
  management, run via `bunx @vespo92/mindbody-mcp`. It is a wrapper over the same
  Public API and needs these env vars: `MINDBODY_API_KEY`, `MINDBODY_SITE_ID`,
  `MINDBODY_SOURCE_NAME`, `MINDBODY_SOURCE_PASSWORD`. **It does not bypass
  credentialing** — it sits on top of credentials we must still be granted.
- **Note:** MindBody now ships its own native **AI front desk**. Use it where it
  fits; do not rebuild what it already does.
### 2.2 GoHighLevel
- **API:** v2 (LeadConnector), ~413 operations + native workflows + **outbound
  webhooks** (push workflow data to any URL in real time). This is where comms
  automations actually run.
- **MCP options:**
  - *Official* server at `services.leadconnectorhq.com/mcp/` — **only partially
    working as of early 2026**: conversations, payments, and location endpoints
    are reliable; contacts/opportunities/calendar/etc. return 422 errors. **Do
    not make this the production automation path yet** (see logged decision §7).
  - *Community* server (e.g. `mastanley13/GoHighLevel-MCP`) — ~269+ tools
    (contacts, messaging, workflows, opportunities, payments). The fuller option
    for early phases, but community-maintained and grants full sub-account
    access via a Private Integrations token — scope and monitor accordingly.
### 2.3 The bridge (MindBody ↔ GHL)
No first-party native connector exists. **Recommended approach (optimized):**
- **Primary plumbing:** a third-party connector — **APIANT AppConnect** or
  **Appy Pie Automate** — for reliable bidirectional sync + deduplication.
- **Logic layer:** Claude Code + a **lightweight custom service** (Node.js/Bun on
  Railway or Fly.io) for intelligent routing, reconciliation, and advanced rules
  the connector can't express.
- **Fallback:** manual CSV/Sheet exports during the initial phases (see §3,
  Mini-Phase 0.5).
This combination is faster to production and more maintainable than a fully
custom bridge.
> **Threshold note:** the hosted logic service is standing backend
> infrastructure — the thing `CLAUDE.md` says to defer for the *static
> ForLocals.AI site*. That deferral still holds for the public site. The COO OS
> is the deliberate, logged exception: the revenue-leak automations genuinely
> require a backend, so we cross the line here **on purpose** (see §7), not by
> drift, and we keep it scoped to `integrations/` (see §6).
### 2.4 Security (non-negotiable)
- All tokens/keys live in **environment variables**, never committed to the repo
  (`.env` is git-ignored; ship a `.env.example` instead — see §6).
- Community MCPs run with **full account access** under our credentials — scope,
  monitor, and **rotate tokens** on a schedule.
- Test every write path against the **MindBody sandbox** before pointing at live
  data.
- Human-approve gate on anything that publishes publicly (see §5).
---
## 3. Phase 0 — Credentials checklist (GATING — do this first)
GHL is self-serve and instant; MindBody has approval lead time — **start the
MindBody request immediately** and let it run in the background.
### GoHighLevel (self-serve — can complete today)
| # | Step | Output | Status |
|---|---|---|---|
| 1 | Momentum sub-account → Settings → **Private Integrations** → create integration | Private Integrations **token** (NOT the legacy API key) | ☐ |
| 2 | Settings → Company / Business Profile | **Location ID** | ☐ |
| 3 | Store both in env vars | `GHL_API_KEY`, `GHL_LOCATION_ID` | ☐ |
### MindBody (approval lead time — START NOW)
| # | Step | Output | Status |
|---|---|---|---|
| 1 | Create developer account at developers.mindbodyonline.com | Dev portal access | ☐ |
| 2 | Build/test in the **sandbox** (no approval needed) | Working sandbox calls | ☐ |
| 3 | Request **"go live"**; email API support to enable OAuth; have Chase authorize API access for Momentum's **site** | Production activation | ☐ |
| 4 | Collect credentials | `MINDBODY_API_KEY`, `MINDBODY_SITE_ID`, `MINDBODY_SOURCE_NAME`, `MINDBODY_SOURCE_PASSWORD` | ☐ |
> **Advantage:** MindBody API access normally requires the business owner's
> authorization for the site — the usual blocker for outsiders. As COO with
> Chase's buy-in, we can authorize it directly.
### Mini-Phase 0.5 — unblock early wins while MindBody pends
| # | Step | Output | Status |
|---|---|---|---|
| 1 | Set up a secure **Google Sheet → JSON export** pipeline for manual MindBody data | JSON the dashboard can read | ☐ |
| 2 | Render it through the existing ForLocals.AI static dashboard (`businesses/momentum-fitness/`) | Immediate visibility, zero new infra | ☐ |
This reuses the repo's existing `marked.js`/JSON rendering, so Phases 1–2 can
ship on manual data the day the GHL token lands — no waiting on MindBody go-live.
**Phase 0 done when:** GHL token + Location ID verified; MindBody sandbox calls
succeeding and the go-live request submitted; Mini-Phase 0.5 pipeline live.
---
## 4. Phased automation rollout
Each phase lists goal, data, action, Claude's role, metric, and dependency.
Build in order — earlier phases de-risk later ones. Phases 1–2 run on
Mini-Phase 0.5 manual data while live MindBody access provisions.
### Phase 1 — COO Morning Briefing *(build first; read-only, low risk)*
- **Goal:** Replace manual report-pulling with a daily "what needs you today."
- **Data:** MindBody (yesterday's sign-ups, attendance, no-shows, cancellations,
  expiring contracts, sales) + GHL (new leads, stalled pipeline, unanswered
  conversations).
- **Action:** Claude synthesizes a one-page brief; **render it in the
  `businesses/momentum-fitness/` dashboard** so it's visible without leaving the
  existing homebase.
- **Claude's role:** Read both systems, summarize, flag exceptions.
- **Metric:** Founder time spent pulling numbers → ~0.
- **Dependency:** Starts on Mini-Phase 0.5 exports; upgrades to live API later.
### Phase 2 — Early-churn / attendance-drop detection → win-back *(highest $)*
- **Goal:** Attack Momentum's #1 pain — early-member churn (~50% quit in 6 mo).
- **Data:** MindBody attendance/visit frequency; flag members whose cadence
  drops below their baseline.
- **Action:** GHL personalized win-back (text-first) **+** a trainer alert for a
  human touch on high-value/at-risk members.
- **Claude's role:** Detect at-risk patterns; draft brand-context messages.
- **Metric:** 6-month retention; reactivated members.
- **Maps to:** Research app #4 (Reactivation/Win-Back).
### Phase 3 — New-client onboarding sequence
- **Goal:** Close the specific leak — new-client retention ~75% vs repeat ~87.85%.
- **Data:** MindBody "new client" event + first-30-days booking behavior.
- **Action:** GHL onboarding journey (welcome, first-week check-in, milestone
  nudges) + alert if no second booking within N days.
- **Metric:** New-client retention %.
### Phase 4 — Speed-to-lead + attribution
- **Goal:** Plug front-end acquisition; fix attribution so CAC stops being a
  blended guess.
- **Data:** Inbound leads (esp. **Physics 101**, ~43% of new clients) in GHL;
  conversion tracked into MindBody records.
- **Action:** Instant GHL text-back → qualify → book into MindBody; tag source.
- **Metric:** Speed-to-lead time; per-channel CAC; Physics 101 conversion.
- **Maps to:** Research app #1 (Speed-to-Lead / Missed-Call Text-Back).
### Phase 5 — Reputation engine + no-show / waitlist
- **Goal:** Compound local-search + conversion; recover perishable slots.
- **Data:** MindBody post-visit triggers; cancellations; waitlist.
- **Action:** GHL review requests (SMS); AI-drafted Google review responses
  **with human approve gate**; auto-backfill cancelled slots from waitlist.
- **Metric:** Review velocity/rating; no-show %.
- **Maps to:** Research apps #2 and #3.
### Phase 6 — Financial / margin cockpit
- **Goal:** Productize the manual CAC/attrition spreadsheet work.
- **Data:** MindBody sales + payroll/commissions + contracts.
- **Action:** Claude computes CAC, LTV, retention cohorts, margin vs 30% target,
  Physics 101 channel performance → weekly financial brief.
- **Metric:** Margin %; LTV:CAC.
- **Enhancement:** Pull key figures forward into the Phase 1 briefing using the
  existing CAC/attrition spreadsheets even before full API access.
### Ongoing — SOP / knowledge system *(the "productize" core)*
- **Goal:** Make the role transferable; reduce founder dependency; seed
  ForLocals.AI templates.
- **Action:** Claude drafts and maintains living SOPs, trainer playbooks,
  onboarding scripts, and prompt libraries in the repo.
- **Metric:** Automation Coverage % (see §5).
---
## 5. Guardrails & principles
1. **Text-first.** Voice AI is the most over-promised category (latency +
   hallucination unsolved). Ship SMS/text; treat voice as experimental only.
2. **Human-approve gate** on all AI-generated public content (reviews, posts) —
   3–18% hallucination rate. Fits the brand-context model.
3. **MindBody is the single source of truth.** GHL holds engagement state, not
   member truth.
4. **Daily reconciliation** between MindBody and GHL so they never diverge
   silently (pairs with the webhook fallback in §2.1).
5. **Sandbox → staging → live**, in small batches, for every write path.
6. **Secrets in env vars, never in the repo.**
7. **Don't rebuild MindBody's native AI front desk** — integrate around it.
8. **One automation proven before the next** — same discipline as ForLocals.AI's
   "one business done well."
9. **Track "Automation Coverage %"** in `docs/progress.md` (share of recurring
   COO ops covered by a documented, runnable automation/SOP).
---
## 6. Repo structure additions
- Create `docs/strategy/` and place this file at `docs/strategy/momentum-coo-os.md`.
- New top-level **`integrations/`** folder: bridge scripts, reconciliation logic,
  and a committed **`.env.example`** (real `.env` stays git-ignored).
- In each Momentum app folder (`businesses/momentum-fitness/apps/<slug>/`):
  - add **`integration-hooks.md`** documenting that app's MindBody/GHL touchpoints;
  - update `prompts/` with integration-aware templates.
- Keep all of this off `main` until tested — `main` is the live GitHub Pages
  branch (per `CLAUDE.md`); work on the existing working branch and only the
  static, public-safe pieces ever deploy.
---
## 7. Decisions to record in `docs/decisions.md`
- MindBody = system of record; GoHighLevel = engagement engine; Claude = COO
  reasoning layer. *(Settled)*
- v1 is **text-first**; no voice AI. *(Settled)*
- Community MCPs (`vespo92/mindbody-mcp`, GHL community server) accepted as the
  convenience layer, with **sandbox-first testing** and env-var secrets. *(Settled)*
- Official GHL MCP is **not** the production path until its 422 issues resolve.
  *(Settled — revisit if/when fixed)*
- Bridge = **third-party connector + Claude Code hybrid** (not a fully custom
  bridge). *(Decided 2026-06-04)*
- The COO OS **deliberately crosses the backend threshold** that the static
  ForLocals.AI site still defers, scoped to `integrations/`. *(Decided 2026-06-04)*
- Momentum is treated as flagship case study + dev lab for ForLocals.AI, not a
  paying customer. *(Settled)*
---
## 8. Immediate next actions (2026-06-04)
1. **Today:** Pull the GHL Private Integrations token + Location ID (self-serve).
2. **Today:** Submit the MindBody developer-account + go-live request so the
   approval clock starts; have Chase ready to authorize the site.
3. **This week:** Stand up Mini-Phase 0.5 (Sheet → JSON) and **Phase 1 (Morning
   Briefing)** rendered in the existing dashboard — immediate founder-dependency
   win, proves the data pipes.
4. **This week:** Create this file in the repo and update `docs/progress.md`.
5. **Next:** Trial APIANT / Appy Pie for the bridge; scope **Phase 2 (churn
   detection)** against the MindBody sandbox while live access provisions.
---
## Version history
- **v1.0** — Original draft (architecture, phases, credential checklist).
- **v1.1** — Grok revision: bridge optimization, Mini-Phase 0.5, dashboard
  integration, repo-structure additions.
- **v1.2** — Merge: restored the GHL 422 caveat, MindBody webhook-not-stored
  fallback, MCP env vars, guardrail rationale, and Phase 0 tracking tables;
  kept v1.1's Mini-Phase 0.5, `integrations/` structure, decisive bridge, and
  dashboard rendering; added explicit backend-threshold decision.
*This spec will evolve as phases ship. Don't re-litigate settled decisions —
update §7 and the version history when something genuinely changes.*
