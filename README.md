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
