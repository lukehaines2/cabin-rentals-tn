import path from 'node:path'

import { getPayload } from 'payload'

import { fixtureProperties } from '@/fixtures/properties'
import { getServerEnv } from '@/lib/env/server'
import config from '@/payload.config'
import { PayloadPropertyProvider } from '@/providers/payload/property-provider'

const env = getServerEnv()

if (!env.DEMO_CONTENT_ENABLED) {
  throw new Error(
    'The demo seed is disabled. Set DEMO_CONTENT_ENABLED=true only in local or protected staging environments.',
  )
}

const adminValues = [
  env.SEED_ADMIN_EMAIL,
  env.SEED_ADMIN_PASSWORD,
  env.SEED_ADMIN_NAME,
]
if (adminValues.some(Boolean) && !adminValues.every(Boolean)) {
  throw new Error(
    'SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, and SEED_ADMIN_NAME must be supplied together.',
  )
}

const payload = await getPayload({ config })

const locationSeeds = [
  {
    name: 'Gatlinburg',
    slug: 'gatlinburg',
    kind: 'town' as const,
    town: 'gatlinburg' as const,
    summary: 'Fictional demo location content for the Gatlinburg area.',
  },
  {
    name: 'Pigeon Forge',
    slug: 'pigeon-forge',
    kind: 'town' as const,
    town: 'pigeon-forge' as const,
    summary: 'Fictional demo location content for the Pigeon Forge area.',
  },
  {
    name: 'Sevierville',
    slug: 'sevierville',
    kind: 'town' as const,
    town: 'sevierville' as const,
    summary: 'Fictional demo location content for the Sevierville area.',
  },
  {
    name: 'Wears Valley',
    slug: 'wears-valley',
    kind: 'area' as const,
    town: 'sevierville' as const,
    summary:
      'Fictional demo location content for Wears Valley near Sevierville.',
  },
]

const amenitySeeds = [
  ['Hot tub', 'hot-tub', 'wellness', true, 10],
  ['Mountain view', 'mountain-view', 'view', true, 20],
  ['Pool', 'pool', 'leisure', true, 30],
  ['Pet friendly', 'pet-friendly', 'guest-policy', true, 40],
  ['Fireplace', 'fireplace', 'interior', false, 50],
  ['Game room', 'game-room', 'leisure', false, 60],
] as const

const propertyTypeSeeds = [
  ['Cabin', 'cabin'],
  ['Chalet', 'chalet'],
  ['Lodge', 'lodge'],
] as const

const assetAlts: Record<string, string> = {
  'cabin-rentals-tn-art-direction-morning':
    'Demo art-direction study of a fictional mountain cabin in morning light',
  'cabin-rentals-tn-art-direction-mist':
    'Demo art-direction study of a fictional mountain cabin in mist',
  'cabin-rentals-tn-art-direction-autumn':
    'Demo art-direction study of a fictional mountain cabin in autumn',
  'demo-laurel-glass-cabin':
    'Fictional glass-fronted demo cabin among wooded mountains',
  'demo-laurel-glass-living-room':
    'Fictional demo cabin living room with large windows',
  'demo-laurel-glass-bedroom':
    'Fictional demo cabin bedroom with woodland outlook',
  'demo-laurel-glass-deck':
    'Fictional demo cabin deck overlooking wooded hills',
  'demo-laurel-glass-dusk': 'Fictional demo cabin exterior at dusk',
  'demo-hemlock-house': 'Fictional compact demo cabin beneath hemlock trees',
  'demo-blue-ridge-hearth':
    'Fictional hillside demo chalet with broad mountain windows',
  'demo-fern-hollow-retreat':
    'Fictional secluded demo cabin surrounded by ferns',
  'demo-riverbend-timber':
    'Fictional large timber demo lodge near a wooded river bend',
  'demo-copper-ridge-cabin':
    'Fictional warm-toned demo cabin on a mountain ridge',
  'demo-moss-and-moon-lodge':
    'Fictional expansive demo lodge beneath a moonlit ridge',
  'demo-cedar-vale': 'Fictional cedar-clad demo chalet in a green valley',
  'demo-little-pigeon-lookout':
    'Fictional elevated demo cabin overlooking layered hills',
  'demo-wears-valley-rest': 'Fictional peaceful demo cabin in Wears Valley',
}

