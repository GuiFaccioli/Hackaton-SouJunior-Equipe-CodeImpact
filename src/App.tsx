import { useState } from "react";
import { useCircularTrack } from "./useCircularTrack";
import { assets } from "./assets";
import SupporterCard from "./SupporterCard";

const campaign = "https://apoia.se/soujunior";
const navigation = [
  ["A causa", "causa"],
  ["Impacto", "impacto"],
  ["Comunidade", "comunidade"],
  ["Como apoiar", "apoio"],
];
function SupportLink({
  children = "Apoiar",
  light = false,
}: {
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : "button-primary"}`}
      href={campaign}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  return <span className={`social-glyph social-glyph-${kind}`} aria-hidden="true" />;
}

function OfficialLanding() {
  const metricsRef = useCircularTrack(20);
  const mentorsRef = useCircularTrack(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(1);
  const transparencyRows = [
    ["Servidores e infraestrutura", "R$ 320", assets.server],
    ["Ferramentas de colaboração", "R$ 180", assets.collaboration],
    ["Plataforma e domínios", "R$ 90", assets.platform],
    ["Comunicação e design", "R$ 60", assets.communication],
    ["Reserva operacional", "R$ 50", assets.reserve],
  ] as const;
  const plans = [
    {
      name: "Juninho",
      amount: "2",
      features: [
        "Acesso à comunidade",
        "Newsletter mensal",
        "Seu nome na lista de apoiadores",
        "Card de apoiador para Linkedin",
      ],
      dark: false,
    },
    {
      name: "Juninho Pro",
      amount: "15",
      features: [
        "Tudo do semente",
        "Badge no Discord",
        "Card de apoiador para Linkedin",
        "Mentorias individuais",
        "Acesso antecipado a eventos",
      ],
      dark: true,
    },
    {
      name: "Juninho Pro Max",
      amount: "50",
      features: [
        "Tudo do Mantenedor",
        "Menção em relatório mensal",
        "Selo Patrono no perfil",
        "Descontos e sorteios em cursos e eventos",
        "Canal exclusivo de feedback",
      ],
      dark: false,
    },
  ] as const;
  const mentors = [
    ["Alice Soares", "UX/UI Design", "1h de mentoria individual sobre portfólio", assets.mentorAlice],
    ["Heitor Santos", "UX/UI Design", "1h de mentoria individual sobre Linkedin", assets.mentorHeitor],
    ["Tiago Barbosa", "Product Management", "1h de mentoria sobre como migrar para área", assets.mentorTiago],
    ["Bruna Fontes", "Front-end", "1h de mentoria para treinamento de entrevistas", assets.mentorBruna],
    ["Camila Santos", "Dev Full Stack", "1h de mentoria de como estruturar um portfólio", assets.mentorCamila],
  ] as const;
  const reviews = [
    {
      quote:
        "\"Como mentora, acompanhei juninhos em início e transição de carreira pra Produto Digital. Mergulhamos no problema, testamos hipóteses e navegamos por diferentes soluções. Em pouco tempo, eles já estavam tomando boas decisões foi um privilégio ver isso de perto.\"",
      name: "Mentora da comunidade",
      role: "Mentora",
    },
    {
      quote:
        "“Na SouJunior pude vivenciar, na prática, a área em que quero atuar. Ampliei meus conhecimentos técnicos, desenvolvi habilidades que ainda não tinha colocado em prática e criei conexões que abriram portas  inclusive vagas que surgiram por meio da comunidade.”",
      name: "Renan Marques",
      role: "APM",
    },
    {
      quote:
        "\"Participar da SouJunior foi fundamental para minha transição de carreira. Eu estudava Product Management, mas foi ali que apliquei esse conhecimento em projetos reais, com mentoria. Essa vivência me preparou pra atuar em tecnologia e uso esses aprendizados até hoje.\"",
      name: "Thais Escobar",
      role: "Product Owner",
    },
  ] as const;
  const activeReview = reviews[quoteIndex];

  return (
    <div className="official-page" data-frame-id="sXL38">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <div className="hero-art-composition">
          <div className="hero-art-background" />
          <div className="hero-mascot-clip">
            <div className="hero-mascot-layer">
              <picture>
                <source media="(max-width: 800px)" srcSet={assets.mascotMobile} />
                <source media="(min-width: 801px)" srcSet={assets.mascotCropped} />
                <img className="hero-mascot" src={assets.mascot} alt="" fetchPriority="high" />
              </picture>
            </div>
          </div>
          <picture className="hero-coins-picture">
            <source media="(max-width: 800px)" srcSet={assets.coinsMobile} />
            <img className="hero-coins" src={assets.coins} alt="" />
          </picture>
          <div className="floating-member">
            <div className="member-top">
              <img src={assets.topCardLogo} alt="" />
              <span>Mantenedor</span>
            </div>
            <div className="member-person">
              <img src={assets.topCardAvatar} alt="" />
              <div><b>Rafael Miranda</b><small>Apoiador da comunidade</small></div>
            </div>
          </div>
          <div className="floating-support">
            <img src={assets.support} alt="" />
            <div><small>apoio recebido</small><strong>Todo apoio ajuda<br />manter a mentoria no ar!</strong></div>
          </div>
          </div>
        </div>
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <header className="header wide-container">
          <div className="header-actions">
            <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
            <nav id="main-nav" className={menuOpen ? "nav is-open" : "nav"} aria-label="Menu principal" onKeyDown={(event) => { if (event.key === "Escape") setMenuOpen(false); }}>
              {navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
              <SupportLink light />
            </nav>
          </div>
          <a href="#inicio" aria-label="SouJunior — início"><img className="logo" src={assets.logo} alt="SouJunior" width="164" height="67" /></a>
        </header>
        <div className="hero-copy">
          <span className="eyebrow">Plataforma Apoia.se</span>
          <div className="hero-text">
            <h1 id="hero-title"><span className="desktop-hero-title">Apoiar a<br />SouJunior é<br />investir em quem<br />está começando</span><span className="mobile-hero-title">Apoiar a SouJunior é investir em quem está começando</span></h1>
            <p>Doe e concorra a mentorias individuais com quem já trilhou esse caminho.</p>
          </div>
          <div className="hero-actions"><SupportLink light /><a className="button button-outline" href="#causa">Conhecer a causa</a></div>
        </div>
      </section>

      <main id="conteudo">
        <section className="pale-stage" aria-label="Transparência e impacto">
          <section id="causa" className="transparency-section" aria-labelledby="cause-title">
            <div className="section-heading"><h2 id="cause-title">Para onde vai<br />o seu dinheiro?</h2></div>
            <div className="transparency-content wide-container">
              <div className="value-cards">
                <div className="value-card"><img src={assets.server} alt="" /><strong>R$ 2</strong><span>=</span><em>1 dia de servidor</em></div>
                <div className="value-card"><img src={assets.valueTools} alt="" /><strong>R$ 15</strong><span>=</span><em>1 semana de ferramentas</em></div>
              </div>
              <div className="expense-card" aria-label="Gastos mensais da SouJunior">
                <div className="expense-head"><span>Item</span><span>Mensal</span></div>
                <div className="expense-rows">
                  {transparencyRows.map(([name, value, icon]) => <div className="expense-row" key={name}><img src={icon} alt="" /><div className="expense-copy"><strong>{name}</strong><span className="expense-track"><i /></span></div><b>{value}</b></div>)}
                </div>
                <div className="expense-total"><span>Total</span><strong>R$ 700 <small>/mês</small></strong></div>
              </div>
            </div>
          </section>
          <section id="impacto" className="impact-section" aria-labelledby="impact-title">
            <h2 id="impact-title">Números que<br />mostram o impacto</h2>
            <div className="metrics wide-container" ref={metricsRef}>
              <div className="metrics-track">
                {[0, 1].map((set) => <div className="metrics-set" key={set} aria-hidden={set === 1}>
                  {[
                    ["+35", "Projetos ativos", "Projetos que conectam talentos a desafios reais."],
                    ["+50", "Mentores voluntários", "Experiência compartilhada para acelerar novas carreiras."],
                    ["+3", "Anos de comunidade", "Uma jornada de colaboração, aprendizado e impacto."],
                    ["+120", "Devs formados", "Talentos preparados para transformar ideias em soluções."],
                    ["+108", "Empresas parceiras", "Parcerias que fortalecem oportunidades na tecnologia."],
                  ].map(([value, label, text]) => <article className="metric" key={`${set}-${label}`}><img src={assets.impactMark} alt="" /><strong>{value}</strong><h3>{label}</h3><p>{text}</p></article>)}
                </div>)}
              </div>
            </div>
          </section>
        </section>

        <section className="stories-section" aria-labelledby="stories-title">
          <div className="stories-background" aria-hidden="true" />
          <div className="stories-fade stories-fade-left" aria-hidden="true" />
          <div className="stories-fade stories-fade-right" aria-hidden="true" />
          <div className="stories-heading">
            <span className="eyebrow">Seu Impacto</span>
            <h2 id="stories-title">Você apoia aqui<br />O impacto vai longe</h2>
            <p>Cada real vira estrutura. Servidores no ar, mentorias gratuitas e projetos<br className="desktop-break" /> open-source que abrem a primeira porta de quem está começando.</p>
          </div>
          <div className="review-grid wide-container">
            <p className="review-side">{reviews[0].quote}</p>
            <div className="review-main" aria-live="polite"><blockquote>{activeReview.quote}</blockquote><div className="review-author"><strong>{activeReview.name}</strong><span>{activeReview.role}</span></div><div className="review-avatar" aria-hidden="true" /></div>
            <p className="review-side">{reviews[2].quote}</p>
          </div>
          <div className="quote-controls" aria-label="Depoimentos">
            {reviews.map((review, index) => <button key={review.name} aria-label={`Depoimento ${index + 1}`} aria-pressed={quoteIndex === index} onClick={() => setQuoteIndex(index)} />)}
          </div>
        </section>

        <section className="campaign-stage">
          <section id="apoio" className="plans-section" aria-labelledby="support-title">
            <div className="plans-heading"><h2 id="support-title">Escolha<br />como apoiar</h2><p>Cancele quando quiser, sem complicação.</p></div>
            <div className="plans wide-container">
              {plans.map((plan) => <article className={`plan ${plan.dark ? "plan-featured" : ""}`} key={plan.name}>
                <div className="plan-content"><span className="plan-name">{plan.name}</span><div className="plan-price"><strong>R$ {plan.amount}</strong><small>/MÊS</small>{plan.dark && <b>popular</b>}</div><ul>{plan.features.map((feature) => <li key={feature}><img src={plan.dark ? assets.checkLight : assets.check} alt="" />{feature}</li>)}</ul></div>
                <SupportLink light>Apoiar com R$ {plan.amount},00</SupportLink>
              </article>)}
            </div>
          </section>

          <section id="mentorias" className="mentorship-section" aria-labelledby="mentorship-title">
            <div className="mentorship-heading"><span className="eyebrow">Premiação</span><h2 id="mentorship-title">Concorra a<br />mentorias individuais</h2><p>Conheça quem mentora.<br />Quanto mais você doa, mais chances tem de ser sorteado. O sorteio acontece uma vez por mês.</p></div>
            <div className="mentor-grid wide-container" ref={mentorsRef}>
              <div className="mentor-track">
                {[0, 1].map((set) => <div className="mentor-set" key={set} aria-hidden={set === 1}>
                  {mentors.map(([name, role, description, image]) => <article className="mentor-card" key={`${set}-${name}`}><img src={image} alt="" /><h3>{name} <span aria-hidden="true">✦</span></h3><strong>Mentora SouJúnior</strong><span>{role}</span><p>{description}</p></article>)}
                </div>)}
              </div>
            </div>
          </section>

          <section id="comunidade" className="community-section" aria-labelledby="community-title">
            <div className="community-heading"><h2 id="community-title">Mostre que<br />você apoia</h2><p>Gere seu card de apoiador e compartilhe no LinkedIn.</p></div>
            <div className="community-body wide-container"><SupporterCard /><SupporterWall /></div>
          </section>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner wide-container">
          <img className="footer-mobile-logo" src={assets.logo} alt="SouJunior" width="164" height="67" loading="lazy" />
          <nav className="social-links" aria-label="Canais oficiais">
            <a href={campaign} target="_blank" rel="noreferrer" aria-label="Apoia.se"><SocialIcon kind="apoia" /></a>
            <a href="https://www.instagram.com/soujunior.tech/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon kind="instagram" /></a>
            <a href="https://www.linkedin.com/company/soujunior/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialIcon kind="linkedin" /></a>
            <a href="https://github.com/SouJunior" target="_blank" rel="noreferrer" aria-label="GitHub"><SocialIcon kind="github" /></a>
            <a href="https://discord.gg/FkBcf3vdQZ" target="_blank" rel="noreferrer" aria-label="Discord"><SocialIcon kind="discord" /></a>
          </nav>
          <img className="footer-art" src={assets.footerArt} alt="" />
          <div className="footer-cta"><div><h2>Faça parte<br />da SouJunior</h2><p>Doe R$ 2  para manter a plataforma<br />de pé para quem está começando.</p></div><SupportLink>Apoiar</SupportLink></div>
        </div>
        <div className="footer-bottom wide-container"><a href="#inicio" aria-label="SouJunior — voltar ao início"><img className="logo" src={assets.logo} alt="SouJunior" width="164" height="67" loading="lazy" /></a><nav aria-label="Navegação do rodapé">{[...navigation.slice(0, 3), ["Como ajudar", "apoio"] as const].map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></div>
      </footer>
      <div className="sticky-cta" aria-label="Apoiar agora"><strong>Apoiar agora</strong><SupportLink>R$ 2/mês</SupportLink></div>
    </div>
  );
}

function SupporterWall() {
  const top = [["Ana Costa", "Dev Frontend"], ["Ana Costa", "Dev Frontend"], ["Ana Costa", "UX/UI Designer"]];
  return <div className="supporter-wall" aria-label="Mural de apoiadores">
    <div className="wall-heading"><h3>Top apoiadores</h3></div>
    <div className="top-supporters">{top.map(([name, role], index) => <article className={`top-supporter top-supporter-${index + 1}`} key={`${role}-${index}`}><img src={assets.muralAvatar} alt="" /><b>0{index + 1}</b><strong>{name}</strong><span>{role}</span><em>{index === 1 ? "juninho pro max" : index === 2 ? "Juninho" : "juninho pro"}</em></article>)}</div>
    <div className="supporter-list">{[["04", "Mantenedora"], ["05", "Mantenedora"]].map(([rank, badge]) => <div className="supporter-row" key={rank}><b>{rank}</b><img src={assets.muralSmallAvatar} alt="" /><span><strong>Ana Costa</strong><small>Dev Frontend</small></span><em>{badge}</em></div>)}</div>
  </div>;
}

export default function App() {
  return <OfficialLanding />;
}
