export function catalogueRobotsDirective(
  indexableEnvironment: boolean,
  hasQuery: boolean,
): 'index, follow' | 'noindex, follow' | 'noindex, nofollow' {
  if (!indexableEnvironment) {
    return 'noindex, nofollow'
  }

  return hasQuery ? 'noindex, follow' : 'index, follow'
}
