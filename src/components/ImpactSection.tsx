import { impactMetrics, landingContent } from '../data/landing'

export function ImpactSection() {
  return (
    <section className="section section--ink" id="impacto" aria-labelledby="impact-title">
      <div className="page-shell">
        <div className="section-heading section-heading--light section-heading--split">
          <div>
            <p className="eyebrow">{landingContent.impact.eyebrow}</p>
            <h2 id="impact-title">{landingContent.impact.title}</h2>
          </div>
          <p>{landingContent.impact.description}</p>
        </div>
        <div className="metrics-grid">
          {impactMetrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              {metric.note ? <small>{metric.note}</small> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
