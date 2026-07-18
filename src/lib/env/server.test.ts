import { describe, expect, it } from 'vitest'

import { parseServerEnv } from './server'

const validEnvironment = {
  DATABASE_URL:
    'postgresql://deep:deep-local-only@localhost:5432/deep?sslmode=disable',
  PAYLOAD_SECRET: 'a-development-secret-with-32-characters',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
  DEMO_CONTENT_ENABLED: 'true',
  SITE_INDEXING_ENABLED: 'false',
}

describe('parseServerEnv', () => {
  it('returns validated server configuration', () => {
    expect(parseServerEnv(validEnvironment)).toEqual({
      ...validEnvironment,
      DEMO_CONTENT_ENABLED: true,
      SITE_INDEXING_ENABLED: false,
    })
  })

  it('reports missing variables without exposing values', () => {
    expect(() => parseServerEnv({})).toThrowError(
      /DATABASE_URL: Invalid input.*PAYLOAD_SECRET: Invalid input.*NEXT_PUBLIC_SERVER_URL: Invalid input/,
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
