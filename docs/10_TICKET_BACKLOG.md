# Phase 1 Ticket Backlog

Each ticket should be refined against the actual repository before implementation.

## Epic A - Project setup

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| A-01 | Confirm Phase 1 booking mode | Client decision | `enquiry` or approved external mode is recorded |
| A-02 | Confirm initial filter list | Client decision | Stable slugs and visible labels are approved |
| A-03 | Confirm property content source | Client decision | Real or fixture content policy is recorded |
| A-04 | Create architecture decision for hosting | None | App, DB, media, email, and preview approach are documented |
| A-05 | Initialize application repository | A-04 | Local app, lint, typecheck, test, and build commands work |
| A-06 | Configure CI | A-05 | Pull requests run typecheck, lint, tests, and build |
| A-07 | Configure preview deployment | A-04, A-05 | A branch or PR can produce a protected preview |
| A-08 | Add environment validation | A-05 | Missing or invalid environment variables fail clearly |
| A-09 | Create implementation status tracker | A-05 | Current phase, tickets, blockers, and decisions are visible |

## Epic B - Design foundation

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| B-01 | Define design tokens | Brand input | Tokens cover type, spacing, radii, shadows, and semantic colours |
| B-02 | Build layout primitives | B-01 | Containers, stacks, grids, and sections are reusable |
| B-03 | Build button and link primitives | B-01 | Variants have keyboard, focus, loading, and disabled states |
| B-04 | Build form primitives | B-01 | Labels, hints, errors, and required states are consistent |
| B-05 | Build dialog/sheet primitive | B-03 | Focus trap, Escape, close, and focus return work |
| B-06 | Build site header | B-02, B-03 | Desktop navigation and guest CTA work |
| B-07 | Build mobile navigation | B-05, B-06 | Mobile menu is keyboard and touch usable |
| B-08 | Build footer | B-02 | Guest, owner, legal, and contact links are structured |
| B-09 | Build system states | B-02 | Loading, empty, error, and not-found components exist |

## Epic C - Payload and data

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| C-01 | Install and configure Payload | A-05, A-04 | Admin and public app run in one project |
| C-02 | Configure database adapter | C-01 | Local migrations and production connection are documented |
| C-03 | Create Users and roles | C-01 | Admin and editor permissions are enforced |
| C-04 | Create Media collection | C-01 | Upload restrictions, alt text, and image sizes are configured |
| C-05 | Create Locations collection | C-01 | Three initial towns can be managed and published |
| C-06 | Create Amenities collection | C-01 | Filterable amenities use stable slugs |
| C-07 | Create Property Types collection | C-01 | Only approved types can be selected |
| C-08 | Create Properties collection | C-04 to C-07 | Required fields, status, gallery, booking mode, and SEO exist |
| C-09 | Create Pages and Settings | C-01 | Core public content and contact details are editable |
| C-10 | Create Guest Enquiries | C-01 | Public create is controlled; public read is denied |
| C-11 | Create Owner Leads | C-01 | Public create is controlled; public read is denied |
| C-12 | Create Redirects | C-01 | Active path redirects can be managed |
| C-13 | Build CMS-to-domain mappers | C-08 | Public code receives validated domain objects |
| C-14 | Add fixture seed | C-05 to C-08 | Ten fictional varied properties load repeatably |
| C-15 | Add CMS preview/draft rules | C-08, C-09 | Draft content can be reviewed without public exposure |
| C-16 | Write editor workflow | C-03 to C-15 | Staff can create, preview, publish, hide, and archive |

## Epic D - Search and guest journey

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| D-01 | Define search query schema | A-02 | All query fields, defaults, and validation are documented |
| D-02 | Build search URL parser/serializer | D-01 | Valid state round-trips and invalid state fails safely |
| D-03 | Build location selector | C-05, B-04 | Published locations are selectable and accessible |
| D-04 | Build date range picker | B-05 | Local date validity, clear, keyboard, and mobile behaviour work |
| D-05 | Build guest selector | B-04 | Min/max and accessible stepper behaviour work |
| D-06 | Build homepage search bar | D-02 to D-05 | Submit navigates to a reproducible results URL |
| D-07 | Build property search service | C-13, D-01 | Location, capacity, bedrooms, type, and amenity logic is tested |
| D-08 | Build results page shell | B-02, D-02, D-07 | Search summary, results, and count render server-side |
| D-09 | Build property card | C-13, B-03 | Card displays approved scan information and fallbacks |
| D-10 | Build result grid | D-08, D-09 | Published matching properties render responsively |
| D-11 | Build filter panel | D-01, B-04 | Approved filters update URL and results |
| D-12 | Build mobile filter sheet | B-05, D-11 | Mobile apply, clear, focus, and scroll behaviour work |
| D-13 | Build active filter chips | D-11 | Individual and global clear actions work |
| D-14 | Build optional sort | D-07 | Approved sort options are stable and tested |
| D-15 | Build empty results state | D-10 | User can reset or broaden search without losing context unexpectedly |
| D-16 | Announce result updates | D-10 | Screen readers receive a concise result-count update |
| D-17 | Test URL restoration | D-02 to D-16 | Refresh, copy URL, Back, and Forward are verified |

