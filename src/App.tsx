import { useState } from "react";
import { assets } from "./assets";
import SupporterCard from "./SupporterCard";

const campaign = "https://apoia.se/soujunior";
const navigation = [
  ["A causa", "causa"],
  ["Impacto", "impacto"],
  ["Comunidade", "comunidade"],
  ["Como apoiar", "apoio"],
];
const metrics = [
  [
    "35",
    "Mentores ativos",
    "Experiência compartilhada para acelerar novas carreiras.",
  ],
  ["+50", "Pessoas empregadas", "Novas oportunidades por meio da SouJunior."],
  ["3", "Projetos em desenvolvimento", "Talentos conectados a desafios reais."],
  [
    "120",
    "Membros",
    "Uma comunidade que aprende e constrói junto. Número pendente de confirmação.",
  ],
  [
    "108",
    "Apoiadores",
    "Pessoas que ajudam a manter essa história viva. O número pode variar.",
  ],
];
const expenses = [
  {
    name: "Servidores e infraestrutura",
    description: "Servidores e infraestrutura",
    value: "R$ 320",
    percent: 45.71,
    image: assets.server,
  },
  {
    name: "Ferramentas de colaboração",
    description: "Ferramentas de colaboração",
    value: "R$ 180",
    percent: 25.71,
    image: assets.hands,
  },
  {
    name: "Plataformas e domínios",
    description: "Plataformas e domínios",
    value: "R$ 90",
    percent: 12.86,
    image: assets.globe,
  },
  {
    name: "Comunicação e design",
    description: "Comunicação e design",
    value: "R$ 60",
    percent: 8.57,
    image: assets.pencil,
  },
  {
    name: "Reserva Operacional",
    description: "Reserva Operacional",
    value: "R$ 50",
    percent: 7.14,
    image: assets.coin,
  },
];
const testimonials = [
  {
    quote:
      "Eu estava estudando e fazendo cursos de Product Management, mas foi na Sou Junior que tive a oportunidade de aplicar esse conhecimento em projetos reais, com orientação e mentoria.",
    name: "Thais Escobar",
    role: "Product Owner",
    initial: "TE",
  },
  {
    quote:
      "A interação com a comunidade e com os squads acabou proporcionando não apenas troca de conhecimento, mas também oportunidades de participar de novos projetos e até mesmo conhecer vagas que surgiram por meio dessas conexões.",
    name: "Renan Marques",
    role: "Associate Product Manager",
    initial: "RM",
  },
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quote = testimonials[quoteIndex];

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <section className="hero" aria-labelledby="hero-title">
        <header className="header container">
          <a href="#inicio" aria-label="SouJunior — início">
            <img
              className="logo"
              src={assets.logo}
              alt="SouJunior"
              width="164"
              height="67"
            />
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
          <nav
            id="main-nav"
            className={menuOpen ? "nav is-open" : "nav"}
            aria-label="Menu principal"
            onKeyDown={(event) => {
              if (event.key === "Escape") setMenuOpen(false);
            }}
          >
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <SupportLink light />
          </nav>
        </header>
        <div id="inicio" className="hero-art" aria-hidden="true">
          <img
            className="hero-mascot"
            src={assets.mascot}
            alt=""
            fetchPriority="high"
          />
          <img className="hero-coins" src={assets.coins} alt="" />
          <div className="floating-member">
            <div className="member-top">
              <strong>SouJunior</strong>
              <span>Mantenedor</span>
            </div>
            <div className="member-person">
              <img src={assets.avatar} alt="" />
              <div>
                <b>Exemplo de apoiador</b>
                <small>Prévia ilustrativa</small>
              </div>
            </div>
          </div>
          <div className="floating-support">
            <img src={assets.support} alt="" />
            <div>
              <small>apoio recebido</small>
              <strong>
                Todo apoio ajuda
                <br />a manter a mentoria no ar!
              </strong>
            </div>
          </div>
        </div>
        <div className="hero-copy">
          <span className="eyebrow">Plataforma Apoia.se</span>
          <h1 id="hero-title">
            Apoiar a <br />
            SouJunior é <br />
            investir em quem{" "}
            <br />
            está começando
          </h1>
          <div className="hero-actions">
            <SupportLink light />
            <a className="button button-outline" href="#causa">
              Conhecer a causa <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="hero-note">
            A partir de R$ 2 por mês, você faz parte dessa história.
          </p>
        </div>
      </section>

      <main id="conteudo">
        <div className="pale-section">
          <section
            id="causa"
            className="section container cause"
            aria-labelledby="cause-title"
          >
            <h2 id="cause-title">
              Para onde vai
              <br />o seu dinheiro?
            </h2>
            <div className="cause-grid">
              <div className="value-cards">
                <div className="value-card">
                  <img src={assets.server} alt="" />
                  <strong>R$ 2</strong>
                  <span>
                    para começar
                    <br />a fazer parte
                  </span>
                </div>
                <div className="value-card">
                  <img src={assets.tools} alt="" />
                  <strong>R$ 15</strong>
                  <span>
                    para fortalecer
                    <br />a comunidade
                  </span>
                </div>
                <p>
                  Seu apoio mantém a infraestrutura, os serviços e os projetos
                  da SouJunior em funcionamento.
                </p>
              </div>
              <div className="expense-card">
                <table>
                  <caption>
                    Gastos registrados de fevereiro a setembro de 2026
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Acumulado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.name}>
                        <th scope="row">
                          <img src={expense.image} alt="" />
                          <span>
                            <b>{expense.name}</b>
                            <small>{expense.description}</small>
                            <span className="expense-track" aria-hidden="true">
                              <i style={{ width: `${expense.percent}%` }} />
                            </span>
                          </span>
                        </th>
                        <td>{expense.value}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">Total em 2026, até setembro</th>
                      <td>R$ 700/mês</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>
          <section
            id="impacto"
            className="section container impact"
            aria-labelledby="impact-title"
          >
            <h2 id="impact-title">
              Números que
              <br />
              mostram o impacto
            </h2>
            <div className="metrics">
              {metrics.map(([value, label, description]) => (
                <article className="metric" key={label}>
                  <img src={assets.badge} alt="" loading="lazy" />
                  <strong>{value}</strong>
                  <h3>{label}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <p className="data-note">
              Dados fornecidos pela SouJunior para o hackathon · setembro de
              2026.
            </p>
          </section>
        </div>

        <section className="stories section" aria-labelledby="stories-title">
          <div className="container">
            <span className="eyebrow">Seu impacto</span>
            <h2 id="stories-title">
              Você apoia aqui.
              <br />O impacto vai longe.
            </h2>
            <p className="section-intro">
              Cada real vira estrutura. Servidores no ar, mentorias gratuitas e
              projetos
              <br className="desktop-break" /> open-source que abrem a primeira
              porta de quem está começando.
            </p>
            <div className="testimonial" aria-live="polite">
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{quote.quote}</blockquote>
              <div className="quote-avatar" aria-hidden="true">
                {quote.initial}
              </div>
              <strong>{quote.name}</strong>
              <span>{quote.role}</span>
              <small>Comunidade SouJunior</small>
            </div>
            <div className="quote-controls">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  aria-label={`Depoimento de ${item.name}`}
                  aria-pressed={quoteIndex === index}
                  onClick={() => setQuoteIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="pale-section support-area">
          <section
            id="apoio"
            className="section container"
            aria-labelledby="support-title"
          >
            <h2 id="support-title">
              Escolha
              <br />
              como apoiar
            </h2>
            <p className="section-intro">
              Cancele quando quiser, sem complicação.
            </p>
            <div className="plans">
              {[
                {
                  name: "Semente",
                  amount: "2",
                  icon: assets.badge,
                  features: [
                    "Ajude a manter a comunidade",
                    "Contribua com os projetos",
                    "Faça parte dessa história",
                  ],
                },
                {
                  name: "Mantenedor",
                  amount: "15",
                  icon: assets.patron,
                  features: [
                    "Fortaleça a infraestrutura",
                    "Apoie o aprendizado na prática",
                    "Ajude novas carreiras a começar",
                    "Incentive projetos colaborativos",
                  ],
                },
                {
                  name: "Patrono",
                  amount: "50",
                  icon: assets.badge,
                  features: [
                    "Amplie seu apoio à comunidade",
                    "Contribua com a continuidade",
                    "Fortaleça o ecossistema",
                    "Invista em quem está começando",
                  ],
                },
              ].map((plan, index) => (
                <article
                  className={`plan ${index === 1 ? "plan-featured" : ""}`}
                  key={plan.name}
                >
                  <img
                    className="plan-icon"
                    src={plan.icon}
                    alt=""
                    loading="lazy"
                  />
                  <span>{plan.name}</span>
                  <div className="plan-price">
                    <strong>R$ {plan.amount}</strong>
                    <small>/MÊS</small>
                    {index === 1 && (
                      <span className="plan-badge">apoio recorrente</span>
                    )}
                  </div>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✧</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <SupportLink light={index === 1}>
                    Apoiar com R$ {plan.amount},00
                  </SupportLink>
                </article>
              ))}
            </div>
            <p className="data-note">
              Valores sugeridos. Consulte as condições e os benefícios
              disponíveis na campanha oficial do Apoia.se.
            </p>
          </section>
          <section
            id="comunidade"
            className="section container community"
            aria-labelledby="community-title"
          >
            <h2 id="community-title">
              Mostre que
              <br />
              você apoia
            </h2>
            <p className="section-intro">
              Gere seu card de apoiador e compartilhe no LinkedIn.
            </p>
            <SupporterCard />
            <div className="supporter-wall" aria-label="Mural de apoiadores">
              <div className="wall-heading">
                <h3>Mural de apoiadores</h3>
                <span>Exemplos de apresentação</span>
              </div>
              {[
                ["Ana Costa", "Dev Frontend", assets.ana],
                ["Bruno Lima", "UX Designer", assets.bruno],
                ["Carla Souza", "Backend Engineer", assets.carla],
              ].map(([name, role, avatar], index) => (
                <div className="supporter-row" key={name}>
                  <span className="supporter-index">0{index + 1}</span>
                  <img src={avatar} alt="" loading="lazy" />
                  <div>
                    <strong>{name}</strong>
                    <small>{role}</small>
                  </div>
                  <span className="supporter-badge">Comunidade</span>
                </div>
              ))}
              <p className="data-note">
                Nomes ilustrativos do design. A inclusão de apoiadores reais
                depende de validação manual.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-panel">
            <nav className="social-links" aria-label="Canais oficiais">
              <a
                href={campaign}
                target="_blank"
                rel="noreferrer"
                aria-label="Apoia.se"
              >
                $
              </a>
              <a
                href="https://discord.gg/FkBcf3vdQZ"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
              >
                D
              </a>
              <a
                href="https://github.com/SouJunior"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                href="https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                W
              </a>
            </nav>
            <div className="footer-cta">
              <div>
                <h2>
                  Faça parte
                  <br />
                  da SouJunior
                </h2>
                <p>
                  Doe R$ 2 para manter a plataforma
                  <br />
                  de pé para quem está começando.
                </p>
              </div>
              <SupportLink />
            </div>
          </div>
          <div className="footer-bottom">
            <a href="#inicio" aria-label="SouJunior — voltar ao início">
              <img
                className="logo"
                src={assets.logo}
                alt="SouJunior"
                width="164"
                height="67"
                loading="lazy"
              />
            </a>
            <nav aria-label="Navegação do rodapé">
              {navigation.map(([label, id]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
