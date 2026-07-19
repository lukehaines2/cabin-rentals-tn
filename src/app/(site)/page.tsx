import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRightIcon,
  HeartHandshakeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  TreesIcon,
} from 'lucide-react'

import {
  Container,
  Section,
  SectionHeading,
} from '@/components/layout/primitives'
import { SearchForm } from '@/components/search/search-form'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

const planningSteps = [
  {
    number: '01',
    icon: MapPinIcon,
    title: 'Choose your corner',
    description:
      'Start with Gatlinburg, Pigeon Forge, or Sevierville and discover a cabin that suits your kind of trip.',
  },
  {
    number: '02',
    icon: TreesIcon,
    title: 'Compare what matters',
    description:
      'Review clear property facts and selected amenities without wading through an oversized marketplace.',
  },
  {
    number: '03',
    icon: ShieldCheckIcon,
    title: 'Share preferred dates',
    description:
      'Send the dates and group details you have in mind. Availability will be checked before any stay is confirmed.',
  },
] as const

export const metadata: Metadata = {
  title: 'Smoky Mountain Cabin Discovery',
  description:
    'Explore fictional demo cabins across Gatlinburg, Pigeon Forge, and Sevierville, then enquire with preferred dates that still require confirmation.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Smoky Mountain Cabin Discovery',
    description:
      'A guest-first, non-indexed demo cabin collection with honest enquiry-only trip planning.',
    url: '/',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <main id="main-content">
      <section
        aria-labelledby="home-hero-title"
        className="relative isolate overflow-hidden"
      >
        <Image
          src="/demo/home-hero.webp"
          alt="Warm cabin living room with floor-to-ceiling windows overlooking the Smoky Mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,28,22,0.55)_0%,rgba(18,28,22,0.28)_38%,rgba(18,28,22,0.52)_68%,rgba(18,28,22,0.78)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(18,28,22,0.35)_100%)]"
        />

        <Container className="relative z-10 flex min-h-[min(54rem,calc(100svh-7rem))] w-full flex-col justify-between gap-10 px-2.5 py-12 sm:gap-12 sm:px-[var(--page-gutter)] sm:py-14 md:py-16 lg:py-20">
          <div className="home-hero-copy mx-auto flex w-full max-w-4xl flex-col items-center gap-3 pt-4 text-center sm:gap-4 sm:pt-6 md:pt-10">
            <p className="font-heading text-[clamp(2.4rem,9vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.05em] text-balance text-white">
              Cabin Rentals{' '}
              <span className="text-white/72">Tennessee</span>
            </p>
            <h1
              id="home-hero-title"
              className="font-heading text-[clamp(1.45rem,5.2vw,2.75rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance text-white sm:leading-[1.08]"
            >
              Stay close to what feels wild.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-pretty text-white/82 sm:text-lg sm:leading-8">
              Discover a focused demo collection across Gatlinburg, Pigeon
              Forge, and Sevierville, then send an enquiry for the stay you have
              in mind.
            </p>
          </div>

          <div className="home-hero-search flex w-full min-w-0 flex-col gap-3 sm:gap-4">
            <SearchForm idPrefix="home" variant="hero" defaultGuests={2} />
            <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <p className="border-l border-white/30 pl-3 text-sm leading-6 text-pretty text-white/70 sm:max-w-xl sm:pl-4">
                Phase 1 captures trip preferences only. It does not show live
                availability, exact rates, or confirmed reservations.
              </p>
              <Link
                href="/#owner-intro"
                className={cn(
                  buttonVariants({ variant: 'link', size: 'sm' }),
                  'justify-start px-0 text-white hover:text-white/85 sm:shrink-0 sm:justify-end',
                )}
              >
                Property owner information
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="planning-title">
        <Container>
          <SectionHeading
            id="planning-title"
            eyebrow="A clearer way to plan"
            title="Mountain time, without the marketplace noise."
            description={
              <p>
                Cabin Rentals TN is being built around a focused managed
                portfolio, useful details, and honest next steps for every
                guest.
              </p>
            }
          />
          <div className="mt-[var(--content-space)] grid gap-5 md:grid-cols-3">
            {planningSteps.map((step) => {
              const Icon = step.icon

              return (
                <Card
                  key={step.number}
                  className="border-border/80 bg-card/80 shadow-soft min-h-72 border py-6"
                >
                  <CardHeader className="gap-5 px-6">
                    <div className="flex items-center justify-between">
                      <span className="text-ember text-xs font-bold tracking-[0.16em]">
                        {step.number}
                      </span>
                      <Icon
                        aria-hidden="true"
                        className="text-primary size-6"
                        strokeWidth={1.6}
                      />
                    </div>
                    <CardTitle className="font-heading text-2xl font-semibold">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-base leading-7">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section
        id="owner-intro"
        tone="muted"
        aria-labelledby="owner-intro-title"
        className="overflow-hidden"
      >
        <Container>
          <div className="border-primary/15 bg-card shadow-soft grid overflow-hidden rounded-3xl border lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-primary text-primary-foreground relative min-h-72 p-8 sm:p-12">
              <HeartHandshakeIcon
                aria-hidden="true"
                className="text-primary-foreground/80 size-10"
                strokeWidth={1.5}
              />
              <p className="font-heading mt-16 max-w-md text-3xl leading-tight sm:text-4xl">
                A guest experience that also works harder for property owners.
              </p>
              <div
                aria-hidden="true"
                className="bg-accent absolute -right-10 -bottom-14 size-40 rounded-full opacity-70"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-6 p-8 sm:p-12 lg:p-16">
              <p className="text-ember text-xs font-bold tracking-[0.18em] uppercase">
                Property management
              </p>
              <h2
                id="owner-intro-title"
                className="font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-5xl"
              >
                Local care, clearer presentation, less owner workload.
              </h2>
              <p className="text-muted-foreground max-w-xl text-base leading-7 sm:text-lg sm:leading-8">
                The owner experience will bring together local operations,
                cleaning expertise, guest communication, and direct website
                exposure—without making unsupported performance promises.
              </p>
              <Badge variant="secondary">
                Owner contact route planned for a later stage
              </Badge>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
