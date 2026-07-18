# Phase 1 Build Phases

## 1. Delivery principle

Build one deployable vertical slice early, then expand the reusable templates and content.

Do not spend weeks creating every page in isolation before search, property detail, and conversion work together.

## 2. Planning range

For one mid-level developer using AI-assisted delivery:

- base implementation effort: approximately 35 to 45 working days;
- contingency: 15 to 20 percent;
- safe calendar range: approximately 8 to 12 weeks, depending on client content and approval speed.

These are planning ranges, not guarantees. Content readiness and revision cycles are major schedule variables.

## 3. Phase 0 - Scope lock and repository bootstrap

Estimated effort: 2 to 4 days.

### Goals

- Confirm the simplest launch.
- Remove decisions that would cause rework.
- Establish project standards and deployment path.

### Tasks

- Confirm Phase 1 guest conversion mode.
- Confirm initial property content source.
- Confirm launch filters.
- Confirm owner CTA and lead fields.
- Confirm brand status and design inputs.
- Choose Payload hosting, database, and media-storage approach.
- Initialize repository, linting, formatting, tests, and CI.
- Create environment variable schema.
- Establish preview deployment.
- Add project documents and implementation status tracker.

### Exit gate

- No unresolved blocker prevents the first vertical slice.
- CI and preview deployment work.
- Architecture decision for CMS hosting is recorded.

## 4. Phase 1 - Design foundation and site shell

Estimated effort: 4 to 6 days.

### Goals

- Establish a distinct visual system.
- Build reusable navigation and layout foundations.

### Tasks

- Define design tokens.
- Implement typography and spacing foundations.
- Implement button, input, card, dialog/sheet, and form primitives.
- Implement header, desktop navigation, mobile navigation, and footer.
- Create guest and owner CTA styles.
- Create error, loading, empty, and not-found patterns.
- Create responsive page containers and section patterns.

### Exit gate

- The shell works at mobile, tablet, and desktop widths.
- Keyboard navigation and focus are usable.
- The site is visually distinct from the reference.

## 5. Phase 2 - Payload CMS and fixture data

Estimated effort: 4 to 6 days.

### Goals

- Give the application a central content and property backend.
- Seed enough varied data to exercise search and page templates.

### Tasks

- Configure Payload and database adapter.
- Create Users and roles.
- Create Media collection.
- Create Locations, Amenities, Property Types, and Properties.
- Create Pages, Site Settings, Guest Enquiries, Owner Leads, and Redirects.
- Add access controls.
- Add public domain mappers.
- Add repeatable local seed with ten fictional properties.
- Configure drafts/preview where required.
- Document editor workflow.

### Exit gate

- An editor can manage a property without code.
- Only active properties are public.
- Fixture data supports all launch filters.
- Public pages do not consume raw CMS records directly.

## 6. Phase 3 - First guest vertical slice

Estimated effort: 5 to 7 days.

### Goal

Deploy a complete but narrow journey:

```text
Homepage search
-> results
-> property detail
-> guest enquiry
```

### Tasks

- Implement homepage hero and search.
- Implement URL query parsing and validation.
- Implement basic results grid.
- Implement one property detail template.
- Implement booking-intent summary.
- Implement guest enquiry form and storage.
- Add success, validation, and server failure states.
- Add core analytics event hooks.
- Add end-to-end test for the journey.

### Exit gate

- A user can complete the journey in preview.
- Dates remain clearly unverified.
- Data persists from URL to enquiry.
- The first vertical slice is approved before broad expansion.

## 7. Phase 4 - Full guest discovery experience

Estimated effort: 7 to 10 days.

### Goals

- Complete the approved Phase 1 search and property browsing experience.

### Tasks

- Improve desktop and mobile date picker.
- Complete guest selector.
- Implement bedrooms, property type, and amenity filters.
- Implement active filter summary and clear actions.
- Implement optional basic sort.
- Implement result count and empty state.
- Implement mobile filter sheet.
- Complete property card variants.
- Complete property gallery.
- Complete property facts, amenities, notices, and location context.
- Add related properties if retained.
- Implement external booking mode if required.
- Add tests for filter logic and URL restoration.

