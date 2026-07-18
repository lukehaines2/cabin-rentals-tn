'use client'

import { useSearchParams } from 'next/navigation'

import { PropertyCard } from '@/components/property/property-card'
import { SearchForm } from '@/components/search/search-form'
import { EmptyState } from '@/components/states/public-states'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import type { PublicProperty } from '@/domain/property'
import { filterProperties, parseGuestSearchParams } from '@/domain/search'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

export function CatalogueExplorer({
  properties,
}: {
  properties: PublicProperty[]
}) {
  const searchParams = useSearchParams()
  const state = parseGuestSearchParams(searchParams)
  const filteredProperties = filterProperties(properties, state)

  return (
    <div className="flex flex-col gap-8">
      <SearchForm
        key={searchParams.toString()}
        idPrefix="catalogue"
        defaultValues={state}
      />

      <div className="flex flex-col gap-4 border-y py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="font-heading text-2xl font-semibold"
          >
            {filteredProperties.length}{' '}
            {filteredProperties.length === 1 ? 'cabin' : 'cabins'}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            Capacity and location are matched. Preferred dates never filter
            inventory.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {state.location ? (
            <Badge variant="secondary">
              {
                {
                  gatlinburg: 'Gatlinburg',
                  'pigeon-forge': 'Pigeon Forge',
                  sevierville: 'Sevierville',
                }[state.location]
              }
            </Badge>
          ) : null}
          {state.guests ? (
            <Badge variant="secondary">
              {state.guests} {state.guests === 1 ? 'guest' : 'guests'}
            </Badge>
          ) : null}
          {state.checkIn && state.checkOut ? (
            <Badge variant="outline">
              {formatDate(state.checkIn)} – {formatDate(state.checkOut)}
            </Badge>
          ) : null}
          {searchParams.size > 0 ? (
            <form action="/cabins" method="get">
              <button
                type="submit"
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                Reset all
              </button>
            </form>
          ) : null}
        </div>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              search={state}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <form action="/cabins" method="get">
                {state.checkIn ? (
                  <input type="hidden" name="checkIn" value={state.checkIn} />
                ) : null}
                {state.checkOut ? (
                  <input type="hidden" name="checkOut" value={state.checkOut} />
                ) : null}
                <button
                  type="submit"
                  className={buttonVariants({ size: 'lg' })}
                >
                  Clear location and guests
                </button>
              </form>
              <form action="/cabins" method="get">
                <button
                  type="submit"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                  })}
                >
                  Reset everything
                </button>
              </form>
            </div>
          }
          description="No demo cabin meets both the selected town and group size. Broaden those choices; your preferred dates can stay in place."
        />
      )}
    </div>
  )
}
