# ADR-002: Netlify preview hosting

Date: 2026-07-18  
Status: Accepted for protected client preview; broader P-005 items still open  
Owners: Project engineering

## Context

Stage 1 needs a shareable client preview. The application is an integrated
Next.js 16 and Payload 3 codebase with PostgreSQL. A Git-connected Netlify site
was chosen for drag-free continuous deploys from GitHub.

## Decision

Use Netlify as the preview host for the integrated Next.js and Payload runtime.

- Builds use `pnpm build` with Node.js 24.
- Managed PostgreSQL comes from Netlify Database (`NETLIFY_DB_URL`), accepted as
  a `DATABASE_URL` alias by the server environment boundary.
- Canonical origin may derive from Netlify `URL` / `DEPLOY_PRIME_URL` when
  `NEXT_PUBLIC_SERVER_URL` is unset.
- `PAYLOAD_SECRET` is set only in the Netlify UI.
- Demo fixtures remain enabled and indexing stays disabled for the preview.
- Checked-in Payload migrations apply through `prodMigrations` on first Payload
  boot in production.

## Consequences

### Positive

- Git pushes produce preview deploys without manual zip uploads.
- Guest catalogue pages remain fixture-backed and static-first for demos.
- Database provisioning stays inside the hosting account.

### Negative or trade-off

- Staff media uploads still need durable object storage before production use.
- Guest enquiry and `/admin` require a healthy database connection at runtime.
- Broader P-005 items (email, backups, protected preview access control,
  rollback ownership) remain open.

## Scope impact

- Phase 1 impact: unblocks A-07 client preview once Netlify Database and
  `PAYLOAD_SECRET` are configured.
- Does not authorize live availability, payments, or channel sync.
