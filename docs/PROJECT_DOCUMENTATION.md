# Guia do projeto SouJunior × CodeImpact

Este guia explica o produto atual, como executá-lo e onde encontrar cada parte do código. Use-o junto com o [contexto do hackathon](hackathon/README.md), que registra os requisitos oficiais e as decisões vigentes da equipe.

## Objetivo e escopo

A aplicação é uma Landing Page para explicar a causa da SouJunior, demonstrar impacto e transparência e direcionar visitantes ao Apoia.se. O CTA principal aponta para a campanha oficial de apoio recorrente, a partir de R$ 2.

O mural de apoiadores complementa a jornada com reconhecimento e prova social. Ele não substitui nem deve dominar a Landing Page.

## Jornada apresentada

    Entender a causa
      → conhecer histórias e impacto
      → entender os gastos informados
      → reconhecer a participação da comunidade
      → apoiar no Apoia.se
      → compartilhar um card, se quiser

Na ordem atual da página, as seções são Hero, causa, depoimentos, impacto, transparência, mural, formas de apoio, gerador de card e rodapé.

## Como a aplicação está organizada

| Caminho | Responsabilidade |
| --- | --- |
| src/App.tsx | Monta a página e importa os estilos globais. |
| src/components/LandingPage.tsx | Define a ordem das seções e a estrutura principal. |
| src/components/Header.tsx e Footer.tsx | Navegação, CTA e canais oficiais. |
| src/components/Hero.tsx | Apresenta a causa, o valor mínimo e o CTA principal. |
| src/components/CauseSection.tsx | Explica a causa e a atuação da comunidade. |
| src/components/Testimonials.tsx | Exibe os depoimentos presentes nos dados. |
| src/components/ImpactSection.tsx | Exibe os indicadores de impacto. |
| src/components/TransparencySection.tsx | Exibe o total e os registros de gastos. |
| src/components/SupportersRanking.tsx | Apresenta o mural demonstrativo. |
| src/components/SupportSection.tsx | Explica formas de apoio e leva ao Apoia.se. |
| src/components/SupporterCardGenerator.tsx | Coleta dados locais e oferece geração, download ou compartilhamento de card. |
| src/data/landing.ts | Textos, links oficiais, métricas, depoimentos e despesas estáticas. |
| src/data/supporters.ts | Registros demonstrativos do mural. |
| src/lib/share-card.ts | Desenha o card em Canvas e usa compartilhamento do navegador, com download como alternativa. |
| src/styles/ | Estilos da página e direção visual. |
| pen.dev/Ui-Kit/ | Logos e materiais visuais presentes no repositório. |
| docs/Depoimentos/ e docs/Gastos/ | Materiais fornecidos usados como referência de conteúdo. |

A implementação atual é uma página React com dados estáticos no próprio projeto. O mural não consulta pagamentos nem recebe cadastros em um backend. O gerador monta a imagem no navegador; não há envio de foto para um servidor nesse fluxo.

## Dados e publicação

Os números e textos abaixo vêm do material local de briefing e do código atual. Confirme a atualização e a autorização de uso antes de publicar.

| Conteúdo | Valor atual | Cuidado |
| --- | --- | --- |
| Mentores ativos | 35 | Usar como número informado pela SouJunior. |
| Pessoas empregadas por meio da SouJunior | Mais de 50 | Não converter em outra métrica. |
| Projetos em desenvolvimento | 3 | É uma fotografia do momento. |
| Membros | 120 | O briefing pede confirmação antes da publicação. |
| Apoiadores | 108 | Pode variar; registre a data de referência quando possível. |
| Gastos de infraestrutura em 2026 até setembro | R$ 1.849,59 | Fonte: docs/Gastos/gastos_2026.csv. |

O material de gastos lista AWS, Vultr, DigitalOcean e name.com. Não acrescente valores, categorias ou alegações de impacto que não estejam nas fontes aprovadas. O briefing informa que ainda não há uma métrica oficial de pessoas impactadas.

### Conteúdo provisório

- src/data/supporters.ts contém nomes e posições explicitamente demonstrativos. Substitua-os por registros aprovados antes de apresentar o mural como real.
- Há um depoimento de mentor marcado como pendente de aprovação em src/data/landing.ts.
- A própria aplicação identifica o conteúdo e o visual como provisórios.

## Identidade visual e ativos

O projeto importa o logo de pen.dev/Ui-Kit/Group 1410103555.svg. Os estilos usam as fontes Funnel Display e Funnel Sans. A direção visual atual usa azul, branco e azul-claro do material oficial, além de texto escuro.

O arquivo pendev.pen está aberto no pen.dev e contém referências visuais e frames do projeto. O quadro “Documentação · Mapa do produto e do código” foi acrescentado a esse canvas. Nesta cópia do repositório, pen.dev/Ui-Kit contém os ativos versionados; o arquivo pendev.pen ativo está fora do worktree.

## Regras para mudanças

1. Use docs/hackathon/product-brief.md e docs/hackathon/official-rules.md para requisitos oficiais.
2. Use docs/hackathon/codeimpact-decisions.md para decisões atuais da equipe.
3. Trate brainstorming e ideias futuras como não aprovados até uma decisão explícita.
4. Preserve a Landing Page como produto principal e mantenha o mural subordinado à jornada de apoio.
5. Não invente números, valores financeiros, nomes de apoiadores ou depoimentos.
6. Prefira o fluxo simples já compatível com o MVP; validação manual do mural é suficiente no escopo registrado.

## Instalação e verificação

Requisito indicado pelas dependências travadas: Node.js 20.19 ou mais recente da linha 20, ou 22.12 ou mais recente da linha 22.

    npm ci
    npm run dev

Antes de entregar uma mudança de código, os comandos disponíveis são:

    npm run typecheck
    npm test
    npm run build

Este trabalho atualizou documentação; esses comandos não foram executados nesta tarefa.

## Pendências de conteúdo antes da submissão

- Confirmar os indicadores que podem ter mudado e acrescentar a data de referência.
- Trocar o mural demonstrativo por conteúdo autorizado ou mantê-lo claramente identificado como demonstração.
- Aprovar ou remover o depoimento de mentor pendente.
- Preparar screenshots ou vídeo e registrar integrantes e responsabilidades no README final.
- Conferir a licença e os requisitos de submissão em docs/hackathon/submission.md.
