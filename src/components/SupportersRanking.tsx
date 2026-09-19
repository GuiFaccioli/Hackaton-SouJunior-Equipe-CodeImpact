import { landingContent } from '../data/landing'
import { demoSupporters } from '../data/supporters'

export function SupportersRanking() {
  return (
    <section className="section section--paper" id="comunidade" aria-labelledby="community-title">
      <div className="page-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">{landingContent.community.eyebrow}</p>
            <h2 id="community-title">{landingContent.community.title}</h2>
          </div>
          <p>{landingContent.community.description}</p>
        </div>
        <div className="mural-grid">
          {demoSupporters.map((supporter) => (
            <article className="supporter-card" key={supporter.id}>
              <div className="supporter-card__topline">
                <span className="supporter-card__position">{String(supporter.position).padStart(2, '0')}</span>
                <span className="supporter-card__badge">{supporter.badge}</span>
              </div>
              <div className="supporter-card__identity">
                <span className="avatar" aria-hidden="true">
                  {supporter.initials}
                </span>
                <div>
                  <h3>{supporter.name}</h3>
                  <p>{supporter.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="demo-note">{landingContent.community.demoNote}</p>
      </div>
    </section>
  )
}
