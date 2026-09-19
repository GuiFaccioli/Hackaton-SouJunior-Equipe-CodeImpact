export type SupporterCardData = {
  name: string
  phrase?: string
  photo?: HTMLImageElement | null
}

const CARD_SIZE = 1080

export function getCardFileName(name: string) {
  const safeName = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `eu-apoio-a-soujunior-${safeName || 'comunidade'}.png`
}

export function renderSupporterCard(canvas: HTMLCanvasElement, data: SupporterCardData) {
  canvas.width = CARD_SIZE
  canvas.height = CARD_SIZE

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D context is not available.')
  }

  context.fillStyle = '#f7f5ef'
  context.fillRect(0, 0, CARD_SIZE, CARD_SIZE)
  context.fillStyle = '#171717'
  context.fillRect(0, 0, CARD_SIZE, 180)

  if (data.photo) {
    context.save()
    context.beginPath()
    context.arc(92, 90, 52, 0, Math.PI * 2)
    context.clip()
    context.drawImage(data.photo, 40, 38, 104, 104)
    context.restore()
  }

  context.fillStyle = '#ffffff'
  context.font = '700 42px "Funnel Sans", Arial, sans-serif'
  context.fillText('SouJunior × CodeImpact', 180, 108)

  context.fillStyle = '#171717'
  context.font = '700 88px "Funnel Display", Arial, sans-serif'
  context.fillText('Eu apoio', 72, 430)
  context.fillText('a SouJunior', 72, 535)

  context.font = '500 38px "Funnel Sans", Arial, sans-serif'
  context.fillText(data.name.trim(), 72, 700)

  if (data.phrase?.trim()) {
    context.fillStyle = '#555555'
    context.font = '400 30px "Funnel Sans", Arial, sans-serif'
    context.fillText(data.phrase.trim().slice(0, 62), 72, 770)
  }

  context.fillStyle = '#171717'
  context.font = '600 26px "Funnel Sans", Arial, sans-serif'
  context.fillText('Uma comunidade que abre caminhos.', 72, 960)

  return canvas.toDataURL('image/png')
}

function dataUrlToBlob(dataUrl: string) {
  const [header, encoded] = dataUrl.split(',')
  const mimeType = header?.match(/data:(.*?);/)?.[1] ?? 'image/png'

  try {
    const binary = atob(encoded ?? '')
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    return new Blob([bytes], { type: mimeType })
  } catch {
    return new Blob([dataUrl], { type: mimeType })
  }
}

export function canvasToBlob(_canvas: HTMLCanvasElement, dataUrl: string) {
  return Promise.resolve(dataUrlToBlob(dataUrl))
}

export function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(objectUrl)
}

export async function shareOrDownload(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: 'image/png' })
  const canShareFiles =
    typeof navigator.share === 'function' &&
    (typeof navigator.canShare !== 'function' || navigator.canShare({ files: [file] }))

  if (canShareFiles) {
    await navigator.share({
      files: [file],
      title: 'Eu apoio a SouJunior',
      text: 'Uma comunidade que abre caminhos.',
    })
    return 'shared' as const
  }

  downloadBlob(blob, fileName)
  return 'downloaded' as const
}

export function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Could not load image.'))
    image.src = source
  })
}
