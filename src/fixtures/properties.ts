import type { PublicLocation } from '@/domain/location'
import type { Amenity, PropertyType, PublicProperty } from '@/domain/property'
import { publicPropertySchema } from '@/domain/property'

const locations = {
  gatlinburg: {
    id: 'location-gatlinburg',
    name: 'Gatlinburg',
    slug: 'gatlinburg',
    kind: 'town',
    town: 'gatlinburg',
    summary: 'Fictional demo location content for the Gatlinburg area.',
  },
  pigeonForge: {
    id: 'location-pigeon-forge',
    name: 'Pigeon Forge',
    slug: 'pigeon-forge',
    kind: 'town',
    town: 'pigeon-forge',
    summary: 'Fictional demo location content for the Pigeon Forge area.',
  },
  sevierville: {
    id: 'location-sevierville',
    name: 'Sevierville',
    slug: 'sevierville',
    kind: 'town',
    town: 'sevierville',
    summary: 'Fictional demo location content for the Sevierville area.',
  },
  wearsValley: {
    id: 'location-wears-valley',
    name: 'Wears Valley',
    slug: 'wears-valley',
    kind: 'area',
    town: 'sevierville',
    summary:
      'Fictional demo location content for Wears Valley near Sevierville.',
  },
} satisfies Record<string, PublicLocation>

const amenities = {
  hotTub: {
    id: 'amenity-hot-tub',
    name: 'Hot tub',
    slug: 'hot-tub',
    filterable: true,
  },
  mountainView: {
    id: 'amenity-mountain-view',
    name: 'Mountain view',
    slug: 'mountain-view',
    filterable: true,
  },
  pool: {
    id: 'amenity-pool',
    name: 'Pool',
    slug: 'pool',
    filterable: true,
  },
  petFriendly: {
    id: 'amenity-pet-friendly',
    name: 'Pet friendly',
    slug: 'pet-friendly',
    filterable: true,
  },
  fireplace: {
    id: 'amenity-fireplace',
    name: 'Fireplace',
    slug: 'fireplace',
    filterable: false,
  },
  gameRoom: {
    id: 'amenity-game-room',
    name: 'Game room',
    slug: 'game-room',
    filterable: false,
  },
} satisfies Record<string, Amenity>

const propertyTypes = {
  cabin: {
    id: 'property-type-cabin',
    name: 'Cabin',
    slug: 'cabin',
  },
  chalet: {
    id: 'property-type-chalet',
    name: 'Chalet',
    slug: 'chalet',
  },
  lodge: {
    id: 'property-type-lodge',
    name: 'Lodge',
    slug: 'lodge',
  },
} satisfies Record<string, PropertyType>

function image(name: string, alt: string) {
  return {
    id: `media-${name}`,
    url: `/demo/properties/${name}.webp`,
    alt,
    width: 1600,
    height: 900,
  }
}

const demoDescription =
  'This is fictional demonstration content for local development and protected staging. Property details are illustrative, availability is not verified, and no real address, rate, review, or reservation is represented.'

