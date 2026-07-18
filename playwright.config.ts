import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:3100'
const testEnvironment = {
  DATABASE_URL:
    'postgresql://deep:deep-local-only@localhost:5432/deep?sslmode=disable',
  PAYLOAD_SECRET: 'playwright-only-secret-with-32-characters',
  NEXT_PUBLIC_SERVER_URL: baseURL,
  DEMO_CONTENT_ENABLED: 'true',
  SITE_INDEXING_ENABLED: 'false',
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
