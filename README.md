# Cabins Property Management Website - Phase 1 Project Pack

This folder is the working source of truth for a Cursor-assisted Phase 1 build.

The project is a new, guest-first cabin discovery website for a property management company serving Gatlinburg, Pigeon Forge, and Sevierville, Tennessee. It also includes an owner-facing property management lead funnel.

Phase 1 is intentionally simple. It does not include live PMS availability, Airbnb or Vrbo synchronization, direct payment, or confirmed reservation creation. It establishes the brand, the property catalogue, the search and filter experience, reusable property pages, owner lead generation, SEO foundations, and an architecture that can support later PMS and Stripe work.

## Read this first

1. `AGENTS.md` - non-negotiable instructions for all agents.
2. `PROJECT_CONTEXT.md` - consolidated project context and master plan.
3. `docs/03_PHASE_1_SCOPE.md` - exact in-scope and out-of-scope boundaries.
4. `docs/09_BUILD_PHASES.md` - recommended execution sequence.
5. `docs/10_TICKET_BACKLOG.md` - small implementation tickets.
6. `cursor-prompts/00_ORCHESTRATOR.md` - prompt to start the Cursor planning agent.

## Core decisions

- The website serves two public audiences: guests and property owners.
- Guest discovery is the primary experience and homepage priority.
- Only properties managed or authorized by the company may appear publicly.
- Phase 1 uses approximately ten real, authorized, or fictional fixture properties.
- The Phase 1 date picker captures preferred dates; it does not guarantee availability.
- The Phase 1 conversion action is an enquiry or an external/hosted booking handoff.
- Live availability, channel synchronization, direct booking, and Stripe are future phases.
- A central content and property data backend is preferred.
- The provisional Phase 1 recommendation is Payload CMS in the same Next.js and TypeScript codebase.
- A normal CMS is not a channel manager. A PMS or vacation-rental platform will still be required for later operational availability and reservations.
- The reference website is a functional and structural reference, not a design or content source to copy.

## Folder map

- `PROJECT_CONTEXT.md` - one-file briefing for an LLM.
- `AGENTS.md` - operating rules and scope guardrails.
- `docs/` - detailed product, UX, architecture, data, delivery, QA, SEO, and future-phase documents.
- `templates/` - reusable ticket, ADR, and finding formats.
- `cursor-prompts/` - prompts for planning and implementation agents.

## How to use this pack

Copy the folder into the repository root. Keep `AGENTS.md` and `PROJECT_CONTEXT.md` at the repository root so Cursor agents see them early.

The first agent should not immediately write production code. It should:

1. Read all project documents.
2. Identify contradictions or missing decisions.
3. Produce a repository-specific implementation plan.
4. Create or update a task tracker.
5. Implement one vertical slice before expanding the entire site.

The recommended first vertical slice is:

`Homepage search -> results -> property detail -> booking enquiry`

using fixture property data and no live availability claims.

## Implemented foundation

The repository now contains the first application bootstrap:

- Next.js 16 App Router and React 19;
- Payload 3 in the same application;
- PostgreSQL through Payload's Postgres adapter;
- strict TypeScript and Zod environment validation;
- Tailwind CSS v4 and shadcn/ui Base UI using the restrained Nova preset;
- Vitest, Playwright, ESLint, and Prettier;
- a pnpm 11 lockfile and pinned package-manager version.

The Stage 1 public guest journey is implemented:

- `/` contains a progressively enhanced GET search for location, preferred
  dates, and guests;
- `/cabins` is a statically generated all-property catalogue with shareable
  client filtering over the ten fixtures;
- `/cabins/[slug]` statically generates all ten active fixture details and
  preserves valid trip state in the enquiry journey;
- the controlled guest enquiry server action validates with Zod, silently
  accepts honeypot submissions without storage, resolves only a public
  published-and-active Payload property, and stores accepted records in
  `guest-enquiries`;
- metadata, canonicals, Open Graph basics, robots, sitemap, and query-response
  noindex policy are active. The local demo remains `noindex,nofollow`, blocks
  crawlers, and emits an empty sitemap.

