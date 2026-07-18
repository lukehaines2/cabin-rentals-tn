import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BathIcon, BedDoubleIcon, MapPinIcon, UsersIcon } from 'lucide-react'
import { Suspense } from 'react'

import { Container, Section } from '@/components/layout/primitives'
import { BackToResultsLink } from '@/components/property/back-to-results-link'
import { TripEnquiryPanel } from '@/components/property/trip-enquiry-panel'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { fixtureProperties } from '@/fixtures/properties'

export const dynamicParams = false

export function generateStaticParams() {
  return fixtureProperties.map((property) => ({ slug: property.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const property = fixtureProperties.find((item) => item.slug === slug)

  if (!property) return {}

  const title = `${property.name} — ${property.location.name} demo cabin`
  const description = `${property.summary} Sleeps ${property.maxGuests} with ${property.bedrooms} bedrooms. Fictional demo content; availability must be checked.`

  return {
    title,
    description,
    alternates: {
      canonical: `/cabins/${property.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/cabins/${property.slug}`,
      images: [
        {
          url: property.hero.url,
          width: property.hero.width,
          height: property.hero.height,
          alt: property.hero.alt,
        },
      ],
    },
  }
}

function EnquiryFallback() {
  return (
    <Card className="shadow-lifted">
      <CardHeader>
        <CardTitle className="text-3xl">Loading enquiry form</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-28 w-full" />
      </CardContent>
    </Card>
  )
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = fixtureProperties.find((item) => item.slug === slug)

  if (!property) notFound()

  const siteOrigin =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
  const hasGallery = property.gallery.length > 0

  return (
    <main id="main-content">
      <section className="bg-primary text-primary-foreground py-10 sm:py-14">
        <Container>
          <Suspense
            fallback={
              <Link
                href="/cabins"
                className="text-primary-foreground/75 hover:text-primary-foreground text-sm font-semibold underline underline-offset-4"
              >
                ← All cabins
              </Link>
            }
          >
            <BackToResultsLink className="text-primary-foreground/75 hover:text-primary-foreground text-sm font-semibold underline underline-offset-4">
              ← Back to cabin results
            </BackToResultsLink>
          </Suspense>
          <div className="mt-8 flex flex-col items-start gap-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Fictional demo property</Badge>
              <Badge
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground"
              >
                Availability unverified
              </Badge>
            </div>
            <h1 className="font-heading max-w-5xl text-5xl leading-[0.9] font-medium tracking-[-0.045em] text-balance sm:text-7xl">
              {property.name}
            </h1>
            <p className="text-primary-foreground/75 flex items-center gap-2 text-lg">
              <MapPinIcon aria-hidden="true" />
              {property.location.name}, Tennessee
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-8 sm:pt-10">
        <Container>
          {hasGallery ? (
            <div
              className="grid gap-3 md:grid-cols-4 md:grid-rows-2"
              aria-label={`${property.name} image gallery`}
            >
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[34rem]">
                <Image
                  src={property.hero.url}
                  alt={property.hero.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </div>
              {property.gallery.map((image) => (
                <div
                  key={image.id}
                  className="bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 25vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
              <div className="bg-muted relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={property.hero.url}
                  alt={property.hero.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 75vw"
                />
              </div>
              <Card className="bg-secondary/65 justify-center">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <h2>Hero-only demo gallery</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-7">
                  Additional property-specific images have not been assigned to
                  this fixture. The layout falls back intentionally instead of
                  repeating or inventing rooms.
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_28rem]">
            <article className="flex min-w-0 flex-col gap-10">
              <section aria-labelledby="overview-title">
                <p className="text-ember text-xs font-bold tracking-[0.18em] uppercase">
                  {property.propertyType.name} overview
                </p>
                <h2
                  id="overview-title"
                  className="font-heading mt-3 text-4xl font-semibold tracking-[-0.035em]"
                >
                  A clear look at the stay
                </h2>
                <p className="text-muted-foreground mt-5 max-w-3xl text-lg leading-8">
                  {property.summary}
                </p>
                <p className="mt-5 max-w-3xl leading-8">
                  {property.description}
                </p>
              </section>

              <section aria-labelledby="facts-title">
                <h2
                  id="facts-title"
                  className="font-heading text-3xl font-semibold"
                >
                  Property facts
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                  <li className="bg-card shadow-soft flex items-center gap-3 rounded-xl border p-4">
                    <UsersIcon aria-hidden="true" />
                    <span>
                      <strong className="block">Sleeps</strong>
                      {property.maxGuests} guests
                    </span>
                  </li>
                  <li className="bg-card shadow-soft flex items-center gap-3 rounded-xl border p-4">
                    <BedDoubleIcon aria-hidden="true" />
                    <span>
                      <strong className="block">Bedrooms</strong>
                      {property.bedrooms}
                    </span>
                  </li>
                  <li className="bg-card shadow-soft flex items-center gap-3 rounded-xl border p-4">
                    <BathIcon aria-hidden="true" />
                    <span>
                      <strong className="block">Bathrooms</strong>
                      {property.bathrooms}
                    </span>
                  </li>
                </ul>
              </section>

              <section aria-labelledby="amenities-title">
                <h2
                  id="amenities-title"
                  className="font-heading text-3xl font-semibold"
                >
                  Selected amenities
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <li
                      key={amenity.id}
                      className="bg-card rounded-xl border px-4 py-3 font-medium"
                    >
                      {amenity.name}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-4 text-sm leading-6">
                  All facts and amenities on this page are fictional fixture
                  data and require authorized replacement before indexing.
                </p>
              </section>

              <Suspense
                fallback={
                  <Link
                    href="/cabins"
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'lg',
                    })}
                  >
                    Browse all cabins
                  </Link>
                }
              >
                <BackToResultsLink
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                  })}
                >
                  Back to cabin results
                </BackToResultsLink>
              </Suspense>
            </article>

            <Suspense fallback={<EnquiryFallback />}>
              <TripEnquiryPanel property={property} siteOrigin={siteOrigin} />
            </Suspense>
          </div>
        </Container>
      </Section>
    </main>
  )
}
