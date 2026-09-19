import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Testimonials } from './Testimonials'

describe('Testimonials', () => {
  it('renders the approved community testimonials from the project materials', () => {
    render(<Testimonials />)

    expect(screen.getByText('Thais Escobar')).not.toBeNull()
    expect(screen.getByText(/fundamental para minha transi/i)).not.toBeNull()
    expect(screen.getByText('Renan Marques')).not.toBeNull()
    expect(screen.getByText('APM')).not.toBeNull()
    expect(screen.getByText(/vivenciar, na pr/i)).not.toBeNull()
    expect(screen.getByText('Mentor')).not.toBeNull()
  })
})
