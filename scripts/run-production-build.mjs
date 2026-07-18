#!/usr/bin/env node
/**
 * Production build entry for local and Netlify.
 *
 * Secrets come from environment files / the host platform — never from
 * committed placeholders. Local builds load `.env`; Netlify must supply
 * variables via Site configuration (see `.env.netlify.example`).
 */
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

import { loadEnvFile } from './load-env-file.mjs'

const env = { ...process.env }
const isNetlify = env.NETLIFY === 'true'

if (!isNetlify) {
  loadEnvFile(resolve(process.cwd(), '.env'), env)
  loadEnvFile(resolve(process.cwd(), '.env.local'), env)
}

if (!env.NEXT_PUBLIC_SERVER_URL) {
  const deployUrl = (
    env.URL ||
    env.DEPLOY_PRIME_URL ||
    (!isNetlify ? 'http://localhost:3000' : undefined)
  )?.replace(/\/$/, '')

  if (deployUrl) {
    env.NEXT_PUBLIC_SERVER_URL = deployUrl
    console.log(`[build] NEXT_PUBLIC_SERVER_URL unset; using ${deployUrl}`)
  }
}

if (env.DEMO_CONTENT_ENABLED == null || env.DEMO_CONTENT_ENABLED === '') {
  env.DEMO_CONTENT_ENABLED = 'true'
}

if (env.SITE_INDEXING_ENABLED == null || env.SITE_INDEXING_ENABLED === '') {
  env.SITE_INDEXING_ENABLED = 'false'
}

const missing = []
if (!env.DATABASE_URL && !env.NETLIFY_DB_URL) {
  missing.push('DATABASE_URL (or NETLIFY_DB_URL from Netlify Database)')
}
if (!env.PAYLOAD_SECRET) {
  missing.push('PAYLOAD_SECRET')
}
if (!env.NEXT_PUBLIC_SERVER_URL) {
  missing.push('NEXT_PUBLIC_SERVER_URL (or Netlify URL)')
}

if (missing.length > 0) {
  const hint = isNetlify
    ? 'Import a filled copy of `.env.netlify.example` in Netlify → Site configuration → Environment variables, then redeploy.'
    : 'Copy `.env.example` to `.env`, set real values, then retry.'
  console.error(`[build] Missing required environment: ${missing.join('; ')}`)
  console.error(`[build] ${hint}`)
  process.exit(1)
}

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
