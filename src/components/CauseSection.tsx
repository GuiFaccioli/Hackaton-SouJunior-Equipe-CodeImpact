import { landingContent } from '../data/landing'

export function CauseSection() {
  return (
    <section className="section section--paper" id="causa" aria-labelledby="cause-title">
      <div className="page-shell cause-grid">
        <div>
          <p className="eyebrow">{landingContent.cause.eyebrow}</p>
          <h2 id="cause-title">{landingContent.cause.title}</h2>
        </div>
        <div className="cause-copy">
          {landingContent.cause.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="story-block">
            <h3>{landingContent.cause.storyTitle}</h3>
            <ul>
              {landingContent.cause.storyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
