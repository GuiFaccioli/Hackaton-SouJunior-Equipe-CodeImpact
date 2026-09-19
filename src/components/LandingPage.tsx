import { CauseSection } from './CauseSection'
import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import { ImpactSection } from './ImpactSection'
import { SupportSection } from './SupportSection'
import { SupporterCardGenerator } from './SupporterCardGenerator'
import { SupportersRanking } from './SupportersRanking'
import { Testimonials } from './Testimonials'
import { TransparencySection } from './TransparencySection'

export function LandingPage() {
  return (
    <div className="site-shell">
      <Header />
      <main id="conteudo">
        <Hero />
        <CauseSection />
        <Testimonials />
        <ImpactSection />
        <TransparencySection />
        <SupportersRanking />
        <SupportSection />
        <SupporterCardGenerator />
      </main>
      <Footer />
    </div>
  )
}
