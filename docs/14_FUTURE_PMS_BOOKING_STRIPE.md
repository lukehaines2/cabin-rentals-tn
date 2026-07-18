# Future PMS, Calendar, Booking, and Stripe Plan

## 1. This document is future scope

Nothing in this document should be implemented as part of the simple Phase 1 unless the scope is formally changed.

Phase 1 should expose stable provider interfaces and avoid decisions that make later integration unnecessarily difficult.

## 2. CMS versus PMS

A normal CMS manages content, pages, media, and structured records. It does not automatically provide reliable Airbnb/Vrbo channel synchronization, booking restrictions, quotes, reservations, or operational calendars.

A vacation-rental PMS/channel manager is the appropriate category for:

- channel connections;
- availability;
- minimum stays and restrictions;
- rates, fees, and taxes;
- reservations;
- cancellations and modifications;
- guest operations;
- owner statements and management operations where supported.

The future target should use one authoritative PMS rather than direct integrations from the website to every OTA.

## 3. Do all-in-one platforms exist?

Yes. Vacation-rental platforms exist that combine several of these capabilities in one system.

Examples to evaluate, not preselected vendors:

- Lodgify - markets a channel manager, unified calendar, direct booking website/engine, payments, and guest operations.
- Guesty - provides listing, availability, quote, and reservation APIs for custom booking flows.
- Hostaway - exposes listings, reservations, and listing calendar operations through a public API.
- OwnerRez - provides channel management, booking, property-management, and owner-operation capabilities.
- Streamline - appears relevant to the reference site's guest ecosystem and should be evaluated if it fits the new business.
- Hostfully and other approved channel platforms may also be considered.

These platforms are better described as PMS/channel-management or vacation-rental operating platforms than generic CMS products.

## 4. Recommended long-term architecture

```text
Guests
  |
  v
Custom branded Next.js website
  |-- Payload editorial content and search read model
  |-- custom search and property pages
  |-- future quote and checkout UI
  |
  v
Server-side booking adapter/orchestrator
  |
  v
Authoritative PMS/channel manager
  |-- properties and channel IDs
  |-- availability and blocks
  |-- stay restrictions
  |-- rates, fees, and taxes
  |-- quotes and reservations
  |-- Airbnb/Vrbo/Booking.com synchronization
  |
  +--> Stripe or PMS payment integration, if supported
```

## 5. Possible future operating models

### Model A - Hosted booking engine

Custom site handles discovery and property pages. The PMS provides live calendar, quote, and checkout.

Best for:

- lowest risk;
- faster launch;
- limited custom checkout budget.

Trade-off:

- less UX and brand control.

### Model B - Hybrid

Custom site and search use PMS property/availability data. Final quote and payment are hosted by the vendor.

Best for:

- custom discovery;
- reduced booking-risk responsibility.

### Model C - Fully custom frontend over PMS API

Custom site handles availability UI, quote display, guest details, and Stripe, while the PMS remains authoritative for reservation inventory.

Best for:

- highest brand and UX control.

Trade-off:

- highest integration and failure-handling complexity.

The currently preferred target is Model B or C after a vendor spike.

## 6. PMS vendor capability checklist

Do not select a vendor only because it advertises calendar sync.

Require evidence for:

1. Retrieve all managed properties.
2. Retrieve content fields needed by the website.
3. Retrieve daily availability.
4. Return check-in/check-out restrictions.
5. Return minimum and maximum stays.
6. Return exact rates, fees, discounts, and taxes.
7. Create a quote with expiry.
8. Create/release an inventory hold if needed.
9. Create a reservation idempotently.
10. Modify and cancel reservations.
11. Receive reliable webhooks.
12. Map and synchronize Airbnb, Vrbo, and Booking.com.
13. Provide a sandbox.
14. Document API limits and support.
15. Permit a custom direct-booking frontend contractually.
16. Support external Stripe or clarify required payment rails.
17. Expose booking source and property/owner attribution.
18. Provide operational fallback during channel outages.