async function findBySlug(
  collection: 'locations' | 'amenities' | 'property-types' | 'properties',
  slug: string,
) {
  const result = await payload.find({
    collection,
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  })
  return result.docs[0]
}

const locationIds = new Map<string, number>()
for (const location of locationSeeds) {
  const existing = await findBySlug('locations', location.slug)
  const data = { ...location, active: true, isDemo: true }
  const document =
    existing && existing.isDemo
      ? await payload.update({
          collection: 'locations',
          id: existing.id,
          data,
          overrideAccess: true,
        })
      : (existing ??
        (await payload.create({
          collection: 'locations',
          data,
          overrideAccess: true,
        })))
  locationIds.set(location.slug, document.id)
}

const wearsValleyId = locationIds.get('wears-valley')
const seviervilleId = locationIds.get('sevierville')
if (wearsValleyId && seviervilleId) {
  await payload.update({
    collection: 'locations',
    id: wearsValleyId,
    data: { parent: seviervilleId },
    overrideAccess: true,
  })
}

const amenityIds = new Map<string, number>()
for (const [name, slug, category, filterable, displayOrder] of amenitySeeds) {
  const existing = await findBySlug('amenities', slug)
  const data = {
    name,
    slug,
    category,
    filterable,
    featured: filterable,
    displayOrder,
    active: true,
    isDemo: true,
  }
  const document =
    existing && existing.isDemo
      ? await payload.update({
          collection: 'amenities',
          id: existing.id,
          data,
          overrideAccess: true,
        })
      : (existing ??
        (await payload.create({
          collection: 'amenities',
          data,
          overrideAccess: true,
        })))
  amenityIds.set(slug, document.id)
}

const propertyTypeIds = new Map<string, number>()
for (const [name, slug] of propertyTypeSeeds) {
  const existing = await findBySlug('property-types', slug)
  const data = { name, slug, active: true, isDemo: true }
  const document =
    existing && existing.isDemo
      ? await payload.update({
          collection: 'property-types',
          id: existing.id,
          data,
          overrideAccess: true,
        })
      : (existing ??
        (await payload.create({
          collection: 'property-types',
          data,
          overrideAccess: true,
        })))
  propertyTypeIds.set(slug, document.id)
}

const mediaIds = new Map<string, number>()
for (const [assetName, alt] of Object.entries(assetAlts)) {
  const filename = `${assetName}.png`
  const existingResult = await payload.find({
    collection: 'media',
    limit: 1,
    depth: 0,
    overrideAccess: true,
    where: { filename: { equals: filename } },
  })
  const existing = existingResult.docs[0]
  const metadata = {
    alt,
    sourceMethod: 'ai-generated' as const,
    licenseRecord:
      'Generated 2026-07-18 using Cursor image generation for fictional, non-indexed demo use. Manual replacement and business approval are required before launch.',
    approvalStatus: 'approved' as const,
    contentOwner: 'DEEP project demo fixtures',
    requiredReplacement: true,
    isDemo: true,
  }

  const document = existing
    ? existing.isDemo
      ? await payload.update({
          collection: 'media',
          id: existing.id,
          data: metadata,
          overrideAccess: true,
        })
      : existing
    : await payload.create({
        collection: 'media',
        data: metadata,
        filePath: path.resolve(
          process.cwd(),
          'fixtures',
          'assets',
          'originals',
          filename,
        ),
        overrideAccess: true,
      })
  mediaIds.set(assetName, document.id)
}

