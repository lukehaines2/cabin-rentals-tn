import { z } from 'zod'

import { publicLocationSchema, townSlugSchema } from './location'
import { publicMediaSchema } from './media'

const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

export const listingStatusSchema = z.enum([
  'onboarding',
  'active',
  'hidden',
  'archived',
])

export const amenitySchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    slug: slugSchema,
    filterable: z.boolean(),
  })
  .strict()

export const propertyTypeSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    slug: slugSchema,
  })
  .strict()

export const conversionActionSchema = z.discriminatedUnion('mode', [
  z
    .object({
      mode: z.literal('enquiry'),
      label: z.string().min(1),
    })
    .strict(),
  z
    .object({
      mode: z.enum(['external', 'hosted-engine']),
      label: z.string().min(1),
      url: z.string().url(),
    })
    .strict(),
])

export const publicPropertySchema = z
  .object({
    id: z.string().min(1),
    internalId: z.string().min(1),
    name: z.string().min(1),
    slug: slugSchema,
    location: publicLocationSchema,
    maxGuests: z.number().int().min(1).max(30),
    bedrooms: z.number().int().min(1).max(15),
    bathrooms: z.number().min(0.5).max(15),
    propertyType: propertyTypeSchema,
    amenities: z.array(amenitySchema),
    hero: publicMediaSchema,
    gallery: z.array(publicMediaSchema),
    summary: z.string().min(1).max(320),
    description: z.string().min(1),
    conversionAction: conversionActionSchema,
    featured: z.boolean(),
    isDemo: z.boolean(),
  })
  .strict()

export const propertyQuerySchema = z
  .object({
    location: townSlugSchema.optional(),
    guestCount: z.number().int().positive().optional(),
    bedroomsMin: z.number().int().positive().optional(),
    propertyType: slugSchema.optional(),
    amenities: z.array(slugSchema).default([]),
  })
  .strict()

export const propertyQueryFieldsSchema = publicPropertySchema.pick({
  id: true,
  slug: true,
  location: true,
  maxGuests: true,
  bedrooms: true,
  propertyType: true,
  amenities: true,
})

export type ListingStatus = z.infer<typeof listingStatusSchema>
export type Amenity = z.infer<typeof amenitySchema>
export type PropertyType = z.infer<typeof propertyTypeSchema>
export type PublicProperty = z.infer<typeof publicPropertySchema>
export type PropertyQuery = z.input<typeof propertyQuerySchema>
export type PropertyQueryFields = z.infer<typeof propertyQueryFieldsSchema>
