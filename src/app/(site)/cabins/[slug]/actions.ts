'use server'

import { getPayload } from 'payload'

import {
  isHoneypotSubmission,
  parseGuestEnquiryFormData,
  type GuestEnquiryActionState,
} from '@/domain/guest-enquiry-form'
import {
  calendarDateToPayloadValue,
  guestEnquiryInputSchema,
} from '@/domain/guest-enquiry'
import { getServerEnv } from '@/lib/env/server'
import config from '@/payload.config'

const successState: GuestEnquiryActionState = {
  status: 'success',
  message:
    'Thank you. Your enquiry has been received. Availability still needs to be checked before any stay can be confirmed.',
}

export async function submitGuestEnquiry(
  _previousState: GuestEnquiryActionState,
  formData: FormData,
): Promise<GuestEnquiryActionState> {
  if (isHoneypotSubmission(formData)) {
    return successState
  }

  const result = parseGuestEnquiryFormData(formData)
  if (!result.success) {
    return {
      status: 'validation-error',
      message: 'Please review the highlighted fields and try again.',
      fieldErrors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const env = getServerEnv()
    const sourceUrl = new URL(result.data.sourceUrl)
    if (
      sourceUrl.origin !== new URL(env.NEXT_PUBLIC_SERVER_URL).origin ||
      sourceUrl.pathname !== `/cabins/${result.data.propertySlug}`
    ) {
      return {
        status: 'validation-error',
        message:
          'Please reload this property page before sending your enquiry.',
      }
    }

    const payload = await getPayload({ config })
    const properties = await payload.find({
      collection: 'properties',
      depth: 0,
      limit: 1,
      overrideAccess: false,
      where: {
        and: [
          { slug: { equals: result.data.propertySlug } },
          { internalId: { equals: result.data.propertyIdentity } },
          { _status: { equals: 'published' } },
          { listingStatus: { equals: 'active' } },
        ],
      },
    })
    const property = properties.docs[0]

    if (!property) {
      return {
        status: 'server-error',
        message:
          'This property cannot accept an enquiry right now. Please return to the cabin collection.',
      }
    }

    const input = guestEnquiryInputSchema.parse({
      propertyId: String(property.id),
      propertySlug: property.slug,
      preferredCheckIn: result.data.preferredCheckIn,
      preferredCheckOut: result.data.preferredCheckOut,
      guests: result.data.guests,
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      message: result.data.message,
      sourceUrl: result.data.sourceUrl,
      consent: result.data.consent,
      consentVersion: result.data.consentVersion,
      website: '',
    })

    await payload.create({
      collection: 'guest-enquiries',
      overrideAccess: true,
      data: {
        property: property.id,
        propertySlugSnapshot: property.slug,
        propertyNameSnapshot: property.name,
        preferredCheckIn: calendarDateToPayloadValue(input.preferredCheckIn),
        preferredCheckOut: calendarDateToPayloadValue(input.preferredCheckOut),
        guests: input.guests,
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: input.message,
        sourceUrl: input.sourceUrl,
        consent: {
          accepted: input.consent,
          wordingVersion: input.consentVersion,
          capturedAt: new Date().toISOString(),
        },
        abuseMetadata: {
          honeypotTriggered: false,
          disposition: 'accepted',
        },
        status: 'new',
      },
    })

    return successState
  } catch {
    return {
      status: 'server-error',
      message:
        'We could not store your enquiry just now. Your request is not a reservation; please try again later.',
    }
  }
}
