import { describe, expect, it } from 'vitest'

import { fixtureProperties } from '@/fixtures/properties'

import { availabilityResultSchema } from './availability'
import { guestEnquiryInputSchema } from './guest-enquiry'
import { publicPropertySchema } from './property'

describe('public data schemas', () => {
  it('validates exactly ten fictional fixture properties', () => {
    expect(
      publicPropertySchema.array().length(10).parse(fixtureProperties),
    ).toHaveLength(10)
    expect(fixtureProperties.every((property) => property.isDemo)).toBe(true)
    expect(
      fixtureProperties.find((property) => property.slug === 'hemlock-house')
        ?.gallery,
    ).toEqual([])
  })

  it('only accepts unverified Phase 1 availability results', () => {
    expect(
      availabilityResultSchema.parse({
        status: 'unverified',
        message: 'Availability must be confirmed.',
      }).status,
    ).toBe('unverified')
    expect(() =>
      availabilityResultSchema.parse({
        status: 'available',
        message: 'Available now',
      }),
    ).toThrow()
  })

  it('validates preferred date pairs and guest consent', () => {
    const base = {
      propertyId: 'property-1',
      propertySlug: 'laurel-glass-cabin',
      guests: 4,
      name: 'Demo Guest',
      email: 'guest@example.test',
      sourceUrl: 'http://localhost:3000/cabins/laurel-glass-cabin',
      consent: true as const,
      consentVersion: 'demo-v1',
      website: '',
    }

    expect(guestEnquiryInputSchema.parse(base)).toMatchObject(base)
    expect(() =>
      guestEnquiryInputSchema.parse({
        ...base,
        preferredCheckIn: '2026-08-10',
      }),
    ).toThrow(/supplied together/)
  })
})