## 7. Why iCal is not enough

An iCal feed is useful for exchanging blocked dates with systems that lack better integrations.

It is not a complete instant-booking protocol. It normally does not provide:

- exact prices;
- fees and taxes;
- minimum-stay logic;
- holds;
- payment state;
- reservation acknowledgement;
- guest details;
- modifications and refunds;
- guaranteed immediate cross-channel consistency.

Use iCal only as an approved fallback, not the primary architecture for instant direct booking.

## 8. Future property data ownership

Likely ownership split:

### PMS owns

- operational property ID;
- availability and blocks;
- stay restrictions;
- exact pricing;
- taxes and fees;
- reservations;
- channel mappings;
- cancellation and modification state.

### Payload owns

- brand-specific title and description;
- long-form editorial copy;
- SEO fields;
- curated image order or editorial overrides where appropriate;
- destination and feature pages;
- owner marketing;
- content publication state.

### Synchronization layer

- maps PMS IDs to public property IDs;
- updates operational summary data;
- receives webhooks;
- retries failed events;
- records sync status;
- invalidates cached search data.

## 9. Future availability contract

A future normalized response should support more than available/unavailable:

```ts
type DateAvailability = {
  date: string;
  status: 'available' | 'unavailable' | 'restricted';
  canCheckIn: boolean;
  canCheckOut: boolean;
  minStay?: number;
  maxStay?: number;
  nightlyPriceHint?: number;
  reason?: string;
};
```

The PMS remains authoritative even if the public site caches summaries.

## 10. Future booking state machine

```text
SEARCHED
-> PROPERTY_SELECTED
-> QUOTE_CREATED
-> AVAILABILITY_REVALIDATED
-> INVENTORY_HELD
-> GUEST_DETAILS_ACCEPTED
-> PAYMENT_AUTHORIZED
-> RESERVATION_CREATED
-> PAYMENT_CAPTURED
-> CONFIRMED
```

Failure states must include:

- quote expired;
- property unavailable;
- payment declined;
- payment authorized but reservation failed;
- reservation created but capture failed;
- duplicate submission;
- webhook delay;
- manual review.

## 11. Stripe later

The project lead currently intends to implement Stripe later.

Before that work begins, confirm:

- the selected PMS permits external Stripe payment orchestration;
- who is merchant of record;
- whether payment is full, deposit, or installments;
- whether stored payment methods are required;
- whether security deposits are authorized or charged;
- how refunds and chargebacks are handled;
- whether payment success must precede or follow reservation creation;
- how payment and reservation failures are reconciled.

Future Stripe implementation should use:

- server-created PaymentIntents or the appropriate current Stripe flow;
- provider-hosted fields/elements;
- idempotency keys;
- verified webhooks;
- replay-safe handlers;
- correlation IDs;
- compensation logic when reservation creation fails;
- no raw card data in application storage or logs.

Do not implement Stripe before the PMS contract and booking state machine are known.

## 12. Phase 2 discovery spike

Before committing to a fixed booking build, prove these in a sandbox:

1. Property import.
2. Availability request.
3. Restriction request.
4. Exact quote.
5. Hold or conflict strategy.
6. Test reservation creation.
7. Incoming channel booking webhook.
8. Direct booking reflected across channels.
9. Cancellation/update event.
10. Stripe authorization and void path if external payment is supported.

## 13. Future acceptance criteria

A future live booking release should not launch until:

- search availability is authoritative enough for the agreed claim;
- the final quote is server-generated;
- inventory is revalidated before payment/reservation;
- duplicate requests cannot create duplicate bookings or charges;
- a direct reservation appears in the PMS exactly once;
- incoming OTA reservations invalidate direct availability within the agreed SLA;
- payment/reservation mismatches are detectable and recoverable;
- support staff have an operational exception process;
- every transaction has traceable IDs and logs.

## 14. Official research links

See `18_SOURCE_NOTES.md` for current official documentation links used to support this planning direction.