export const fixtureProperties: PublicProperty[] = publicPropertySchema
  .array()
  .length(10)
  .parse([
    {
      id: 'fixture-laurel-glass-cabin',
      internalId: 'DEMO-001',
      name: 'Laurel Glass Cabin',
      slug: 'laurel-glass-cabin',
      location: locations.gatlinburg,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2.5,
      propertyType: propertyTypes.cabin,
      amenities: [
        amenities.hotTub,
        amenities.mountainView,
        amenities.fireplace,
      ],
      hero: image(
        'demo-laurel-glass-cabin',
        'Fictional glass-fronted demo cabin among wooded mountains',
      ),
      gallery: [
        image(
          'demo-laurel-glass-living-room',
          'Fictional demo cabin living room with large windows',
        ),
        image(
          'demo-laurel-glass-bedroom',
          'Fictional demo cabin bedroom with woodland outlook',
        ),
        image(
          'demo-laurel-glass-deck',
          'Fictional demo cabin deck overlooking wooded hills',
        ),
        image(
          'demo-laurel-glass-dusk',
          'Fictional demo cabin exterior at dusk',
        ),
      ],
      summary:
        'Fictional demo cabin with a glass-fronted living space and wooded outlook.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: true,
      isDemo: true,
    },
    {
      id: 'fixture-hemlock-house',
      internalId: 'DEMO-002',
      name: 'Hemlock House',
      slug: 'hemlock-house',
      location: locations.gatlinburg,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: propertyTypes.cabin,
      amenities: [amenities.petFriendly, amenities.fireplace],
      hero: image(
        'demo-hemlock-house',
        'Fictional compact demo cabin beneath hemlock trees',
      ),
      gallery: [],
      summary:
        'Fictional compact woodland demo stay created to exercise a hero-only gallery fallback.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: false,
      isDemo: true,
    },
    {
      id: 'fixture-blue-ridge-hearth',
      internalId: 'DEMO-003',
      name: 'Blue Ridge Hearth',
      slug: 'blue-ridge-hearth',
      location: locations.pigeonForge,
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3,
      propertyType: propertyTypes.chalet,
      amenities: [amenities.hotTub, amenities.mountainView, amenities.gameRoom],
      hero: image(
        'demo-blue-ridge-hearth',
        'Fictional hillside demo chalet with broad mountain windows',
      ),
      gallery: [],
      summary:
        'Fictional demo chalet shaped around group gathering and a mountain outlook.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: true,
      isDemo: true,
    },
    {
      id: 'fixture-fern-hollow-retreat',
      internalId: 'DEMO-004',
      name: 'Fern Hollow Retreat',
      slug: 'fern-hollow-retreat',
      location: locations.sevierville,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      propertyType: propertyTypes.cabin,
      amenities: [amenities.hotTub],
      hero: image(
        'demo-fern-hollow-retreat',
        'Fictional secluded demo cabin surrounded by ferns',
      ),
      gallery: [],
      summary:
        'Fictional one-bedroom demo retreat in a quiet fern-lined setting.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: false,
      isDemo: true,
    },
    {
      id: 'fixture-riverbend-timber',
      internalId: 'DEMO-005',
      name: 'Riverbend Timber',
      slug: 'riverbend-timber',
      location: locations.pigeonForge,
      maxGuests: 10,
      bedrooms: 5,
      bathrooms: 4,
      propertyType: propertyTypes.lodge,
      amenities: [amenities.pool, amenities.petFriendly, amenities.gameRoom],
      hero: image(
        'demo-riverbend-timber',
        'Fictional large timber demo lodge near a wooded river bend',
      ),
      gallery: [],
      summary:
        'Fictional large-group demo lodge with playful shared-space features.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: true,
      isDemo: true,
    },
    {
      id: 'fixture-copper-ridge-cabin',
      internalId: 'DEMO-006',
      name: 'Copper Ridge Cabin',
      slug: 'copper-ridge-cabin',
      location: locations.gatlinburg,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: propertyTypes.cabin,
      amenities: [amenities.mountainView, amenities.fireplace],
      hero: image(
        'demo-copper-ridge-cabin',
        'Fictional warm-toned demo cabin on a mountain ridge',
      ),
      gallery: [],
      summary:
        'Fictional ridge-side demo cabin with a warm timber-and-copper palette.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: false,
      isDemo: true,
    },
    {
      id: 'fixture-moss-and-moon-lodge',
      internalId: 'DEMO-007',
      name: 'Moss & Moon Lodge',
      slug: 'moss-and-moon-lodge',
      location: locations.wearsValley,
      maxGuests: 12,
      bedrooms: 5,
      bathrooms: 4.5,
      propertyType: propertyTypes.lodge,
      amenities: [
        amenities.hotTub,
        amenities.mountainView,
        amenities.pool,
        amenities.gameRoom,
      ],
      hero: image(
        'demo-moss-and-moon-lodge',
        'Fictional expansive demo lodge beneath a moonlit ridge',
      ),
      gallery: [],
      summary:
        'Fictional high-capacity demo lodge representing the broadest fixture amenity set.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: true,
      isDemo: true,
    },
    {
      id: 'fixture-cedar-vale',
      internalId: 'DEMO-008',
      name: 'Cedar Vale',
      slug: 'cedar-vale',
      location: locations.sevierville,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 2,
      propertyType: propertyTypes.chalet,
      amenities: [amenities.petFriendly, amenities.hotTub],
      hero: image(
        'demo-cedar-vale',
        'Fictional cedar-clad demo chalet in a green valley',
      ),
      gallery: [],
      summary:
        'Fictional cedar-clad demo chalet suited to a small travelling group.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: false,
      isDemo: true,
    },
    {
      id: 'fixture-little-pigeon-lookout',
      internalId: 'DEMO-009',
      name: 'Little Pigeon Lookout',
      slug: 'little-pigeon-lookout',
      location: locations.pigeonForge,
      maxGuests: 7,
      bedrooms: 3,
      bathrooms: 3,
      propertyType: propertyTypes.cabin,
      amenities: [
        amenities.mountainView,
        amenities.hotTub,
        amenities.petFriendly,
      ],
      hero: image(
        'demo-little-pigeon-lookout',
        'Fictional elevated demo cabin overlooking layered hills',
      ),
      gallery: [],
      summary:
        'Fictional elevated demo cabin with an illustrative layered-hill outlook.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: false,
      isDemo: true,
    },
    {
      id: 'fixture-wears-valley-rest',
      internalId: 'DEMO-010',
      name: 'Wears Valley Rest',
      slug: 'wears-valley-rest',
      location: locations.wearsValley,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1.5,
      propertyType: propertyTypes.cabin,
      amenities: [amenities.mountainView, amenities.fireplace],
      hero: image(
        'demo-wears-valley-rest',
        'Fictional peaceful demo cabin in Wears Valley',
      ),
      gallery: [],
      summary: 'Fictional low-key demo cabin with a calm Wears Valley setting.',
      description: demoDescription,
      conversionAction: {
        mode: 'enquiry',
        label: 'Request preferred dates',
      },
      featured: false,
      isDemo: true,
    },
  ])
