import { landingContent, officialLinks } from '../data/landing'

export function Hero() {
  return (
    <section className="hero section" id="top" aria-labelledby="hero-title">
      <div className="page-shell hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{landingContent.hero.eyebrow}</p>
          <h1 id="hero-title">{landingContent.hero.title}</h1>
          <p className="hero__description">{landingContent.hero.description}</p>
          <div className="hero__actions">
            <a className="button button--dark" href={officialLinks.support.href} target="_blank" rel="noreferrer">
              {landingContent.common.supportCta}
              <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#causa">
              {landingContent.common.learnMore}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero__minimum-support">{landingContent.hero.minimumSupport}</p>
        </div>
        <div className="hero-visual" aria-label={landingContent.hero.visualLabel} role="img">
          <span className="hero-visual__tag">{landingContent.prototypeNotice}</span>
          <div className="hero-visual__orbit hero-visual__orbit--one" aria-hidden="true" />
          <div className="hero-visual__orbit hero-visual__orbit--two" aria-hidden="true" />
          <div className="hero-visual__core">
            <strong>R$ 2</strong>
            <span>um começo que conecta</span>
          </div>
          <div className="hero-visual__node hero-visual__node--one">mentoria</div>
          <div className="hero-visual__node hero-visual__node--two">projetos</div>
          <div className="hero-visual__node hero-visual__node--three">comunidade</div>
          <p className="hero-visual__caption">{landingContent.hero.visualCaption}</p>
        </div>
      </div>
    </section>
  )
}
