# Project Context and Master Plan

## 1. Executive summary

We are building a new website for a property management company in Sevier County, Tennessee, focused on Gatlinburg, Pigeon Forge, and Sevierville.

The company already operates a cleaning business in the area and intends to expand into full-service short-term rental property management. Its services are expected to include guest communication, cleaning and operations, listing optimisation, distribution through channels such as Airbnb and Vrbo, and an additional direct website through which guests can discover and eventually book managed cabins.

The website has two connected public goals:

1. Attract guests searching for cabin rentals and help them discover the company's managed portfolio.
2. Attract property owners searching for a property management company and convert them into sales leads.

The guest experience is the primary traffic and product priority. The owner-facing section supports growth in property supply.

The complete long-term product includes live availability, channel synchronization, direct booking, and payment. Phase 1 deliberately stops before those transactional integrations. It creates a working public website, a structured property catalogue, an Airbnb-inspired search experience, property pages, owner acquisition pages, SEO foundations, and replaceable integration boundaries.

## 2. Business model

The direct website is one distribution channel within a broader property management service.

The intended business loop is:

```text
Property owner signs with management company
-> property is onboarded and managed
-> property is distributed to major booking channels and the direct website
-> guests book stays
-> owner and management company earn revenue
-> performance evidence helps acquire more owners
-> larger inventory improves the guest proposition
```

The website is not an open marketplace. Only properties managed or explicitly authorized by the company should appear.

## 3. Audiences

### 3.1 Guests

Guests want to:

- search by town, dates, group size, bedrooms, and amenities;
- compare cabins;
- understand important features quickly;
- view detailed images and property information;
- submit an enquiry or continue to an external/hosted booking route;
- trust that the company professionally manages the stay.

### 3.2 Property owners

Property owners want to understand:

- what the company manages;
- how it handles guests and operations;
- how cleaning expertise supports the service;
- how listings are optimized and distributed;
- how the direct website may create additional demand;
- how to request a consultation, proposal, or rental analysis.

### 3.3 Staff

Staff need a simple way to:

- add and edit properties;
- manage images and amenities;
- publish or hide listings;
- edit site content;
- receive guest and owner enquiries.

A large custom staff portal is not part of Phase 1.

## 4. Reference site

The principal reference site is:

`https://www.cabinsforyou.com/`

It demonstrates:

- guest-first search;
- date and guest inputs;
- large faceted filters;
- destination, bedroom, amenity, and guide pages;
- property cards and detailed property pages;
- favourites and assisted planning;
- owner property-management marketing;
- future quote and booking complexity.

The reference is used for product discovery, not direct copying. The new site must have its own identity, content, imagery, naming, and implementation.

## 5. Phase 1 product definition

Phase 1 is a custom marketing and property-discovery application.

It should let a guest:

1. Land on a guest-first homepage.
2. Enter a town, preferred date range, and guest count.
3. View an initial set of approximately ten properties.
4. Filter by a small, agreed amenity set.
5. Open a property detail page.
6. Carry selected dates and guest count into an enquiry or external booking handoff.

It should let a property owner:

1. Discover the property management offer.
2. Understand services and local positioning.
3. See direct website distribution as one owner benefit.
4. Submit a consultation or rental-analysis lead.

## 6. Phase 1 scope

### Included

- New branded responsive website.
- Homepage with guest search.
- Cabin search/results page.
- Preferred date range and guest count controls.
- Filters for the initial launch set.
- Approximately ten properties.
- Reusable property detail template.
- Gatlinburg, Pigeon Forge, and Sevierville destination pages.
- A small number of feature pages.
- Property management overview and owner lead funnel.
- CMS-backed property and page content.
- Media management.
- Guest and owner enquiry capture.
- SEO, analytics, accessibility, performance, QA, and launch foundations.

### Not included

- Guaranteed live availability.
- Airbnb, Vrbo, or Booking.com API integration.
- iCal synchronization.
- Exact live quotes.
- PMS integration.
- Direct Stripe payment.
- Inventory holds.
- Confirmed reservation creation.
- Guest accounts.
- Owner dashboards.
- Booking modifications, cancellations, refunds, or installments.
- Dynamic pricing.
- Custom channel management.

## 7. Phase 1 date behaviour

The date picker is a user-interface and intent-capture feature, not an availability engine.

It should:

- allow check-in and check-out selection;
- prevent invalid local ranges such as checkout before check-in;
- persist committed search state in the URL;
- carry dates into the property page and conversion action;
- clearly describe dates as preferred or to be checked.

It should not:

- disable dates based on invented availability;
- claim that search results are available;
- display exact availability without an authoritative provider;
- simulate a booking hold.

## 8. Provisional technology direction

The preferred Phase 1 approach is one TypeScript codebase containing the frontend and central CMS/backend.

Recommended default:

- Next.js with the App Router.
- TypeScript in strict mode.
- Payload CMS embedded in the Next.js application.
- Postgres as the primary database.
- Payload media uploads backed by durable object storage in production.
- Server-rendered public pages.
- URL-based search state.
- A small server-side property filter implementation; no external search service.
- Automated tests for domain logic and primary journeys.

Payload is recommended because it can provide an admin panel, data schema, authentication for editors, REST/GraphQL/local APIs, file management, and jobs within the same application codebase.

Payload will not become the vacation-rental channel manager. Later availability and reservations must come from a dedicated PMS or vacation-rental platform.

## 9. Required provider boundaries

The application should not couple page components directly to Payload documents.

Use domain interfaces such as:

