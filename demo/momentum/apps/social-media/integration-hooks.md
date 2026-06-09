# Social Media — Integration Hooks (MindBody ↔ GHL)

How this app plugs into the Momentum COO OS once live data is flowing. Until
then it runs on Mini-Phase 0.5 manual exports (Sheet → JSON). See
`docs/strategy/momentum-coo-os.md` for the full architecture.

## Source of truth
- **MindBody** owns the proof points content draws on: real attendance trends,
  Physics 101 conversion, member milestones (anonymized/with consent).
- **GoHighLevel** owns scheduling/publishing and inbound-DM/lead capture from
  social. It does **not** own member truth.

## Reads (from MindBody)
- Physics 101 funnel performance (~43% of new clients) → what to amplify in
  campaigns (ties to Phase 4, speed-to-lead + attribution).
- Milestone/retention wins → social proof and testimonial prompts
  (with human approval + consent).

## Writes / actions (via GHL)
- Schedule/publish approved posts; route inbound social leads into the GHL
  pipeline with a **source tag** so attribution isn't a blended guess (Phase 4).
- Instant text-back on inbound social leads (Phase 4 / Research app #1).
- **Human-approve gate** on all published content (guardrail §5.2).

## Reconciliation
- Lead source tags set here must match the attribution model in the financial
  cockpit (Phase 6); daily reconcile keeps GHL pipeline and MindBody records in
  sync (§5.4).

## Metrics surfaced to the COO briefing
- Inbound social leads; speed-to-lead time; Physics 101 attribution by channel.

## Status
**Planned hooks — not wired yet.** This app currently runs on manual content.
Wire after Phase 0 credentials + Mini-Phase 0.5 pipeline land.
