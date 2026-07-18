import { describe, expect, it } from 'vitest'

import { catalogueRobotsDirective } from './catalogue'

describe('catalogue robots policy', () => {
  it('allows only the canonical base catalogue in an indexable environment', () => {
    expect(catalogueRobotsDirective(true, false)).toBe('index, follow')
    expect(catalogueRobotsDirective(true, true)).toBe('noindex, follow')
  })

  it('keeps all catalogue responses noindex in demo environments', () => {
    expect(catalogueRobotsDirective(false, false)).toBe('noindex, nofollow')
    expect(catalogueRobotsDirective(false, true)).toBe('noindex, nofollow')
  })
})
