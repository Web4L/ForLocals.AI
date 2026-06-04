# Briefing Data Contract (Sheet→JSON / API)

The fixed shape the Morning Briefing reads. **This is the source of truth for
the export's structure** — the Mini-Phase 0.5 Google Sheet export and the later
MindBody/GHL API export must both produce this shape, so the generation prompt
never changes when the data source upgrades. Reference sample:
[`briefing-sample.json`](briefing-sample.json).

> One file = one day. Name dated copies `briefing-YYYY-MM-DD.json`. The
> generator reads whichever file the SOP points it at.

## `meta` (required)
| Field | Type | Notes |
|---|---|---|
| `businessId` | string | Must match the business slug (`momentum-fitness`). |
| `date` | string (YYYY-MM-DD) | The day the data describes (yesterday). |
| `generatedAt` | string (ISO 8601) | When the export was produced. |
| `source` | `sample` \| `sheet-export` \| `api` | Where the data came from — printed in the brief so the reader knows its provenance. |
| `env` | `sample` \| `sandbox` \| `live` | Pipeline stage (mirrors `COO_OS_ENV`). |
| `note` | string (optional) | Freeform caveat (e.g. "calendar feed failed"). |

## `mindbody` (system of record)
| Path | Type | Source field (MindBody) |
|---|---|---|
| `signups[]` | array | New clients/contracts created yesterday |
| `signups[].name` | string | Client name (or initials for privacy) |
| `signups[].membership` | string | Plan/contract name |
| `signups[].source` | string | Acquisition source if known |
| `attendance.visitsYesterday` | number | Total check-ins |
| `attendance.classesRun` | number | Classes held |
| `attendance.avgFillRate` | number (0–1) | Avg class fill |
| `attendance.baselineFillRate` | number (0–1) | Rolling baseline for comparison |
| `noShows[]` | array | Booked but not checked in |
| `noShows[].client` / `.class` / `.time` | string | — |
| `cancellations[]` | array | Cancelled bookings |
| `cancellations[].client` / `.class` / `.reason` | string | — |
| `expiringContracts[]` | array | Contracts ending soon (watch window) |
| `expiringContracts[].client` / `.plan` / `.expires` | string | — |
| `expiringContracts[].autoRenew` | boolean | Renewal risk flag |
| `sales.grossYesterday` | number | Gross revenue |
| `sales.transactions` | number | Txn count |
| `sales.topItem` | string | Best-selling item |
| `sales.currency` | string | ISO currency (USD) |

## `ghl` (engagement engine)
| Path | Type | Source field (GoHighLevel) |
|---|---|---|
| `newLeads[]` | array | Contacts created yesterday |
| `newLeads[].name` / `.source` / `.capturedAt` / `.stage` | string | Tag the source — esp. **Physics 101** (≈43% of new clients) |
| `stalledPipeline[]` | array | Opportunities stuck in a stage |
| `stalledPipeline[].name` / `.stage` / `.daysInStage` / `.value` | mixed | `value` is numeric |
| `unansweredConversations[]` | array | Inbound messages with no reply |
| `unansweredConversations[].name` / `.channel` / `.waitingHours` / `.lastMessage` | mixed | `waitingHours` is numeric |

## Rules
- **Empty array ≠ missing feed.** If a feed failed, omit the key and add a
  `meta.note` so the brief flags "no data" rather than implying zero.
- **Privacy:** initials or first-name + last-initial; never PII beyond what the
  brief needs. The repo is currently public (auth deferred).
- **MindBody is truth.** Where MindBody and GHL describe the same person/number
  and disagree, the brief flags it for reconciliation; it does not auto-resolve.
- **Additive evolution.** New fields are added, not renamed — so the prompt and
  template keep working as the source upgrades from sheet → API.
