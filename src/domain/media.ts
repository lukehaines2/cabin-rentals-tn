import { z } from 'zod'

export const publicMediaSchema = z
  .object({
    id: z.string().min(1),
    url: z.string().min(1),
    alt: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })
  .strict()

export type PublicMedia = z.infer<typeof publicMediaSchema>
