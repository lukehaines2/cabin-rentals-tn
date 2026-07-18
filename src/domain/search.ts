import { z } from 'zod'

import type { PublicProperty } from '@/domain/property'
import { townSlugSchema } from '@/domain/location'

export const SEARCH_PARAM_KEYS = [
  'location',
  'checkIn',
  'checkOut',
  'guests',
] as const

const optionalDateSchema = z.iso.date().optional()
const optionalGuestsSchema = z.number().int().min(1).max(30).optional()

export const guestSearchSchema = z
  .object({
    location: townSlugSchema.optional(),
    checkIn: optionalDateSchema,
    checkOut: optionalDateSchema,
    guests: optionalGuestsSchema,
  })
  .strict()
  .refine((value) => Boolean(value.checkIn) === Boolean(value.checkOut), {
    message: 'Choose both preferred check-in and check-out dates.',
    path: ['checkOut'],
  })
  .refine(
    (value) =>
      !value.checkIn || !value.checkOut || value.checkOut > value.checkIn,
    {
      message: 'Preferred check-out must be after check-in.',
      path: ['checkOut'],
    },
  )

export type GuestSearchState = z.infer<typeof guestSearchSchema>

type SearchParamsInput =
  | URLSearchParams
  | ReadonlyURLSearchParams
  | Record<string, string | string[] | undefined>

type ReadonlyURLSearchParams = Pick<URLSearchParams, 'get'>

function readParam(input: SearchParamsInput, key: string): string | undefined {
  const maybeSearchParams = input as ReadonlyURLSearchParams
  if (typeof maybeSearchParams.get === 'function') {
    return maybeSearchParams.get(key) ?? undefined
  }

  const value = (input as Record<string, string | string[] | undefined>)[key]
  return Array.isArray(value) ? value[0] : value
}

export function parseGuestSearchParams(
  input: SearchParamsInput,
): GuestSearchState {
  const rawLocation = readParam(input, 'location')
  const rawCheckIn = readParam(input, 'checkIn')
  const rawCheckOut = readParam(input, 'checkOut')
  const rawGuests = readParam(input, 'guests')

  const location = townSlugSchema.safeParse(rawLocation)
  const checkIn = optionalDateSchema.safeParse(rawCheckIn || undefined)
  const checkOut = optionalDateSchema.safeParse(rawCheckOut || undefined)
  const guests = optionalGuestsSchema.safeParse(
    rawGuests && /^\d+$/.test(rawGuests) ? Number(rawGuests) : undefined,
  )

  const candidate = {
    location: location.success ? location.data : undefined,
    checkIn: checkIn.success ? checkIn.data : undefined,
    checkOut: checkOut.success ? checkOut.data : undefined,
    guests: guests.success ? guests.data : undefined,
  }
  const parsed = guestSearchSchema.safeParse(candidate)

  if (parsed.success) {
    return parsed.data
  }

  return {
    location: candidate.location,
    guests: candidate.guests,
  }
}

export function serializeGuestSearch(
  state: Partial<GuestSearchState>,
): URLSearchParams {
  const parsed = guestSearchSchema.safeParse(state)
  const params = new URLSearchParams()

  if (!parsed.success) {
    return params
  }

  for (const key of SEARCH_PARAM_KEYS) {
    const value = parsed.data[key]
    if (value !== undefined) {
      params.set(key, String(value))
    }
  }

  return params
}

export function filterProperties(
  properties: readonly PublicProperty[],
  state: GuestSearchState,
): PublicProperty[] {
  return properties.filter((property) => {
    if (state.location && property.location.town !== state.location) {
      return false
    }

    return !state.guests || property.maxGuests >= state.guests
  })
}

export function searchHref(
  pathname: string,
  state: Partial<GuestSearchState>,
): string {
  const query = serializeGuestSearch(state).toString()
  return query ? `${pathname}?${query}` : pathname
}
