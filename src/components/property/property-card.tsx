import Image from 'next/image'
import Link from 'next/link'
import { BedDoubleIcon, MapPinIcon, UsersIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { PublicProperty } from '@/domain/property'
import type { GuestSearchState } from '@/domain/search'
import { searchHref } from '@/domain/search'

type PropertyCardProps = {
  property: PublicProperty
  search?: Partial<GuestSearchState>
}

export function PropertyCard({ property, search = {} }: PropertyCardProps) {
  const href = searchHref(`/cabins/${property.slug}`, search)

  return (
    <Card className="shadow-soft focus-within:ring-ring/50 relative h-full py-0 transition-shadow focus-within:ring-3 hover:shadow-lg">
      <div className="bg-muted relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.hero.url}
          alt={property.hero.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover/card:scale-[1.025]"
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
        />
        {property.isDemo ? (
          <Badge className="absolute top-3 left-3" variant="secondary">
            Fictional demo
          </Badge>
        ) : null}
      </div>
      <CardHeader className="gap-2">
        <CardDescription className="flex items-center gap-1.5">
          <MapPinIcon aria-hidden="true" />
          {property.location.name}, Tennessee
        </CardDescription>
        <CardTitle className="text-2xl">
          <h2>{property.name}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-muted-foreground leading-6">{property.summary}</p>
        <ul
          aria-label={`${property.name} facts`}
          className="text-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium"
        >
          <li className="flex items-center gap-1.5">
            <UsersIcon aria-hidden="true" />
            Sleeps {property.maxGuests}
          </li>
          <li className="flex items-center gap-1.5">
            <BedDoubleIcon aria-hidden="true" />
            {property.bedrooms}{' '}
            {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
          </li>
          <li>{property.bathrooms} baths</li>
        </ul>
        <ul className="flex flex-wrap gap-2" aria-label="Selected amenities">
          {property.amenities.slice(0, 3).map((amenity) => (
            <li key={amenity.id}>
              <Badge variant="outline">{amenity.name}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link
          href={href}
          aria-label={`View ${property.name}`}
          className={buttonVariants({
            size: 'lg',
            className: "after:absolute after:inset-0 after:content-['']",
          })}
        >
          View property
        </Link>
        <p className="text-muted-foreground ml-auto text-xs">
          Enquiry only · no live availability
        </p>
      </CardFooter>
    </Card>
  )
}
