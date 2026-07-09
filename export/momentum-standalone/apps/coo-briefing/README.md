# Momentum Fitness — COO Morning Briefing

**Phase 1 of the Momentum COO Operating System.**
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
Every morning the brief is generated from a daily snapshot of the business's
numbers. The flow:

1. **Data in** → a daily export of the business's activity in a fixed shape.
   Right now that's **illustrative sample data**, not real Momentum numbers.
   During Mini-Phase 0.5 it becomes a manual Google Sheet export; after go-live,
   the same shape comes straight from MindBody + GoHighLevel.
2. **Reasoning** → Claude reads that data alongside the brand's voice & tone and
   writes the brief to the standard one-page structure.
3. **Output** → **Today's Briefing**, shown on this dashboard, with a dated copy
   archived alongside it each day.

## What it reads
- **MindBody:** sign-ups, attendance, no-shows, cancellations, expiring
  contracts, sales (yesterday).
- **GoHighLevel:** new leads, stalled pipeline, unanswered conversations (open).
- **Brand:** the brand's voice & tone.

See the integration notes for the exact MindBody/GHL touchpoints and which
fields map to which source.

## Status & next steps
- ✅ Dashboard + data contract + sample brief built and rendering.
- ⬜ Stand up the Mini-Phase 0.5 Google Sheet export (replaces the sample data).
- ⬜ Pull the GoHighLevel token + Location ID; submit MindBody go-live.
- ⬜ Automate the daily build once live data flows.

**Automation Coverage:** 0% — this is read-only and running on sample data; it
counts once it runs on a real daily export.
