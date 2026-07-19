import Link from 'next/link'

import { BrandMark } from '@/components/brand/brand-mark'
import { MobileNavigation } from '@/components/layout/mobile-navigation'
import { Container } from '@/components/layout/primitives'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/cabins', label: 'Cabins' },
] as const

function SiteHeader() {
  return (
    <header className="border-border/70 bg-background/95 border-b backdrop-blur-md">
      <Container className="flex min-h-18 items-center justify-between gap-3 py-2 sm:gap-6">
        <BrandMark className="min-w-0" />
        <div className="hidden items-center gap-7 lg:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:bg-secondary focus-visible:bg-secondary inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/#owner-intro"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'border-primary/35 bg-transparent',
            )}
          >
            Property owner overview
          </Link>
          <Link
            href="/cabins"
            className={buttonVariants({ variant: 'default', size: 'lg' })}
          >
            Explore cabins
          </Link>
        </div>
        <MobileNavigation />
      </Container>
    </header>
  )
}

export { SiteHeader }
