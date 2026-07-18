# Product Requirements and Acceptance Criteria

## 1. Priority definitions

- `Must` - required for Phase 1 launch.
- `Should` - valuable, but may be removed to protect budget or schedule.
- `Could` - optional enhancement.
- `Future` - explicitly outside Phase 1.

## 2. Guest requirements

### GUEST-01 Homepage search - Must

A guest can select a location, preferred check-in, preferred check-out, and guest count from the homepage.

Acceptance:

- Invalid ranges cannot be submitted.
- Committed values are represented in the results URL.
- Refreshing or sharing the URL restores the values.
- The interface does not claim live availability.
- It works with keyboard, touch, and common mobile widths.

### GUEST-02 Search results - Must

A guest can view all published properties that match the non-availability criteria.

Acceptance:

- Draft and archived properties never appear.
- Capacity and bedroom constraints are applied correctly.
- Selected amenities are applied consistently.
- Result count matches visible results.
- Empty results provide a clear reset or alternative path.
- Dates are preserved but do not filter without an availability provider.

### GUEST-03 Filters - Must

A guest can use the approved Phase 1 filter set.

Acceptance:

- Filter state is visible.
- Filters can be cleared individually and globally.
- Mobile filters open in an accessible drawer or sheet.
- Boolean filter logic is documented and tested.
- Unknown URL filter values fail safely.

### GUEST-04 Property cards - Must

Each result card helps the guest distinguish a property.

Acceptance:

- Name, location, capacity, bedrooms, selected amenities, and approved price language are visible.
- The entire card is not made into an inaccessible nested link structure.
- Images have useful alternative text or are correctly decorative.
- Missing optional data has a designed fallback.

### GUEST-05 Property detail - Must

A guest can view a complete property page.

Acceptance:

- The page uses the canonical property record.
- Gallery, facts, description, amenities, and conversion action render.
- Preferred dates and guests are retained from search.
- The page has a unique title, description, canonical URL, and social image.
- Invalid or unpublished slugs return a useful not-found state.

### GUEST-06 Guest conversion - Must

A guest can submit an enquiry or continue to an approved external route.

Acceptance for enquiry mode:

- Property, dates, guest count, contact details, and message are captured.
- Required fields are validated on the server.
- Bot and abuse controls are considered.
- The user receives a clear success or failure state.
- Staff can retrieve the lead from the central backend.
- No reservation confirmation is implied.

Acceptance for external mode:

- The destination is approved and stored per property.
- Search context is passed where the provider supports it.
- External handoff is clearly labelled.
- Broken or missing URLs fail safely.

### GUEST-07 Location pages - Must

A guest can browse Gatlinburg, Pigeon Forge, and Sevierville pages.

Acceptance:

- Each page has unique useful content.
- Matching properties are shown.
- Pages are internally linked from navigation or discovery sections.
- Empty locations are not published.

### GUEST-08 Feature pages - Should

A guest can browse selected high-value features.

Acceptance:

- Feature pages are created only for real, structured attributes.
- Each page has matching inventory and unique explanatory content.
- The page does not duplicate another route with only a changed heading.

## 3. Property owner requirements

### OWNER-01 Property management page - Must

A property owner can understand the service and next step.

Acceptance:

- The page explains local operations, cleaning, guest communication, listing optimization, channel distribution, and direct website distribution.
- Claims are supportable and do not guarantee revenue or rankings.
- The owner CTA is visible at logical points.
- The guest and owner propositions are not confused.

### OWNER-02 Lead form - Must

A property owner can submit a rental-analysis or consultation request.

Acceptance:

- The agreed contact and property fields are captured.
- Validation occurs on the server.
- Consent and privacy wording are present where required.
- The lead is stored in the backend.
- Staff can identify source page and campaign parameters where available.
- Success and failure states are clear.

### OWNER-03 Owner FAQ - Should

The owner can understand common service questions.

Acceptance:

- Answers are approved by the business.
- Commercial and legal claims are not invented by developers.
- FAQ content is editable in the CMS.

## 4. Staff and CMS requirements

### CMS-01 Property editing - Must

An authorized editor can create, edit, preview, publish, hide, and archive properties.

Acceptance:

- Required fields are enforced.
- Slugs are unique.
- Publication state controls public visibility.
- Images can be ordered and have alt text.
- Amenities use structured values, not uncontrolled duplicates.

### CMS-02 Page editing - Must

An authorized editor can update core marketing content.

Acceptance:

- Critical page sections are editable without code changes.
- Layout freedom is constrained enough to preserve design quality.
- Draft and preview behaviour is documented.

### CMS-03 Lead access - Must

Authorized staff can view guest and owner submissions.

Acceptance:

- Public users cannot read submissions.
- Personal data is not logged unnecessarily.
- Export or deletion can be performed by authorized staff.

### CMS-04 Roles - Should

Editors and administrators have appropriate permissions.

Acceptance:

- Editors cannot alter security-sensitive settings.
- Only administrators can manage users and schema-level configuration.

## 5. Non-functional requirements

### NFR-01 Accessibility - Must

Target WCAG 2.2 AA for the primary journeys.

Minimum acceptance:

- Keyboard operation for navigation, search, filters, date selection, forms, and gallery controls.
- Visible focus.
- Correct labels and error associations.
- Logical headings and landmarks.
- Sufficient contrast.
- Content remains usable at 200% zoom.
- Reduced-motion preferences are respected where animation exists.

### NFR-02 Responsive design - Must

Acceptance:

- Principal flows work at approximately 390px, 768px, and 1440px widths.
- No horizontal page scrolling under normal content.
- Touch targets are usable.
- Search and filter interactions are intentionally adapted for mobile.

### NFR-03 Performance - Must

Acceptance:

- Property images are responsive and optimized.
- Offscreen media is lazy loaded where appropriate.
- Third-party scripts are minimized.
- No external search service is added for ten properties.
- Performance is measured on homepage, results, property detail, and owner page.

### NFR-04 Security and privacy - Must

Acceptance:

- Secrets remain server-side.
- CMS write operations require authentication.
- Public form input is validated and rate-limited or otherwise protected.
- Personal data access is permission-controlled.
- No raw payment data exists in Phase 1.
- Production uses HTTPS and secure cookies for admin sessions.

### NFR-05 SEO - Must

Acceptance:

- Indexable pages are server-rendered.
- Titles, descriptions, canonicals, social metadata, sitemap, and robots behaviour are implemented.
- Demo and staging sites are noindex.
- Structured data is added only when accurate and validated.
- URLs are readable and stable.

### NFR-06 Reliability - Must

Acceptance:

- Public pages have useful 404 and error states.
- Form failures preserve user input where practical.
- CMS failure does not produce misleading booking information.
- Backups and production data recovery are documented for the selected hosting setup.

## 6. Explicit future requirements

The following are Future, not Must or Should for Phase 1:

- live availability;
- PMS property synchronization;
- exact quote calculation;
- inventory hold;
- Stripe payment;
- reservation creation;
- OTA synchronization;
- guest accounts;
- owner reporting;
- modifications, cancellations, and refunds.

## 7. Release-level definition of done

Phase 1 is ready for production when:

1. All Must requirements pass.
2. Real public content is authorized.
3. No demo property is indexable.
4. No interface makes a false availability or booking claim.
5. Primary forms have been tested end to end.
6. The CMS editing workflow is documented and demonstrated.
7. Accessibility and responsive checks are complete.
8. Analytics and consent behaviour are approved.
9. Domain, legal pages, contact details, and launch ownership are confirmed.
10. A rollback and post-launch support process exists.
