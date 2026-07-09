# integrations/

Backend plumbing for the **Momentum COO Operating System** — the bridge between
**MindBody** (system of record) and **GoHighLevel** (engagement engine), plus the
reconciliation and routing logic Claude reasons over.

> **Why this folder exists at all.** `CLAUDE.md` defers standing backend
> infrastructure for the *static, public ForLocals.AI site*. That deferral still
> holds for the site. This folder is the **deliberate, logged exception**: the
> revenue-leak automations genuinely require a backend, so we cross the line here
> on purpose, scoped to `integrations/`, and nothing here deploys to GitHub Pages.
> See `docs/strategy/momentum-coo-os.md` §2.3 / §6 and the decisions log
> (2026-06-04).

## What lives here (as it gets built)
- **Bridge** — third-party connector (APIANT AppConnect / Appy Pie Automate) for
  bidirectional MindBody ↔ GHL sync + dedup, plus a lightweight custom logic
  service (Node.js/Bun on Railway/Fly.io) for routing and rules the connector
  can't express.
- **Reconciliation** — scheduled API sync that backstops MindBody webhooks
  (webhook events are *not stored*; a dropped subscription silently loses data —
  the daily reconcile is the safety net). See spec §2.1 / §5.4.
- **Adapters** — thin MindBody / GHL API wrappers (or community-MCP config).

It's a scaffold today: only `.env.example` and this README. Logic lands phase by
phase per the spec — sandbox-first, one automation proven before the next.

## Secrets
All credentials live in **environment variables**, never in the repo. Copy
`.env.example` → `.env` (git-ignored) and fill it. Rotate community-MCP tokens on
a schedule — they grant full account access. Test every write path against the
**MindBody sandbox** before pointing at live data.

## Status
**Phase 0 (scaffold).** Folder + `.env.example` committed. Credentials, bridge
trial, and Phase 1 (Morning Briefing) are tracked in
`docs/strategy/momentum-coo-os.md` §3 / §8 and `docs/progress.md`.
