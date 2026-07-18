# Source Notes

Last reviewed: 2026-07-18.

These links support the reconnaissance and platform direction. Vendor capabilities must be rechecked during selection and contract review.

## Reference website

- Homepage: https://www.cabinsforyou.com/
- Search/results: https://www.cabinsforyou.com/cabins-by-sleeps.php
- Representative property: https://www.cabinsforyou.com/point-of-grace.htm
- Property management: https://www.cabinsforyou.com/property-management
- Policies: https://www.cabinsforyou.com/asp/policies.asp

Observed public patterns include location/bedroom/amenity navigation, dates and filters, property cards, property details, owner acquisition, and future quote/booking options.

## Payload CMS

- What is Payload: https://payloadcms.com/docs/getting-started/what-is-payload
- Admin panel: https://payloadcms.com/docs/admin/overview
- REST API: https://payloadcms.com/docs/rest-api/overview
- Local API: https://payloadcms.com/docs/local-api/overview
- Uploads: https://payloadcms.com/docs/upload/overview
- Jobs: https://payloadcms.com/docs/jobs-queue/jobs
- Deployment: https://payloadcms.com/docs/production/deployment
- Installation: https://payloadcms.com/docs/getting-started/installation

Payload is used in this plan as the provisional Phase 1 CMS/application backend. Its official documentation describes a Next.js-native admin/backend with database, APIs, auth, access control, uploads, and jobs.

## Directus alternative

- Data Studio: https://docs.directus.io/user-guide/overview/data-studio-app
- Flows: https://docs.directus.io/app/flows
- Files: https://docs.directus.io/reference/files

Directus remains a viable alternative if a more no-code data studio and separately hosted backend is preferred.

## Vacation-rental platform examples

### Lodgify

- Main product: https://www.lodgify.com/
- Booking widget: https://www.lodgify.com/vacation-rental-booking-widget/

Its official site describes an all-in-one vacation-rental platform with channel management, calendars, direct booking website/engine, payments, and guest operations. API depth for a fully custom frontend must be verified.

### Guesty

- Reservation flow: https://open-api-docs.guesty.com/docs/reservations-v3-booking-flow
- Reservation creation: https://open-api-docs.guesty.com/docs/create-a-reservation

Guesty's official API documentation describes quote and reservation workflows suitable for a future custom booking integration.

### Hostaway

- Public API: https://api.hostaway.com/documentation

The public API documentation describes listing, reservation, and listing-calendar operations.

### OwnerRez

- Pricing/features: https://www.ownerrez.com/pricing
- Support/API and channel documentation: https://www.ownerrez.com/support

OwnerRez advertises channel management and property-management features. Exact custom website API capability requires a vendor spike.

## Research interpretation

- Generic CMS products can centralize Phase 1 content and property metadata.
- Vacation-rental PMS/channel platforms are the correct category for future authoritative calendar, rate, reservation, and OTA synchronization.
- The project should not assume direct unrestricted access to Airbnb inventory or APIs.
- The project should not use iCal alone as the primary architecture for instant direct booking.
