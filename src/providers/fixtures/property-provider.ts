import { fixtureProperties } from '@/fixtures/properties'
import { propertyQuerySchema, publicPropertySchema } from '@/domain/property'
import type { PropertyProvider } from '@/providers/contracts'

export class FixturePropertyProvider implements PropertyProvider {
  async list(query = {}) {
    const filters = propertyQuerySchema.parse(query)

    return fixtureProperties.filter((property) => {
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

      const propertyAmenities = new Set(
        property.amenities.map((amenity) => amenity.slug),
      )

      return filters.amenities.every((amenity) =>
        propertyAmenities.has(amenity),
      )
    })
  }

  async findBySlug(slug: string) {
    const property = fixtureProperties.find((item) => item.slug === slug)
    return property ? publicPropertySchema.parse(property) : null
  }
}