for (const property of fixtureProperties) {
  const existing = await findBySlug('properties', property.slug)
  const locationId = locationIds.get(property.location.slug)
  const propertyTypeId = propertyTypeIds.get(property.propertyType.slug)
  const heroImageId = mediaIds.get(
    property.hero.url.split('/').at(-1)?.replace('.webp', '') ?? '',
  )
  const propertyAmenityIds = property.amenities.map((amenity) =>
    amenityIds.get(amenity.slug),
  )
  const gallery = property.gallery.map((image) => ({
    image: mediaIds.get(
      image.url.split('/').at(-1)?.replace('.webp', '') ?? '',
    ),
  }))

  if (
    !locationId ||
    !propertyTypeId ||
    !heroImageId ||
    propertyAmenityIds.some((id) => !id) ||
    gallery.some((item) => !item.image)
  ) {
    throw new Error(
      `Fixture relationships are incomplete for ${property.slug}.`,
    )
  }

  const data = {
    name: property.name,
    slug: property.slug,
    internalId: property.internalId,
    listingStatus: 'active' as const,
    featured: property.featured,
    location: locationId,
    propertyType: propertyTypeId,
    maxGuests: property.maxGuests,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    amenities: propertyAmenityIds as number[],
    heroImage: heroImageId,
    gallery: gallery as { image: number }[],
    summary: property.summary,
    description: property.description,
    conversionAction: property.conversionAction,
    contentOwner: 'DEEP project demo fixtures',
    approvalStatus: 'approved-demo' as const,
    isDemo: true,
    _status: 'published' as const,
  }

  if (existing && !existing.isDemo) {
    continue
  }

  if (existing) {
    await payload.update({
      collection: 'properties',
      id: existing.id,
      data,
      draft: false,
      context: { skipRevalidation: true },
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: 'properties',
      data,
      draft: false,
      context: { skipRevalidation: true },
      overrideAccess: true,
    })
  }
}

await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    brandName: 'Cabin Rentals TN — Fictional Demo',
    contact: {
      email: 'demo@example.test',
      phone: '+1 865 555 0100',
    },
    demoNotice: {
      enabled: true,
      message:
        'Fictional demonstration content. No availability, prices, addresses, or bookings are represented.',
    },
    defaultSeo: {
      title: 'Fictional Tennessee Cabin Demo',
      description:
        'Non-indexed fictional cabin discovery fixtures for local development and protected staging.',
      socialImage: mediaIds.get('demo-laurel-glass-cabin'),
    },
  },
  overrideAccess: true,
})

if (env.SEED_ADMIN_EMAIL && env.SEED_ADMIN_PASSWORD && env.SEED_ADMIN_NAME) {
  const existingAdmin = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: env.SEED_ADMIN_EMAIL } },
  })

  if (existingAdmin.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: env.SEED_ADMIN_EMAIL,
        password: env.SEED_ADMIN_PASSWORD,
        name: env.SEED_ADMIN_NAME,
        roles: ['admin'],
        status: 'active',
      },
      overrideAccess: true,
    })
  }
}

const counts = {
  locations: await payload.count({
    collection: 'locations',
    overrideAccess: true,
    where: { isDemo: { equals: true } },
  }),
  amenities: await payload.count({
    collection: 'amenities',
    overrideAccess: true,
    where: { isDemo: { equals: true } },
  }),
  propertyTypes: await payload.count({
    collection: 'property-types',
    overrideAccess: true,
    where: { isDemo: { equals: true } },
  }),
  media: await payload.count({
    collection: 'media',
    overrideAccess: true,
    where: { isDemo: { equals: true } },
  }),
  properties: await payload.count({
    collection: 'properties',
    overrideAccess: true,
    where: { isDemo: { equals: true } },
  }),
  guestEnquiries: await payload.count({
    collection: 'guest-enquiries',
    overrideAccess: true,
  }),
  users: await payload.count({
    collection: 'users',
    overrideAccess: true,
  }),
}

const publicProperties = await payload.find({
  collection: 'properties',
  limit: 100,
  overrideAccess: false,
})
const propertyProvider = new PayloadPropertyProvider(payload)
const representativeProperty =
  await propertyProvider.findBySlug('laurel-glass-cabin')
const unknownProperty = await propertyProvider.findBySlug('not-a-real-property')

if (!representativeProperty || unknownProperty !== null) {
  throw new Error('Public property provider verification failed.')
}

let publicGuestEnquiries: number | 'denied' = 'denied'
try {
  const publicEnquiries = await payload.find({
    collection: 'guest-enquiries',
    limit: 1,
    overrideAccess: false,
  })
  publicGuestEnquiries = publicEnquiries.totalDocs
} catch {
  publicGuestEnquiries = 'denied'
}

console.info('Demo seed complete', {
  counts: Object.fromEntries(
    Object.entries(counts).map(([key, value]) => [key, value.totalDocs]),
  ),
  access: {
    publicPublishedActiveProperties: publicProperties.totalDocs,
    representativeSlug: representativeProperty.slug,
    unknownSlug: unknownProperty,
    publicGuestEnquiries,
  },
})

await payload.destroy()
process.exit(0)