### Exit gate

- Every approved filter works against structured data.
- Search state survives refresh and copied URLs.
- Results and property pages work across target viewports.
- No date or availability claim exceeds Phase 1 capability.

## 8. Phase 5 - Destination and owner acquisition pages

Estimated effort: 5 to 7 days.

### Goals

- Create the two organic acquisition pathways.

### Tasks

- Implement destination template.
- Publish Gatlinburg, Pigeon Forge, and Sevierville routes.
- Implement feature template and approved feature pages.
- Implement property-management page.
- Implement owner value and service sections.
- Implement owner FAQ.
- Implement rental-analysis/consultation form.
- Store and attribute owner leads.
- Add internal linking between relevant pages.

### Exit gate

- Every launch destination has useful unique content and inventory.
- The property-owner journey is separate and understandable.
- Owner lead submission is tested end to end.

## 9. Phase 6 - SEO, analytics, accessibility, and performance

Estimated effort: 4 to 6 days.

### Goals

- Make the product launch-ready beyond visual completion.

### Tasks

- Implement page metadata and canonical rules.
- Generate sitemap and robots configuration.
- Add breadcrumbs and validated structured data.
- Configure analytics and consent decisions.
- Test analytics events without personal data.
- Run keyboard and screen-reader spot checks.
- Run automated accessibility scans.
- Optimize images, fonts, and loading.
- Test performance on primary templates.
- Add security headers and review public API exposure.
- Configure staging noindex.

### Exit gate

- No unresolved critical accessibility blocker.
- Primary templates meet agreed performance targets.
- Search query combinations do not create uncontrolled indexable pages.
- Staging and admin are not indexable.

## 10. Phase 7 - Content, QA, launch, and handover

Estimated effort: 5 to 8 days.

### Goals

- Replace fixtures with authorized launch content.
- Verify the complete site and release safely.

### Tasks

- Import and validate real property data.
- Verify image rights and alt text.
- Complete client content review.
- Cross-browser and responsive QA.
- Test all forms and notification paths.
- Test empty, missing, and error states.
- Verify redirects and final URLs.
- Configure domain, HTTPS, backups, and monitoring.
- Complete client acceptance testing.
- Launch production.
- Verify analytics, forms, sitemap, and indexing settings.
- Deliver editor and support documentation.
- Begin defined post-launch defect period.

### Exit gate

- Release-level definition of done is satisfied.
- Real content is authorized.
- Rollback path is documented.
- Client knows how to edit properties and retrieve leads.

## 11. Critical path

```text
Phase 0 decisions
-> hosting and repository
-> CMS schema
-> fixture seed
-> vertical guest slice
-> full guest search
-> owner funnel
-> content replacement
-> QA and launch
```

## 12. Work that can run in parallel

When another person is available, these can run alongside engineering:

- brand and copy development;
- collection of authorized property images;
- destination content;
- owner service claims and FAQs;
- legal and privacy review;
- analytics account setup;
- future PMS vendor research.

## 13. Schedule protection rules

- Limit included design revision rounds.
- Do not add filters without approved structured data.
- Do not begin live PMS or Stripe work inside Phase 1.
- Treat missing property content as a client dependency.
- Do not publish copied or unapproved fixtures to meet a date.
- Move optional feature pages, related properties, favourites, and maps out before compromising core QA.

## 14. Recommended scope-cut order

If budget or schedule is reduced, cut in this order:

1. Related properties.
2. Feature landing pages beyond one.
3. Custom map experience.
4. Advanced sorting.
5. Owner FAQ as a separate component/page.
6. Multiple owner location pages.
7. Rich page-builder flexibility.
8. Favourites and comparison.

Do not cut:

- accurate property data;
- responsive search;
- conversion forms;
- CMS publication controls;
- accessibility basics;
- content authorization;
- QA and launch checks.
