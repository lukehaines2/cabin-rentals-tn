# Todo 5 — Stage 1 verification and exit gate

## User-visible outcome

A guest can reliably search the demo collection, retain trip preferences,
inspect a property, and submit an enquiry across supported viewport and keyboard
paths. The static public content remains useful without JavaScript and makes no
live availability or reservation claim.

## Context

- `AGENTS.md` — product truth, scope, workflow, and definition of done.
- `docs/03_PHASE_1_SCOPE.md` — guest discovery and enquiry boundaries.
- `docs/04_REQUIREMENTS_AND_ACCEPTANCE.md` — GUEST-01 to GUEST-06 and NFR-01,
  NFR-02, NFR-05, and NFR-06.
- `docs/11_TEST_QA_LAUNCH.md` — layered test strategy and primary journeys.
- `docs/17_DECISION_LOG.md` — non-transactional Phase 1 and preferred-date
  intent capture.

## Scope

### Included

- Acceptance-level URL, filtering, mapping, indexing, and guest-form unit tests.
- Deterministic Chromium search-to-enquiry E2E with database assertion/cleanup.
- Empty, invalid, not-found, gallery, SEO, and no-JavaScript checks.
- Keyboard/focus and 390/768/1440 responsive verification.
- Migration, seed, quality, production build, static-route, and runtime checks.
- Stage 1 status and local setup documentation.

### Excluded

- Owner funnel, destination pages, additional launch filters, analytics, or
  other later-stage product work.
- Live availability, exact rates, payment, or reservation creation.
- Production hosting and launch-content replacement.

## Dependencies

- Todos 1–4 and their ten-property demo seed.
- Homebrew PostgreSQL 17 with the local `deep` database and ignored `.env`.
- Installed Chromium Playwright browser.

## Implementation notes

- Playwright builds and starts the production application on port 3100 with
  demo content enabled and indexing disabled.
- Browser tests use one worker because the primary journey writes to
  PostgreSQL.
- `stage1-e2e@example.test` is removed before and after the suite. The accepted
  record is asserted through Payload Local API before deletion.
- Route-level loading was removed after verification showed it prevented useful
  initial HTML when JavaScript was disabled; focused Suspense fallbacks remain.
- Catalogue reset actions use native links so same-route query clearing works
  in the production build.

## Acceptance criteria

- [x] URL parsing, serialization, invalid values, dates, filtering, mapping,
      indexing guard, validation, and honeypot have focused tests.
- [x] Primary search-to-enquiry journey passes and the stored record is verified.
- [x] No test enquiry remains.
- [x] Empty, reset, invalid, 404, gallery, noindex, robots, and sitemap pass.
- [x] Home, catalogue, and property initial HTML is useful without JavaScript.
- [x] All ten catalogue properties exist in JavaScript-disabled initial HTML.
- [x] Skip link, search order, mobile sheet restoration, and form announcement
      focus are verified.
- [x] Home, catalogue, and detail have no horizontal overflow at target widths.
- [x] Loading/empty/error states handled where applicable.
- [x] Keyboard behaviour verified.
- [x] Mobile behaviour verified.
- [x] No false live availability or booking claim.

## Tests

- Unit: 30 tests in 8 files.
- Integration: Payload migration status, idempotent seed, Local API enquiry
  assertion/cleanup, production build.
- End-to-end: 8 Chromium tests, plus focused primary, no-JavaScript, keyboard,
  and responsive runs while resolving defects.
- Manual: production route status smoke and public-copy claim review.

## Documentation updates

- [x] Implementation status.
- [x] README current-machine and portable database setup.
- [x] Verification ticket note.

## Completion summary

- Files changed: Playwright configuration/suite/helpers, focused domain tests,
  catalogue reset links, property fallback heading, route loading boundary,
  README, implementation status, and this ticket.
- Tests run: migration status, seed, format, lint, strict typecheck, 30 unit
  tests, production build, focused/full Chromium, route smoke, and lint
  diagnostics.
- Known follow-ups: production infrastructure, authorized content, final
  business/legal/analytics decisions, and later approved product stages.
