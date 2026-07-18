import { z } from 'zod'

import { publicPropertySchema } from '@/domain/property'

const payloadIdSchema = z.union([z.string(), z.number()]).transform(String)

const mediaRelationshipSchema = z.object({
  id: payloadIdSchema,
  url: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

const locationRelationshipSchema = z.object({
  id: payloadIdSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
  kind: z.enum(['town', 'area']),
  town: z.enum(['gatlinburg', 'pigeon-forge', 'sevierville']),
  summary: z.string().min(1),
  active: z.literal(true),
})

const amenityRelationshipSchema = z.object({
  id: payloadIdSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
  filterable: z.boolean(),
  active: z.literal(true),
})

const propertyTypeRelationshipSchema = z.object({
  id: payloadIdSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
  active: z.literal(true),
})

const payloadPropertySchema = z.object({
  id: payloadIdSchema,
  internalId: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  _status: z.enum(['draft', 'published', 'changed']).optional(),
  listingStatus: z.enum(['onboarding', 'active', 'hidden', 'archived']),
  location: locationRelationshipSchema,
  maxGuests: z.number().int().positive(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().positive(),
  propertyType: propertyTypeRelationshipSchema,
  amenities: z.array(amenityRelationshipSchema),
  heroImage: mediaRelationshipSchema,
  gallery: z
    .array(
      z.object({
        image: mediaRelationshipSchema,
      }),
    )
    .nullish(),
  summary: z.string().min(1),
  description: z.string().min(1),
  conversionAction: z.object({
    mode: z.enum(['enquiry', 'external', 'hosted-engine']),
    label: z.string().min(1),
    url: z.string().url().nullish(),
  }),
  featured: z.boolean().nullish(),
  isDemo: z.boolean().nullish(),
})

export function mapPayloadProperty(input: unknown) {
  const visibility = z
    .object({
      _status: z.string().optional(),
      listingStatus: z.string().optional(),
    })
    .safeParse(input)

  if (
    !visibility.success ||
    visibility.data._status !== 'published' ||
    visibility.data.listingStatus !== 'active'
  ) {
    return null
  }

  const document = payloadPropertySchema.parse(input)
  const conversionAction =
    document.conversionAction.mode === 'enquiry'
      ? {
          mode: 'enquiry' as const,
          label: document.conversionAction.label,
        }
      : {
          mode: document.conversionAction.mode,
          label: document.conversionAction.label,
          url: document.conversionAction.url,
        }

  return publicPropertySchema.parse({
    id: document.id,
    internalId: document.internalId,
    name: document.name,
    slug: document.slug,
    location: {
      id: document.location.id,
      name: document.location.name,
      slug: document.location.slug,
      kind: document.location.kind,
      town: document.location.town,
      summary: document.location.summary,
    },
    maxGuests: document.maxGuests,
    bedrooms: document.bedrooms,
    bathrooms: document.bathrooms,
    propertyType: {
      id: document.propertyType.id,
      name: document.propertyType.name,
      slug: document.propertyType.slug,
    },
    amenities: document.amenities.map((amenity) => ({
      id: amenity.id,
      name: amenity.name,
      slug: amenity.slug,
      filterable: amenity.filterable,
    })),
    hero: document.heroImage,
    gallery: (document.gallery ?? []).map((item) => item.image),
    summary: document.summary,
    description: document.description,
    conversionAction,
    featured: document.featured ?? false,
    isDemo: document.isDemo ?? false,
  })
}
