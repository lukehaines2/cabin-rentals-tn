# C-03 to C-14 — Domain, CMS, and fictional fixtures

## User-visible outcome

Staff have a secure Payload content model for a small property catalogue, while
developers have validated public-domain/provider boundaries and ten reliable,
clearly fictional, non-indexed properties for the next vertical-slice work.

## Dependencies and data

- Running PostgreSQL and validated server environment.
- The 17 generated originals in `fixtures/assets/originals/`.
- The 14 selected 1600×900 WebP derivatives in `public/demo/properties/`.
- Authorized real content and media remain required before public indexing.

## Acceptance criteria

- [x] Public property, location, media, availability, and guest-enquiry inputs
      are strictly validated.
- [x] Property, Availability, and Booking provider boundaries exist.
- [x] Fixture and Payload property providers expose only domain records.
- [x] Public Payload property access requires `_status: published` and
      `listingStatus: active`.
- [x] Staff roles and content/lead access are restrictive.
- [x] Required collections and Site Settings global are registered.
- [x] Public Guest Enquiry reads and raw creates are denied.
- [x] Exactly ten fictional properties and governed generated media are seeded
      idempotently.
- [x] Demo/local environments are noindex by policy and indexed production
      refuses demo content/assets.
- [x] Migration, seed, tests, static checks, build, and runtime smoke pass.
- [x] No live availability, exact rates, reservation, or payment claim exists.

## Implementation notes

- Guest enquiry submission logic remains Todo 4. Its future server action may
  use an explicit trusted Local API override only after schema validation and
  abuse controls.
- Local media storage is development-only; production object storage is still
  part of P-005.
- Publication hooks invalidate property paths when running inside Next.js and
  safely no-op in Payload CLI processes.

## Tests and verification

- Unit coverage: schemas, fictional catalogue, publication mapping, and
  indexing guard.
- Payload generation: types and admin import map.
- Database: explicit migration and repeated seed against local PostgreSQL 17.
- Runtime: Payload admin and public property REST endpoints.

## Follow-up

Todo 4 owns public catalogue/detail pages, metadata/robots/sitemap routes, and
the controlled enquiry endpoint and UI.
