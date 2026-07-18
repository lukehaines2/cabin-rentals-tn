#!/usr/bin/env node
/**
 * Production build entry used by Netlify and local `pnpm build`.
 *
 * Guest catalogue pages are fixture-backed and do not need a live database at
 * build time. Payload config is still imported while compiling admin routes, so
 * this script supplies build-only placeholders when DATABASE_URL /
 * PAYLOAD_SECRET are absent. Runtime still requires real values for /admin and
 * guest enquiry storage.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const BUILD_DATABASE_URL =
  'postgresql://build-placeholder:build-placeholder@127.0.0.1:5432/build_placeholder'
const BUILD_PAYLOAD_SECRET =
  'netlify-build-placeholder-secret-32chars-min'

const env = { ...process.env }

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return

  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separator = trimmed.indexOf('=')
    if (separator === -1) continue

    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (env[key] == null || env[key] === '') {
      env[key] = value
    }
  }
}

// Local builds may rely on .env. Netlify builds must use platform env only.
if (env.NETLIFY !== 'true') {
  loadEnvFile(resolve(process.cwd(), '.env'))
  loadEnvFile(resolve(process.cwd(), '.env.local'))
}

if (!env.DATABASE_URL && !env.NETLIFY_DB_URL) {
  env.DATABASE_URL = BUILD_DATABASE_URL
  console.log(
    '[build] DATABASE_URL unset; using build-only placeholder (guest fixtures do not need a live DB).',
  )
}

if (!env.PAYLOAD_SECRET) {
  env.PAYLOAD_SECRET = BUILD_PAYLOAD_SECRET
  console.log(
    '[build] PAYLOAD_SECRET unset; using build-only placeholder. Set a real secret in Netlify for /admin and enquiry storage.',
  )
}

if (!env.NEXT_PUBLIC_SERVER_URL) {
  const deployUrl = (
    env.URL ||
    env.DEPLOY_PRIME_URL ||
    'http://localhost:3000'
  ).replace(/\/$/, '')
  env.NEXT_PUBLIC_SERVER_URL = deployUrl
  console.log(`[build] NEXT_PUBLIC_SERVER_URL unset; using ${deployUrl}`)
}

if (env.DEMO_CONTENT_ENABLED == null || env.DEMO_CONTENT_ENABLED === '') {
  env.DEMO_CONTENT_ENABLED = 'true'
}

if (env.SITE_INDEXING_ENABLED == null || env.SITE_INDEXING_ENABLED === '') {
  env.SITE_INDEXING_ENABLED = 'false'
}

// Use the pinned pnpm via npx so local machines without a global pnpm binary
// and Netlify both resolve the same package manager.
const pnpm = ['npx', '--yes', 'pnpm@11.14.0']

const steps = [
  [...pnpm, 'payload:types'],
  [...pnpm, 'payload:importmap'],
  [
    ...pnpm,
    'exec',
    'cross-env',
    'NODE_OPTIONS=--no-deprecation --max-old-space-size=4096',
    'next',
    'build',
  ],
]

for (const args of steps) {
  const [command, ...commandArgs] = args
  const result = spawnSync(command, commandArgs, {
    env,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.error) {
    console.error(result.error)
    process.exit(1)
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
