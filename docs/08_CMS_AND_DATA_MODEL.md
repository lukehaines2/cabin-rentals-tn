# CMS, Content Model, and Property Data

## 1. CMS objective

Give non-developer staff one central interface for Phase 1 property data, media, pages, settings, and leads while keeping the public application in the same codebase.

Provisional choice: Payload CMS.

## 2. Important limitation

Payload is a content and application backend. It is not a vacation-rental PMS or channel manager.

It can later run synchronization jobs and store a read model, but authoritative availability, rates, reservations, and OTA channel connections should come from a specialized PMS.

## 3. Recommended collections

### 3.1 Users

Purpose:

- admin and editor authentication.

Fields:

- email;
- name;
- role;
- status;
- last login where available.

Roles:

- admin;
- editor;
- lead-viewer optional.

### 3.2 Media

Purpose:

- property images;
- page imagery;
- brand assets;
- downloadable files where approved.

Fields:

- file;
- alt text;
- caption;
- credit/license note;
- focal point;
- tags;
- public/private classification.

Rules:

- alt text required for informative public images;
- source/license note required for externally supplied assets;
- size and type limits enforced.

### 3.3 Locations

Fields:

- name;
- slug;
- type: town, area, community;
- parent optional;
- short description;
- long content;
- hero image;
- latitude/longitude optional;
- SEO fields;
- publication status.

Initial records:

- Gatlinburg;
- Pigeon Forge;
- Sevierville.

### 3.4 Amenities

Fields:

- name;
- slug;
- category;
- icon key optional;
- filterable boolean;
- featured boolean;
- description optional;
- display order.

Initial filterable records may include:

- hot tub;
- mountain view;
- pool;
- pet friendly.

Keep structured slugs stable. Do not let editors create spelling variants such as `hot-tub`, `hottub`, and `outdoor hot tub` without deliberate taxonomy rules.

### 3.5 Property types

Possible records:

- cabin;
- chalet;
- condo;
- lodge.

Only add types represented in the actual portfolio.

### 3.6 Properties

Core fields:

- `name`;
- `slug`;
- `internalId`;
- `status`;
- `featured`;
- `location` relation;
- `community` optional;
- `propertyType` relation;
- `shortDescription`;
- `description`;
- `importantNotices`;
- `bedrooms`;
- `bathrooms`;
- `maxGuests`;
- `squareFeet` optional;
- `petFriendly`;
- `amenities` relations;
- `viewTypes` optional structured relations;
- `heroImage`;
- `gallery` ordered blocks;
- `addressDisplay` optional;
- `mapCoordinates` optional and privacy-reviewed;
- `priceDisplay` optional approved text;
- `bookingMode`;
- `externalBookingUrl` optional;
- `enquiryEnabled`;
- `ownerAccountId` future/internal optional;
- `pmsPropertyId` future optional;
- `legacySlugs`;
- SEO fields;
- content approval fields;
- publish/unpublish dates optional.

Suggested status values:

- draft;
- onboarding;
- active;
- temporarily-hidden;
- offboarding;
- archived.

Only `active` is public.

### 3.7 Pages

Use constrained templates or blocks rather than unrestricted page-builder freedom.

Fields:

- title;
- slug;
- page type;
- hero;
- approved section blocks;
- SEO;
- status;
- navigation settings optional.

Page types:

- standard;
- destination;
- feature;
- owner-marketing;
- legal.

### 3.8 FAQs

Optional separate collection if the same questions are reused.

Fields:

- question;
- answer;
- audience: guest or owner;
- related pages;
- order;
- status.

### 3.9 Guest enquiries

Fields:

- created time;
- property relation;
- check-in;
- check-out;
- guest count;
- name;
- email;
- phone optional;
- message;
- source URL;
- campaign parameters where present;
- consent record;
- status: new, contacted, closed, spam;
- internal notes restricted.

Public users must not read these records.

### 3.10 Owner leads

Fields:

- created time;
- name;
- email;
- phone;
- property location/address or listing URL;
- current channels optional;
- message/goals;
- source URL;
- campaign parameters;
- consent record;
- status: new, qualified, contacted, won, lost, spam;
- internal notes restricted.

### 3.11 Site settings

Fields:

- brand name;
- phone;
- email;
- address;
- social links;
- default SEO;
- owner CTA;
- guest enquiry copy;
- legal links;
- analytics configuration references;
- emergency site notice optional.

### 3.12 Redirects

Fields:

- source path;
- destination path;
- status code;
- active;
- notes.

Useful when property slugs or page structures change.

## 4. Property publication workflow

Recommended lifecycle:

```text
Draft
-> Onboarding
-> Content complete
-> Business approval
-> Active/public
-> Temporarily hidden or offboarding
-> Archived
```

A property should not become public until it has:

- authorized media;
- approved description;
- verified capacity and bedrooms;
- selected amenities;
- location;
- conversion action;
- SEO title/description or approved defaults;
- content approval.

## 5. Fixture data policy

For local development, create approximately ten fictional properties with varied combinations of:

- three towns;
- one to five bedrooms;
- two to twelve guests;
- hot tub yes/no;
- mountain view yes/no;
- pool yes/no;
- pet friendly yes/no;
- enquiry and external booking modes.

Use fictional names and licensed placeholder media. Do not index fixture environments.

A seed should be repeatable and should not overwrite edited production content.

## 6. Search fields and indexes

Index or optimize commonly queried fields:

- status;
- location;
- maxGuests;
- bedrooms;
- propertyType;
- amenities;
- featured;
- slug.

For ten records, simplicity is more important than elaborate indexing, but the schema should not require text parsing for filters.

## 7. CMS-to-domain mapping

Create one mapping layer that:

- resolves relationships;
- exposes only public fields;
- normalizes optional values;
- validates media and booking configuration;
- converts rich text into the rendering format;
- provides domain-safe enums.

Public components should receive domain objects rather than raw CMS response shapes.

## 8. Content model boundaries

The CMS may own:

- public marketing descriptions;
- image order and alt text;
- location pages;
- feature pages;
- owner pages;
- FAQs;
- contact and site settings;
- Phase 1 indicative price wording if manually approved.

The future PMS should own:

- live availability;
- booked/blocked dates;
- stay restrictions;
- exact rates;
- fees and taxes;
- quotes;
- reservation status;
- channel identifiers.

Do not create duplicate editable sources for the same operational field.

## 9. Future PMS synchronization fields

Reserve optional internal fields without implementing the integration:

- pmsProvider;
- pmsPropertyId;
- pmsLastSyncedAt;
- pmsSyncStatus;
- operationalStatus;
- externalChannelMappings;
- sourceOfTruth flags where needed.

Do not expose these publicly.

## 10. Lead retention and privacy

Before production, the business should approve:

- retention period;
- deletion process;
- who can access leads;
- whether leads are exported to a CRM;
- consent wording;
- marketing follow-up rules.

Collect only data required for the stated enquiry.
