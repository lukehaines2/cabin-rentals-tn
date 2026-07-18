# Technical Architecture

## 1. Architecture goal

Build the simplest maintainable Phase 1 application while preserving a clean path to later PMS availability and booking integration.

The architecture should avoid:

- a separate frontend and custom admin application;
- an external search service for ten properties;
- direct coupling to a spreadsheet;
- fake availability logic;
- payment or reservation scaffolding beyond stable interfaces;
- permanent dependence on copied fixture shapes.

## 2. Recommended Phase 1 stack

Default recommendation:

- Next.js App Router.
- TypeScript with strict mode.
- Payload CMS embedded in the same application.
- Postgres database.
- Durable object storage for production media.
- A lightweight component and utility approach; avoid a large UI framework unless justified.
- An accessible date library wrapped in project-specific components.
- Zod or an equivalent boundary validation library.
- React Hook Form or server-native form patterns when useful.
- Vitest or equivalent for unit/domain tests.
- Playwright for key end-to-end journeys.
- Automated accessibility checks plus manual keyboard review.

Use current stable versions supported by the chosen deployment environment. Record exact versions in the repository.

## 3. Why Payload is the provisional CMS

Payload can place these capabilities in one TypeScript and Next.js codebase:

- generated admin panel;
- content and property schemas;
- editor authentication and access control;
- media uploads and image variants;
- REST, GraphQL, and local APIs;
- drafts, versions, preview, and jobs when configured;
- lead storage;
- custom endpoints and hooks.

This reduces the number of custom systems a solo developer must build.

Payload does not provide OTA calendar synchronization by itself. That remains future PMS work.

## 4. Logical architecture

```text
Browser
  |
  v
Next.js public application
  |-- server-rendered pages
  |-- search and filter UI
  |-- guest enquiry
  |-- owner lead form
  |
  v
Domain services and provider interfaces
  |-- PropertyProvider
  |-- AvailabilityProvider
  |-- BookingProvider
  |-- LeadService
  |
  v
Payload CMS and application database
  |-- properties
  |-- locations
  |-- amenities
  |-- pages
  |-- media
  |-- leads
  |-- settings

Future only:
  PMS/channel manager -> availability, rates, reservations, channels
  Stripe -> payment intents, webhooks, refunds
```

## 5. Recommended repository structure

```text
src/
  app/
    (site)/
    (payload)/
    api/
  components/
    ui/
    search/
    property/
    content/
    forms/
  domain/
    property/
    search/
    booking/
    leads/
  providers/
    payload/
    fixtures/
    availability/
    booking/
  payload/
    collections/
    globals/
    access/
    hooks/
    seed/
  lib/
    env/
    validation/
    analytics/
    seo/
    urls/
  tests/
    unit/
    integration/
    e2e/
```

Adapt to the generated Payload structure rather than forcing an incompatible layout.

## 6. Domain model separation

Do not pass raw Payload documents deeply through UI components.

Use domain types and mappers:

```ts
type Property = {
  id: string;
  name: string;
  slug: string;
  status: 'draft' | 'active' | 'hidden' | 'archived';
  location: LocationSummary;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  amenities: AmenitySummary[];
  gallery: PropertyImage[];
  booking: BookingHandoffConfig;
  seo: SeoFields;
};
```

The mapper is the place to validate defaults, normalize CMS relationships, and prevent accidental public exposure of admin fields.

## 7. Search architecture

### Phase 1

For approximately ten properties:

- query published property records;
- apply structured filters on the server or in a domain service;
- paginate only if useful for design consistency;
- return stable result ordering;
- cache public data with revalidation appropriate to editorial changes.

Do not add Algolia, Elasticsearch, or another external index.

### URL state

Use query parameters such as:

```text
location
guestCount
bedroomsMin
propertyType
amenities
checkIn
checkOut
sort
```

Parsing requirements:

- validate all values;
- ignore or normalize unknown values;
- use stable enum slugs;
- generate canonical URLs that do not index arbitrary filter combinations;
- preserve dates when filtering.

