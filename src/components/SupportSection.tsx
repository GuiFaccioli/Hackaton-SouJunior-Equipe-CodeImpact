import { landingContent, officialLinks } from '../data/landing'

export function SupportSection() {
  return (
    <section className="section" id="apoio" aria-labelledby="support-title">
      <div className="page-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">{landingContent.support.eyebrow}</p>
            <h2 id="support-title">{landingContent.support.title}</h2>
          </div>
          <p>{landingContent.support.description}</p>
        </div>
        <div className="support-options">
          {landingContent.support.options.map((option, index) => (
            <article className="support-option" key={option.title}>
              <span className="support-option__number">0{index + 1}</span>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <a className="button button--dark" href={officialLinks.support.href} target="_blank" rel="noreferrer">
            {landingContent.common.supportCta}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
