import { describe, expect, it } from 'vitest'

import {
  parsePublicSiteEnv,
  parseServerEnv,
  resolveServerEnvironment,
} from './server'

const validEnvironment = {
  DATABASE_URL:
    'postgresql://deep:deep-local-only@localhost:5432/deep?sslmode=disable',
  PAYLOAD_SECRET: 'a-development-secret-with-32-characters',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
  DEMO_CONTENT_ENABLED: 'true',
  SITE_INDEXING_ENABLED: 'false',
}

describe('resolveServerEnvironment', () => {
  it('prefers explicit DATABASE_URL and NEXT_PUBLIC_SERVER_URL', () => {
    expect(
      resolveServerEnvironment({
        ...validEnvironment,
        NETLIFY_DB_URL: 'postgresql://netlify/db',
        URL: 'https://example.netlify.app/',
      }),
    ).toMatchObject({
      DATABASE_URL: validEnvironment.DATABASE_URL,
      NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
    })
  })

  it('accepts Netlify database and deploy URL aliases', () => {
    expect(
      resolveServerEnvironment({
        NETLIFY_DB_URL: 'postgresql://netlify/db',
        URL: 'https://example.netlify.app/',
        PAYLOAD_SECRET: validEnvironment.PAYLOAD_SECRET,
      }),
    ).toMatchObject({
      DATABASE_URL: 'postgresql://netlify/db',
      NEXT_PUBLIC_SERVER_URL: 'https://example.netlify.app',
    })
  })
})

describe('parsePublicSiteEnv', () => {
  it('accepts deploy URL without database secrets', () => {
    expect(
      parsePublicSiteEnv({
        URL: 'https://cabin-preview.netlify.app/',
      }),
    ).toEqual({
      NEXT_PUBLIC_SERVER_URL: 'https://cabin-preview.netlify.app',
      DEMO_CONTENT_ENABLED: true,
      SITE_INDEXING_ENABLED: false,
    })
  })

  it('reports missing public origin without requiring Payload secrets', () => {
    expect(() => parsePublicSiteEnv({})).toThrowError(
      /Invalid public site environment: NEXT_PUBLIC_SERVER_URL/,
    )
  })
})

describe('parseServerEnv', () => {
  it('returns validated server configuration', () => {
    expect(parseServerEnv(validEnvironment)).toEqual({
      ...validEnvironment,
      DEMO_CONTENT_ENABLED: true,
      SITE_INDEXING_ENABLED: false,
    })
  })

  it('validates Netlify aliases as a complete environment', () => {
    expect(
      parseServerEnv({
        NETLIFY_DB_URL:
          'postgresql://deep:deep@ep-example.us-east-1.aws.neon.tech/neondb?sslmode=require',
        PAYLOAD_SECRET: validEnvironment.PAYLOAD_SECRET,
        URL: 'https://cabin-preview.netlify.app/',
      }),
    ).toMatchObject({
      DATABASE_URL:
        'postgresql://deep:deep@ep-example.us-east-1.aws.neon.tech/neondb?sslmode=require',
      NEXT_PUBLIC_SERVER_URL: 'https://cabin-preview.netlify.app',
      DEMO_CONTENT_ENABLED: true,
      SITE_INDEXING_ENABLED: false,
    })
  })

  it('reports missing variables without exposing values', () => {
    expect(() => parseServerEnv({})).toThrowError(
      /Invalid server environment:.*NEXT_PUBLIC_SERVER_URL: Invalid input.*DATABASE_URL: Invalid input.*PAYLOAD_SECRET: Invalid input/,
    )
  })

  it('rejects non-Postgres database URLs', () => {
    expect(() =>
      parseServerEnv({
        ...validEnvironment,
        DATABASE_URL: 'https://database.example.com/deep',
      }),
    ).toThrowError(/DATABASE_URL must use the postgres/)
  })
})
