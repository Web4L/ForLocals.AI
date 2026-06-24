# Daily Run SOP — COO Morning Briefing

The repeatable steps to produce each morning's brief. Target: **< 5 minutes**
until automated. Run early AM so the brief is ready before the owner's day.

## Prerequisites
- The day's data export exists in the standard data-contract shape.
  - **Mini-Phase 0.5:** export the tracking Google Sheet (one row set per day)
    and save a dated copy for the day.
  - **Live:** the bridge/reconcile job writes the same shape from MindBody + GHL.
- The brand's voice & tone is current.

## Steps
1. **Get the data.** Confirm the export covers *yesterday* (the `meta.date`
   field) and that `meta.source` reflects reality (`sheet-export` or `api`).
2. **Sanity-check the export.** Spot the obvious: are sign-ups/sales non-negative,
   are timestamps yesterday's, did any section come back empty? Empty ≠ zero —
   if a feed failed, note it; don't let the brief imply "nothing happened."
3. **Generate.** Run the generation prompt with the day's data.
4. **Review (human gate).** Read the brief. Check: action list sorted by
   money/urgency, no fabricated numbers, exceptions tied to the known leaks, any
   MindBody↔GHL discrepancies flagged (not silently resolved).
5. **Publish.** Save the result as the latest brief (this is what the dashboard
   shows) **and** archive a dated copy for the day.
6. **Act.** Work the action list. Anything that becomes recurring → candidate for
   a later automation phase (note it).

## Cadence & escalation
- **Daily:** the brief above.
- **Weekly:** a rollup (trends vs. baseline) — added in a later phase.
- **Escalate immediately** (don't wait for tomorrow's brief) if the export shows
  a payment/contract failure spike or a high-value member going dark.

## Guardrails
- **Read-only.** This app never writes to MindBody or GHL.
- **No fabrication.** Missing/zero fields are stated as such.
- **Approve before outreach.** Any suggested message is a draft for a human to
  send (text-first), never auto-sent.