## 8. Date architecture

Represent dates as calendar dates in the business's local context, not browser timestamps.

Phase 1 needs only:

- valid ISO date strings;
- local range validation;
- URL serialization;
- form transfer.

Do not invent timezone or minimum-stay business rules.

A future provider contract should be able to add:

- canCheckIn;
- canCheckOut;
- minimum stay;
- restriction reason;
- availability version;
- last updated time.

## 9. Booking handoff architecture

Use a small Phase 1 abstraction:

```ts
type BookingIntent = {
  propertyId: string;
  checkIn?: string;
  checkOut?: string;
  guestCount?: number;
  source?: string;
};

type BookingHandoff =
  | { type: 'enquiry'; formUrl: string }
  | { type: 'external'; url: string }
  | { type: 'hosted-engine'; url: string };
```

Do not add `confirmed`, `payment`, or `reservationId` states in Phase 1.

## 10. Forms and leads

Both guest and owner forms should:

- validate on the server;
- return structured field and form errors;
- use a honeypot, rate limit, challenge, or equivalent anti-abuse measure;
- store a normalized lead record;
- capture page and campaign source where available;
- avoid sensitive information that is not required;
- provide a predictable success state.

Email notification can be added through the hosting platform or a single mail provider, but the central record should remain in Payload.

## 11. CMS access control

Suggested roles:

### Admin

- manage users and roles;
- manage all content and properties;
- view/export/delete leads;
- configure settings.

### Editor

- manage public content, properties, locations, amenities, and media;
- preview and publish according to approval policy;
- no user or security configuration.

### Sales/lead viewer - optional

- view owner leads;
- limited or no public content editing.

Public access should be read-only for published content and write-only through controlled form endpoints.

## 12. Rendering and caching

- Use server rendering or static generation for public content.
- Revalidate or purge pages after relevant CMS publication events.
- Do not cache personal form submissions.
- Keep admin routes authenticated and out of public indexing.
- Use responsive image generation and a CDN where provided.

## 13. SEO implementation

Provide shared utilities for:

- titles and descriptions;
- canonical URL;
- Open Graph metadata;
- robots directives;
- breadcrumbs;
- sitemap generation;
- redirects;
- structured data.

Do not generate indexable pages for arbitrary search query combinations.

## 14. Analytics

Use a simple analytics boundary so the vendor can be selected later.

Suggested events:

- search_submitted;
- filter_applied;
- property_viewed;
- guest_enquiry_started;
- guest_enquiry_submitted;
- external_booking_clicked;
- owner_lead_started;
- owner_lead_submitted;
- phone_clicked.

Do not send personal form values to analytics.

## 15. Error handling

Implement:

- route-level not found;
- public error boundary;
- CMS data fallback for optional fields;
- form validation and server failure states;
- missing booking handoff warning for admins and safe public contact fallback;
- logs with request correlation where useful.

## 16. Deployment

The final hosting choice should provide:

- supported Next.js runtime;
- Postgres or compatible database;
- permanent media storage;
- HTTPS and custom domain;
- preview environments;
- environment variable management;
- backups;
- logs;
- a documented rollback.

A managed Payload deployment or a conventional Next.js host plus managed database and object storage are both viable. Choose one during Phase 0 and record an ADR.

## 17. Security baseline

- Strong Payload secret.
- Secure admin cookies.
- Strict access controls.
- Restricted upload types and file sizes.
- Server-side validation.
- Form abuse protection.
- Dependency scanning.
- Security headers.
- No public write access to CMS collections.
- No secrets in client bundles.
- No payment or raw card data in Phase 1.

## 18. Future integration boundary

When the PMS is selected, do not automatically replace the CMS.

A likely future model is:

```text
PMS operational data
-> synchronization/adapter
-> application read model plus Payload editorial overrides
-> public site
```

Availability, quote, and reservation calls should remain authoritative from the PMS even if property marketing content is cached in Payload.
