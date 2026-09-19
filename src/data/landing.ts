export type OfficialLink = {
  label: string
  href: string
}

export type ImpactMetric = {
  value: string
  label: string
  note?: string
}

export type Testimonial = {
  audience: string
  quote: string
  author: string
  role: string
  isPlaceholder?: boolean
}

export type ExpenseRecord = {
  date: string
  service: string
  value: string
}

export const officialLinks = {
  support: {
    label: 'Apoiar a SouJunior',
    href: 'https://apoia.se/soujunior',
  },
  discord: {
    label: 'Discord oficial',
    href: 'https://discord.gg/FkBcf3vdQZ',
  },
  whatsapp: {
    label: 'WhatsApp oficial',
    href: 'https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W',
  },
  github: {
    label: 'GitHub oficial',
    href: 'https://github.com/SouJunior',
  },
} satisfies Record<string, OfficialLink>

export const navigationItems = [
  { label: 'A causa', href: '#causa' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Comunidade', href: '#comunidade' },
  { label: 'Como apoiar', href: '#apoio' },
]

export const landingContent = {
  prototypeNotice: 'Protótipo funcional — conteúdo e visual provisórios',
  common: {
    supportCta: officialLinks.support.label,
    learnMore: 'Entender a causa',
    openInNewTab: 'Abre em uma nova aba',
  },
  hero: {
    eyebrow: 'Uma comunidade que abre caminhos',
    title: 'Apoiar a SouJunior é investir em pessoas que estão começando.',
    description:
      'A SouJunior aproxima profissionais juniores de experiências, mentoria e projetos reais. Seu apoio mantém esse ecossistema em movimento.',
    minimumSupport: 'Apoio recorrente a partir de R$ 2',
    visualLabel: 'Visual provisório da comunidade conectada',
    visualCaption: 'Trocar pelo visual oficial quando o material do Figma estiver disponível.',
  },
  cause: {
    eyebrow: 'A causa',
    title: 'Experiência real muda o começo de uma carreira.',
    paragraphs: [
      'A SouJunior cria oportunidades para pessoas juniores aprenderem, colaborarem e construírem portfólio com apoio de uma comunidade.',
      'Para continuar conectando pessoas, mentores e projetos, a organização precisa manter infraestrutura, serviços e canais funcionando.',
    ],
    storyTitle: 'Uma rede feita por pessoas',
    storyItems: [
      'Mentorados encontram espaço para praticar e evoluir.',
      'Mentores compartilham experiência e acompanham novos talentos.',
      'A comunidade cria conexões que continuam além de um projeto.',
    ],
  },
  testimonials: {
    eyebrow: 'Histórias da comunidade',
    title: 'Experiências reais de quem passou pela SouJunior.',
    description: 'Relatos compartilhados pela comunidade. Novos depoimentos entram quando forem aprovados.',
    placeholder: 'Depoimento oficial de mentor pendente de aprovação.',
  },
  impact: {
    eyebrow: 'Impacto real',
    title: 'O apoio vira estrutura para a comunidade continuar acontecendo.',
    description: 'Números informados pela SouJunior e apresentados sem transformar a causa em promessa.',
  },
  transparency: {
    eyebrow: 'Transparência',
    title: 'A comunidade também apoia o que mantém tudo funcionando.',
    description: 'Em 2026, os gastos informados até setembro somam R$ 1.849,59 em infraestrutura.',
    totalLabel: 'Gastos de infraestrutura em 2026 até setembro',
    servicesLabel: 'Serviços presentes nos dados oficiais',
    recordsLabel: 'Registros informados no material de gastos',
  },
  community: {
    eyebrow: 'Prova social',
    title: 'Comunidade que apoia',
    description:
      'Um mural de reconhecimento para tornar visível quem participa — sem transformar apoio em competição financeira.',
    demoNote: 'Dados demonstrativos para validar a experiência. Substituir pelos dados aprovados antes da publicação.',
  },
  support: {
    eyebrow: 'Como apoiar',
    title: 'Qualquer contribuição ajuda a manter a rede viva.',
    description:
      'O Apoia.se concentra as formas oficiais de contribuição. Escolha o apoio que fizer sentido para você e, se possível, mantenha-o recorrente.',
    options: [
      {
        title: 'Comece com R$ 2',
        description: 'O apoio mínimo já ajuda a sustentar a comunidade.',
      },
      {
        title: 'Apoie todos os meses',
        description: 'A recorrência ajuda a planejar a manutenção do ecossistema.',
      },
      {
        title: 'Compartilhe a causa',
        description: 'Mais pessoas conhecendo a SouJunior também fortalece a rede.',
      },
    ],
  },
  card: {
    eyebrow: 'Depois de apoiar',
    title: 'Leve a comunidade com você.',
    description: 'Personalize um card provisório para compartilhar que você apoia a SouJunior.',
    nameLabel: 'Seu nome',
    namePlaceholder: 'Como você quer aparecer?',
    phraseLabel: 'Frase (opcional)',
    phrasePlaceholder: 'Uma frase curta sobre apoiar a comunidade',
    photoLabel: 'Foto (opcional)',
    generate: 'Gerar card',
    download: 'Baixar card',
    share: 'Compartilhar card',
    imageAlt: 'Card gerado com a mensagem Eu apoio a SouJunior',
    generatedStatus: 'Card gerado. Agora você pode baixar ou compartilhar.',
    downloadStatus: 'Download iniciado.',
    shareStatus: 'Compartilhamento iniciado.',
    shareCancelled: 'Compartilhamento cancelado.',
    nameRequired: 'Informe seu nome para gerar o card.',
    fileError: 'Escolha uma imagem válida para usar no card.',
  },
  footer: {
    title: 'SouJunior × CodeImpact',
    description: 'Protótipo criado durante o Hackathon SouJunior.',
  },
} as const

export const impactMetrics: ImpactMetric[] = [
  { value: '35', label: 'mentores ativos' },
  { value: 'Mais de 50', label: 'pessoas empregadas', note: 'por meio da SouJunior' },
  { value: '3', label: 'projetos em desenvolvimento' },
  { value: '120', label: 'membros' },
  { value: '108', label: 'apoiadores', note: 'o número pode variar' },
]

export const transparencyServices = ['AWS', 'Vultr', 'DigitalOcean', 'name.com']

export const transparencyExpenses: ExpenseRecord[] = [
  { date: '01/02', service: 'AWS', value: 'R$ 205,45' },
  { date: '01/02', service: 'Vultr', value: 'R$ 164,74' },
  { date: '01/02', service: 'DigitalOcean', value: 'R$ 8,78' },
  { date: '01/03', service: 'AWS', value: 'R$ 186,11' },
  { date: '01/03', service: 'Vultr', value: 'R$ 162,21' },
  { date: '01/04', service: 'AWS', value: 'R$ 203,59' },
  { date: '01/04', service: 'Vultr', value: 'R$ 218,80' },
  { date: '24/08', service: 'name.com', value: 'R$ 487,81' },
  { date: '01/09', service: 'Vultr', value: 'R$ 162,44' },
  { date: '10/09', service: 'Vultr', value: 'R$ 49,66' },
]

export const testimonials: Testimonial[] = [
  {
    audience: 'Comunidade',
    quote: 'Participar da SouJunior foi fundamental para minha transição de carreira.',
    author: 'Thais Escobar',
    role: 'Participante da comunidade',
  },
  {
    audience: 'Comunidade',
    quote: 'A experiência na SouJunior foi muito positiva, principalmente pela oportunidade de vivenciar, na prática, a área em que desejo atuar.',
    author: 'Renan Marques',
    role: 'APM',
  },
  {
    audience: 'Mentor',
    quote: landingContent.testimonials.placeholder,
    author: 'Depoimento pendente',
    role: 'Conteúdo aguardando aprovação',
    isPlaceholder: true,
  },
]