Owner contact, legal, destination, and owner-funnel routes are intentionally not
part of this stage; the public shell does not link to those unpublished routes.

## Local prerequisites

- Node.js 24 LTS (the repository's `.nvmrc` targets Node 24);
- Docker Desktop, Homebrew PostgreSQL 17, or another supported PostgreSQL
  service;
- `openssl` for generating a local Payload secret.

The project does not require global pnpm. Use the pinned package-manager command
shown below. PostgreSQL is required; the application does not fall back to
SQLite.

On this machine, where the `deep` role/database and `.env` are already present,
the exact one-line development start is:

```bash
brew services start postgresql@17 && npx pnpm dev
```

## First-time setup

```bash
nvm install
nvm use
npx --yes pnpm@11.14.0 install --frozen-lockfile
cp .env.example .env
openssl rand -base64 32
```

Replace `PAYLOAD_SECRET` in `.env` with the generated value. The remaining local
database values in `.env.example` match `docker-compose.yml`.

Docker remains the portable PostgreSQL alternative. Start it, apply migrations,
seed the guarded demo fixtures, and run the application:

```bash
docker compose up -d
npx --yes pnpm@11.14.0 db:migrate
npx --yes pnpm@11.14.0 seed
npx --yes pnpm@11.14.0 dev
```

Homebrew PostgreSQL 17 is a supported local fallback:

```bash
brew install postgresql@17
brew services start postgresql@17
export PATH="$(brew --prefix postgresql@17)/bin:$PATH"
createuser deep
createdb --owner=deep deep
psql postgres -c "ALTER ROLE deep PASSWORD 'deep-local-only';"
npx pnpm db:migrate
npx pnpm seed
npx pnpm dev
```

If the role or database already exists, skip its creation command. The
`DATABASE_URL` in `.env.example` works with both documented local options.
On later runs, `brew services start postgresql@17 && npx pnpm dev` is sufficient;
rerun migrations after pulling schema changes and rerun the idempotent seed when
fixtures change.

Open:

- public bootstrap: `http://localhost:3000`;
- Payload admin: `http://localhost:3000/admin`;
- REST API: `http://localhost:3000/api`;
- GraphQL endpoint: `http://localhost:3000/api/graphql`.

When no user exists, the first visit to `/admin` presents Payload's first-user
setup. Alternatively, the seed creates a local administrator only when
`SEED_ADMIN_EMAIL`,
`SEED_ADMIN_PASSWORD`, and `SEED_ADMIN_NAME` are all explicitly present in
`.env`. Use a local-only password of at least 12 characters; never commit or
reuse seed credentials in a deployed environment.

The seed is idempotent and loads 10 fictional, published-and-active demo
properties, taxonomies, generated media, and Site Settings. It is guarded by
`DEMO_CONTENT_ENABLED=true`. Demo content and assets require replacement and
must remain non-indexed.

Stop the database without deleting its named volume:

```bash
docker compose down
```

## Environment variables

- `DATABASE_URL` — required PostgreSQL connection string. On Netlify, the app
  also accepts `NETLIFY_DB_URL` from Netlify Database.
- `PAYLOAD_SECRET` — required server-only secret with at least 32 characters.
- `NEXT_PUBLIC_SERVER_URL` — required canonical application origin. On Netlify,
  falls back to `URL` or `DEPLOY_PRIME_URL` when unset.
- `DEMO_CONTENT_ENABLED` — enables local/protected-staging fixtures and assets;
  defaults to `true`.
- `SITE_INDEXING_ENABLED` — explicit production indexing opt-in; defaults to
  `false`. Startup refuses indexed production while demo content is enabled.
- `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_ADMIN_NAME` — optional and
  valid only when all three are supplied together.

Environment variables are parsed at the server boundary. Invalid or missing
values stop Payload initialization with field-specific errors, without logging
secret values. Never use `.env.example` placeholders in production.

## Commands

All commands work through the pinned package manager even when pnpm is not
installed globally:

```bash
npx --yes pnpm@11.14.0 dev
npx --yes pnpm@11.14.0 build
npx --yes pnpm@11.14.0 start
npx --yes pnpm@11.14.0 lint
npx --yes pnpm@11.14.0 typecheck
npx --yes pnpm@11.14.0 test
npx --yes pnpm@11.14.0 test:e2e
npx --yes pnpm@11.14.0 smoke:guest-enquiry
npx --yes pnpm@11.14.0 format
npx --yes pnpm@11.14.0 format:check
```

## Stage 1 verification

The Playwright suite builds and serves the production application on an isolated
local port, uses Chromium only, and serializes the database-mutating enquiry
journey. It covers the complete guest search-to-enquiry path, static
discoverability without JavaScript, indexing safeguards, not-found and gallery
fallbacks, keyboard/focus behaviour, and the 390/768/1440 responsive matrix.
The test enquiry is asserted through Payload's server-only Local API and removed
before the suite exits.

```bash
npx --yes pnpm@11.14.0 test:e2e
```

## Todo 4 local journey smoke

The focused smoke uses the production build and local PostgreSQL. It submits one
enquiry through the browser, verifies the stored snapshots, preferred dates,
guest count, contact fields, source URL, consent, and status through Payload's
Local API, then deletes that record.

Start a production server in one terminal:

```bash
npx --yes pnpm@11.14.0 build
npx --yes pnpm@11.14.0 exec next start -H 127.0.0.1 -p 3010
```

Run the smoke in another terminal:

```bash
npx --yes pnpm@11.14.0 smoke:guest-enquiry
```

The expected final line includes `storedCount: 1` and
`remainingSmokeRecords: 0`. The script uses
`todo4-smoke@example.test`, removes any stale record with that address before
starting, and removes the newly submitted record before exiting.

Install the Playwright Chromium binary once before running E2E tests:

```bash
npx --yes pnpm@11.14.0 exec playwright install chromium
```

Payload maintenance commands:

```bash
npx --yes pnpm@11.14.0 payload:types
npx --yes pnpm@11.14.0 payload:importmap
npx --yes pnpm@11.14.0 db:migrate:create initial-schema
npx --yes pnpm@11.14.0 db:migrate
npx --yes pnpm@11.14.0 db:migrate:status
npx --yes pnpm@11.14.0 db:migrate:down
npx --yes pnpm@11.14.0 seed
```

Run migrations before seeding a new database. Re-running the seed updates only
records already marked as demo and does not overwrite same-slug non-demo
content.

## Netlify preview deploy

Guest catalogue pages use committed demo fixtures under `public/demo/`. The
production build supplies Payload placeholders when `DATABASE_URL` /
`PAYLOAD_SECRET` are unset, so the browseable guest site can deploy without a
database. Payload admin, APIs, and guest enquiry storage still need managed
PostgreSQL plus a real secret.

1. Connect the GitHub repository in Netlify.
2. Push to `main` or use **Deploys → Retry deploy** — the guest site should
   build with Netlify's automatic `URL` and build-only Payload placeholders.
3. To enable `/admin` and enquiry storage later:
   - open **Database** and create a Netlify Database (`NETLIFY_DB_URL`)
   - set `PAYLOAD_SECRET` with `openssl rand -base64 32`
   - redeploy

Do not upload or commit `.env`. Keep secrets in the Netlify UI only. Local
`media/` uploads are not durable on Netlify; object storage remains a P-005
follow-up before staff media workflows are production-ready.

Checked-in Payload migrations run automatically on first production Payload
boot via `prodMigrations` once a real database is connected.

## Deployment status

Netlify is the selected preview host for the integrated Next.js and Payload app.
Durable object storage, email, backups, protected previews, and rollback
procedures remain part of P-005. Local files under `media/` are not a
production storage strategy.

See `docs/IMPLEMENTATION_STATUS.md`,
`docs/adr/ADR-001_LOCAL_APPLICATION_FOUNDATION.md`, and
`docs/adr/ADR-002_NETLIFY_PREVIEW_HOSTING.md` for current status and decisions.
