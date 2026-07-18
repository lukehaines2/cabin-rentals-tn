import {
  availabilityRequestSchema,
  availabilityResultSchema,
} from '@/domain/availability'
import type { AvailabilityProvider } from '@/providers/contracts'

export class UnverifiedAvailabilityProvider implements AvailabilityProvider {
  async check(request: unknown) {
    availabilityRequestSchema.parse(request)

    return availabilityResultSchema.parse({
      status: 'unverified',
      message:
        'Dates are preferences only. Availability must be confirmed after enquiry.',
    })
  }
}
