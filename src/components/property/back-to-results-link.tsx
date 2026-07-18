'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'

import { parseGuestSearchParams, searchHref } from '@/domain/search'

export function BackToResultsLink({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const searchParams = useSearchParams()
  const search = parseGuestSearchParams(searchParams)

  return (
    <Link href={searchHref('/cabins', search)} className={className}>
      {children}
    </Link>
  )
}
