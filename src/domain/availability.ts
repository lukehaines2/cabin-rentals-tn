import { z } from 'zod'

export const availabilityRequestSchema = z
  .object({
    propertyId: z.string().min(1),
    checkIn: z.iso.date(),
    checkOut: z.iso.date(),
    guestCount: z.number().int().positive(),
  })
  .strict()
  .refine((value) => value.checkOut > value.checkIn, {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  })

export const availabilityResultSchema = z
  .object({
    status: z.literal('unverified'),
    message: z.string().min(1),
  })
  .strict()

export type AvailabilityRequest = z.infer<typeof availabilityRequestSchema>
export type AvailabilityResult = z.infer<typeof availabilityResultSchema>
