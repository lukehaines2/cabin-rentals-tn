'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { GuestEnquiryForm } from '@/components/forms/guest-enquiry-form'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { PublicProperty } from '@/domain/property'
import { parseGuestSearchParams, searchHref } from '@/domain/search'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})

function dateLabel(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

export function TripEnquiryPanel({
  property,
  siteOrigin,
}: {
  property: PublicProperty
  siteOrigin: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = parseGuestSearchParams(searchParams)
  const sourcePath = searchHref(pathname, search)
  const sourceUrl = new URL(sourcePath, siteOrigin).toString()
  const guests = search.guests ?? Math.min(2, property.maxGuests)

  return (
    <aside aria-labelledby="enquiry-title" className="lg:sticky lg:top-32">
      <Card className="shadow-lifted border-primary/20">
        <CardHeader className="gap-3">
          <Badge variant="secondary" className="w-fit">
            Enquiry only
          </Badge>
          <CardTitle className="text-3xl">
            <h2 id="enquiry-title">Check your preferred stay</h2>
          </CardTitle>
          <CardDescription className="text-base leading-7">
            Share your trip details and contact information. Availability will
            be checked before any stay can be confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="bg-secondary/65 rounded-xl p-4">
            <p className="text-xs font-bold tracking-[0.14em] uppercase">
              Preferred trip
            </p>
            <p className="mt-2 font-semibold">
              {search.checkIn && search.checkOut
                ? `${dateLabel(search.checkIn)} – ${dateLabel(search.checkOut)}`
                : 'Dates not selected'}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {guests} {guests === 1 ? 'guest' : 'guests'} · No live
              availability shown
            </p>
          </div>
          <GuestEnquiryForm
            propertyIdentity={property.internalId}
            propertyName={property.name}
            propertySlug={property.slug}
            preferredCheckIn={search.checkIn}
            preferredCheckOut={search.checkOut}
            guests={guests}
            sourceUrl={sourceUrl}
          />
          <Link
            href={searchHref('/cabins', search)}
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Back to cabin results
          </Link>
        </CardContent>
      </Card>
    </aside>
  )
}
