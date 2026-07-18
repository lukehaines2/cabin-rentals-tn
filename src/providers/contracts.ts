import type {
  AvailabilityRequest,
  AvailabilityResult,
} from '@/domain/availability'
import type { BookingIntent } from '@/domain/booking'
import type { PropertyQuery, PublicProperty } from '@/domain/property'

export interface PropertyProvider {
  list(query?: PropertyQuery): Promise<PublicProperty[]>
  findBySlug(slug: string): Promise<PublicProperty | null>
}

export interface AvailabilityProvider {
  check(request: AvailabilityRequest): Promise<AvailabilityResult>
}

export type BookingHandoff =
  | { type: 'enquiry'; propertyId: string }
  | { type: 'external' | 'hosted-engine'; url: string }

export interface BookingProvider {
  createHandoff(intent: BookingIntent): Promise<BookingHandoff>
}
