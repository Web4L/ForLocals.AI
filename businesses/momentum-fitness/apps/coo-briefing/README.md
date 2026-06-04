# Momentum Fitness — COO Morning Briefing

**Phase 1 of the [Momentum COO Operating System](../../../../docs/strategy/momentum-coo-os.md).**
Built first because it's read-only and low-risk, and it proves the data pipes
before any write automation ships.

## What this is
A daily one-page **"what needs you today"** brief for the owner/COO. It folds
the system of record (**MindBody**) and the engagement engine (**GoHighLevel**)
into a single page: yesterday's operations + today's open loops, with exceptions
flagged and an **action list first**.

It replaces the manual habit of logging into two systems and pulling reports —
the metric is *founder time spent pulling numbers → ~0*.

## How it runs today (sample data)
The dashboard renders **markdown**, so the brief is a generated markdown file,
not live JSON in the page (keeps the public site static — see the spec's
backend-threshold decision). The flow:

1. **Data in** → a daily export in the fixed shape documented in
   [`data/SCHEMA.md`](data/SCHEMA.md). Right now that's
   [`data/briefing-sample.json`](data/briefing-sample.json) — **illustrative
   sample data**, not real Momentum numbers. During Mini-Phase 0.5 it becomes a
   manual Google Sheet → JSON export; after go-live, the same shape from the
   MindBody + GHL APIs.
2. **Reasoning** → Claude reads that JSON + `brand/voice-tone.md` and writes the
   brief using [`briefing-template.md`](briefing-template.md). Prompt:
   [`tools/prompt-library.md`](tools/prompt-library.md).
3. **Output** → [`briefings/latest.md`](briefings/latest.md), shown as **Today's
   Briefing** on this dashboard. Archive a dated copy alongside it each day.

## What it reads
- **MindBody:** sign-ups, attendance, no-shows, cancellations, expiring
  contracts, sales (yesterday).
- **GoHighLevel:** new leads, stalled pipeline, unanswered conversations (open).
- **Brand:** `brand/voice-tone.md` for tone.

See [`integration-hooks.md`](integration-hooks.md) for the exact MindBody/GHL
touchpoints and which fields map to which endpoint.

## Status & next steps
- ✅ Dashboard + data contract + sample brief scaffolded and rendering.
- ⬜ Stand up the Mini-Phase 0.5 Sheet → JSON export (replaces the sample file).
- ⬜ Pull GHL token + Location ID; submit MindBody go-live (Phase 0, §3 of spec).
- ⬜ Automate the daily build once live data flows (optional `src/` step).

**Automation Coverage:** 0% — this is read-only scaffolding on sample data; it
counts once it runs on a real daily export.
