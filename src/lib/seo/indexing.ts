import { z } from 'zod'

const indexingInputSchema = z
  .object({
    environment: z.enum(['development', 'test', 'production']),
    indexingEnabled: z.boolean(),
    demoContentEnabled: z.boolean(),
  })
  .strict()

export type IndexingPolicy = {
  indexable: boolean
  robots: 'index,follow' | 'noindex,nofollow'
  reason: 'enabled' | 'non-production' | 'disabled'
}

export function resolveIndexingPolicy(input: unknown): IndexingPolicy {
  const settings = indexingInputSchema.parse(input)

  if (
    settings.environment === 'production' &&
    settings.indexingEnabled &&
    settings.demoContentEnabled
  ) {
    throw new Error(
      'Refusing to enable production indexing while demo content or assets are enabled.',
    )
  }

  if (settings.environment !== 'production') {
    return {
      indexable: false,
      robots: 'noindex,nofollow',
      reason: 'non-production',
    }
  }

  if (!settings.indexingEnabled) {
    return {
      indexable: false,
      robots: 'noindex,nofollow',
      reason: 'disabled',
    }
  }

  return {
    indexable: true,
    robots: 'index,follow',
    reason: 'enabled',
  }
}
