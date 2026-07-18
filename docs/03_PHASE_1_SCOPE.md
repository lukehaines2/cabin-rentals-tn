# Phase 1 Scope

## 1. Phase 1 objective

Launch the simplest credible version of the new business website that:

- presents a professional new brand;
- attracts cabin-rental guests;
- lets guests explore approximately ten managed or authorized properties;
- captures preferred trip criteria;
- converts guests through an enquiry or booking handoff;
- explains the property management service;
- converts property owners into leads;
- creates a technical foundation for later PMS and payment work.

## 2. Product statement

Phase 1 is a guest discovery and owner acquisition website, not a live reservation system.

## 3. Public audiences

### Primary

Guests searching for cabins in Gatlinburg, Pigeon Forge, and Sevierville.

### Secondary

Property owners searching for short-term rental property management in the same market.

## 4. In scope

### 4.1 Brand and site shell

- New site identity and visual direction.
- Responsive header and navigation.
- Mobile menu.
- Footer.
- Global contact and owner CTA.
- Basic design system and reusable components.

### 4.2 Guest homepage

- Destination/value proposition.
- Search control.
- Featured properties.
- Location and amenity entry points.
- Trust and management-service summary.
- Owner cross-promotion below the principal guest content.

### 4.3 Search and results

- URL-backed search state.
- Location selection.
- Preferred check-in and check-out dates.
- Guest count.
- Minimum bedroom selection.
- Agreed amenity filters.
- Optional basic sort.
- Result count.
- Active filters and clear actions.
- Empty result state.
- Mobile filter drawer.

### 4.4 Initial filter set

Default lean set:

- location;
- guests/capacity;
- bedrooms;
- property type;
- hot tub;
- mountain view;
- pool;
- pet friendly.

Adding filters after approval is a scope decision because each filter requires structured data, editor guidance, UI, URL encoding, and tests.

### 4.5 Property details

- Unique slug and URL.
- Hero and gallery.
- Location.
- Bedrooms, bathrooms, capacity.
- Key amenities.
- Full description.
- Important notes.
- Basic map or area context if approved.
- Preferred dates and guest summary.
- Enquiry or external booking action.
- Related properties if inexpensive to support.
- SEO metadata.

### 4.6 Destination and feature pages

Minimum launch set:

- Gatlinburg cabins;
- Pigeon Forge cabins;
- Sevierville cabins;
- one to three feature pages based on actual inventory.

Do not publish a feature page with no matching inventory or insufficient unique content.

### 4.7 Property owner section

Minimum launch set:

- property-management overview;
- service/value sections;
- direct website distribution benefit;
- local operations and cleaning credibility;
- owner FAQ;
- rental-analysis or consultation form.

Separate town-specific owner pages are optional in the smallest launch and should only be added when unique useful content is available.

### 4.8 CMS and staff workflow

- Editor login.
- Property create/edit/publish.
- Media upload.
- Location and amenity management.
- Basic page content management.
- Site settings.
- Guest enquiry collection.
- Owner lead collection.
- Draft versus published state.

### 4.9 Quality and launch

- Responsive implementation.
- Keyboard accessibility.
- Core form validation.
- SEO metadata and sitemap.
- Analytics events.
- Error monitoring if approved.
- Browser and device QA.
- Production deployment.
- Handover documentation.

## 5. Out of scope

The following are explicitly excluded:

- live PMS data;
- real-time calendar availability;
- Airbnb API access;
- Vrbo API access;
- Booking.com API access;
- iCal import or export;
- channel synchronization;
- live rates or exact quote calculation;
- card payment or Stripe;
- reservation creation;
- inventory hold;
- guest login or booking history;
- owner login or reporting;
- booking modifications;
- cancellations and refunds;
- installment schedules;
- dynamic pricing;
- automated guest messaging;
- smart-lock or access-code integration;
- owner payouts;
- management fee calculations;
- a custom operations dashboard;
- guaranteed search rankings;
- ongoing SEO content production.

## 6. Phase 1 booking behaviour

Each property has one `bookingMode`:

- `enquiry` - submit dates, guests, and contact details;
- `external` - send the user to an approved external booking route;
- `hosted-engine` - later optional handoff to a vendor booking engine;
- `direct-api` - reserved for a future PMS-powered phase.

For the simplest Phase 1, use `enquiry` as the safe default.

## 7. Date-picker wording

Use language such as:

- preferred dates;
- check dates;
- continue to confirm availability;
- request these dates.

Do not use:

- available now;
- guaranteed available;
- reserve now;
- booking confirmed;

unless an authoritative future provider supports the statement.

## 8. Initial property policy

Public launch properties must be real and authorized.

Fictional data may be used for local development and password-protected staging. Staging fixtures must be marked as demo data and excluded from indexing.

Do not copy the reference site's names, photos, descriptions, reviews, or prices.

## 9. Smallest acceptable route set

```text
/
/cabins
/cabins/[slug]
/cabins/gatlinburg
/cabins/pigeon-forge
/cabins/sevierville
/property-management
/property-management/get-a-rental-analysis
/about
/contact
/privacy
/terms
```

Feature routes may be added if supported by the initial inventory.

## 10. Launch success criteria

Phase 1 succeeds when:

- all published property information is accurate and authorized;
- a guest can find a relevant cabin through the agreed filters;
- selected dates and guests persist into the conversion action;
- a property owner can understand the offer and submit a lead;
- staff can maintain the portfolio without editing code;
- the site is fast, accessible, responsive, and indexable;
- the project can later connect to a PMS without replacing the entire frontend.
