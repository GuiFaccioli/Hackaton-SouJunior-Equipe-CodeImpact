# Consolidação das worktrees

Integração local na main, iniciada em 23/09/2026 a partir de f13acf0. Os commits existentes foram preservados; as worktrees de origem não foram alteradas.

## Procedência e decisões

| Origem | Integração |
| --- | --- |
| hawkfish / GuiFaccioli/subagent-driven-planning | Assets, inventário, aplicação e identificação do apoiador ilustrativo; adaptação dos cantos quadrados e teste. |
| monkfish / docs/project-documentation | Commit documental incorporado; conteúdo ampliado com a documentação local mais recente. |
| filefish / GuiFaccioli/cleanup-legacy-prototype-files | Remoção do UI Kit obsoleto; conflito com a movimentação para pen.dev resolvido pela exclusão, pois a aplicação usa os PNGs do Pencil. |
| hydroid / GuiFaccioli/remove-rounded-borders | Intenção de cantos quadrados aplicada ao layout atual. Logo idêntico por SHA-256 ao image-import-56.png, sem cópia duplicada. |
| opah / GuiFaccioli/opah | Sem diferenças em relação à base. |
| main, alterações locais | Design e aplicação já representados pelos commits de hawkfish; documentação adicional consolidada. Contexto do hackathon e fontes restaurados. |

## Organização

- design/: documento editável e imagens originais, mantendo URLs relativas internas.
- docs/design/: snapshot, inventário, manifesto e prévias do Pencil.
- docs/hackathon/: regras e decisões obrigatórias, no caminho esperado por AGENTS.md.
- docs/content/: CSV financeiro e depoimentos.
- src/: implementação, CSS e testes; sem novas camadas ou dependências.

O plano anterior em hawkfish foi escrito para outra branch e prevê force-push. Ele permanece na origem como registro histórico e não governa esta integração. Nenhum push ou deploy é parte desta consolidação local. Caches do Windows encontrados em monkfish não são arquivos do projeto e não foram incorporados.

O estado local inicial está preservado no stash c16b904d9dffa10e279c5b225f06f09640ce83ef. Não reaplicar esse stash inteiro: ele contém exclusões do contexto e uma versão anterior do rótulo ilustrativo já corrigido.

## Verificação

Executar npm test, npm run typecheck, npm run build e git diff --check. Conferir links locais, hashes do manifesto, URLs relativas das imagens e preservação do conteúdo das fontes. Testes em jsdom não substituem comparação visual em navegador.
