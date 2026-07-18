# Information Architecture and Page Templates

## 1. IA principle

The site should feel guest-first while keeping a distinct, credible route for property owners.

Do not mix guest booking language and owner sales language within the same primary task flow.

## 2. Recommended top-level navigation

### Primary navigation

- Cabins
- Locations
- Features
- Plan Your Stay
- Property Owners

### Utility actions

- Contact
- Call
- Search Cabins

### Mobile

Use a compact menu with the same task hierarchy. The guest search action should remain prominent.

## 3. Lean Phase 1 sitemap

```text
/

/cabins
/cabins/[slug]
/cabins/gatlinburg
/cabins/pigeon-forge
/cabins/sevierville

/features/hot-tub              optional if supported by inventory
/features/mountain-view        optional if supported by inventory
/features/pet-friendly         optional if supported by inventory

/property-management
/property-management/get-a-rental-analysis

/about
/contact
/faq                           optional combined guest FAQ
/privacy
/terms
```

## 4. Future sitemap extensions

```text
/plan-your-stay
/guide/[slug]
/attractions/[slug]
/blog/[slug]
/property-management/services
/property-management/gatlinburg
/property-management/pigeon-forge
/property-management/sevierville
/property-management/owner-faq
/favorites
/account
/booking/[id]
```

These are not required for the smallest launch.

## 5. Page template inventory

### T01 Global site shell

Used by all public pages.

Includes:

- announcement area if needed;
- header;
- desktop and mobile navigation;
- breadcrumbs where useful;
- footer;
- global contact and owner links;
- analytics and consent hooks.

### T02 Guest homepage

Suggested hierarchy:

1. Brand and guest value proposition.
2. Search control.
3. Featured or representative cabins.
4. Browse by town.
5. Browse by selected feature.
6. Why book with a professionally managed local company.
7. Area trust or guide content.
8. Property-owner teaser.
9. FAQ or final guest CTA.

### T03 Search results

Suggested hierarchy:

1. Search summary and modify action.
2. Result count.
3. Sort and filters.
4. Active filters.
5. Property grid.
6. Empty state or alternatives.
7. Supporting destination text only when contextually useful.

### T04 Property detail

Suggested hierarchy:

1. Name, location, and key facts.
2. Gallery.
3. Conversion panel with preferred trip summary.
4. Overview.
5. Amenities.
6. Sleeping and capacity details.
7. Important notes and policies.
8. Location context.
9. Related properties.
10. FAQ if property-specific content exists.

The conversion panel must not imply live availability in Phase 1.

### T05 Destination landing page

Suggested hierarchy:

1. Unique destination introduction.
2. Search or pre-filtered results.
3. Matching properties.
4. Useful local planning content.
5. Relevant feature links.
6. FAQ.
7. Contact or search CTA.

### T06 Feature landing page

Suggested hierarchy:

1. Feature explanation.
2. Matching properties.
3. Tips or considerations specific to the feature.
4. Related features and destinations.

Only publish when there is enough inventory and content.

### T07 Property management page

Suggested hierarchy:

1. Owner-specific value proposition.
2. Management service summary.
3. Cleaning and local operations credibility.
4. Guest communication and stay management.
5. Listing optimization and distribution.
6. Direct website distribution benefit.
7. Process or onboarding steps.
8. Testimonials or proof when available.
9. Owner FAQ.
10. Rental-analysis or consultation CTA.

### T08 Rental-analysis lead page/form

Suggested hierarchy:

1. Clear offer and expectation.
2. Short explanation of what happens next.
3. Property and owner fields.
4. Privacy/consent language.
5. Success confirmation.

### T09 Standard content page

For About, Contact, Privacy, Terms, and future guides.

## 6. Search information hierarchy

Search inputs should be ordered by importance:

1. Location.
2. Preferred dates.
3. Guests.
4. Bedrooms.
5. Amenities.

For ten properties, avoid exposing dozens of controls before the user sees results.

## 7. Internal linking strategy

Guest pages should link between:

- homepage and locations;
- locations and matching properties;
- feature pages and matching properties;
- property pages and location/feature parents;
- guides and relevant search routes.

Owner pages should link between:

- main property management page;
- rental analysis CTA;
- local service pages when added;
- About and Contact.

The footer should include a clear Property Owners section but should not dominate guest navigation.

## 8. URL principles

- Use lowercase hyphenated slugs.
- Keep property URLs stable after publication.
- Store old slugs as redirects when names change.
- Use query parameters for search state, not separate indexable routes for every filter combination.
- Use dedicated indexable routes only for intentional destination and feature pages.

## 9. Breadcrumbs

Examples:

```text
Home > Cabins > Gatlinburg > Property Name
Home > Cabins > Hot Tub Cabins
Home > Property Owners > Rental Analysis
```

Breadcrumbs should reflect the intended content hierarchy, not every active filter.

## 10. Content ownership

Every page should have:

- business owner;
- content approver;
- CMS editor;
- update cadence;
- SEO intent where applicable.

Avoid publishing pages whose copy has no clear source or approval.
