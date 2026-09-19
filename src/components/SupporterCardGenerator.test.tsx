import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SupporterCardGenerator } from './SupporterCardGenerator'

describe('SupporterCardGenerator', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      fillStyle: '',
      fillRect: vi.fn(),
      fillText: vi.fn(),
      font: '',
      textAlign: 'left',
      beginPath: vi.fn(),
      arc: vi.fn(),
      clip: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D)
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue(
      'data:image/png;base64,generated-card',
    )
  })

  it('generates a card preview from the visitor name and phrase', async () => {
    render(<SupporterCardGenerator />)

    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: 'Pessoa apoiadora' },
    })
    fireEvent.change(screen.getByLabelText(/frase/i), {
      target: { value: 'Juntos fortalecemos a comunidade.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /gerar card/i }))

    const image = await screen.findByRole('img', { name: /eu apoio a soujunior/i })
    expect(image.getAttribute('src')).toBe('data:image/png;base64,generated-card')
  })

  it('falls back to downloading the card when file sharing is unavailable', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:card')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

    render(<SupporterCardGenerator />)
    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: 'Pessoa apoiadora' },
    })
    fireEvent.click(screen.getByRole('button', { name: /gerar card/i }))
    const downloadButton = await screen.findByRole('button', { name: /baixar card/i })
    await waitFor(() => expect(downloadButton.hasAttribute('disabled')).toBe(false))
    fireEvent.click(downloadButton)

    await waitFor(() => expect(click).toHaveBeenCalled())
    expect(screen.getByRole('status').textContent).toMatch(/download iniciado/i)
  })

  it('uses the Web Share API when file sharing is supported', async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', { configurable: true, value: share })
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: vi.fn().mockReturnValue(true),
    })

    render(<SupporterCardGenerator />)
    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: 'Pessoa apoiadora' },
    })
    fireEvent.click(screen.getByRole('button', { name: /gerar card/i }))
    const shareButton = await screen.findByRole('button', { name: /compartilhar card/i })
    await waitFor(() => expect(shareButton.hasAttribute('disabled')).toBe(false))
    fireEvent.click(shareButton)

    await waitFor(() => expect(share).toHaveBeenCalled())
  })
})
