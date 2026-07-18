# Testing, QA, and Launch Plan

## 1. Testing strategy

Use a layered approach:

- unit tests for parsing, validation, and filter rules;
- integration tests for provider and CMS boundaries;
- end-to-end tests for user journeys;
- manual accessibility and responsive checks;
- production smoke tests.

## 2. Unit test targets

### Search and URL state

- valid query parsing;
- unknown query values;
- repeated amenity parameters;
- minimum capacity and bedroom logic;
- location matching;
- AND behaviour for selected amenities;
- stable sort;
- serialization and round-trip restoration;
- date range validation;
- missing optional dates.

### Domain mapping

- draft property excluded;
- required property field validation;
- missing optional media fallback;
- invalid booking mode configuration;
- slug and enum normalization;
- public fields only.

### Forms

- required fields;
- invalid email/phone where applicable;
- invalid date range;
- missing property;
- consent requirement where applicable;
- source and campaign normalization;
- server error mapping.

## 3. Integration test targets

- Published Payload property maps to domain object.
- Public property query excludes hidden and archived records.
- Guest enquiry creates a restricted lead record.
- Owner lead creates a restricted lead record.
- Public users cannot read lead collections.
- Media URL generation works in production configuration.
- Redirect records are applied safely.
- Page publication changes update public rendering according to cache rules.

## 4. End-to-end journeys

### Journey E2E-01 Guest search

1. Open homepage.
2. Choose Pigeon Forge.
3. Select preferred dates.
4. Set six guests.
5. Submit.
6. Verify results URL.
7. Refresh and verify state.

### Journey E2E-02 Guest filters

1. Open results.
2. Apply hot tub and mountain view.
3. Verify visible results meet both conditions.
4. Remove one filter.
5. Clear all.
6. Verify dates remain unless explicitly cleared.

### Journey E2E-03 Property enquiry

1. Open a result.
2. Verify preferred dates and guests are present.
3. Open enquiry form.
4. Submit valid data.
5. Verify success state.
6. Verify lead exists in backend.

### Journey E2E-04 Owner lead

1. Open property management page.
2. Follow primary CTA.
3. Submit valid owner lead.
4. Verify success state and backend record.

### Journey E2E-05 Empty results

1. Apply a combination with no matches.
2. Verify useful empty state.
3. Reset filters.
4. Verify results return.

### Journey E2E-06 Unpublished property

1. Attempt direct access to draft or archived slug.
2. Verify public not-found response.

## 5. Manual responsive matrix

Minimum widths:

- approximately 390px mobile;
- approximately 768px tablet;
- approximately 1024px small desktop;
- approximately 1440px large desktop.

Verify:

- header and mobile navigation;
- homepage search;
- date picker;
- guest selector;
- filter sheet;
- result cards;
- gallery;
- property conversion panel;
- guest and owner forms;
- footer.

## 6. Accessibility checklist

- Skip link works.
- Landmarks are present.
- Heading order is logical.
- Navigation is keyboard usable.
- Mobile drawer traps and returns focus.
- Date picker is keyboard usable and announced.
- Guest stepper controls are named.
- Filters have labels and selected state.
- Result updates are announced.
- Gallery modal traps and returns focus.
- Form errors are associated with fields.
- Success messages receive focus or announcement.
- Colour contrast passes.
- Zoom to 200 percent remains usable.
- Reduced motion is respected.

Automated tools are supplementary and do not replace manual review.

## 7. Content QA

For every public property:

- ownership/permission confirmed;
- name and slug correct;
- location correct;
- bedroom, bathroom, and capacity facts verified;
- amenity filters match visible copy;
- gallery order approved;
- alt text complete;
- no copied reference content;
- booking mode and URL correct;
- contact details correct;
- SEO metadata approved;
- no demo language remains.

For every marketing page:

- claims approved;
- town naming consistent;
- owner and guest audience not confused;
- no guaranteed revenue/ranking statement;
- CTA works;
- links are valid.

## 8. Performance checklist

- Hero media is sized appropriately.
- Property thumbnails use responsive sizes.
- Gallery originals are not loaded into card grids.
- Fonts are minimized and preloaded only when justified.
- Third-party scripts are deferred or removed.
- No external search service is loaded.
- Layout shift is reviewed.
- Primary pages are tested under mobile network and CPU throttling.

Set exact budgets after the first vertical slice. Suggested starting targets:

- keep initial JavaScript deliberate and small;
- aim for good Core Web Vitals on representative mobile testing;
- investigate any image or script that dominates the load.

## 9. Security and privacy checklist

- Production secrets are not committed.
- Admin uses secure authentication.
- Public collection permissions are reviewed.
- Lead collections are not publicly readable.
- Upload type and size restrictions are active.
- Forms have server validation and abuse controls.
- Logs do not contain unnecessary personal data.
- Analytics excludes form values and PII.
- Security headers are present.
- Dependency and vulnerability checks run.
- Backup and recovery process is documented.

## 10. SEO launch checklist

- Production canonical domain correct.
- Preview/staging remains noindex.
- Robots file correct.
- Sitemap includes public pages only.
- Titles and descriptions are unique enough.
- Canonicals are correct.
- Structured data validates.
- Broken internal links resolved.
- 404 page works.
- Redirects work without chains.
- Search query pages do not create uncontrolled indexable duplicates.
- Search engine accounts and submission ownership are identified.

## 11. Launch sequence

1. Freeze content changes except critical fixes.
2. Complete production data backup.
3. Deploy release candidate.
4. Run smoke tests against production configuration.
5. Confirm forms and lead access.
6. Confirm analytics and consent.
7. Confirm canonical host, robots, and sitemap.
8. Switch DNS or production alias.
9. Re-run guest and owner conversion tests.
10. Monitor logs, errors, and form submissions.
11. Record launch time and release version.
12. Keep rollback ready until stability is confirmed.

## 12. Post-launch support

Define a limited defect period, for example 30 days.

A defect is behaviour that does not meet approved acceptance criteria. New pages, integrations, changed business rules, new filters, design preferences, and PMS/Stripe work are enhancements and should be estimated separately.
