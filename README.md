# SouJunior — Landing Page CodeImpact

Landing page da equipe CodeImpact para apresentar a causa da SouJunior, mostrar impacto e gastos informados pelo projeto e encaminhar visitantes à [campanha oficial no Apoia.se](https://apoia.se/soujunior). O problema é tornar o apoio recorrente compreensível e confiável para quem ainda não conhece a comunidade. A solução organiza a jornada em causa, transparência, impacto, relatos, formas de apoiar e reconhecimento da comunidade.

O diferencial previsto pela equipe é o reconhecimento de apoiadores. Nesta versão, o mural mostra perfis **ilustrativos** e o visitante pode gerar um card local para compartilhar. O card não comprova doação e não cadastra ninguém no mural.

## Executar e verificar

Requer Node.js e npm compatíveis com o projeto. Na raiz do repositório:

```sh
npm ci
npm run dev
```

O Vite informa o endereço local. Os comandos disponíveis são:

```sh
npm test
npm run typecheck
npm run build
```

`npm test` executa Vitest; `npm run typecheck` executa `tsc --noEmit`; `npm run build` executa `tsc -b && vite build` e gera `dist/`. Como o tsconfig raiz usa referências, o build faz a checagem TypeScript dos projetos referenciados. Há oito testes de fluxo em `src/App.test.tsx` e um arquivo de teste das superfícies em `src/styles.test.ts`.

## Stack e decisões técnicas

React 19, TypeScript 7, Vite 8, CSS e Vitest. Os PNGs do design são importados pelo Vite; as fontes Funnel Sans e Funnel Display são carregadas do Google Fonts. A página é estática e não tem backend, banco de dados, pagamento próprio ou integração automática com o Apoia.se. Os CTAs abrem a campanha oficial em outra aba. Os valores R$ 2, R$ 15 e R$ 50 são sugestões; condições e benefícios devem ser conferidos na campanha.

O card é criado no navegador com nome, site opcional e foto opcional JPG, PNG ou WebP de até 5 MB. A prévia e o download PNG são locais, sem envio desses dados a servidor. O mural permanece ilustrativo e a inclusão de apoiadores reais exige validação manual.

## Conteúdo e fontes

As métricas exibidas seguem o [briefing do produto](docs/hackathon/product-brief.md): 35 mentores ativos, mais de 50 pessoas empregadas por meio da SouJunior, 3 projetos em desenvolvimento, 120 membros e 108 apoiadores. **Reconfirmar os 120 membros antes de publicar.** O número de apoiadores pode variar; registrar uma data de referência quando ela estiver disponível. Não há métrica oficial de pessoas impactadas.

Os gastos apresentados somam **R$ 1.849,59 até setembro de 2026**, conforme o [CSV original](docs/content/expenses-2026.csv). Os relatos da página são trechos dos [depoimentos fornecidos](docs/content/testimonials.md).

## Estrutura

| Caminho | Uso |
|---|---|
| `src/App.tsx` | Seções, conteúdo, navegação, depoimentos, mural e CTAs |
| `src/SupporterCard.tsx` | Formulário, prévia e download local do card |
| `src/assets.ts`, `src/styles.css` | Imports de imagens e estilos responsivos |
| `design/pendev.pen`, `design/pendev-assets/` | Fonte editável do Pencil e imagens originais |
| `docs/design/` | Inventário, manifesto e prévias do design |
| `docs/hackathon/` | Requisitos e decisões da equipe |
| `docs/content/` | Fontes de conteúdo retidas |

O frame Desktop `EAVtG` do Pencil orienta o visual. As [prévias do Pencil](docs/design/previews/EAVtG.png) são **referências de design**, não screenshots do site em execução. O recorte do corpo e a sobreposição do cabelo do mascote ainda diferem na implementação web. Consulte o [inventário visual](docs/design/DESIGN_REFERENCE.md) e a [documentação do projeto](docs/PROJECT_DOCUMENTATION.md).

## Acessibilidade e limites

A página oferece navegação por teclado, foco visível, link para pular ao conteúdo, menu móvel com nome acessível, labels no formulário, mensagens de erro e respeito à preferência de movimento reduzido. Não há auditoria WCAG completa registrada. Os PNGs originais ainda são grandes e precisam de revisão antes de publicação em produção.

Para a submissão, ainda faltam **screenshot ou vídeo do site em execução** e **lista nominal de integrantes com suas responsabilidades**. As prévias do Pencil não substituem essa evidência. Consulte os [requisitos de submissão](docs/hackathon/submission.md).

## Documentação e licença

- [Fontes de conteúdo](docs/content/README.md)
- [Procedência da consolidação](docs/integration/README.md)
- [Manutenção](docs/MAINTENANCE.md)
- [Histórico](docs/CHANGELOG.md)
- [Plano de integração das worktrees](docs/superpowers/plans/2026-09-23-integrate-soujunior-worktrees.md)
- [Licença MIT](LICENSE)
