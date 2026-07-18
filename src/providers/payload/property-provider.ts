import type { Payload } from 'payload'

import { propertyQuerySchema } from '@/domain/property'
import type { PropertyQuery, PublicProperty } from '@/domain/property'
import type { PropertyProvider } from '@/providers/contracts'

import { mapPayloadProperty } from './property-mapper'

export class PayloadPropertyProvider implements PropertyProvider {
  constructor(private readonly payload: Payload) {}

  async list(query: PropertyQuery = {}) {
    const filters = propertyQuerySchema.parse(query)
    const result = await this.payload.find({
      collection: 'properties',
      depth: 2,
      limit: 100,
      overrideAccess: false,
      sort: ['-featured', 'name'],
      where: {
        and: [
          { _status: { equals: 'published' } },
          { listingStatus: { equals: 'active' } },
        ],
      },
    })

    return result.docs
      .map(mapPayloadProperty)
      .filter((property): property is PublicProperty => {
        if (!property) return false
        if (filters.location && property.location.town !== filters.location) {
          return false
        }
        if (filters.guestCount && property.maxGuests < filters.guestCount) {
          return false
        }
        if (filters.bedroomsMin && property.bedrooms < filters.bedroomsMin) {
          return false
        }
        if (
          filters.propertyType &&
          property.propertyType.slug !== filters.propertyType
        ) {
          return false
        }

        const amenities = new Set(
          property.amenities.map((amenity) => amenity.slug),
        )
        return filters.amenities.every((amenity) => amenities.has(amenity))
      })
  }

  async findBySlug(slug: string) {
    const result = await this.payload.find({
      collection: 'properties',
      depth: 2,
      limit: 1,
      overrideAccess: false,
      where: {
        and: [
          { slug: { equals: slug } },
          { _status: { equals: 'published' } },
          { listingStatus: { equals: 'active' } },
        ],
      },
    })

    return result.docs[0] ? mapPayloadProperty(result.docs[0]) : null
  }
}
