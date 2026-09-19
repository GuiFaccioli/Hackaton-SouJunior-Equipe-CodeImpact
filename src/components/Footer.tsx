import { landingContent, officialLinks } from '../data/landing'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <div>
          <p className="site-footer__title">{landingContent.footer.title}</p>
          <p>{landingContent.footer.description}</p>
        </div>
        <nav className="footer-links" aria-label="Canais oficiais">
          <a href={officialLinks.support.href} target="_blank" rel="noreferrer">
            {officialLinks.support.label}
          </a>
          <a href={officialLinks.discord.href} target="_blank" rel="noreferrer">
            {officialLinks.discord.label}
          </a>
          <a href={officialLinks.whatsapp.href} target="_blank" rel="noreferrer">
            {officialLinks.whatsapp.label}
          </a>
          <a href={officialLinks.github.href} target="_blank" rel="noreferrer">
            {officialLinks.github.label}
          </a>
        </nav>
      </div>
    </footer>
  )
}
