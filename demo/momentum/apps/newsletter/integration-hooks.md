# Newsletter — Integration Hooks (MindBody ↔ GHL)

How this app plugs into the Momentum COO OS once live data is flowing. Until
then it runs on Mini-Phase 0.5 manual exports (Sheet → JSON). See
`docs/strategy/momentum-coo-os.md` for the full architecture.

## Source of truth
- **MindBody** owns the audience: who's a member, their join date, status, and
  attendance — which drives the three segments in `strategy.md` (new clients,
  active members, at-risk/lapsed).
- **GoHighLevel** owns delivery and engagement state (sends, opens, clicks,
  unsubscribes). It does **not** own member truth.

## Reads (from MindBody)
- Member list + status → segment membership.
- Join date / first-30-days behavior → "new client" nurture segment (ties to
  Phase 3, onboarding).
- Attendance cadence drop → "at-risk" segment for the win-back issue variant
  (ties to Phase 2, churn detection).

## Writes / actions (via GHL)
- Push the approved issue to the GHL email/SMS audience for each segment.
- **Text-first** for time-sensitive nudges; email for the long-form issue.
- **Human-approve gate** before any send (guardrail §5.2).

## Reconciliation
- Suppression/unsubscribe state lives in GHL; segment membership is recomputed
  from MindBody on each issue. Daily reconcile keeps them from diverging (§5.4).

## Metrics surfaced to the COO briefing
- Per-segment open/click; unsubscribe rate; issues sent vs. planned cadence.

## Status
**Planned hooks — not wired yet.** This app currently runs on manual content.
Wire after Phase 0 credentials + Mini-Phase 0.5 pipeline land.
