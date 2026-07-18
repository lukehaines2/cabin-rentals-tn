import { describe, expect, it } from 'vitest'

import { fixtureProperties } from '@/fixtures/properties'

import {
  filterProperties,
  parseGuestSearchParams,
  searchHref,
  serializeGuestSearch,
} from './search'

describe('guest search URL state', () => {
  it('round-trips the four supported URL keys', () => {
    const state = {
      location: 'gatlinburg' as const,
      checkIn: '2026-10-12',
      checkOut: '2026-10-16',
      guests: 6,
    }

    const params = serializeGuestSearch(state)

    expect([...params.keys()]).toEqual([
      'location',
      'checkIn',
      'checkOut',
      'guests',
    ])
    expect(parseGuestSearchParams(params)).toEqual(state)
    expect(searchHref('/cabins', state)).toBe(
      '/cabins?location=gatlinburg&checkIn=2026-10-12&checkOut=2026-10-16&guests=6',
    )
  })

  it('drops unknown values and invalid date ranges safely', () => {
    const params = new URLSearchParams({
      location: 'not-a-town',
      checkIn: '2026-10-20',
      checkOut: '2026-10-12',
      guests: '999',
      unexpected: 'ignored',
    })

    expect(parseGuestSearchParams(params)).toEqual({})
  })

  it('keeps independently valid values when dates or unknown keys are invalid', () => {
    const params = new URLSearchParams({
      location: 'sevierville',
      checkIn: 'not-a-date',
      checkOut: '2027-10-15',
      guests: '4',
      bedrooms: '99',
    })

    expect(parseGuestSearchParams(params)).toEqual({
      location: 'sevierville',
      guests: 4,
    })
  })

  it('rejects partial date pairs and does not serialize invalid state', () => {
    expect(
      parseGuestSearchParams(
        new URLSearchParams({
          checkIn: '2027-10-12',
        }),
      ),
    ).toEqual({})
    expect(
      serializeGuestSearch({
        checkIn: '2027-10-12',
      }).toString(),
    ).toBe('')
  })

  it('filters only by structured location and minimum capacity', () => {
    const result = filterProperties(fixtureProperties, {
      location: 'pigeon-forge',
      checkIn: '2026-10-12',
      checkOut: '2026-10-16',
      guests: 8,
    })

    expect(result.map((property) => property.slug)).toEqual([
      'blue-ridge-hearth',
      'riverbend-timber',
    ])
  })

  it('treats capacity as a minimum and locations as exact structured values', () => {
    const result = filterProperties(fixtureProperties, {
      location: 'gatlinburg',
      guests: 6,
    })

    expect(result.map((property) => property.slug)).toEqual([
      'laurel-glass-cabin',
      'copper-ridge-cabin',
    ])
    expect(result.every((property) => property.maxGuests >= 6)).toBe(true)
    expect(
      result.every((property) => property.location.town === 'gatlinburg'),
    ).toBe(true)
  })

  it('preserves inventory when only preferred dates change', () => {
    const result = filterProperties(fixtureProperties, {
      checkIn: '2026-12-20',
      checkOut: '2026-12-27',
    })

    expect(result).toHaveLength(10)
  })
})
