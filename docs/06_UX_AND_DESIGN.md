# UX, Interaction, and Design Guidance

## 1. Design objective

Create a distinct, trustworthy, local hospitality brand with a polished guest discovery experience. Use the reference site for useful patterns, not for visual duplication.

The website should feel:

- welcoming;
- locally credible;
- easy to scan;
- modern but not generic;
- suitable for families, couples, and groups;
- professional enough to reassure property owners.

## 2. Brand separation from the reference

Do not reuse:

- the Cabins for YOU name or capitalization device;
- its bear identity or mascot;
- its photographs or property names;
- exact type, colour, layout, or icon choices;
- promotional copy or rewards language.

Develop an independent identity and tone.

## 3. Experience principles

### Guest-first

The homepage should immediately answer:

- Where are the cabins?
- What kind of stays are offered?
- How can I find one suitable for my group?
- Who manages the stay?

### Progressive disclosure

Show the highest-value search inputs first. Place secondary amenities in a filter panel rather than overloading the homepage control.

### Transparent status

Phase 1 must clearly distinguish preferred dates from confirmed availability.

### One coherent brand

Property pages should feel like part of one managed portfolio, not separate owner microsites.

### Mobile-first decisions

Mobile search, filters, gallery, and conversion actions must be intentionally designed rather than compressed desktop layouts.

## 4. Search interaction

### Desktop

Recommended pattern:

- compact segmented search bar;
- location, dates, and guests as primary segments;
- search action at the end;
- focused popover or dialog for each segment;
- filters on the results page.

### Mobile

Recommended pattern:

- prominent search summary button;
- full-screen sheet or structured multi-step panel;
- single-column calendar;
- sticky apply/search action;
- separate filter sheet.

### Search commitment

Draft interactions may remain local while a popover is open. The URL should update when the user applies the search or filter changes.

## 5. Date picker behaviour

Phase 1 date logic is limited to local validity:

- check-in cannot be in the past if the business requires future enquiries;
- checkout must follow check-in;
- selected range is visible;
- clear/reset is available;
- month navigation works by keyboard;
- selected dates are announced to assistive technology;
- mobile scroll position is predictable;
- dates are preserved between search and property pages.

Do not use invented disabled dates or minimum-stay rules.

Use copy such as:

- Preferred check-in
- Preferred check-out
- Check these dates
- Continue to confirm availability

## 6. Guest selector

The Phase 1 selector may use one total guest count unless separate adult/child values are required by the enquiry process.

Requirements:

- minimum and maximum values are clear;
- increase/decrease controls have accessible names;
- capacity filter uses the total consistently;
- the summary remains understandable on mobile.

## 7. Filter behaviour

Recommended initial filters:

- location;
- guests/capacity;
- bedrooms;
- property type;
- hot tub;
- mountain view;
- pool;
- pet friendly.

Rules:

- Boolean amenities combine with AND across selected filters.
- A property must meet the requested minimum capacity and bedrooms.
- Locations use exact structured values.
- Active filters are visible as removable chips or a clear summary.
- Clear all returns to the base results state without losing preferred dates unless the user explicitly clears them.
- Results update predictably, with an announcement for screen readers.

## 8. Property cards

Prioritize:

1. Strong image.
2. Property name and town.
3. Bedrooms, bathrooms, and sleeps.
4. Two to four distinguishing amenities.
5. Approved price or booking-status language.
6. Clear View Property action.

Avoid long descriptions inside the result grid.

Possible card states:

- standard;
- featured;
- new;
- enquiry only;
- external booking;
- content incomplete in admin only, never public.

## 9. Property page conversion panel

Phase 1 panel contents:

- preferred dates;
- guest count;
- reminder that availability will be confirmed;
- enquiry or external handoff action;
- phone/contact alternative.

On mobile, the primary action may be sticky, but it must not cover content or create focus problems.

## 10. Gallery

Requirements:

- responsive image sizes;
- meaningful image order;
- thumbnails or image count where useful;
- accessible open/close and previous/next controls;
- focus trapping in modal mode;
- Escape closes;
- focus returns to the triggering control;
- image captions/alt text when information is meaningful.

A simple gallery is preferable to an elaborate carousel for the lean launch.

## 11. Owner experience

The owner section should use a distinct content voice while remaining part of the same brand.

It should emphasize:

- local operations;
- existing cleaning expertise;
- reduced owner workload;
- guest communication;
- listing and channel management;
- direct website exposure;
- a clear consultation process.

Avoid unsupported earnings promises and guaranteed ranking claims.

## 12. Component inventory

### Navigation

- Header
- Desktop navigation
- Mobile drawer
- Breadcrumbs
- Footer

### Search

- SearchBar
- LocationSelect
- DateRangePicker
- GuestSelector
- FilterPanel
- FilterChip
- SortSelect
- SearchSummary

### Property

- PropertyCard
- PropertyGrid
- PropertyGallery
- PropertyFacts
- AmenityList
- PropertyDescription
- ImportantNotice
- BookingIntentPanel
- RelatedProperties

### Content

- Hero
- SectionHeading
- RichText
- FeatureGrid
- Testimonial
- FAQAccordion
- CTASection

### Forms

- GuestEnquiryForm
- OwnerLeadForm
- FieldError
- FormSuccess
- FormFailure

### System states

- LoadingState
- EmptyState
- ErrorState
- NotFoundState

## 13. Required states

Every interactive feature should consider:

- default;
- hover where relevant;
- focus;
- active/selected;
- disabled;
- loading;
- validation error;
- network/server error;
- success;
- empty data;
- missing optional media.

## 14. Accessibility baseline

- Semantic regions and headings.
- One clear page-level heading.
- Visible keyboard focus.
- No keyboard traps outside intentional dialogs.
- Form labels remain visible.
- Errors are linked to fields.
- Results updates are announced politely.
- Popovers and dialogs have accessible names.
- Body scroll and focus are managed when overlays open.
- Colour is not the sole indicator.
- Touch targets are large enough for mobile use.
- Motion is restrained and respects user preferences.

## 15. Design sign-off artifacts

Before full implementation, approve:

- homepage desktop and mobile direction;
- results desktop and mobile;
- property detail desktop and mobile;
- property management page;
- search and date interactions;
- core tokens and components;
- empty/error states.

Do not require a unique high-fidelity design for every CMS page before building reusable templates.
