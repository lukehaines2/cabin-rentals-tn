# ADR-001: Local integrated application foundation

Date: 2026-07-18  
Status: Accepted for local development; production deployment pending  
Owners: Project engineering

## Context

Phase 1 needs a maintainable public website and staff CMS without creating a
separate frontend/backend deployment or implying live booking capability. The
repository also needs one reproducible package manager, a supported local
database, and a rendering default suitable for indexable marketing content.

Production hosting, durable media storage, email delivery, backups, and preview
environments remain undecided under P-005.

## Decision drivers

- Keep the public app and Payload admin/API in one strict TypeScript codebase.
- Use the Phase 1 database choice without introducing a temporary SQLite path.
- Keep indexable public routes static or server-rendered by default.
- Make local and CI dependency resolution reproducible.
- Preserve a future boundary between editorial data and authoritative PMS data.

## Options considered

### Separate Next.js and CMS applications

Pros:

- Independent deployment and scaling.

Cons:

- More hosting, authentication, schema, and integration overhead than Phase 1
  requires.
- Increases the chance of duplicated types and frontend/backend drift.

### Integrated Next.js and Payload application with PostgreSQL

Pros:

- One App Router application supplies the public routes, Payload admin, and
  Payload APIs.
- Matches Payload's supported architecture and the documented Phase 1 plan.
- PostgreSQL provides a production-capable relational database from the start.

Cons:

- The deployment platform must support the integrated Next.js/Payload runtime.
- Production media still requires durable object storage.
- Local CMS work requires a running PostgreSQL service.

## Decision

Use one root-level Next.js 16 App Router application with React 19, Payload 3,
and the Payload PostgreSQL adapter.

- Public routes live in the `(site)` route group and remain static-first. A
  route may use server rendering when request-specific or CMS freshness
  requirements justify it.
- Payload admin and API routes live in the `(payload)` route group.
- PostgreSQL is the only configured database. Local development uses the
  Docker Compose service; no SQLite fallback is provided.
- pnpm 11 is the repository package manager and is pinned in `package.json`.
- Production deployment, object storage, email, backups, and preview hosting
  remain pending decisions. This ADR does not select a hosting vendor.

## Consequences

### Positive

- Public and staff experiences share types, tooling, and deployment boundaries.
- Search-engine-facing routes do not require browser-side fetching by default.
- The local database is representative of the planned production database.
- The lockfile and package-manager version make installs reproducible.

### Negative or trade-off

- Docker or another PostgreSQL installation is required for admin/API runtime
  verification.
- The integrated runtime narrows production hosting to Payload-compatible
  options.
- Local upload storage is development-only and cannot be used as the
  production media strategy.

## Scope impact

- Phase 1 impact: establishes the application and CMS foundation only.
- Future PMS/booking impact: no availability, rate, payment, or reservation
  ownership is assigned to Payload.
- Cost/schedule impact: reduces setup overhead now; a later hosting spike is
  still required before deployment.

## Verification

- Install from the pnpm lockfile.
- Run lint, strict typecheck, unit tests, and a production build.
- With PostgreSQL running, open `/admin`, create the first staff user, and
  exercise the Payload API.
- Confirm public pages can build without querying Payload.
