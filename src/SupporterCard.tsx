import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { assets } from "./assets";

type Card = { name: string; website: string; photo: string };

export default function SupporterCard() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [photo, setPhoto] = useState("");
  const [card, setCard] = useState<Card | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [readingPhoto, setReadingPhoto] = useState(false);
  const photoVersion = useRef(0);

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
    setCard({ name: name.trim(), website: website.trim(), photo });
  }

  async function download() {
    if (!card) return;
    setBusy(true);
    setError("");
    try {
      await document.fonts.ready;
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas indisponível");
      context.fillStyle = "#2e52f2";
      context.fillRect(0, 0, 1200, 630);
      context.fillStyle = "#ffffff";
      context.font = '700 32px "Funnel Sans", sans-serif';
      context.fillText("SouJunior", 64, 78);
      context.font = '500 22px "Funnel Sans", sans-serif';
      context.fillText("EU APOIO QUEM ESTÁ COMEÇANDO", 64, 142);
      let fontSize = 64;
      do {
        context.font = `700 ${fontSize}px "Funnel Display", sans-serif`;
        fontSize -= 2;
      } while (context.measureText(card.name).width > 760 && fontSize > 20);
      context.fillText(card.name, 64, 290, 760);
      context.font = '400 27px "Funnel Sans", sans-serif';
      context.fillText(
        "Juntos, abrimos portas para novos talentos.",
        64,
        355,
        760,
      );
      context.font = '400 22px "Funnel Sans", sans-serif';
      context.fillText(card.website, 64, 414, 760);
      context.fillText("apoia.se/soujunior", 64, 555);
      if (card.photo) {
        const image = new Image();
        image.src = card.photo;
        await image.decode();
        const side = Math.min(image.width, image.height);
        context.save();
        context.beginPath();
        context.arc(1010, 290, 116, 0, Math.PI * 2);
        context.clip();
        context.drawImage(
          image,
          (image.width - side) / 2,
          (image.height - side) / 2,
          side,
          side,
          894,
          174,
          232,
          232,
        );
        context.restore();
      } else {
        context.strokeStyle = "#c8d3ff";
        context.lineWidth = 4;
        context.beginPath();
        context.arc(1010, 290, 116, 0, Math.PI * 2);
        context.stroke();
        context.font = '700 80px "Funnel Display", sans-serif';
        context.textAlign = "center";
        context.fillText(card.name.slice(0, 1).toUpperCase(), 1010, 318);
      }
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
          onChange={(event) => setName(event.target.value)}
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
        <label htmlFor="supporter-photo">Foto (opcional)</label>
        <input
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
        <p className="privacy-note">
          Sua foto e seus dados ficam apenas neste navegador. Gerar um card não
          confirma uma doação.
        </p>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
      </form>
      <div
        className={`card-preview ${card ? "has-card" : ""}`}
        aria-label="Prévia do card"
        aria-live="polite"
      >
        {card ? (
          <>
            <strong className="preview-brand">SouJunior</strong>
            <span className="preview-kicker">EU APOIO QUEM ESTÁ COMEÇANDO</span>
            <div className="preview-person">
              <div>
                <h3>{card.name}</h3>
                <p>Juntos, abrimos portas para novos talentos.</p>
                <small>{card.website}</small>
              </div>
              {card.photo ? (
                <img src={card.photo} alt={`Foto de ${card.name}`} />
              ) : (
                <span className="preview-initial">
                  {card.name.slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
            <span className="preview-url">apoia.se/soujunior</span>
          </>
        ) : (
          <div className="preview-empty">
            <img src={assets.badge} alt="" />
            <strong>Seu apoio merece ser compartilhado.</strong>
            <span>Preencha seus dados para criar seu card.</span>
          </div>
        )}
      </div>
    </div>
  );
}
