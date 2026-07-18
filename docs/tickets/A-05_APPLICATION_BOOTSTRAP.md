# A-05 Application and Payload bootstrap

## User-visible outcome

Developers can run one local Next.js application containing a minimal public
route and the Payload staff admin/API foundation, backed by PostgreSQL.

## Context

- `docs/03_PHASE_1_SCOPE.md`
- `docs/04_REQUIREMENTS_AND_ACCEPTANCE.md`
- `docs/07_TECHNICAL_ARCHITECTURE.md`
- `docs/10_TICKET_BACKLOG.md`
- `docs/adr/ADR-001_LOCAL_APPLICATION_FOUNDATION.md`

This bootstrap also completes A-08 and A-09 and establishes only the minimum
C-01/C-02 configuration required to boot Payload.

## Scope

### Included

- Next.js 16 App Router, React 19, and strict TypeScript.
- Payload admin/API skeleton with minimum Users and Media collections.
- PostgreSQL adapter and local Docker Compose service.
- Tailwind CSS v4 and shadcn/ui Base UI Nova foundation without components.
- Zod environment validation.
- pnpm lockfile, quality scripts, Vitest, and Playwright smoke coverage.
- Local setup documentation, status tracking, and ADR-001.

### Excluded

- Public site design, navigation, search, or marketing routes.
- Property and page collections, roles, leads, fixtures, and seed content.
- Live availability, booking, PMS, payment, or channel synchronization.
- CI, preview deployment, production hosting, and object storage.

## Dependencies

- P-005 remains open for production deployment decisions.
- Node 24 LTS is the supported local target.
- PostgreSQL is required for Payload runtime; Docker is the documented local
  service.

## Implementation notes

- Public routes are static-first and do not query Payload during the bootstrap.
- PostgreSQL is the only database adapter; there is no SQLite fallback.
- Local uploads are ignored except for the directory placeholder.
- The placeholder seed command deliberately creates no records.

## Acceptance criteria

- [x] Current stable Payload-compatible Next.js 16 and React 19 are pinned.
- [x] Strict TypeScript, lint, formatting, unit, E2E, and build commands exist.
- [x] Payload admin and API route groups are configured.
- [x] PostgreSQL configuration and validated environment variables are present.
- [x] shadcn/ui reports Base UI with the restrained Nova preset and no added
      components.
- [x] Documentation states the local database blocker and pending deployment.
- [x] No false live availability or booking claim is introduced.
- [ ] Payload admin/API runtime verified against a running PostgreSQL instance.

Loading, empty, and error states are not applicable to this static bootstrap.
Public responsive and keyboard interactions begin in the next design/site
ticket.

## Tests

- Unit: environment-schema success and failure cases.
- Integration: Payload type and import-map generation.
- End-to-end: static bootstrap route smoke test.
- Manual: shadcn project info and dependency peer checks.

## Documentation updates

- [x] `README.md`
- [x] `docs/IMPLEMENTATION_STATUS.md`
- [x] `docs/adr/ADR-001_LOCAL_APPLICATION_FOUNDATION.md`
- [x] Existing scope and backlog documents preserved.

## Completion summary

- Files changed: application/configuration files plus the documentation listed
  above.
- Tests run: recorded in the implementation handoff.
- Known follow-up: verify database-backed Payload routes after Docker or
  PostgreSQL becomes available.
