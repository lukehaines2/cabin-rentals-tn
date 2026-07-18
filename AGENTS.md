# Agent Operating Rules

These rules apply to every planning, design, coding, testing, and review agent working on this repository.

## 1. Product truth

The project is a guest-facing cabin discovery website with a secondary property-owner acquisition funnel.

Phase 1 is not a live booking platform.

Do not implement or imply:

- authoritative real-time availability;
- Airbnb or Vrbo API access;
- bidirectional channel synchronization;
- exact live pricing;
- inventory holds;
- direct card payment;
- confirmed reservation creation;
- guest accounts;
- owner dashboards;
- booking modifications or cancellations.

The date picker may collect preferred dates and place them in URL state, forms, or an external booking handoff. It must not label a property as available unless a future authoritative provider confirms it.

## 2. Audience terminology

Use these terms consistently:

- `guest` - a traveller searching for or staying in a cabin;
- `property owner` - a person considering or using the property management service;
- `staff` - sales, content, cleaning, or operations users;
- `property` or `cabin` - a managed accommodation listing.

Avoid the ambiguous word `client` in product requirements unless the meaning is explicit.

## 3. Source-of-truth order

When documents conflict, use this order:

1. Explicit decisions in `docs/17_DECISION_LOG.md`.
2. Exact Phase 1 boundaries in `docs/03_PHASE_1_SCOPE.md`.
3. Acceptance criteria in `docs/04_REQUIREMENTS_AND_ACCEPTANCE.md`.
4. The consolidated plan in `PROJECT_CONTEXT.md`.
5. Supporting research and reference-site observations.

Raise unresolved contradictions instead of silently choosing an interpretation.

## 4. Reference-site rule

The reference site is `https://www.cabinsforyou.com/`.

Use it to understand information architecture, search behaviour, property content hierarchy, owner acquisition, and future booking complexity.

Do not copy its:

- brand;
- logo or mascot;
- photographs;
- property names;
- descriptions;
- reviews;
- pricing;
- source code;
- exact layout or visual identity.

Build an independent branded implementation.

## 5. CMS and future PMS rule

The provisional Phase 1 backend is Payload CMS in the same Next.js and TypeScript codebase.

Payload is responsible for Phase 1 content, media, property metadata, forms, and editor access. It is not the future source of truth for live availability, rates, or reservations.

Use explicit provider boundaries so the project can later connect to a PMS or channel manager:

- `PropertyProvider`
- `AvailabilityProvider`
- `BookingProvider`

For Phase 1:

- property data comes from Payload or fixtures;
- availability is unverified or unavailable;
- booking produces an enquiry or external handoff.

Do not create a fake PMS, fake calendar sync, or fake payment ledger.

## 6. Engineering rules

- Use TypeScript with strict settings.
- Prefer server-rendered pages for indexable content.
- Keep search state shareable in the URL.
- Use accessible, semantic HTML before custom ARIA.
- Treat mobile layouts as a first-class implementation.
- Validate all external and CMS data at boundaries.
- Do not expose secrets to the browser.
- Add tests with each feature, not after the entire site is complete.
- Avoid adding third-party libraries unless they remove meaningful risk or effort.
- Document every significant dependency and architectural decision.
- Keep components focused and avoid premature abstraction.
- Do not build infrastructure for hypothetical scale when ten properties are enough for Phase 1.

## 7. Content and asset rules

Public property content must be one of:

- supplied and authorized by the business;
- licensed for use;
- created as clearly fictional fixture content for non-indexed staging.

Do not publish copied reference-site inventory.

Every public property requires:

- an internal ID;
- a unique slug;
- publication status;
- town/location;
- capacity and bedroom data;
- selected amenities;
- at least one authorized image;
- a valid conversion action;
- a content owner or approval status.

## 8. Scope discipline

If a request introduces live availability, payment, channel sync, user accounts, owner reporting, or a custom admin portal, mark it as a scope change and refer to `docs/14_FUTURE_PMS_BOOKING_STRIPE.md`.

Do not quietly add future-phase work to Phase 1.

## 9. Task workflow

For every ticket:

1. Restate the user-visible outcome.
2. Identify dependencies and data required.
3. List acceptance criteria.
4. Implement the smallest complete change.
5. Add or update tests.
6. Verify responsive and keyboard behaviour.
7. Update project documentation when behaviour changes.
8. Record unresolved risks or follow-up work.

Use the ticket template in `templates/TICKET_TEMPLATE.md`.

## 10. Definition of done

A task is not done because the code compiles. It is done when:

- the stated user outcome works;
- loading, empty, error, and disabled states are handled where applicable;
- keyboard use is possible;
- responsive layouts are verified;
- tests pass;
- no false availability or booking claim is introduced;
- documentation reflects the final behaviour.

## 11. When blocked

Do not guess about business rules that affect public claims, legal text, property rights, booking behaviour, or future integration.

Create a short blocker note containing:

- what is missing;
- why it matters;
- the safest temporary behaviour;
- the exact decision needed from the project lead.
