import Link from 'next/link'

import { BrandMark } from '@/components/brand/brand-mark'
import { Container } from '@/components/layout/primitives'
import { Separator } from '@/components/ui/separator'

const footerGroups = [
  {
    title: 'Guests',
    links: [
      { href: '/', label: 'Home' },
      { href: '/cabins', label: 'Explore cabins' },
    ],
  },
  {
    title: 'Property owners',
    links: [{ href: '/#owner-intro', label: 'Stage 1 owner introduction' }],
  },
] as const

function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-14 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div className="flex max-w-md flex-col items-start gap-6">
            <BrandMark inverted />
            <p className="text-primary-foreground/75 text-sm leading-7">
              A developing guest-first home for cabin discovery and thoughtful
              property management across Tennessee&apos;s Smoky Mountains.
            </p>
            <p className="text-primary-foreground/60 text-xs leading-5">
              This preview does not show live availability, exact rates, or
              confirmed reservations.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid gap-10 sm:grid-cols-2"
          >
            {footerGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h2 className="text-xs font-bold tracking-[0.16em] uppercase">
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-primary-foreground/75 hover:text-primary-foreground inline-flex min-h-11 items-center rounded-sm text-sm underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <Separator className="bg-primary-foreground/15 my-10" />
        <div className="text-primary-foreground/60 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Cabin Rentals TN.</p>
          <p>
            Demo stage: contact, legal, and owner-enquiry routes are not yet
            published.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export { SiteFooter }
