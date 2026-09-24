# SouJunior × CodeImpact

Protótipo funcional de uma Landing Page para apresentar a causa da SouJunior e levar visitantes ao apoio recorrente no Apoia.se. A Landing Page é o produto principal; o mural de apoiadores é uma camada de reconhecimento e prova social.

## Executar localmente

Requisitos: Node.js 20.19 ou mais recente da linha 20, ou 22.12 ou mais recente da linha 22.

    npm ci
    npm run dev

O Vite informa no terminal o endereço local da aplicação.

## Comandos disponíveis

| Comando | Uso |
| --- | --- |
| npm run dev | Inicia o servidor local do Vite. |
| npm run typecheck | Verifica os tipos TypeScript. |
| npm test | Executa os testes com Vitest. |
| npm run build | Gera a versão de produção. |

## O que a página apresenta

- Hero com a causa e CTA para o Apoia.se.
- Explicação da causa, depoimentos e indicadores de impacto.
- Transparência dos gastos de infraestrutura informados.
- Mural demonstrativo de apoiadores.
- Orientações de como apoiar e gerador local de card para compartilhamento.
- Links para os canais oficiais da SouJunior.

O conteúdo e alguns elementos visuais ainda estão marcados como provisórios no produto. O mural usa apoiadores demonstrativos; não publique esses registros como pessoas reais. Confirme os indicadores que variam e aprove depoimentos antes da submissão.

## Documentação

- [Guia do projeto e mapa do código](docs/PROJECT_DOCUMENTATION.md)
- [Contexto e regras do hackathon](docs/hackathon/README.md)
- [Depoimentos fornecidos](docs/Depoimentos/depoimentos.md)
- [Dados de gastos de 2026](docs/Gastos/gastos_2026.csv)
- Mapa visual: quadro “Documentação · Mapa do produto e do código” no canvas pendev.pen ativo no pen.dev. Esse arquivo está fora deste worktree; pen.dev/Ui-Kit contém os ativos versionados aqui.

## Estrutura principal

    src/components/   Seções da Landing Page e componentes de interação
    src/data/         Texto, indicadores, despesas e apoiadores demonstrativos
    src/lib/          Geração e compartilhamento local do card
    src/styles/       Estilos globais, UI Kit e direção visual
    docs/hackathon/   Briefing, regras, decisões e critérios do evento
    pen.dev/Ui-Kit/   Ativos visuais usados pelo projeto

## Licença

Este repositório usa a licença MIT. Consulte o arquivo LICENSE.
