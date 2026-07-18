import { z } from 'zod'

const optionalFormText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum)
    .transform((value) => value || undefined)

const optionalFormDate = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .pipe(z.iso.date().optional())

export const guestEnquiryInputSchema = z
  .object({
    propertyId: z.string().min(1),
    propertySlug: z.string().min(1),
    preferredCheckIn: z.iso.date().optional(),
    preferredCheckOut: z.iso.date().optional(),
    guests: z.number().int().min(1).max(30),
    name: z.string().trim().min(2).max(120),
    email: z.email().max(254),
    phone: z.string().trim().max(40).optional(),
    message: z.string().trim().max(2_000).optional(),
    sourceUrl: z.url(),
    consent: z.literal(true),
    consentVersion: z.string().min(1).max(80),
    website: z.string().max(0).optional(),
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

export const guestEnquiryFormSchema = z
  .object({
    propertySlug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    propertyIdentity: z.string().min(1).max(80),
    preferredCheckIn: optionalFormDate,
    preferredCheckOut: optionalFormDate,
    guests: z.coerce.number().int().min(1).max(30),
    name: z.string().trim().min(2).max(120),
    email: z.email().max(254),
    phone: optionalFormText(40),
    message: optionalFormText(2_000),
    sourceUrl: z.url(),
    consent: z
      .literal('on', {
        error: 'Consent is required to send this enquiry.',
      })
      .transform(() => true as const),
    consentVersion: z.string().min(1).max(80),
    website: z.string().max(256).optional().default(''),
  })
  .strict()
  .refine(
    (value) =>
      Boolean(value.preferredCheckIn) === Boolean(value.preferredCheckOut),
    {
      message: 'Choose both preferred check-in and check-out dates.',
      path: ['preferredCheckOut'],
    },
  )
  .refine(
    (value) =>
      !value.preferredCheckIn ||
      !value.preferredCheckOut ||
      value.preferredCheckOut > value.preferredCheckIn,
    {
      message: 'Preferred check-out must be after check-in.',
      path: ['preferredCheckOut'],
    },
  )

export type GuestEnquiryFormInput = z.infer<typeof guestEnquiryFormSchema>
export type GuestEnquiryInput = z.infer<typeof guestEnquiryInputSchema>

export function calendarDateToPayloadValue(
  value: string | undefined,
): string | undefined {
  return value ? `${value}T12:00:00.000Z` : undefined
}
