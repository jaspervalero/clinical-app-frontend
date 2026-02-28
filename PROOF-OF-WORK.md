# Proof of Work — Hands-on Engineering Leadership (Jasper Valero)

## What this repo demonstrates

- Close-to-code leadership: technical design, PR reviews/approvals, selective implementation
- Delivery system thinking: quality gates, release governance, CI guardrails
- Reliability mindset: incident/postmortem rigor, operational readiness

## 60-second orientation

- **What it is:** A Next.js clinical app frontend for managing patients and clinical data.
- **Why it exists:** To demonstrate hands-on engineering leadership and delivery standards.
- **Core workflows:**
  - Add and manage patient records
  - Add and review clinical data for patients
  - API-driven data flow between UI and backend
- **Architecture boundary:** UI (Next.js app) communicates with API routes (app/api/\*), which proxy to backend services or databases.

## Engineering standards I’m modeling here

### PR / quality gates

- Tests required for: critical paths, error paths
- Coverage expectations: enforced in CI
- Review expectations: all non-trivial changes require review

### Contracts & API conventions (if API repo)

- Versioning: `/v1/...` (future-proofing)
- Errors: consistent error shape + codes
- Pagination: page/pageSize pattern
- Validation: request boundary validation in API routes

### Reliability & ops readiness

- Health checks: `/api/health` route (to be implemented)
- Graceful shutdown: handled by Next.js runtime
- Observability: request IDs, structured logs (future improvement)

## “Read these first” (best artifacts)

### Key PRs

- PR: [link] — Initial project setup and architecture
- PR: [link] — Patient CRUD implementation
- PR: [link] — Clinicals workflow and API integration

### Key files

- `app/api/clinicals/route.ts` — API contract for clinical data
- `app/api/patients/route.ts` — API contract for patient data
- `lib/backend.ts` — Backend integration logic

## Architecture notes / ADRs

- ADR 0001: Next.js App Router — Enables file-based routing and API co-location for rapid iteration
- ADR 0002: API route boundaries — UI ↔ API separation for maintainability

## Roadmap (next 2–4 PR-sized improvements)

- [ ] Add health check endpoint
- [ ] Add request validation middleware
- [ ] Add structured logging to API routes

## Leadership relevance

How this maps to Director / Sr EM expectations:

- Sets engineering standards without slowing delivery
- Creates leverage through systems (gates, contracts, runbooks)
- Stays close enough to code to reduce risk and unblock teams
