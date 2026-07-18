import { describe, expect, it } from 'vitest'

import { fixtureProperties } from '@/fixtures/properties'

import { mapPayloadProperty } from './property-mapper'

function createPayloadDocument() {
  const property = fixtureProperties[0]

  return {
    ...property,
    id: 101,
    _status: 'published',
    listingStatus: 'active',
    location: { ...property.location, id: 11, active: true },
    propertyType: { ...property.propertyType, id: 21, active: true },
    amenities: property.amenities.map((amenity, index) => ({
      ...amenity,
      id: 30 + index,
      active: true,
    })),
    heroImage: { ...property.hero, id: 41 },
    gallery: property.gallery.map((image, index) => ({
      image: { ...image, id: 50 + index },
    })),
  }
}

describe('mapPayloadProperty', () => {
  it('maps a published and active document to public data', () => {
    const property = mapPayloadProperty({
      ...createPayloadDocument(),
      contentOwner: 'Internal only',
      approvalStatus: 'approved-demo',
      internalNotes: 'Must never cross the public mapper boundary.',
    })

    expect(property).toMatchObject({
      id: '101',
      slug: 'laurel-glass-cabin',
      isDemo: true,
    })
    expect(property?.gallery).toHaveLength(4)
    expect(property).not.toHaveProperty('contentOwner')
    expect(property).not.toHaveProperty('approvalStatus')
    expect(property).not.toHaveProperty('internalNotes')
  })

  it('returns null for unpublished or non-active documents', () => {
    expect(
      mapPayloadProperty({
        ...createPayloadDocument(),
        _status: 'draft',
      }),
    ).toBeNull()
    expect(
      mapPayloadProperty({
        ...createPayloadDocument(),
        listingStatus: 'hidden',
      }),
    ).toBeNull()
    expect(
      mapPayloadProperty({
        ...createPayloadDocument(),
        listingStatus: 'archived',
      }),
    ).toBeNull()
  })

  it('rejects malformed public relationships', () => {
    expect(() =>
      mapPayloadProperty({
        ...createPayloadDocument(),
        heroImage: 41,
      }),
    ).toThrow()
  })
})
