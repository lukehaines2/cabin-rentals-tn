import { z } from 'zod'

export const bookingIntentSchema = z
  .object({
    propertyId: z.string().min(1),
    preferredCheckIn: z.iso.date().optional(),
    preferredCheckOut: z.iso.date().optional(),
    guestCount: z.number().int().positive().optional(),
    sourceUrl: z.url().optional(),
  })
  .strict()
  .refine(
    (value) =>
      Boolean(value.preferredCheckIn) === Boolean(value.preferredCheckOut),
    {
      message: 'Preferred check-in and check-out must be supplied together',
      path: ['preferredCheckOut'],
    },
  )
  .refine(
    (value) =>
      !value.preferredCheckIn ||
      !value.preferredCheckOut ||
      value.preferredCheckOut > value.preferredCheckIn,
    {
      message: 'Preferred check-out must be after check-in',
      path: ['preferredCheckOut'],
    },
  )

export type BookingIntent = z.infer<typeof bookingIntentSchema>
