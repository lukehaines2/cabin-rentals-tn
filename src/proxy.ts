import { type NextRequest, NextResponse } from 'next/server'

import { getServerEnv } from '@/lib/env/server'
import { catalogueRobotsDirective } from '@/lib/seo/catalogue'
import { resolveIndexingPolicy } from '@/lib/seo/indexing'

export function proxy(request: NextRequest) {
  const env = getServerEnv()
  const policy = resolveIndexingPolicy({
    environment:
      process.env.NODE_ENV === 'production'
        ? 'production'
        : process.env.NODE_ENV === 'test'
          ? 'test'
          : 'development',
    indexingEnabled: env.SITE_INDEXING_ENABLED,
    demoContentEnabled: env.DEMO_CONTENT_ENABLED,
  })
  const response = NextResponse.next()

  response.headers.set(
    'X-Robots-Tag',
    catalogueRobotsDirective(
      policy.indexable,
      request.nextUrl.searchParams.size > 0,
    ),
  )

  return response
}

export const config = {
  matcher: ['/cabins'],
}
