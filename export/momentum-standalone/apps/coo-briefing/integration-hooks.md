# COO Morning Briefing — Integration Hooks (MindBody ↔ GHL)

How this app plugs into the Momentum COO OS. It is **Phase 1** and **read-only** —
it consumes data from both systems and writes to neither. The data it reads
follows the standard data contract.

## Source of truth
- **MindBody** owns member/operations truth (sign-ups, attendance, contracts,
  sales).
- **GoHighLevel** owns engagement state (leads, pipeline, conversations).
- The brief reads both; if they disagree it **flags for reconciliation** rather
  than resolving — MindBody wins on member facts.

## Reads (no writes)
From **MindBody** (Public API v6 — or the Sheet export of the same shape):
- New clients/contracts created yesterday → `mindbody.signups`
- Visits + class fill → `mindbody.attendance`
- No-shows, cancellations → `mindbody.noShows`, `mindbody.cancellations`
- Contracts ending soon → `mindbody.expiringContracts` (churn-risk surface)
- Sales → `mindbody.sales`

From **GoHighLevel** (v2 / LeadConnector):
- Contacts created yesterday → `ghl.newLeads` (source-tagged; watch Physics 101)
- Stuck opportunities → `ghl.stalledPipeline`
- Inbound messages with no reply → `ghl.unansweredConversations`

## Reconciliation dependency
- Webhook events are **not stored** — a daily scheduled reconciliation sync is
  what guarantees the export is complete. Until that exists, the Mini-Phase 0.5
  manual Sheet export is the stand-in, flagged via its data source.

## Phase map / hand-offs
- Surfaces signals the later phases act on: expiring/at-risk → **Phase 2**
  (churn/win-back); unanswered hot leads → **Phase 4** (speed-to-lead);
  attribution tags → **Phase 6** (financial cockpit).
- This app stays read-only; the **action** on those signals lives in the
  write-enabled phases, always behind a human-approve gate.

## Status
**Built on sample data.** Wire the real reads after Phase 0 credentials +
the Mini-Phase 0.5 export land. No write paths — nothing to sandbox-test here.
