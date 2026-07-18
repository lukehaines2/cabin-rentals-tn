# Cursor Execution Guide

## 1. Objective

Use Cursor agents to turn the scoped Phase 1 into small, reviewable, deployable increments without drifting into future booking-platform work.

## 2. Agent roles

A single agent may perform multiple roles, but separate the modes clearly.

### Orchestrator

- reads all project context;
- inspects the repository;
- creates the repository-specific plan;
- manages dependencies and status;
- prevents scope drift.

### Product/UX reviewer

- checks journeys and states;
- verifies guest-first and owner separation;
- checks wording around dates and availability.

### Implementer

- completes one small ticket;
- adds tests;
- updates status and decisions.

### Reviewer

- reviews scope, quality, accessibility, security, and maintainability;
- does not add unrequested future features.

### Repetitive cleanup agent

- normalizes tickets;
- updates indexes;
- formats documentation;
- summarizes test results.

## 3. First session

Use `cursor-prompts/00_ORCHESTRATOR.md`.

The first output should include:

- current repository inventory;
- contradictions/blockers;
- proposed technical setup;
- phased implementation plan;
- first vertical slice;
- task status document.

Do not let the first agent generate the entire site in one uncontrolled pass.

## 4. Recommended implementation rhythm

For each ticket:

```text
Read context
-> restate outcome
-> inspect existing code
-> implement smallest complete change
-> test
-> review responsive/accessibility
-> update status and decision log
-> commit/submit for review
```

## 5. Status tracking

Create `docs/IMPLEMENTATION_STATUS.md` with:

- current phase;
- completed tickets;
- in-progress ticket;
- blocked tickets;
- pending client decisions;
- latest preview URL;
- known defects;
- next recommended ticket.

Keep it short and current.

## 6. Branch and change discipline

Recommended:

- one branch per ticket or small related group;
- descriptive commits;
- no unrelated dependency upgrades;
- no large generated diff without review;
- update tests and docs in the same change;
- preview each user-visible change.

## 7. Initial build order

1. Repository and Payload bootstrap.
2. Design primitives and shell.
3. Property schema and fixture seed.
4. Homepage search.
5. Results route and card.
6. Property detail.
7. Guest enquiry.
8. Full filters and mobile states.
9. Destination templates.
10. Owner funnel.
11. SEO, analytics, accessibility, and performance.
12. Real content and launch.

## 8. Vertical slice rules

The first slice must be genuinely usable:

- homepage search submits;
- results are generated from structured data;
- property detail opens;
- preferred dates and guest count persist;
- enquiry stores a record;
- success and failure states exist;
- no live availability claim is made.

It does not need final branding or every filter.

## 9. Tool use

### Browser and DevTools

Use Chrome DevTools MCP when available for:

- responsive behaviour;
- accessibility tree;
- console errors;
- network inspection;
- performance traces;
- comparison with the reference site's interactions.

Provide a short note whenever a claim cannot be verified because a required browser capability is unavailable.

### CMS

Use the generated Payload admin before building custom staff screens.

### Tests

Run targeted tests during development and the full quality suite before merging or releasing.

## 10. Prompt hygiene

Every implementation prompt should include:

- ticket ID;
- user-visible outcome;
- relevant acceptance criteria;
- scope exclusions;
- files or modules likely involved;
- tests required;
- instruction to update status.

Avoid prompts such as `build the whole website`.

## 11. Review checklist for every user-facing change

- Does it satisfy a documented Phase 1 requirement?
- Does it work without live availability?
- Is the wording truthful?
- Is it keyboard usable?
- Does it work on mobile?
- Are loading, empty, and error states handled?
- Is data validated?
- Are tests present?
- Did the change add an unnecessary service or dependency?
- Did documentation remain accurate?

## 12. Blocker handling

If a client decision is missing:

1. Use the safe default in the risk document when possible.
2. Record the decision as pending.
3. Build behind a small configuration boundary if inexpensive.
4. Do not create a complex abstraction solely to avoid asking a question.

## 13. Completion handoff

At the end of each phase, the orchestrator should produce:

- completed outcomes;
- preview link;
- tests and audits run;
- remaining defects;
- decisions needed for the next phase;
- scope changes requested;
- revised estimate if required.
