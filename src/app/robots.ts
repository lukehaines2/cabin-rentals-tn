import type { MetadataRoute } from 'next'

import { getServerEnv } from '@/lib/env/server'
import { resolveIndexingPolicy } from '@/lib/seo/indexing'

export default function robots(): MetadataRoute.Robots {
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

  if (!policy.indexable) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: undefined,
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: new URL('/sitemap.xml', env.NEXT_PUBLIC_SERVER_URL).toString(),
  }
}
