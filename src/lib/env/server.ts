import { z } from 'zod'

import { resolveIndexingPolicy } from '@/lib/seo/indexing'

const postgresUrlSchema = z
  .string()
  .url()
  .refine(
    (value) =>
      value.startsWith('postgres://') || value.startsWith('postgresql://'),
    'DATABASE_URL must use the postgres:// or postgresql:// protocol',
  )

const serverEnvSchema = z.object({
  DATABASE_URL: postgresUrlSchema,
  PAYLOAD_SECRET: z
    .string()
    .min(32, 'PAYLOAD_SECRET must contain at least 32 characters'),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  DEMO_CONTENT_ENABLED: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  SITE_INDEXING_ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  SEED_ADMIN_EMAIL: z.email().optional(),
  SEED_ADMIN_PASSWORD: z.string().min(12).optional(),
  SEED_ADMIN_NAME: z.string().min(2).optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

/**
 * Normalize platform-provided aliases before validation.
 * Netlify Database exposes NETLIFY_DB_URL; Netlify also sets URL /
 * DEPLOY_PRIME_URL for the deploy origin.
 */
export function resolveServerEnvironment(
  environment: Record<string, string | undefined>,
): Record<string, string | undefined> {
  const databaseUrl = environment.DATABASE_URL || environment.NETLIFY_DB_URL
  const serverUrl = (
    environment.NEXT_PUBLIC_SERVER_URL ||
    environment.URL ||
    environment.DEPLOY_PRIME_URL
  )?.replace(/\/$/, '')

  return {
    ...environment,
    DATABASE_URL: databaseUrl,
    NEXT_PUBLIC_SERVER_URL: serverUrl,
  }
}

export function parseServerEnv(
  environment: Record<string, string | undefined>,
): ServerEnv {
  const result = serverEnvSchema.safeParse(
    resolveServerEnvironment(environment),
  )

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ')

    throw new Error(`Invalid server environment: ${details}`)
  }

  return result.data
}

export function getServerEnv(): ServerEnv {
  const environment = parseServerEnv(process.env)

  resolveIndexingPolicy({
    environment:
      process.env.NODE_ENV === 'production'
        ? 'production'
        : process.env.NODE_ENV === 'test'
          ? 'test'
          : 'development',
    indexingEnabled: environment.SITE_INDEXING_ENABLED,
    demoContentEnabled: environment.DEMO_CONTENT_ENABLED,
  })

  return environment
}
