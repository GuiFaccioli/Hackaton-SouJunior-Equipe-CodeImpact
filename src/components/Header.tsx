import { useState } from 'react'
import logoUrl from '../../pen.dev/Ui-Kit/Group 1410103555.svg'
import { landingContent, navigationItems, officialLinks } from '../data/landing'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="site-header__inner page-shell">
        <a className="brand-mark" href="#top" aria-label="SouJunior, voltar ao início">
          <img className="brand-logo" src={logoUrl} alt="SouJunior" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav
          id="primary-navigation"
          className="site-nav"
          aria-label="Navegação principal"
          data-open={isMenuOpen ? 'true' : 'false'}
        >
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="site-nav__support button button--small button--dark" href={officialLinks.support.href} target="_blank" rel="noreferrer">
            {landingContent.common.supportCta}
          </a>
        </nav>
        <a className="button button--small button--dark header-support" href={officialLinks.support.href} target="_blank" rel="noreferrer">
          {landingContent.common.supportCta}
        </a>
      </div>
    </header>
  )
}
