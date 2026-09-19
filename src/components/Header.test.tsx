import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('opens the primary navigation on small screens', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const menuButton = screen.getByRole('button', { name: /abrir menu/i })
    expect(menuButton.getAttribute('aria-expanded')).toBe('false')

    await user.click(menuButton)

    expect(menuButton.getAttribute('aria-expanded')).toBe('true')
    expect(screen.getByRole('navigation', { name: /navegação principal/i }).getAttribute('data-open')).toBe('true')
  })
})
