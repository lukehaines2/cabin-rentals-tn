import { describe, expect, it } from 'vitest'

import { resolveIndexingPolicy } from './indexing'

describe('resolveIndexingPolicy', () => {
  it('keeps local and staging-like environments noindex', () => {
    expect(
      resolveIndexingPolicy({
        environment: 'development',
        indexingEnabled: true,
        demoContentEnabled: false,
      }),
    ).toMatchObject({
      indexable: false,
      robots: 'noindex,nofollow',
    })
  })

  it('refuses indexed production when demo content is enabled', () => {
    expect(() =>
      resolveIndexingPolicy({
        environment: 'production',
        indexingEnabled: true,
        demoContentEnabled: true,
      }),
    ).toThrow(/Refusing to enable production indexing/)
  })

  it('permits indexing only for explicit demo-free production', () => {
    expect(
      resolveIndexingPolicy({
        environment: 'production',
        indexingEnabled: true,
        demoContentEnabled: false,
      }),
    ).toEqual({
      indexable: true,
      robots: 'index,follow',
      reason: 'enabled',
    })
  })
})
