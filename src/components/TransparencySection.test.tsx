import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TransparencySection } from './TransparencySection'

describe('TransparencySection', () => {
  it('renders the official expense records used in the transparency material', () => {
    render(<TransparencySection />)

    expect(screen.getAllByText('01/02')).toHaveLength(3)
    expect(screen.getAllByText('AWS').length).toBeGreaterThan(0)
    expect(screen.getByText('R$ 205,45')).not.toBeNull()
    expect(screen.getByText('24/08')).not.toBeNull()
    expect(screen.getAllByText('name.com')).toHaveLength(2)
    expect(screen.getByText('R$ 1.849,59')).not.toBeNull()
  })
})
