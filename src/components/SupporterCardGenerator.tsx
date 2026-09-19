import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { landingContent } from '../data/landing'
import {
  canvasToBlob,
  downloadBlob,
  getCardFileName,
  loadImage,
  renderSupporterCard,
  shareOrDownload,
} from '../lib/share-card'

export function SupporterCardGenerator() {
  const [name, setName] = useState('')
  const [phrase, setPhrase] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [cardBlob, setCardBlob] = useState<Blob | null>(null)
  const [status, setStatus] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl)
    }
  }, [photoUrl])

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setStatus(landingContent.card.fileError)
      return
    }

    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoUrl(URL.createObjectURL(file))
    setStatus('Foto selecionada.')
  }

  const handleGenerate = async () => {
    const cleanName = name.trim()
    if (!cleanName) {
      setStatus(landingContent.card.nameRequired)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const photo = photoUrl ? await loadImage(photoUrl) : null
      const dataUrl = renderSupporterCard(canvas, { name: cleanName, phrase, photo })
      const blob = await canvasToBlob(canvas, dataUrl)
      setPreview(dataUrl)
      setCardBlob(blob)
      setStatus(landingContent.card.generatedStatus)
    } catch {
      setStatus('Não foi possível gerar o card neste navegador.')
    }
  }

  const handleShare = async () => {
    if (!preview || !cardBlob) return

    try {
      const result = await shareOrDownload(cardBlob, getCardFileName(name))
      setStatus(result === 'shared' ? landingContent.card.shareStatus : landingContent.card.downloadStatus)
    } catch {
      setStatus(landingContent.card.shareCancelled)
    }
  }

  const handleDownload = async () => {
    if (!preview) return

    const blob = cardBlob ?? (canvasRef.current ? await canvasToBlob(canvasRef.current, preview) : null)
    if (!blob) return

    downloadBlob(blob, getCardFileName(name))
    setStatus(landingContent.card.downloadStatus)
  }

  return (
    <section className="section section--dark-card" aria-labelledby="card-title">
      <div className="page-shell card-generator">
        <div className="card-generator__copy">
          <p className="eyebrow">{landingContent.card.eyebrow}</p>
          <h2 id="card-title">{landingContent.card.title}</h2>
          <p>{landingContent.card.description}</p>
        </div>
        <div className="card-generator__panel">
          <form
            className="card-form"
            onSubmit={(event) => {
              event.preventDefault()
              void handleGenerate()
            }}
          >
            <div className="field-group">
              <label htmlFor="supporter-name">{landingContent.card.nameLabel}</label>
              <input
                id="supporter-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={landingContent.card.namePlaceholder}
                maxLength={50}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="supporter-phrase">{landingContent.card.phraseLabel}</label>
              <textarea
                id="supporter-phrase"
                value={phrase}
                onChange={(event) => setPhrase(event.target.value)}
                placeholder={landingContent.card.phrasePlaceholder}
                maxLength={90}
                rows={3}
              />
            </div>
            <div className="field-group">
              <label htmlFor="supporter-photo">{landingContent.card.photoLabel}</label>
              <input id="supporter-photo" type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
            <button className="button button--light" type="submit">
              {landingContent.card.generate}
            </button>
          </form>
          <div className="card-generator__preview" aria-live="polite">
            {preview ? (
              <img src={preview} alt={landingContent.card.imageAlt} />
            ) : (
              <div className="card-placeholder">
                <span aria-hidden="true">✦</span>
                <p>Seu card aparecerá aqui.</p>
              </div>
            )}
            <div className="card-generator__actions">
              <button className="button button--light button--outline" type="button" onClick={() => void handleDownload()} disabled={!preview}>
                {landingContent.card.download}
              </button>
              <button className="button button--light button--outline" type="button" onClick={() => void handleShare()} disabled={!preview || !cardBlob}>
                {landingContent.card.share}
              </button>
            </div>
            <p className="status-message" role="status">
              {status}
            </p>
          </div>
          <canvas ref={canvasRef} className="card-canvas" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
