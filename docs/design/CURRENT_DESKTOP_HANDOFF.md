# Desktop atual — referência para implementação

## Estado confirmado nesta entrega

O canvas atual foi salvo como `design/pendev/pendev.pen` e contém o Desktop `sXL38` (1920 × 6783), além dos nós `qdxW5` e `KMq3P`.

O arquivo antigo `design/pendev.pen` permanece preservado como baseline histórico `EAVtG`. A documentação e os snapshots anteriores podem descrever essa versão antiga.

Os 36 assets usados pelo canvas atual foram copiados para `design/pendev/assets/` e os caminhos do `.pen` foram normalizados para `assets/<arquivo>`.

## Material visual exportado

Arquivos relativos a este documento:

- [Desktop completo](current-desktop-previews/sXL38.png)
- [Hero](current-desktop-previews/qdxW5.png)
- [Card de apoio corrigido](current-desktop-previews/KMq3P.png)
- [Referência do hero](current-desktop-previews/ShEvj.png)
- [Referência do card](current-desktop-previews/Hy4t5.png)

São capturas em escala 1, não substitutos do documento editável. Não usar screenshots como implementação das seções.

## Documento editável salvo

O documento atual está em `design/pendev/pendev.pen`. Antes de mover ou renomear esse arquivo, mantenha seus 36 assets em `design/pendev/assets/` e valide os caminhos relativos.

O baseline antigo em `design/pendev.pen` e seus assets antigos continuam preservados para rollback.

## Hero: sobreposição aprovada

| Elemento | Nó atual | Regra |
| --- | --- | --- |
| Hero | `qdxW5` | Preservar textos, navegação, CTAs e estrutura |
| Fundo claro | `yhwTn` | Independente do mascote |
| Máscara do mascote | `RKEkm` | x=0, y=128, largura=909, altura=804.56488; base em y=932.56488 |
| Mascote visível | `pHpNw` | Proporção 620.07776 × 1101.77466; imagem `image-import-24.png` |
| Mascote desativado | `v7Oho` | Não renderizar |
| Moedas | `t70tj6` | Imagem independente `image-import-5.png` |
| Card superior | `N5IIR` | Cabelo pode passar à frente; manter conteúdo legível |
| Card inferior | `Z8PhUy` | Flutua sobre a composição |

O mascote escapa lateralmente do retângulo claro, mas a parte inferior termina na base desse retângulo. Não deformar o asset avulso `Q1awMe` para reproduzir o efeito. O hero atual possui cantos inferiores de 40; não aplicar automaticamente decisões de versões antigas sobre arredondamento.

## “Mostre que você apoia”: card corrigido

| Elemento | Nó atual | Regra |
| --- | --- | --- |
| Card | `KMq3P` | Preservar logo, selo, nome e mensagem |
| Composição | `p3spt` | Fundo claro separado do mascote e moedas |
| Fundo claro | `uLYJU` / `nM9GZ` | Suporte atrás do mascote |
| Máscara | `L85RE` | 283.5 × 257.88173, recorte inferior |
| Mascote correto | `H6d6jl` | 233.31715 × 414.56567, sem achatamento |
| Duplicata desativada | `BSd31` | Não renderizar |
| Moedas | `YSK8b` | Camada independente |

O formulário, ranking e demais seções não foram redesenhados nesta correção. Campos exibidos no canvas não comprovam que o comportamento correspondente esteja implementado ou aprovado para produção.

## Instrução para Codex/Orca

Leia este documento antes dos snapshots antigos. Confira se o `.pen` atual foi salvo. Pelo MCP do Pen.dev, leia o Desktop `sXL38` e compare-o com as capturas desta pasta. Reutilize os assets originais; não implemente camadas com `enabled:false`.

Inspecione a implementação existente antes de escrever código. Reproduza as camadas com elementos separados, preservando proporções e recortes. Não traduza literalmente a rotação de coordenadas do Pen.dev para CSS sem verificar o resultado. Compare screenshots na mesma largura e valide mobile, teclado e comportamento dos formulários.

As capturas documentam o canvas, não substituem a validação do site React. A validação atual está registrada na seção de atualização posterior.

## Pendência obrigatória

- [x] Salvar o canvas atual em `design/pendev/pendev.pen` e verificar os IDs e caminhos de imagens no disco.
- [x] Comparar hero, card `KMq3P` e mobile com o design atual antes de afirmar fidelidade visual.

Nenhum commit foi feito nesta entrega.

## Atualização posterior: implementação React validada

O documento atual continua sendo `design/pendev/pendev.pen`, com o frame `sXL38` renomeado para `Oficial` como Desktop principal. O baseline histórico permanece em `design/pendev.pen`; ele não é a fonte da implementação React. A validação anterior do React deve ser considerada obsoleta até nova comparação direta com `Oficial`.

### Implementado

