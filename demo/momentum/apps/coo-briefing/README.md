# Momentum Fitness — COO Morning Briefing

**Phase 1 of the Momentum COO Operating System.** Read-only and low-risk by
design — it surfaces what needs the owner's attention without touching anything.

## What this is
A daily one-page **"what needs you today"** brief for the owner/COO. It folds
the system of record (**MindBody**) and the engagement engine (**GoHighLevel**)
into a single page: yesterday's operations + today's open loops, with exceptions
flagged and an **action list first**.

It replaces the manual habit of logging into two systems and pulling reports —
the metric is *founder time spent pulling numbers → ~0*.

## How it works
Every morning, the system pulls a daily snapshot of the business's numbers and
turns it into the brief you see under **Today's Briefing**:

1. **Data in** → a daily export of the business's MindBody + GoHighLevel activity
   in a fixed shape ([`data/SCHEMA.md`](data/SCHEMA.md)).
2. **Reasoning** → Claude reads that data alongside the brand's voice and writes
   the one-page brief — exceptions and action list first.
3. **Output** → [`briefings/latest.md`](briefings/latest.md), shown as **Today's
   Briefing** here, with a dated copy archived each day.

*(This demo renders an illustrative example with sample numbers.)*

## What it reads
- **MindBody:** sign-ups, attendance, no-shows, cancellations, expiring
  contracts, sales (yesterday).
- **GoHighLevel:** new leads, stalled pipeline, unanswered conversations (open).
- **Brand:** `brand/voice-tone.md` for tone.

See [`integration-hooks.md`](integration-hooks.md) for the exact MindBody/GHL
touchpoints and which fields map to which endpoint.

## Why it matters
It replaces the daily habit of logging into two systems and pulling reports.
Instead of hunting for the contract about to lapse or the lead that's gone 14
hours without a reply, the owner gets one page that says *what needs you today* —
in about five minutes, before the first class.
