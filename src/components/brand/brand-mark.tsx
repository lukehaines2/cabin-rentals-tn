import Link from 'next/link'

import { cn } from '@/lib/utils'

type BrandMarkProps = {
  className?: string
  inverted?: boolean
}

function BrandMark({ className, inverted = false }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label="Cabin Rentals TN home"
      className={cn(
        'group inline-flex min-h-11 items-center gap-3 rounded-md',
        inverted
          ? 'text-primary-foreground'
          : 'text-primary hover:text-pine-soft',
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="size-10 shrink-0 overflow-visible"
      >
        <path
          d="M4 33.5 14.75 20l5.7 7.05L29.7 13 44 33.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M10 34h28M18.5 34v-7.5h11V34"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <circle cx="35.75" cy="10.25" r="2.25" fill="var(--accent)" />
      </svg>
      <span className="flex flex-col">
        <span className="font-heading text-[1.28rem] leading-none font-semibold tracking-[-0.025em]">
          Cabin Rentals
        </span>
        <span className="mt-1 text-[0.62rem] leading-none font-bold tracking-[0.26em] uppercase">
          Tennessee
        </span>
      </span>
    </Link>
  )
}

export { BrandMark }
