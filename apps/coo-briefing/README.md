# COO Morning Briefing

**Category:** Operations · **Status:** ready (Phase 1 of the COO Operating System)

A daily one-page brief that replaces manual report-pulling. It reads the
business's operational data — **MindBody** (system of record) and
**GoHighLevel** (engagement engine) — and produces a "what needs you today"
summary with exceptions flagged, rendered straight into the business's
dashboard.

This is **Phase 1** of the Momentum COO Operating System
(`docs/strategy/momentum-coo-os.md`) — built first because it's read-only and
low-risk, and it proves the data pipes before any write automation ships.

## How it works (the data flow)
1. **Input — a daily data export** in a fixed JSON shape (the *briefing
   contract*). During Mini-Phase 0.5 this is a manual **Google Sheet → JSON**
   export; once credentials land it's the same shape produced from the MindBody
   + GHL APIs. The contract is documented per-instance in `data/SCHEMA.md`.
2. **Reasoning — Claude** reads that JSON plus the brand voice and writes a
   one-page brief (`briefings/latest.md`) following the structure in
   `briefing-template.md`. See `prompts/morning-briefing-prompt.md`.
3. **Output — the dashboard** renders `briefings/latest.md` (markdown), so the
   brief is visible on the business homebase without leaving it.

Because the dashboard renders markdown, the briefing is a **generated markdown
file**, not live JSON-in-the-page — keeping the site static (no backend on the
public site; see the spec's backend-threshold decision).

## What it reads
- **MindBody:** yesterday's sign-ups, attendance, no-shows, cancellations,
  expiring contracts, sales.
- **GoHighLevel:** new leads, stalled pipeline, unanswered conversations.
- **Brand context:** `brand/voice-tone.md` for the brief's tone.

## What it outputs
- `briefings/latest.md` — today's one-page brief (the dashboard's default view).
- An **action list** (what needs a human decision today) and **exception flags**
  (anything off baseline).
- A weekly rollup (later phase).

## Files
- `app.json` — metadata.
- `prompts/morning-briefing-prompt.md` — the generation prompt.
- `src/` — optional code for an automated build step (empty until needed).
- A business's instance lives at `businesses/<slug>/apps/coo-briefing/` (copy the
  reference Momentum instance) and carries its own `manifest.json`, `data/`
  contract, `briefing-template.md`, `briefings/`, and `integration-hooks.md`.

## Guardrails
- Read-only — this app never writes to MindBody or GHL.
- Sandbox/sample data until the live pipeline is verified.
- Numbers are only as good as the export; the contract in `data/SCHEMA.md` is the
  source of truth for shape.
