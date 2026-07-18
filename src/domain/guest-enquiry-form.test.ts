import { describe, expect, it } from 'vitest'

import {
  isHoneypotSubmission,
  parseGuestEnquiryFormData,
} from './guest-enquiry-form'
import { calendarDateToPayloadValue } from './guest-enquiry'

function validFormData() {
  const formData = new FormData()
  formData.set('propertySlug', 'laurel-glass-cabin')
  formData.set('propertyIdentity', 'DEMO-001')
  formData.set('preferredCheckIn', '2026-10-12')
  formData.set('preferredCheckOut', '2026-10-16')
  formData.set('guests', '4')
  formData.set('name', 'Demo Guest')
  formData.set('email', 'guest@example.test')
  formData.set('phone', '')
  formData.set('message', 'A smoke-test enquiry.')
  formData.set(
    'sourceUrl',
    'http://localhost:3000/cabins/laurel-glass-cabin?guests=4',
  )
  formData.set('consent', 'on')
  formData.set('consentVersion', 'guest-enquiry-v1')
  formData.set('website', '')
  return formData
}

describe('guest enquiry form helpers', () => {
  it('normalizes a valid server action submission', () => {
    const result = parseGuestEnquiryFormData(validFormData())

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toMatchObject({
        propertyIdentity: 'DEMO-001',
        guests: 4,
        consent: true,
        phone: undefined,
      })
    }
  })

  it('rejects checkout that is not after check-in', () => {
    const formData = validFormData()
    formData.set('preferredCheckOut', '2026-10-12')

    const result = parseGuestEnquiryFormData(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.preferredCheckOut).toEqual([
        'Preferred check-out must be after check-in.',
      ])
    }
  })

  it('reports required contact and consent fields from server validation', () => {
    const formData = validFormData()
    formData.set('name', '')
    formData.set('email', 'not-an-email')
    formData.delete('consent')

    const result = parseGuestEnquiryFormData(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      expect(errors.name).toBeDefined()
      expect(errors.email).toBeDefined()
      expect(errors.consent).toEqual([
        'Consent is required to send this enquiry.',
      ])
    }
  })

  it('requires preferred dates as a complete pair', () => {
    const formData = validFormData()
    formData.set('preferredCheckOut', '')

    const result = parseGuestEnquiryFormData(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.preferredCheckOut).toEqual([
        'Choose both preferred check-in and check-out dates.',
      ])
    }
  })

  it('detects a populated honeypot before validation or storage', () => {
    const formData = validFormData()
    formData.set('website', 'https://spam.example')

    expect(isHoneypotSubmission(formData)).toBe(true)
  })

  it('stores calendar intent at a timezone-safe midday value', () => {
    expect(calendarDateToPayloadValue('2026-10-12')).toBe(
      '2026-10-12T12:00:00.000Z',
    )
    expect(calendarDateToPayloadValue(undefined)).toBeUndefined()
  })
})
