import logoUrl from '../../docs/Ui-Kit/Group 1410103555.svg'
import { landingContent, navigationItems, officialLinks } from '../data/landing'

export function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="site-header__inner page-shell">
        <a className="brand-mark" href="#top" aria-label="SouJunior, voltar ao início">
          <img className="brand-logo" src={logoUrl} alt="SouJunior" />
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button--small button--dark" href={officialLinks.support.href} target="_blank" rel="noreferrer">
          {landingContent.common.supportCta}
        </a>
      </div>
    </header>
  )
}
