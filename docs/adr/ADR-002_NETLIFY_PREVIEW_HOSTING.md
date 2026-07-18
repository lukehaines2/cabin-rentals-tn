# ADR-002: Netlify preview hosting

Date: 2026-07-18  
Status: Accepted for protected client preview; broader P-005 items still open  
Owners: Project engineering

## Context

Stage 1 needs a shareable client preview. The application is an integrated
Next.js 16 and Payload 3 codebase with PostgreSQL. A Git-connected Netlify site
was chosen for drag-free continuous deploys from GitHub. The GitHub repository
is public, so secrets must never be committed.

## Decision

Use Netlify as the preview host for the integrated Next.js and Payload runtime.

- Builds use `pnpm build` with Node.js 24.
- Application secrets and feature flags are supplied through environment files
  / Netlify Environment variables:
  - local: `.env` from `.env.example`
  - Netlify: import from `.env.netlify.example`
  - Playwright: `.env.test` / `.env.test.example`
- Managed PostgreSQL comes from Netlify Database (`NETLIFY_DB_URL`), accepted as
  a `DATABASE_URL` alias by the server environment boundary.
- Canonical origin may derive from Netlify `URL` / `DEPLOY_PRIME_URL` when
  `NEXT_PUBLIC_SERVER_URL` is unset.
- `PAYLOAD_SECRET` is set only outside git (local `.env` or Netlify UI).
- Demo fixtures remain enabled and indexing stays disabled for the preview
  until authorized content replaces them.
- Checked-in Payload migrations apply through `prodMigrations` on first Payload
  boot in production.
- Committed build scripts must not embed database URLs or Payload secrets.

## Consequences

### Positive

- Git pushes produce preview deploys without manual zip uploads.
- Public-repo hygiene matches the standard Netlify env-import workflow.
- Guest catalogue pages remain fixture-backed and static-first for demos.
- Database provisioning stays inside the hosting account.

### Negative or trade-off

- The first green Netlify deploy requires Database + `PAYLOAD_SECRET` in the UI.
- Staff media uploads still need durable object storage before production use.
- Broader P-005 items (email, backups, protected preview access control,
  rollback ownership) remain open.

## Scope impact

- Phase 1 impact: A-07 client preview depends on Netlify env import, not on
  committed secrets.
- Does not authorize live availability, payments, or channel sync.
