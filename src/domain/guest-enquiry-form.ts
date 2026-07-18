import { guestEnquiryFormSchema } from '@/domain/guest-enquiry'

export type GuestEnquiryActionState = {
  status: 'idle' | 'success' | 'validation-error' | 'server-error'
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
}

export const initialGuestEnquiryState: GuestEnquiryActionState = {
  status: 'idle',
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}

export function isHoneypotSubmission(formData: FormData): boolean {
  return text(formData, 'website').trim().length > 0
}

export function parseGuestEnquiryFormData(formData: FormData) {
  return guestEnquiryFormSchema.safeParse({
    propertySlug: text(formData, 'propertySlug'),
    propertyIdentity: text(formData, 'propertyIdentity'),
    preferredCheckIn: text(formData, 'preferredCheckIn'),
    preferredCheckOut: text(formData, 'preferredCheckOut'),
    guests: text(formData, 'guests'),
    name: text(formData, 'name'),
    email: text(formData, 'email'),
    phone: text(formData, 'phone'),
    message: text(formData, 'message'),
    sourceUrl: text(formData, 'sourceUrl'),
    consent: text(formData, 'consent'),
    consentVersion: text(formData, 'consentVersion'),
    website: text(formData, 'website'),
  })
}
