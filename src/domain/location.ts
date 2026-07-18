import { z } from 'zod'

export const townSlugSchema = z.enum([
  'gatlinburg',
  'pigeon-forge',
  'sevierville',
])

export const locationKindSchema = z.enum(['town', 'area'])

export const publicLocationSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    kind: locationKindSchema,
    town: townSlugSchema,
    summary: z.string().min(1),
  })
  .strict()

export type TownSlug = z.infer<typeof townSlugSchema>
export type PublicLocation = z.infer<typeof publicLocationSchema>
