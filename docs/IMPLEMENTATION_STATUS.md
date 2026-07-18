# Implementation Status

Last updated: 2026-07-18

## Current phase

Stage 1 complete. Todos 1–5 now provide and verify the local guest vertical
slice: homepage GET search, static catalogue, ten static property details,
controlled stored guest enquiry, static SEO safeguards, and acceptance-level
unit, browser, accessibility, responsive, database, build, and runtime checks.

## Completed tickets

- A-04 — local application/database architecture recorded in ADR-001;
  production hosting remains pending.
- A-05 — root Next.js, Payload, PostgreSQL, Tailwind, shadcn/ui, and quality
  tooling initialized.
- A-08 — server environment variables are validated with Zod.
- A-09 — this status tracker is established.
- B-01 to B-09 — independent semantic tokens, responsive layout primitives,
  accessible public shell, Base UI mobile sheet, brand mark, and reusable
  loading/empty/error/not-found states are implemented.
- C-01/C-02 foundation only — Payload routes and PostgreSQL adapter bootstrapped;
  database-backed admin/API runtime now verified.
- C-03 to C-14 / Todo 3 — strict public domain schemas; Property, Availability,
  and Booking provider boundaries; fixture and Payload property adapters;
  restrictive staff roles and access; Media, Locations, Amenities, Property
  Types, Properties, and Guest Enquiries collections; Site Settings global;
  publication revalidation hooks; explicit migration; repeatable fictional
  seed; generated asset register and integration; and production indexing guard.
- Todo 4 guest vertical slice — four-key URL search schema and serializer;
  progressively enhanced
  homepage search; static all-property catalogue with client filtering,
  result/summary/empty/loading/error states and query-preserving cards; all ten
  statically generated property details with gallery fallback and trip summary;
  server-validated enquiry action with honeypot handling and controlled Payload
  storage; environment-aware metadata, robots, sitemap, and catalogue query
  noindex response policy; and broken Stage 1 shell links removed.
- Todo 5 Stage 1 verification/exit gate — acceptance-level domain test breadth;
  deterministic Chromium search-to-enquiry E2E with Payload Local API
  assertion and cleanup; invalid/empty/not-found/gallery/indexing checks;
  JavaScript-disabled static discoverability; keyboard, focus, and responsive
  verification; production build and runtime smoke; and current-machine setup
  documentation.

## In progress

- A-07 preview deployment: Netlify Git integration selected. Import a filled
  `.env.netlify.example` (Netlify Database / `PAYLOAD_SECRET`) in the Netlify
  UI; do not commit secrets to the public repository.

## Blocked

- None for the preview host selection. Remaining P-005 items are durable media
  storage, email, backups, preview protection, and rollback ownership.

## Pending project decisions

- P-001 guest conversion mode.
- P-002 authorized launch property content.
- P-003 final launch filters.
- P-004 property-owner CTA and fields.
- P-005 hosting, durable media, email, backups, and preview architecture.
- P-006 brand inputs.
- P-007 analytics and consent.
- P-008 legal content ownership.

## Latest preview URL

Pending first green Netlify deploy after Database and `PAYLOAD_SECRET` are set.

## Known defects

- None in Stage 1. Production hosting, durable object storage, and authorized
  replacement content remain launch dependencies rather than local defects.

## Latest verification

Completed locally on 2026-07-18:

- Payload migration status reports
  `20260718_174529_todo3_content_model` applied in batch 1. The idempotent seed
  completed with 4 demo locations, 6 demo amenities, 3 demo property types, 17
  demo media records, 10 published/active demo properties, and 0 guest
  enquiries after test cleanup.
- Prettier check, ESLint, strict TypeScript, Payload type/import-map generation,
  30 focused unit/domain tests across 8 files, and the production build pass.
- The focused primary Playwright journey and full 8-test Chromium suite pass.
  The journey uses 2027-10-12 to 2027-10-15, four guests, and
  `stage1-e2e@example.test`; it asserts the stored Payload record before
  deletion and leaves no test enquiry.
- Browser coverage includes URL refresh restoration, safe invalid values,
  empty/reset behaviour, unknown/unpublished 404 paths, Laurel's five-image
  gallery, hero-only fallback, current noindex metadata, robots disallow,
  empty sitemap, JavaScript-disabled initial HTML, skip/search/sheet/form focus,
  and no horizontal overflow on home, catalogue, and detail at 390, 768, and
  1440 pixels.
- Production output marks `/`, `/cabins`, `robots.txt`, and `sitemap.xml`
  static; all ten `/cabins/[slug]` paths are SSG. Payload admin/API routes are
  dynamic, as expected.
- Production runtime smoke returns 200 for `/admin`, `/`, `/cabins`,
  `/cabins/laurel-glass-cabin`, `/robots.txt`, and `/sitemap.xml`; an unknown
  property returns 404. The temporary server was stopped.
- Public-copy review found only truthful negations or explicit unverified
  availability language; no live availability, exact rate, direct booking, or
  reservation-confirmation claim remains.

## Production-only follow-up

- Select hosting, managed PostgreSQL, durable media storage, email delivery,
  backups, preview protection, monitoring, and rollback ownership under P-005.
- Replace all fictional demo property content and generated media with
  authorized, approved launch material before enabling indexing.
- Confirm final brand/domain/contact details, legal content, analytics and
  consent, launch filters, owner funnel decisions, and guest conversion mode.
