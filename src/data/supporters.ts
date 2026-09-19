export type Supporter = {
  id: string
  position: number
  name: string
  badge: string
  detail: string
  initials: string
  isDemo: true
}

export const demoSupporters: Supporter[] = [
  {
    id: 'supporter-01',
    position: 1,
    name: 'Apoiador demonstrativo 01',
    badge: 'Presença na comunidade',
    detail: 'Reconhecimento demonstrativo',
    initials: '01',
    isDemo: true,
  },
  {
    id: 'supporter-02',
    position: 2,
    name: 'Apoiador demonstrativo 02',
    badge: 'Apoio recorrente',
    detail: 'Reconhecimento demonstrativo',
    initials: '02',
    isDemo: true,
  },
  {
    id: 'supporter-03',
    position: 3,
    name: 'Apoiador demonstrativo 03',
    badge: 'Voz da comunidade',
    detail: 'Reconhecimento demonstrativo',
    initials: '03',
    isDemo: true,
  },
]