## Epic E - Property detail and conversion

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| E-01 | Create property route | C-13 | Active slug resolves; non-public slug is not found |
| E-02 | Build property hero/facts | E-01, B-02 | Name, location, capacity, bedrooms, bathrooms, and highlights render |
| E-03 | Build property gallery | C-04, E-01, B-05 | Responsive media and accessible modal controls work |
| E-04 | Build amenity sections | E-01 | Structured amenities render by category or approved order |
| E-05 | Build description and notices | E-01 | Rich content is safe and readable |
| E-06 | Build booking intent panel | D-02, E-01 | Preferred dates and guests persist; availability disclaimer is clear |
| E-07 | Build guest enquiry form | C-10, E-06 | Valid submission stores a lead and returns success |
| E-08 | Add form anti-abuse control | E-07 | Obvious automated abuse is mitigated and monitored |
| E-09 | Add external booking mode | A-01, E-06 | Approved external URLs open with clear handoff wording |
| E-10 | Add related properties | E-01, D-07 | Optional related records exclude current property and remain relevant |
| E-11 | Add property metadata | E-01 | Unique title, description, canonical, and social image render |
| E-12 | Add property journey E2E test | E-01 to E-09 | Search -> property -> enquiry/handoff passes |

## Epic F - Guest marketing pages

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| F-01 | Build homepage template | B-06 to B-09, D-06, D-09 | Search, featured properties, locations, trust, and owner teaser render |
| F-02 | Build destination template | C-05, D-07 | Unique content and matching properties render |
| F-03 | Publish Gatlinburg page | F-02 | Approved content and matching inventory are present |
| F-04 | Publish Pigeon Forge page | F-02 | Approved content and matching inventory are present |
| F-05 | Publish Sevierville page | F-02 | Approved content and matching inventory are present |
| F-06 | Build feature template | C-06, D-07 | Selected amenity content and inventory render |
| F-07 | Publish approved feature pages | F-06 | Only pages supported by content and inventory go live |
| F-08 | Build FAQ component | B-03, C-09 | Accessible FAQ content is CMS editable |

## Epic G - Property owner funnel

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| G-01 | Approve owner proposition and claims | Client decision | Final service claims and CTA are documented |
| G-02 | Build property management page | B-02, C-09, G-01 | Service, local proof, direct distribution, and CTA render |
| G-03 | Build owner process section | G-01 | Enquiry-to-onboarding steps are understandable |
| G-04 | Build owner FAQ | F-08, G-01 | Approved answers are editable and accessible |
| G-05 | Build owner lead form | C-11, B-04 | Valid lead is stored with source data |
| G-06 | Add owner form anti-abuse | G-05 | Abuse control and server error handling work |
| G-07 | Build owner lead success state | G-05 | User knows what happens next without unsupported promises |
| G-08 | Add owner funnel E2E test | G-02 to G-07 | Property management -> lead submission passes |

## Epic H - SEO, analytics, and quality

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| H-01 | Build shared metadata utility | C-09 | Page templates produce approved metadata defaults |
| H-02 | Generate sitemap | F and G routes | Only public canonical pages appear |
| H-03 | Configure robots and staging noindex | A-07 | Preview/admin/demo are excluded |
| H-04 | Add breadcrumbs | E, F, G routes | Hierarchy is semantic and consistent |
| H-05 | Add validated structured data | H-01 | Only accurate supported schema is emitted |
| H-06 | Add analytics boundary | A-05 | Events can be sent without coupling components to a vendor |
| H-07 | Instrument guest events | D, E | Search, property, enquiry, and handoff events fire once |
| H-08 | Instrument owner events | G | Owner page and lead events fire without PII |
| H-09 | Add security headers | A-05 | Production responses use approved baseline headers |
| H-10 | Audit public CMS access | C | No lead, draft, user, or admin data is publicly readable |
| H-11 | Optimize images and fonts | E, F | Primary pages avoid oversized assets and layout shift |
| H-12 | Run accessibility audit | All core flows | Critical and serious blockers are resolved or documented |
| H-13 | Run performance audit | All core templates | Agreed budgets are met or approved exceptions exist |

## Epic I - Content, launch, and handover

| ID | Ticket | Depends on | Done when |
|---|---|---|---|
| I-01 | Receive authorized property pack | Client | Images, facts, copy, and approval are complete |
| I-02 | Import real properties | I-01, C | Records validate and preview correctly |
| I-03 | Complete destination content | Client, F | Three location pages have approved unique copy |
| I-04 | Complete owner content | Client, G | Claims, FAQ, and CTA are approved |
| I-05 | Complete legal pages | Client/legal | Privacy and terms are approved and published |
| I-06 | Cross-browser and responsive QA | All | Supported browser and viewport matrix passes |
| I-07 | Test all forms in production-like environment | E, G | Storage, notifications, failures, and privacy are verified |
| I-08 | Configure production domain | A-04 | DNS, HTTPS, and canonical host work |
| I-09 | Configure backups and recovery | A-04, C | DB/media backup and restore process are documented |
| I-10 | Complete client acceptance test | I-02 to I-09 | Signed issues are resolved or deferred explicitly |
| I-11 | Launch production | I-10 | Smoke tests, sitemap, analytics, forms, and noindex settings pass |
| I-12 | Deliver editor handover | C-16, I-11 | Staff can edit properties, pages, and retrieve leads |
| I-13 | Start defect-support period | I-11 | Support boundary and reporting process are active |
