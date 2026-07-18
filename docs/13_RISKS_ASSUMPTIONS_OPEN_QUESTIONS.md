# Risks, Assumptions, and Open Questions

## 1. Assumptions used for Phase 1 planning

- Approximately ten initial properties.
- One English-language website.
- One primary market region.
- One public brand.
- No guest account.
- No owner account.
- No live availability.
- No PMS or OTA integration.
- No Stripe or other payment processing.
- One central CMS/admin interface.
- Client supplies or approves all public property content and legal copy.
- One named client decision-maker.
- Two structured revision rounds at most.
- The property management lead process can begin with form storage and staff follow-up.
- The site can launch with enquiry or external booking handoff.

## 2. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Client expects the date picker to mean live availability | High | High | Use explicit wording; repeat scope in demos and acceptance criteria |
| Phase 1 expands into booking/payment | High | High | Treat as formal change; use future architecture document |
| No real properties are ready | Medium/High | High | Use non-indexed fixtures; do not fake public inventory |
| Property content rights are unclear | Medium | High | Require written authorization and asset source fields |
| Brand/copy arrives late | High | Medium/High | Use content responsibility matrix and schedule dependency |
| Too many filters are requested | Medium | Medium | Require structured data and approval for each filter |
| CMS becomes over-customized | Medium | Medium | Use generated Payload admin before custom screens |
| Future PMS conflicts with CMS fields | Medium | High | Separate editorial and operational ownership; use provider interfaces |
| Hosting stack becomes fragmented | Medium | Medium | Choose managed deployment and record architecture decision |
| Thin SEO pages are requested | High | Medium | Publish only useful pages with inventory and unique content |
| Mobile/date picker work is underestimated | Medium | Medium | Prototype early and test on real devices |
| Forms attract spam | High | Medium | Server validation, honeypot/rate limit/challenge, monitoring |
| Public CMS permissions expose lead data | Low/Medium | High | Access-control tests and security review |
| Fixture data leaks into production | Medium | High | Environment guards, noindex, production content checklist |
| Client feedback is slow | Medium | Medium | Approval deadlines move delivery dates |
| Custom maps/favourites appear mid-build | Medium | Medium | Scope-cut list and change control |

## 3. Immediate blocking questions

### Q1. What happens after a guest chooses a property?

Options:

- guest enquiry;
- phone/contact;
- external property booking URL;
- hosted booking engine.

Safe default: guest enquiry.

### Q2. Are launch properties real?

Need:

- count;
- owner permission;
- images;
- descriptions;
- current booking route;
- approved facts.

Safe default: fictional non-indexed fixtures until real content is approved.

### Q3. What is the final filter set?

Safe default:

- location;
- guests;
- bedrooms;
- property type;
- hot tub;
- mountain view;
- pool;
- pet friendly.

### Q4. What is the owner CTA?

Safe default: Request a property management consultation.

### Q5. What CMS hosting setup will be used?

Need a decision covering:

- app host;
- database;
- durable media;
- email notification;
- backups;
- preview environments.

### Q6. What brand assets exist?

Need:

- business name;
- logo status;
- colour/type direction;
- domain;
- phone/email/address;
- photography direction.

## 4. Non-blocking questions that can use defaults

- Sort options: default to featured, then name or a stable admin order.
- Related properties: omit if schedule is tight.
- Maps: use simple area context or omit before adding a map vendor.
- Favourites: defer.
- Blog: defer.
- Separate owner town pages: defer.
- User reviews: defer unless the business has authorized review data.
- Price display: omit or use approved `from` text, never fabricated live rates.

## 5. Future questions before PMS phase

- Which PMS/channel manager is authoritative?
- Does it provide listings, availability, restrictions, quotes, holds, reservations, cancellations, and webhooks?
- How are Airbnb and Vrbo connected?
- Is external Stripe payment supported?
- Who is merchant of record?
- What fees and taxes apply?
- Is instant booking required?
- How are booking conflicts handled?
- What guest portal handles post-booking?
- What owner reporting is required?

## 6. Decision escalation format

When a new question appears, record:

- decision needed;
- why it affects users or architecture;
- options;
- recommended default;
- cost/schedule effect;
- deadline for answer.

Add final decisions to `docs/17_DECISION_LOG.md`.
