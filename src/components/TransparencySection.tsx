import { landingContent, transparencyExpenses, transparencyServices } from '../data/landing'

export function TransparencySection() {
  return (
    <section className="section" aria-labelledby="transparency-title">
      <div className="page-shell transparency-grid">
        <div>
          <p className="eyebrow">{landingContent.transparency.eyebrow}</p>
          <h2 id="transparency-title">{landingContent.transparency.title}</h2>
          <p className="section-lead">{landingContent.transparency.description}</p>
        </div>
        <div className="transparency-card">
          <span>{landingContent.transparency.totalLabel}</span>
          <strong>R$ 1.849,59</strong>
          <div className="transparency-card__services">
            <span>{landingContent.transparency.servicesLabel}</span>
            <ul>
              {transparencyServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="transparency-records">
          <h3>{landingContent.transparency.recordsLabel}</h3>
          <ul aria-label={landingContent.transparency.recordsLabel}>
            {transparencyExpenses.map((expense, index) => (
              <li key={`${expense.date}-${expense.service}-${index}`}>
                <time dateTime={`2026-${expense.date.split('/')[1]}-${expense.date.split('/')[0]}`}>{expense.date}</time>
                <span>{expense.service}</span>
                <strong>{expense.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
