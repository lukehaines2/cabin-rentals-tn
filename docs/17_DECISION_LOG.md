# Decision Log

## Accepted decisions

### D-001 Two public audiences

Decision:

The site serves guests and property owners. Guest discovery is primary; property-owner acquisition is secondary but required.

Status: Accepted.

### D-002 Managed portfolio only

Decision:

Only properties managed or explicitly authorized by the company may appear publicly. The site is not an open marketplace.

Status: Accepted.

### D-003 Phase 1 is non-transactional

Decision:

Phase 1 does not include live PMS availability, OTA synchronization, direct payment, or confirmed reservation creation.

Status: Accepted.

### D-004 Date picker is intent capture

Decision:

The Phase 1 date picker captures preferred dates and persists them through the journey. It does not guarantee availability.

Status: Accepted.

### D-005 Initial catalogue size

Decision:

Build and test against approximately ten properties. Real authorized records replace fixtures before public indexing.

Status: Accepted.

### D-006 Central CMS preference

Decision:

Use one central content/property backend where practical to reduce custom setup and staff complexity.

Status: Accepted.

### D-007 Provisional CMS

Decision:

Payload CMS embedded in the Next.js/TypeScript codebase is the default Phase 1 recommendation because it combines admin, schema, API, auth, media, and application backend capabilities.

Status: Provisional until hosting spike.

### D-008 CMS is not the future channel manager

Decision:

A specialized PMS/channel manager will be required for live calendar, rates, reservations, and OTA synchronization. The CMS remains an editorial and read-model layer.

Status: Accepted.

### D-009 Stripe is deferred

Decision:

Custom Stripe payment work is outside Phase 1. It will be considered only after PMS capabilities and merchant-of-record responsibilities are confirmed.

Status: Accepted.

### D-010 Reference-site use

Decision:

Cabins for YOU is a product and technical reference, not a source to copy branding, content, imagery, code, or listings.

Status: Accepted.

### D-011 Simplest credible launch

Decision:

Prefer a lean route/template set, structured property search, property pages, owner lead generation, and enquiry/external handoff over optional features.

Status: Accepted.

## Pending decisions

### P-001 Phase 1 guest conversion

Options:

- enquiry;
- external booking URL;
- hosted booking engine.

Recommended safe default: enquiry.

### P-002 Initial property content

Need confirmation of:

- real property count;
- permissions;
- images;
- descriptions;
- booking URLs.

### P-003 Final launch filters

Recommended default:

- location;
- guests;
- bedrooms;
- property type;
- hot tub;
- mountain view;
- pool;
- pet friendly.

### P-004 Owner CTA

Recommended default:

Request a property management consultation or rental analysis.

### P-005 Hosting architecture

Partial decision (2026-07-18): Netlify hosts the integrated Next.js and Payload
preview, with Netlify Database for PostgreSQL. See
`docs/adr/ADR-002_NETLIFY_PREVIEW_HOSTING.md`.

Still open under P-005:

- durable object storage for staff media;
- email delivery;
- backups;
- protected preview access control;
- monitoring and rollback ownership.

### P-006 Brand inputs

Need final:

- business name;
- domain;
- logo/identity status;
- contact details;
- content tone;
- image direction.

### P-007 Analytics and consent

Select analytics platform and confirm consent/legal requirements.

### P-008 Legal content owner

Confirm who supplies and approves privacy, terms, property policies, and owner-service claims.

## Future decisions

- PMS/channel manager selection.
- Hosted versus custom booking flow.
- PMS property versus CMS property source of truth.
- External Stripe support.
- Merchant of record.
- Owner reporting and revenue attribution.
