import { existsSync, readFileSync } from 'node:fs'

/**
 * Load KEY=VALUE pairs from a dotenv-style file into `target` without
 * overwriting keys that are already set to a non-empty value.
 */
export function loadEnvFile(filePath, target = process.env) {
  if (!existsSync(filePath)) return false

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

    if (target[key] == null || target[key] === '') {
      target[key] = value
    }
  }

  return true
}
