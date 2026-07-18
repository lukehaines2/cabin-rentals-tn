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
        className="bg-primary text-primary-foreground relative isolate overflow-hidden"
      >
        <Container className="grid min-h-[min(54rem,calc(100svh-7rem))] items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div className="relative z-10 flex max-w-5xl flex-col items-start gap-7">
            <Badge
              variant="outline"
              className="border-primary-foreground/25 text-primary-foreground"
            >
              Cabin Rentals TN · Sevier County
            </Badge>
            <h1
              id="home-hero-title"
              className="font-heading max-w-[12ch] text-[length:var(--text-display)] leading-[0.86] font-medium tracking-[-0.055em] text-balance"
            >
              Stay close to what feels wild.
            </h1>
            <p className="text-primary-foreground/78 max-w-2xl text-lg leading-8 text-pretty sm:text-xl sm:leading-9">
              Discover a focused demo collection across Gatlinburg, Pigeon
              Forge, and Sevierville, then send an enquiry for the stay you have
              in mind.
            </p>
            <SearchForm idPrefix="home" variant="hero" defaultGuests={2} />
            <Link
              href="/#owner-intro"
              className={cn(
                buttonVariants({ variant: 'link', size: 'sm' }),
                'text-primary-foreground hover:text-primary-foreground px-0',
              )}
            >
              Property owner information
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <p className="border-primary-foreground/20 text-primary-foreground/65 max-w-xl border-l pl-4 text-sm leading-6">
              Phase 1 captures trip preferences only. It does not show live
              availability, exact rates, or confirmed reservations.
            </p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] lg:mr-0">
            <div className="bg-parchment-deep shadow-lifted absolute inset-[8%_0_0_10%] overflow-hidden rounded-[45%_45%_2rem_2rem]">
              <svg
                aria-hidden="true"
                viewBox="0 0 560 700"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="560" height="700" fill="var(--parchment-deep)" />
                <circle cx="410" cy="134" r="58" fill="var(--accent)" />
                <path
                  d="M-20 390 108 235l78 95 74-105 88 118 77-92 155 165v304H-20Z"
                  fill="oklch(0.61 0.055 151)"
                />
                <path
                  d="m-10 470 125-92 75 52 95-119 98 122 66-65 131 90v262H-10Z"
                  fill="var(--pine-soft)"
                />
                <path
                  d="m-10 540 145-97 97 74 105-94 104 83 129-76v290H-10Z"
                  fill="var(--primary)"
                />
                <path d="M196 510h156v102H196z" fill="oklch(0.33 0.05 49)" />
                <path d="m174 514 100-82 100 82Z" fill="oklch(0.43 0.08 40)" />
                <rect
                  x="220"
                  y="542"
                  width="38"
                  height="70"
                  rx="2"
                  fill="var(--parchment-deep)"
                />
                <rect
                  x="284"
                  y="540"
                  width="40"
                  height="35"
                  rx="2"
                  fill="var(--accent)"
                />
                <path
                  d="M0 634c94-35 176-24 258 10 108 44 201 33 302-18v94H0Z"
                  fill="oklch(0.28 0.055 153)"
                />
              </svg>
            </div>
            <div className="bg-card text-card-foreground shadow-lifted absolute right-0 bottom-3 left-0 ml-auto w-[84%] rounded-2xl p-5 sm:p-6">
              <p className="text-ember text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                Three mountain towns
              </p>
              <p className="font-heading mt-2 text-2xl leading-tight font-semibold">
                One locally rooted collection.
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                Gatlinburg · Pigeon Forge · Sevierville
              </p>
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
