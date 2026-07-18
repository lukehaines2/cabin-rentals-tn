# Reference Site Reconnaissance

## 1. Target

Reference website:

`https://www.cabinsforyou.com/`

The site is a functional and structural reference. It is not a source of reusable branding, content, media, code, or proprietary data.

## 2. Investigation boundary

The prior reconnaissance used publicly available page content and route structure.

The following require live Chrome DevTools inspection and remain unverified:

- DOM attributes and hydration details;
- JavaScript framework and bundle structure;
- raw network requests and payloads;
- client-side storage and state management;
- console issues;
- exact responsive breakpoints;
- keyboard and screen-reader behaviour;
- Core Web Vitals and trace data;
- booking submission, payment, or authenticated guest state.

Treat implementation conclusions as unknown until Cursor with Chrome DevTools verifies them.

## 3. Confirmed public page families

The reference site exposes these important page types:

- homepage;
- all-cabins search and results;
- destination landing pages;
- bedroom-count pages;
- amenity and feature pages;
- resort or community pages;
- property detail pages;
- favourites;
- vacation planning or assisted enquiry;
- rental policies;
- payment lookup;
- guest information;
- blog and destination guides;
- property management;
- owner testimonials;
- rental estimate lead generation;
- rewards and gift certificate routes.

Representative routes include:

```text
/
/cabins-by-sleeps.php
/cabin_rental_pigeon_forge.htm
/point-of-grace.htm
/property-management
/favorites
/vacation-options-for-you.html
/asp/policies.asp
/booking/pay
/blog/
```

## 4. Navigation and information architecture

The reference navigation organizes cabins by:

- location;
- bedroom count;
- budget;
- hot tubs;
- pools;
- large groups;
- pet-friendly status;
- luxury and new inventory;
- deals and specials;
- resort/community;
- local travel content.

It also exposes property-management, guest-information, payment, company, and blog routes.

The useful principle is broad discovery through destination and feature taxonomies. The exact large navigation should not be copied because it is complex and reflects a much larger inventory than Phase 1.

## 5. Search and result patterns

The public search page exposes:

- dates;
- filters;
- sorting;
- result count;
- property cards;
- quick view;
- favourites;
- links to property pages.

Observed sort options include price, name, reviews, and bedrooms in both directions.

Observed filter categories include:

- featured;
- new build;
- new to program;
- location;
- bedroom and sleep counts;
- pet friendly;
- views;
- hot tubs;
- pools;
- game and entertainment features;
- internet and household amenities;
- communities and resorts.

A public result state displayed `Show 328 Homes` during reconnaissance. Phase 1 should not reproduce this scale or complexity.

## 6. Property card patterns

Representative cards include:

- property name;
- town;
- bedroom, bathroom, guest, and square-footage facts;
- amenity highlights;
- starting price language;
- rating/review information;
- image;
- short description;
- favourites;
- quick view;
- More Info and Book Cabin actions.

For Phase 1, the new cards should prioritise only information that helps users distinguish ten properties quickly.

## 7. Property detail patterns

A representative property detail page contains:

- categorized image gallery;
- property and location facts;
- bedrooms and bed configuration;
- amenity sections;
- long-form descriptions;
- important notices;
- floorplans;
- reviews;
- map/location information;
- FAQs;
- related properties;
- date selection;
- price and option information.

The public page also exposes future booking complexity such as protection products, cancellation options, add-ons, and a price breakdown.

Phase 1 should reuse the content hierarchy, not the commercial booking logic.

## 8. Owner acquisition patterns

The reference site includes:

- a property-management overview;
- owner testimonials;
- a rental-estimate conversion route;
- local market and operational credibility;
- cross-links between the guest site and owner proposition.

This supports the new project's two-sided acquisition model.

## 9. Useful patterns to preserve

- Guest search is visible early.
- Properties can be discovered through several meaningful taxonomies.
- Capacity, bedrooms, location, and key amenities are easy to scan.
- Rich property imagery is central.
- Property pages include enough detail for group decision-making.
- A human-help or enquiry route exists.
- Destination content supports organic acquisition.
- Property management has its own lead funnel.

## 10. Patterns to simplify or redesign

- Large mega-navigation.
- Very large filter taxonomy.
- Duplicated or fragmented page systems.
- Dense property cards.
- Commercial upsells inside the property page.
- Long policy content duplicated across locations.
- Huge static property selectors.
- Repeated SEO content that may not be useful for a ten-property launch.

## 11. Must replicate as product capability

For Phase 1:

- guest-first discovery;
- location, capacity, and amenity filtering;
- date and guest intent capture;
- property cards;
- complete property detail pages;
- owner property-management lead generation;
- destination SEO foundations;
- responsive layouts.

For later phases:

- authoritative availability;
- exact quote;
- reservation and payment;
- channel synchronization;
- post-booking guest service.

## 12. May be redesigned completely

- visual identity;
- page composition;
- navigation labels;
- filter presentation;
- card appearance;
- calendar styling;
- iconography;
- content voice;
- marketing offers;
- owner lead format.

## 13. Hidden technicalities identified for future work

The reference site makes several hidden complexities visible indirectly:

- date selection is governed by property and seasonal rules;
- search state may need URL and history restoration;
- exact prices include fees, taxes, discounts, and optional products;
- availability may change during checkout;
- reservation and payment state must be coordinated;
- channel inventory must stay synchronized;
- favourites require persistence;
- dynamic results may be incrementally loaded;
- legacy URL migration can be substantial;
- guest and owner content require separate conversion strategies.

These are intentionally deferred from Phase 1 unless explicitly re-scoped.

## 14. Reference inspection backlog for Cursor

If live inspection continues, capture:

1. Search URL and history state.
2. Date-picker state and validation.
3. Filter request behaviour.
4. Result loading strategy.
5. Favourites persistence.
6. Framework and script evidence.
7. Third-party vendors.
8. Responsive screenshots.
9. Accessibility tree and keyboard path.
10. Performance trace.

Use `templates/RECON_FINDING_TEMPLATE.md` for evidence.
