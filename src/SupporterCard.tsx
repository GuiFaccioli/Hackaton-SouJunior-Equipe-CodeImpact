import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { assets } from "./assets";

type Card = { name: string; website: string; photo: string };

export default function SupporterCard() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [photo, setPhoto] = useState("");
  const [proofName, setProofName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [readingPhoto, setReadingPhoto] = useState(false);
  const photoVersion = useRef(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const card: Card | null = name.trim()
    ? { name: name.trim(), website: website.trim(), photo }
    : null;

  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const version = ++photoVersion.current;
    setPhoto("");
    setError("");
    setReadingPhoto(false);
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setError("Escolha uma foto JPG, PNG ou WebP de até 5 MB.");
      event.target.value = "";
      return;
    }
    setReadingPhoto(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (version !== photoVersion.current) return;
      const url = String(reader.result);
      const image = new Image();
      image.onload = () => {
        if (version === photoVersion.current) {
          setPhoto(url);
          setReadingPhoto(false);
        }
      };
      image.onerror = () => {
        if (version === photoVersion.current) {
          setError("Não foi possível abrir essa foto. Escolha outra imagem.");
          setReadingPhoto(false);
        }
      };
      image.src = url;
    };
    reader.onerror = () => {
      if (version === photoVersion.current) {
        setError("Não foi possível ler essa foto.");
        setReadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  }

  function generate(event: FormEvent) {
    event.preventDefault();
    if (readingPhoto) return;
    if (!name.trim()) {
      setError("Informe seu nome para gerar o card.");
      return;
    }
    setError("");
  }

  function selectProof(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setProofName("");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Escolha um comprovante de até 5 MB.");
      event.target.value = "";
      setProofName("");
      return;
    }
    setError("");
    setProofName(file.name);
  }

  async function download() {
    if (!card) return;
    setBusy(true);
    setError("");
    try {
      await document.fonts.ready;
      const preview = previewRef.current;
      if (!preview) throw new Error("Preview unavailable");
      const bounds = preview.getBoundingClientRect();
      const scale = 3;
      const copyWithComputedStyles = async (element: Element): Promise<Element> => {
        const clone = element.cloneNode(false) as Element;
        const computed = window.getComputedStyle(element);
        clone.setAttribute(
          "style",
          Array.from(computed)
            .map((property) => `${property}:${computed.getPropertyValue(property)};`)
            .join(""),
        );
        if (element instanceof HTMLImageElement && clone instanceof HTMLImageElement) {
          await element.decode();
          const imageCanvas = document.createElement("canvas");
          imageCanvas.width = element.naturalWidth;
          imageCanvas.height = element.naturalHeight;
          const imageContext = imageCanvas.getContext("2d");
          if (!imageContext) throw new Error("Could not embed preview image");
          imageContext.drawImage(element, 0, 0);
          clone.src = imageCanvas.toDataURL("image/png");
        }
        for (const child of Array.from(element.childNodes)) {
          clone.appendChild(
            child instanceof Element
              ? await copyWithComputedStyles(child)
              : child.cloneNode(true),
          );
        }
        return clone;
      };
      const styledPreview = await copyWithComputedStyles(preview);
      const markup = new XMLSerializer().serializeToString(styledPreview);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width * scale}" height="${bounds.height * scale}" viewBox="0 0 ${bounds.width} ${bounds.height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${bounds.width}px;height:${bounds.height}px">${markup}</div></foreignObject></svg>`;
      const svgUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
      const image = new Image();
      image.src = svgUrl;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bounds.width * scale);
      canvas.height = Math.round(bounds.height * scale);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(svgUrl);
      const blob = await new Promise<Blob>((resolve, reject) =>
        canvas.toBlob(
          (value) =>
            value ? resolve(value) : reject(new Error("Falha ao gerar imagem")),
          "image/png",
        ),
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "eu-apoio-soujunior.png";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("Não foi possível baixar o card. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card-builder">
      <form onSubmit={generate} className="card-form">
        <label htmlFor="supporter-name">Nome</label>
        <input
          id="supporter-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          maxLength={60}
          required
          placeholder="Seu nome"
          autoComplete="name"
        />
        <label htmlFor="supporter-site">LinkedIn ou site (opcional)</label>
        <input
          id="supporter-site"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          maxLength={100}
          placeholder="linkedin.com/in/voce"
          autoComplete="url"
        />
        <label htmlFor="supporter-proof">Comprovante de pagamento</label>
        <label className="upload-control" htmlFor="supporter-proof">
          <span className="upload-icon" aria-hidden="true">↥</span>
          <span>{proofName || "Adicionar comprovante"}</span>
        </label>
        <input
          className="upload-input"
          id="supporter-proof"
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          onChange={selectProof}
          aria-describedby="proof-help"
        />
        <label htmlFor="supporter-photo">Foto (opcional)</label>
        <label className="upload-control" htmlFor="supporter-photo">
          <span className="upload-icon" aria-hidden="true">↥</span>
          <span>{photo ? "Foto adicionada" : "Adicionar foto"}</span>
        </label>
        <input
          className="upload-input"
          id="supporter-photo"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={selectPhoto}
          aria-describedby="photo-help"
        />
        <small id="photo-help">JPG, PNG ou WebP · até 5 MB</small>
        <div className="builder-actions">
          <button
            className="button button-primary"
            type="submit"
            disabled={readingPhoto}
          >
            {readingPhoto ? "Carregando foto…" : "Gerar card"}
          </button>
          <button
            className="button button-secondary"
            type="button"
            disabled={!card || busy}
            onClick={download}
          >
            {busy ? "Baixando…" : "Baixar"}
          </button>
        </div>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
      </form>
      <div
        className="card-preview"
        aria-label="Prévia do card"
        aria-live="polite"
      >
        <div ref={previewRef} className={`preview-card ${card ? "has-card" : ""}`}>
          <div className="preview-card-top">
            <img className="preview-logo" src={assets.logo} alt="" />
            <span className="preview-badge">Mantenedor</span>
          </div>
          <div className="preview-artwork" aria-hidden="true">
            <div className="preview-artwork-background" />
            <div className="preview-mascot-clip">
              <img className="preview-mascot" src={assets.mascotCropped} alt="" />
            </div>
            <img className="preview-coins" src={assets.coins} alt="" />
          </div>
          <div className="preview-card-copy">
            <h3>{card?.name || "Nome Completo"}</h3>
            <p>
              Eu apoio quem está
              <br />
              começando em tech <span aria-hidden="true">💙</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