- `src/App.tsx` separa o hero em fundo, retângulo claro, máscara do mascote, moedas, cards, textos e CTAs.
- A composição do hero segue `RKEkm`/`pHpNw`; `v7Oho` permanece desativado e não é renderizado.
- `src/SupporterCard.tsx` reproduz `p3spt`, `uLYJU`/`nM9GZ`, `L85RE`, `H6d6jl` e `YSK8b` com um único mascote proporcional e moedas independentes; `BSd31` não é renderizado.
- `src/assets.ts` e as URLs do CSS usam `design/pendev/assets/` para os assets do canvas atual.
- A rotação do mascote foi convertida para o sentido equivalente em CSS e o hero deixou de usar `object-fit: fill`, evitando deformação do asset.
- O layout mobile mantém as camadas separadas e contém o título em viewport estreita.
- Formulário, upload, geração, download, navegação, CTAs e mural foram preservados.

### Arquivos alterados

- `src/App.tsx`
- `src/SupporterCard.tsx`
- `src/assets.ts`
- `src/styles.css`
- `src/App.test.tsx`
- `src/styles.test.ts`
- `docs/design/CURRENT_DESKTOP_HANDOFF.md`

### Diferenças e pendências

- O Pen.dev mostra um card estático; o React mantém o formulário e o card gerado como comportamento real. O nome digitado aparece no preview e a foto continua disponível para o download.
- `docs/design/oficial-reference.html` é uma exportação auxiliar do frame `Oficial`; serve para comparação, não deve ser usada como screenshot de produção.
- O conteúdo funcional existente foi preservado mesmo quando o canvas é apenas referência visual estática.
- A captura integrada de screenshot do MCP expirou. A comparação visual foi feita com Chrome headless local em 1920px, 1440px e 390px, além da inspeção dos nós pelo MCP.
- Uma comparação pixel a pixel do Desktop completo ainda depende de a captura integrada do Pen.dev voltar a responder.

### Validação

```bash
npm test
npm run typecheck
npm run build
```

Resultados: 10 testes aprovados; typecheck aprovado; o `npm run build` padrão foi executado, mas ficou bloqueado por `ENOSPC` no volume C: ao gravar `dist`; o mesmo build passou com saída temporária no volume D. Vite validado em `http://127.0.0.1:5173/`; hero, card `KMq3P` e mobile comparados por captura local.

## Atualização final — landing oficial `sXL38`

### Fonte e escopo confirmados

- Fonte visual única: `design/pendev/pendev.pen`, frame `sXL38` (nome exibido: `Oficial`). O ID `sXL38` foi usado independentemente do metadado salvo.
- Os nós top-level `R8xHi6`, `Q1awMe`, `ShEvj` e `Hy4t5` foram tratados como documentação/referências auxiliares e não viraram seções da landing.
- Nós `enabled:false` foram ignorados, incluindo `v7Oho` no hero e `BSd31` no card oficial.
- `design/pendev/pendev.pen` não foi alterado. Os PNGs serviram apenas para comparação visual; a implementação usa os assets originais em `design/pendev/assets/`.

### Arquivos alterados nesta implementação

- `src/App.tsx`
- `src/SupporterCard.tsx`
- `src/assets.ts`
- `src/styles.css`
- `src/App.test.tsx`
- `src/styles.test.ts`
- `docs/design/CURRENT_DESKTOP_HANDOFF.md`

### Comandos e resultados finais

```text
npm test                         PASS — 2 arquivos, 10 testes
npm run typecheck                PASS — tsc --noEmit
npm run build                    BLOCKED — ENOSPC ao gravar dist no C:
npm run build -- --outDir D:\Temp\soujunior-build-final --configLoader runner
                                 PASS — 44 módulos transformados, 33 arquivos gerados
```

A falha do build padrão é limitação de espaço do ambiente. Não há erro de compilação ou de tipos; a mesma compilação de produção passou ao direcionar apenas a saída para um volume com espaço disponível.

### Diferenças visuais restantes

- A composição desktop foi comparada em 1920px com `docs/design/oficial-previews/sXL38.png` e com os previews do hero/card. Não há diferença estrutural conhecida nas seções oficiais.
- O card do gerador continua funcional e dinâmico: o Pen.dev mostra um estado estático, enquanto o React preserva nome, upload, geração e download reais.
- O posicionamento mobile é uma adaptação responsiva da composição desktop; não substitui a geometria de 1920px.

Nenhum commit foi feito.

## Fechamento desta rodada — foco desktop

- A validação principal foi feita no viewport CSS de 1920px, com captura de `1920 × 6783`, comparada ao `docs/design/oficial-previews/sXL38.png`.
- O hero foi ajustado para preservar o mascote como camada independente, sem `object-fit: fill`; moedas, card superior e card inferior continuam separados.
- O preview funcional foi alinhado ao `KMq3P`: card azul, cantos arredondados, sombra, mascote, moedas e copy visíveis em camadas independentes.
- Formulário, upload, geração e download continuam funcionando; o card permanece dinâmico para o nome informado pelo apoiador.
- O mobile não foi objetivo desta rodada e permanece como está para a próxima tela definida pelos designers.

### Verificação mais recente

```text
npm test                         PASS — 2 arquivos, 10 testes
npm run typecheck                PASS — tsc --noEmit
npm run build                    PASS — 44 módulos transformados, dist gerado
npm run build -- --outDir D:\Temp\soujunior-build-final-desktop --configLoader runner
                                 PASS — 44 módulos transformados, 33 arquivos gerados
```

O build padrão passou após a liberação de espaço no volume C:. Nenhum commit foi feito.
