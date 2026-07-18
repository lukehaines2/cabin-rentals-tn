'use client'

import { SearchIcon } from 'lucide-react'
import { useRef, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { GuestSearchState } from '@/domain/search'
import { cn } from '@/lib/utils'

const locations = [
  { value: 'gatlinburg', label: 'Gatlinburg' },
  { value: 'pigeon-forge', label: 'Pigeon Forge' },
  { value: 'sevierville', label: 'Sevierville' },
] as const

type SearchFormProps = {
  defaultValues?: Partial<GuestSearchState>
  defaultGuests?: number
  idPrefix: string
  variant?: 'hero' | 'catalogue'
}

export function SearchForm({
  defaultValues = {},
  defaultGuests,
  idPrefix,
  variant = 'catalogue',
}: SearchFormProps) {
  const checkInRef = useRef<HTMLInputElement>(null)
  const checkOutRef = useRef<HTMLInputElement>(null)

  function validateDates(event: FormEvent<HTMLFormElement>) {
    const checkIn = checkInRef.current
    const checkOut = checkOutRef.current

    if (!checkIn || !checkOut) return

    checkOut.setCustomValidity('')
    if (Boolean(checkIn.value) !== Boolean(checkOut.value)) {
      checkOut.setCustomValidity(
        'Choose both preferred check-in and check-out dates.',
      )
    } else if (
      checkIn.value &&
      checkOut.value &&
      checkOut.value <= checkIn.value
    ) {
      checkOut.setCustomValidity('Preferred check-out must be after check-in.')
    }

    if (!checkOut.checkValidity()) {
      event.preventDefault()
      checkOut.reportValidity()
    }
  }

  return (
    <form
      action="/cabins"
      method="get"
      onSubmit={validateDates}
      className={cn(
        'bg-card text-card-foreground shadow-lifted rounded-2xl border p-4 sm:p-5',
        variant === 'hero'
          ? 'border-primary-foreground/15 w-full max-w-5xl'
          : 'border-border',
      )}
      aria-label="Search cabins"
    >
      <FieldGroup
        className={cn(
          'gap-4',
          variant === 'hero' &&
            'lg:grid lg:grid-cols-[1.15fr_1fr_1fr_0.7fr_auto] lg:items-end',
          variant === 'catalogue' &&
            'md:grid md:grid-cols-[1.2fr_1fr_1fr_0.7fr_auto] md:items-end',
        )}
      >
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-location`}>Location</FieldLabel>
          <select
            id={`${idPrefix}-location`}
            name="location"
            defaultValue={defaultValues.location ?? ''}
            className="border-input bg-card focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-lg border px-3.5 text-base outline-none focus-visible:ring-3 md:text-sm"
          >
            <option value="">All three towns</option>
            {locations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-check-in`}>
            Preferred check-in
          </FieldLabel>
          <Input
            ref={checkInRef}
            id={`${idPrefix}-check-in`}
            name="checkIn"
            type="date"
            defaultValue={defaultValues.checkIn}
            onChange={(event) => {
              if (checkOutRef.current) {
                checkOutRef.current.min = event.currentTarget.value
                checkOutRef.current.setCustomValidity('')
              }
            }}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-check-out`}>
            Preferred check-out
          </FieldLabel>
          <Input
            ref={checkOutRef}
            id={`${idPrefix}-check-out`}
            name="checkOut"
            type="date"
            min={defaultValues.checkIn}
            defaultValue={defaultValues.checkOut}
            onChange={(event) => event.currentTarget.setCustomValidity('')}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-guests`}>Guests</FieldLabel>
          <Input
            id={`${idPrefix}-guests`}
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            step={1}
            defaultValue={defaultValues.guests ?? defaultGuests}
            placeholder="Any"
          />
        </Field>
        <Button type="submit" size="lg" className="w-full">
          <SearchIcon data-icon="inline-start" />
          Search
        </Button>
      </FieldGroup>
      {variant === 'hero' ? (
        <FieldDescription className="mt-4">
          Dates are preferences only. Availability will be checked after you
          enquire.
        </FieldDescription>
      ) : null}
    </form>
  )
}
