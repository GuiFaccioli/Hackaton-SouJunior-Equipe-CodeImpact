import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LandingPage } from './LandingPage'

describe('LandingPage', () => {
  it('renders the official support CTA and ecosystem links', () => {
    render(<LandingPage />)

    expect(screen.getAllByRole('link', { name: /apoiar a soujunior/i })[0].getAttribute('href')).toBe(
      'https://apoia.se/soujunior',
    )
    expect(screen.getByRole('link', { name: /discord oficial/i }).getAttribute('href')).toBe(
      'https://discord.gg/FkBcf3vdQZ',
    )
    expect(screen.getByRole('link', { name: /whatsapp oficial/i }).getAttribute('href')).toBe(
      'https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W',
    )
    expect(screen.getByRole('link', { name: /github oficial/i }).getAttribute('href')).toBe(
      'https://github.com/SouJunior',
    )
  })

  it('renders the documented impact and transparency figures', () => {
    render(<LandingPage />)

    expect(screen.getByText('35')).not.toBeNull()
    expect(screen.getByText('mentores ativos')).not.toBeNull()
    expect(screen.getByText('Mais de 50')).not.toBeNull()
    expect(screen.getByText('pessoas empregadas')).not.toBeNull()
    expect(screen.getByText('3')).not.toBeNull()
    expect(screen.getByText('projetos em desenvolvimento')).not.toBeNull()
    expect(screen.getByText('120')).not.toBeNull()
    expect(screen.getByText('membros')).not.toBeNull()
    expect(screen.getByText('108')).not.toBeNull()
    expect(screen.getByText('apoiadores')).not.toBeNull()
    expect(screen.getByText('R$ 1.849,59')).not.toBeNull()
  })

  it('presents supporters as a community mural instead of a money leaderboard', () => {
    render(<LandingPage />)

    const community = screen.getByRole('region', { name: /comunidade que apoia/i })
    expect(within(community).getByText('Apoiador demonstrativo 01')).not.toBeNull()
    expect(within(community).queryByText(/r\$/i)).toBeNull()
  })
})
