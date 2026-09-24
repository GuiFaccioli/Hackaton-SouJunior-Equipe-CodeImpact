# Histórico documentado

## Integração local das worktrees

- Preservados os commits existentes e o backup das alterações locais.
- Corrigidos apenas os cantos dos backgrounds `.hero` e `.pale-section`, preservando os raios originais dos componentes e seu teste de regressão.
- Consolidada a documentação mais recente com contexto obrigatório e fontes de conteúdo restaurados.
- Agrupados documento e PNGs em `design/`, com imports e manifesto atualizados; fontes financeiras e depoimentos em `docs/content/`.
- Removido o UI Kit obsoleto; preservados os retratos circulares e os bytes dos artefatos de design.
- Procedência e decisões em [integration/README.md](integration/README.md).

Validação histórica da integração local: oito testes em dois arquivos, typecheck, build TypeScript/Vite e auditoria de links/hashes. A consolidação para PR acrescenta o nono teste, referente às ressalvas das métricas. Não foi feita nova revisão visual em navegador nesta consolidação.

## 2026-09-23 — Inventário completo e documentação versionável

**Motivo:** permitir manutenção do projeto sem depender do histórico da conversa ou de inferências sobre a composição visual.

- Consolidada a documentação oficial de estrutura, stack, dados, fluxos, responsividade, testes e restrições.
- Capturados pelo MCP Pencil 836 nós, 25 elementos de primeiro nível, 434 nós no Desktop e 88 referências a 26 imagens.
- Incluídos snapshot JSON com propriedades e geometria, índice de todos os nós, referências por asset, manifesto com dimensões/tamanho/SHA-256 e duas prévias exportadas pelo MCP.
- Registrado o procedimento de recaptura e versionamento.
- Corrigida a afirmação documental de sincronização completa: o Pencil contém corpo recortado e cabelo sobreposto; o React ainda usa uma imagem única.
- Registradas as diferenças de conteúdo, cantos do hero, altura do Desktop e limite do script typecheck.

**Escopo:** documentação e seus artefatos. Código de aplicação, `.pen` e imagens originais não foram alterados por esta tarefa. Exclusões anteriores do protótipo foram preservadas. Nenhum commit ou push é afirmado por este registro.

**Validação desta atualização:**

- `npm test`: 1 arquivo, 6 testes aprovados.
- `npm run typecheck`: código de saída 0; ressalva sobre referências TypeScript registrada na documentação principal.
- `npm run build`: código de saída 0; `tsc -b` e Vite concluídos.
- `git diff --check`: sem erros de whitespace; avisos de conversão LF/CRLF em arquivos preexistentes.
- Auditoria dos artefatos: 836 IDs únicos, pais e profundidades consistentes, 88 referências e hashes dos 26 PNGs conferidos; links Markdown locais válidos.
- Prévias exportadas: Desktop 960 × 3186 e hero 960 × 562. A prévia do Desktop inclui a extensão de seus filhos além da altura declarada da raiz.
- `git check-ignore -v --no-index --stdin`: nenhuma regra correspondente aos arquivos de documentação auditados, `pendev.pen` e 26 assets.

**Arquivos desta tarefa:** `README.md`, `docs/PROJECT_DOCUMENTATION.md`, `docs/MAINTENANCE.md`, `docs/CHANGELOG.md`, `docs/design/DESIGN_REFERENCE.md`, `docs/design/pencil-snapshot.json`, `docs/design/asset-references.json`, `docs/design/asset-manifest.json`, `docs/design/previews/EAVtG.png` e `docs/design/previews/G8k5su.png`.

## Decisões anteriores preservadas

Estas entradas resumem decisões já registradas e fatos observados; não afirmam que cada mudança corresponde a um commit Git separado.

### Landing page baseada no Desktop

- O Desktop `EAVtG` foi escolhido como referência da implementação React/TypeScript/Vite.
- O protótipo visual anterior foi descartado por decisão do usuário.
- Motivo: manter os novos componentes vinculados à landing page escolhida.

### Largura externa do banner

- Removido o limite exclusivo de 2400 px do hero web, usando `width: 100%`.
- Motivo: evitar margens laterais do banner em telas largas enquanto os fundos das outras seções ocupam toda a tela.
- Validação anterior: larguras de 390, 1440, 1920, 2560 e 3840 px sem diferença de largura externa ou overflow horizontal.

### Camadas do mascote no Pencil

- Separados fundo azul claro, corpo, moedas e cards.
- Criados `EiMyw` para recorte inferior e `D7Mx2W` para cabelo sobre o card.
- Motivo: preservar profundidade, escape lateral e limite inferior do mascote.
- Estado auditado: essas camadas estão no Pencil; sua reprodução no React está pendente.

### Conteúdo da página

- Substituídos placeholders e rótulos inconsistentes por dados fornecidos no projeto.
- Mantido o mural como exemplo identificado; o card não comprova pagamento nem cadastra apoiadores.
- Motivo: não apresentar valores ilustrativos, benefícios não confirmados ou perfis de exemplo como fatos.
