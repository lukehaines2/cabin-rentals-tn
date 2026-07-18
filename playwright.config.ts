import { resolve } from 'node:path'

import { defineConfig, devices } from '@playwright/test'

import { loadEnvFile } from './scripts/load-env-file.mjs'

const baseURL = 'http://127.0.0.1:3100'
const root = process.cwd()

loadEnvFile(resolve(root, '.env.test'))
loadEnvFile(resolve(root, '.env.test.example'))

const requiredKeys = [
  'DATABASE_URL',
  'PAYLOAD_SECRET',
  'NEXT_PUBLIC_SERVER_URL',
  'DEMO_CONTENT_ENABLED',
  'SITE_INDEXING_ENABLED',
] as const

for (const key of requiredKeys) {
  if (!process.env[key]) {
    throw new Error(
      `Missing ${key} for Playwright. Copy .env.test.example to .env.test or keep the example file present.`,
    )
  }
}

const testEnvironment = {
  DATABASE_URL: process.env.DATABASE_URL!,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET!,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL!,
  DEMO_CONTENT_ENABLED: process.env.DEMO_CONTENT_ENABLED!,
  SITE_INDEXING_ENABLED: process.env.SITE_INDEXING_ENABLED!,
}

Object.assign(process.env, testEnvironment)

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  workers: 1,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command:
      'npx pnpm build && npx pnpm start --hostname 127.0.0.1 --port 3100',
    env: testEnvironment,
    reuseExistingServer: false,
    timeout: 180_000,
    url: baseURL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
