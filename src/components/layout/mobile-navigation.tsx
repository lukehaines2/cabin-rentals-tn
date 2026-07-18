'use client'

import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { useRef, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/cabins', label: 'Cabins' },
] as const

function MobileNavigation() {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'border-primary/25 bg-background lg:hidden',
            )}
            aria-label="Open site menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        side="right"
        initialFocus={firstLinkRef}
        className="border-primary/15 bg-background w-[min(92vw,26rem)] p-0"
      >
        <SheetHeader className="border-border/70 border-b px-6 pt-7 pr-16 pb-5">
          <SheetTitle className="font-heading text-2xl font-semibold">
            Find your way
          </SheetTitle>
          <SheetDescription className="leading-6">
            Explore cabin stays or read the Stage 1 property-owner introduction.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="flex flex-col p-4">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              className="hover:bg-secondary focus-visible:bg-secondary flex min-h-12 items-center rounded-lg px-3 font-semibold"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="bg-primary text-primary-foreground mt-auto flex flex-col gap-3 p-6">
          <p className="text-xs font-bold tracking-[0.16em] uppercase opacity-75">
            For property owners
          </p>
          <p className="font-heading text-2xl leading-tight">
            Thoughtful care for Smoky Mountain homes.
          </p>
          <Link
            href="/#owner-intro"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'mt-2 w-full',
            )}
          >
            Property owner overview
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNavigation }
