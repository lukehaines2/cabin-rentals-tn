import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Container, Section } from '@/components/layout/primitives'
import { PropertyCard } from '@/components/property/property-card'
import { CatalogueExplorer } from '@/components/search/catalogue-explorer'
import { Skeleton } from '@/components/ui/skeleton'
import { fixtureProperties } from '@/fixtures/properties'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Cabins in the Tennessee Smoky Mountains',
  description:
    'Explore ten fictional demo cabins across Gatlinburg, Pigeon Forge, and Sevierville. Dates are preferences and availability must be confirmed.',
  alternates: {
    canonical: '/cabins',
  },
  openGraph: {
    title: 'Cabins in the Tennessee Smoky Mountains',
    description:
      'Compare demo cabin facts, locations, and capacity without live availability or pricing claims.',
    url: '/cabins',
    type: 'website',
  },
}

function CatalogueFallback() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-56 w-full rounded-2xl md:h-32" />
      <p className="font-heading border-y py-5 text-2xl font-semibold">
        10 cabins
      </p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {fixtureProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

export default function CabinsPage() {
  return (
    <main id="main-content">
      <section className="bg-primary text-primary-foreground py-12 sm:py-16">
        <Container>
          <p className="text-primary-foreground/70 text-xs font-bold tracking-[0.18em] uppercase">
            Fictional demo collection
          </p>
          <h1 className="font-heading mt-4 max-w-4xl text-5xl leading-[0.92] font-medium tracking-[-0.045em] text-balance sm:text-7xl">
            Find a cabin shaped around your group.
          </h1>
          <p className="text-primary-foreground/75 mt-6 max-w-2xl text-lg leading-8">
            Browse useful property facts across three Smoky Mountain towns.
            Preferred dates travel with you but never imply availability.
          </p>
        </Container>
      </section>
      <Section>
        <Container>
          <Suspense fallback={<CatalogueFallback />}>
            <CatalogueExplorer properties={fixtureProperties} />
          </Suspense>
        </Container>
      </Section>
    </main>
  )
}
