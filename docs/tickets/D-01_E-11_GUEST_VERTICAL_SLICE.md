# D-01 to E-11 — Todo 4 guest vertical slice

## User-visible outcome

A guest can search from the homepage, filter the ten-cabin demo catalogue by
town and capacity, retain preferred dates through a static property page, and
submit an enquiry that staff can retrieve from Payload.

## Context

- `docs/17_DECISION_LOG.md` — D-003 and D-004.
- `docs/03_PHASE_1_SCOPE.md` — guest search, detail, and enquiry boundaries.
- `docs/04_REQUIREMENTS_AND_ACCEPTANCE.md` — GUEST-01 to GUEST-06 and NFR-05.
- `docs/06_UX_AND_DESIGN.md` — accessibility, responsive, and honest date copy.
- `docs/07_TECHNICAL_ARCHITECTURE.md` — static rendering, URL state, provider,
  and controlled form boundaries.

## Scope

### Included

- Homepage GET search using `location`, `checkIn`, `checkOut`, and `guests`.
- Static base catalogue and ten static fixture detail routes.
- Progressive URL-backed location and capacity filtering.
- Preferred trip persistence without availability filtering.
- Controlled server action and private Payload guest-enquiry storage.
- Environment-aware metadata, robots, sitemap, and query noindex policy.
- Stage 1 public navigation cleanup.

### Excluded

- Live availability, rates, payment, or reservation confirmation.
- Owner funnel, destination pages, advanced filters, analytics, and Todo 5 E2E
  breadth.

## Dependencies

- Todo 3 domain schemas, fixtures, generated demo assets, Payload collections,
  access controls, and production indexing guard.
- Local PostgreSQL with migrations and demo seed applied.

## Implementation notes

- Public route data is compiled from the validated ten-property fixture set so
  canonical catalogue and detail HTML remain static.
- The server action independently resolves the authoritative public
  published-and-active Payload property before using an explicit trusted Local
  API override to create the private enquiry.
- Dates are calendar preferences, stored as timezone-safe midday ISO values.
- Native form controls preserve no-JavaScript GET and server-action behaviour.

## Acceptance criteria

- [x] Search URL state round-trips and invalid values fail safely.
- [x] Location and capacity filter while dates do not remove inventory.
- [x] Query state survives refresh/sharing and property navigation.
- [x] All ten details generate statically; unknown slugs are 404.
- [x] Laurel renders five images; other fixtures use a designed fallback.
- [x] Validation, submitting, success, server error, consent, and honeypot
      behaviour are implemented.
- [x] One local PostgreSQL enquiry was stored, verified, and removed.
- [x] Loading/empty/error states handled where applicable.
- [x] Keyboard-capable native controls and visible focus are present.
- [x] Responsive layouts target mobile, tablet, and desktop breakpoints.
- [x] No false live availability or booking claim.

## Tests

- Unit: URL parse/serialize, filtering, date range, form normalization,
  honeypot, date storage, and catalogue robots policy.
- Integration: production build route generation and local Payload storage
  verification.
- End-to-end: focused reproducible smoke script only; full breadth is Todo 5.
- Manual: production HTTP status, static HTML, noindex, robots, sitemap, and
  unknown-slug checks.

## Documentation updates

- [x] Implementation status.
- [x] README local commands and journey behaviour.
- [x] Guest Enquiries admin description.

## Completion summary

- Files changed: public guest routes/components, search and enquiry domain
  helpers, controlled action, SEO routes/policy, tests, smoke script, and docs.
- Tests run: format, lint, strict typecheck, 22 unit tests, production build,
  runtime route checks, and cleaned PostgreSQL journey smoke.
- Known follow-ups: Todo 5 accessibility/responsive/E2E breadth; authorized
  content and production infrastructure remain launch dependencies.
