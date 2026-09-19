import { describe, expect, it } from 'vitest'
import { getCardFileName } from './share-card'

describe('getCardFileName', () => {
  it('creates a safe file name from the supporter name', () => {
    expect(getCardFileName('  Ana Souza  ')).toBe('eu-apoio-a-soujunior-ana-souza.png')
  })
})