```ts
interface PropertyProvider {
  list(input: PropertySearchInput): Promise<PropertySearchResult>;
  getBySlug(slug: string): Promise<Property | null>;
}

interface AvailabilityProvider {
  check(input: AvailabilityRequest): Promise<AvailabilityResult>;
}

interface BookingProvider {
  begin(input: BookingIntent): Promise<BookingHandoff>;
}
```

Phase 1 implementations:

- `PayloadPropertyProvider`
- `UnverifiedAvailabilityProvider`
- `EnquiryBookingProvider` or `ExternalBookingProvider`

Future implementations:

- `PmsPropertyProvider` or a PMS synchronization job;
- `PmsAvailabilityProvider`;
- `PmsBookingProvider`;
- Stripe-backed payment orchestration where contractually and technically appropriate.

## 10. Information architecture

Recommended top-level structure:

```text
/
/cabins
/cabins/gatlinburg
/cabins/pigeon-forge
/cabins/sevierville
/cabins/[slug]
/features/hot-tub
/features/mountain-view
/features/pet-friendly
/property-management
/property-management/services
/property-management/get-a-rental-analysis
/about
/contact
/faq
/privacy
/terms
```

For the smallest launch, some secondary pages may be combined into the main property-management page.

## 11. Core reusable components

- Site header and mobile navigation.
- Footer.
- Search bar.
- Date range picker.
- Guest selector.
- Filter controls and mobile drawer.
- Active-filter chips.
- Property card.
- Property grid.
- Empty results state.
- Property gallery.
- Property facts.
- Amenities list.
- Conversion panel.
- Destination hero and content sections.
- Owner value proposition blocks.
- FAQ accordion.
- Lead/enquiry form.
- SEO metadata utilities.
- Breadcrumbs.
- Loading, error, and not-found states.

## 12. Initial property data

Do not publish copied Cabins for YOU listings.

Use one of:

- real properties with permission;
- licensed property content;
- fictional fixture data on non-indexed staging.

Each property needs:

- stable ID;
- name;
- slug;
- status;
- town/location;
- short and full descriptions;
- bedrooms, bathrooms, capacity;
- property type;
- amenities;
- view type;
- pet policy;
- gallery;
- hero image;
- indicative price text if approved;
- booking mode;
- external URL or enquiry behaviour;
- SEO metadata.

## 13. Search behaviour

For ten properties, use simple application/database filtering rather than a search platform.

Search state should be represented in the URL, for example:

```text
/cabins?location=gatlinburg&checkIn=2026-10-12&checkOut=2026-10-16&guests=6&amenities=hot-tub,mountain-view
```

Phase 1 search may filter by:

- location;
- minimum capacity;
- minimum bedrooms;
- property type;
- hot tub;
- mountain view;
- pool;
- pet friendly.

Dates should not remove properties unless a real availability provider exists.

## 14. Owner acquisition experience

The owner-facing section should explain a complete property management service, including:

- guest communication;
- cleaning and property care;
- reservation and channel management as a target capability;
- listing setup and optimization;
- local operations;
- direct website distribution;
- reporting and owner communication as future/operational capabilities.

The primary owner CTA should be one of:

- request a rental analysis;
- request a property management proposal;
- schedule a consultation;
- submit an existing listing for review.

The final CTA and fields require client approval.

## 15. Delivery sequence

The recommended order is:

1. Scope and repository setup.
2. Design tokens, shell, and routing.
3. Payload collections and seed data.
4. One vertical guest journey.
5. Full search/filter experience.
6. Property detail experience.
7. Owner acquisition experience.
8. Destination and feature templates.
9. Forms, analytics, SEO, accessibility, and performance.
10. Content loading, QA, launch, and handover.

Do not build all page designs before proving the vertical slice.

## 16. Acceptance summary

Phase 1 is acceptable when:

- guests can search the initial catalogue by agreed non-availability filters;
- preferred dates and guests survive navigation and URL sharing;
- each published property has a complete, responsive detail page;
- users can submit a guest enquiry or continue to the configured external booking route;
- property owners can understand the service and submit a lead;
- staff can manage properties and public content in the CMS;
- the site is indexable, responsive, keyboard usable, and monitored;
- no public interface makes a false live availability or confirmed booking claim.

## 17. Future target state

The long-term product is a custom branded discovery and direct-booking frontend over a central PMS/channel manager.

A future PMS should own:

- authoritative property operational IDs;
- availability and blocks;
- minimum stays and restrictions;
- rates, fees, and taxes;
- quotes;
- reservations;
- channel synchronization;
- booking changes and cancellations.

The application may continue using Payload for editorial content, SEO pages, media, and a read-optimized property catalogue. A synchronization layer can combine PMS operational data with CMS presentation content.

Stripe is a later decision. Before implementing it, confirm that the selected PMS supports external payment orchestration and does not require its own payment flow.

## 18. Principal risks

- Ambiguous first-release booking action.
- Lack of authorized property content.
- The client treating the date picker as live availability.
- Scope expansion into PMS or channel-manager features.
- Choosing a CMS before understanding future PMS contracts.
- Thin or duplicated SEO content.
- Copying reference-site content or design.
- Underestimating mobile, accessibility, content loading, and launch work.
- Building custom admin tools that Payload already provides.

## 19. Immediate open decisions

Before final visual build-out, confirm:

1. Phase 1 guest conversion action.
2. Whether initial properties are real or fictional.
3. Who supplies and approves images and copy.
4. Final launch filter set.
5. Final owner CTA and form fields.
6. CMS hosting and production storage approach.
7. Brand identity inputs.
8. Domain and launch date.
9. Analytics platform.
10. Legal content owner.

Safe defaults are documented in `docs/13_RISKS_ASSUMPTIONS_OPEN_QUESTIONS.md`.
