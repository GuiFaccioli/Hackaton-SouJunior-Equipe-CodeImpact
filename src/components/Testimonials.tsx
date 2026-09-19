import { landingContent, testimonials } from '../data/landing'

export function Testimonials() {
  return (
    <section className="section section--compact" aria-labelledby="testimonials-title">
      <div className="page-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">{landingContent.testimonials.eyebrow}</p>
            <h2 id="testimonials-title">{landingContent.testimonials.title}</h2>
          </div>
          <p>{landingContent.testimonials.description}</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className={`testimonial-card${testimonial.isPlaceholder ? ' testimonial-card--placeholder' : ''}`} key={testimonial.author}>
              <span className="testimonial-card__audience">{testimonial.audience}</span>
              <p>“{testimonial.quote}”</p>
              <footer className="testimonial-card__author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
