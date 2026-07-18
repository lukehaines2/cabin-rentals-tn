import { describe, expect, it } from 'vitest'

import { FixturePropertyProvider } from './property-provider'

describe('FixturePropertyProvider', () => {
  const provider = new FixturePropertyProvider()

  it('applies the complete domain query boundary with amenity AND logic', async () => {
    const properties = await provider.list({
      location: 'pigeon-forge',
      guestCount: 6,
      bedroomsMin: 3,
      propertyType: 'cabin',
      amenities: ['hot-tub', 'mountain-view'],
    })

    expect(properties.map((property) => property.slug)).toEqual([
      'little-pigeon-lookout',
    ])
  })

  it('returns validated public properties and null for unknown slugs', async () => {
    await expect(
      provider.findBySlug('laurel-glass-cabin'),
    ).resolves.toMatchObject({
      slug: 'laurel-glass-cabin',
      internalId: 'DEMO-001',
    })
    await expect(provider.findBySlug('not-a-real-property')).resolves.toBeNull()
  })

  it('rejects unknown query fields at the provider boundary', async () => {
    await expect(provider.list({ unexpected: true } as never)).rejects.toThrow()
  })
})
