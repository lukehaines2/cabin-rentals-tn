import type { MetadataRoute } from 'next'

import { fixtureProperties } from '@/fixtures/properties'
import { getServerEnv } from '@/lib/env/server'
import { resolveIndexingPolicy } from '@/lib/seo/indexing'

export default function sitemap(): MetadataRoute.Sitemap {
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
    return []
  }

  const paths = [
    '/',
    '/cabins',
    ...fixtureProperties
      .filter((property) => !property.isDemo)
      .map((property) => `/cabins/${property.slug}`),
  ]

  return paths.map((path) => ({
    url: new URL(path, env.NEXT_PUBLIC_SERVER_URL).toString(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/cabins' ? 0.9 : 0.7,
  }))
}
