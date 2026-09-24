# Documentação oficial do projeto — SouJunior / CodeImpact

Referência consolidada em **23/09/2026**. Este documento registra a estrutura visual escolhida, as decisões do hero, a implementação existente e as restrições do projeto. A documentação distingue o que existe no Pencil, o que existe no código e o que ainda está pendente.

## Leitura obrigatória e fontes

Antes de alterar o projeto, ler `AGENTS.md`, `README.md`, este documento e o frame **Desktop** de `design/pendev.pen` pelo MCP Pencil.

| Assunto | Fonte |
|---|---|
| Visual editável | `design/pendev.pen` + `design/pendev-assets/`, frame `EAVtG` |
| Inventário visual completo | [Referência do design](design/DESIGN_REFERENCE.md) |
| Propriedades e textos de todos os nós | [Snapshot MCP](design/pencil-snapshot.json) |
| Imagens e seus nós consumidores | [Referências de assets](design/asset-references.json) |
| Existência, dimensões, tamanho e SHA-256 das imagens | [Manifesto de assets](design/asset-manifest.json) |
| Comportamento executável | `src/` |
| Regras de manutenção e atualização da captura | [Manutenção](MAINTENANCE.md) |
| Motivos e histórico das mudanças documentadas | [Histórico](CHANGELOG.md) |

**Precedência:** requisitos oficiais do hackathon → decisão explícita atual da equipe → ideias futuras. O Desktop é a referência visual escolhida; outros frames no canvas não viram funcionalidades automaticamente. Os arquivos do protótipo anterior foram excluídos intencionalmente pelo usuário. Novos arquivos e componentes devem servir a esta landing page.

O contexto obrigatório está em [hackathon/README.md](hackathon/README.md). As fontes de conteúdo estão em [content/README.md](content/README.md); sua restauração preserva os requisitos e a rastreabilidade dos dados da página.

## Objetivo e escopo

Aumentar o apoio recorrente à SouJunior, explicando a causa, demonstrando impacto e transparência e encaminhando o visitante para [a campanha oficial](https://apoia.se/soujunior).

Jornada: entender a causa → conhecer os gastos e o impacto → perceber a comunidade → escolher apoiar → abrir o Apoia.se. O mural e o card são recursos de reconhecimento, não produtos independentes.

**Implementado:** landing responsiva; navegação por âncoras; menu mobile; tabela financeira; métricas; seleção manual de depoimentos; três sugestões de contribuição; mural ilustrativo; geração, prévia e download local de card em PNG.

**Fora do escopo:** pagamentos próprios, integração automática com Apoia.se, scraping de pagamentos, autenticação, cadastro automático, upload para servidor, banco de dados e pontuação de ranking. Não existe backend nesta implementação. Gerar card não prova doação.

## Execução e stack

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

O Vite imprime o endereço disponível; normalmente `http://localhost:5173/`. O build estático fica em `dist/`. A página pode ser servida por um servidor estático; abrir o HTML diretamente via `file://` não é o fluxo de execução suportado.

| Comando | Script atual | Finalidade e limite |
|---|---|---|
| `npm run dev` | `vite` | Servidor local com atualização automática |
| `npm test` | `vitest run` | Testes em jsdom |
| `npm run typecheck` | `tsc --noEmit` | Comando exigido pelo fluxo; a configuração raiz usa `files: []` e referências, portanto não substitui o build das referências |
| `npm run build` | `tsc -b && vite build` | Verifica os projetos TypeScript referenciados e gera o site |

Dependências declaradas: React/React DOM `^19.3.0`. Ferramentas: TypeScript `^7.0.2`, Vite `^8.3.0`, plugin React `^6.1.1`, Vitest `^5.0.1`, jsdom `^29.1.1`, Testing Library React `^16.3.3` e user-event `^14.6.7`. As versões exatas resolvidas estão no `package-lock.json`; usar `npm ci` para reproduzi-las.

Não há variável de ambiente necessária, segredo, API própria, configuração de deploy ou workflow de CI no conjunto de arquivos atual. A licença do repositório é MIT, com copyright de 2026 de Guilherme Faccioli. Não inferir licenças individuais dos assets apenas pela licença do repositório.

## Mapa do repositório

| Arquivo/diretório | Responsabilidade |
|---|---|
| `AGENTS.md` | Regras de escopo, qualidade e decisões |
| `README.md` | Entrada rápida e links para a documentação |
| `docs/PROJECT_DOCUMENTATION.md` | Contrato documentado do projeto |
| `docs/design/` | Captura auditável do Pencil, inventários e prévias |
| `src/main.tsx` | Monta React em `#root`, com StrictMode e CSS global |
| `src/App.tsx` | Composição, dados editoriais, menu, seleção de depoimentos, CTAs, mural e rodapé |
| `src/SupporterCard.tsx` | Formulário, leitura de foto, estado de prévia e exportação Canvas |
| `src/assets.ts` | Imports das imagens usadas pelos componentes |
| `src/styles.css` | Estilos, hero, seções, breakpoints e estados acessíveis |
| `src/App.test.tsx` | Oito testes da página, incluindo ressalvas das métricas |
| `src/styles.test.ts` | Regressão dos backgrounds quadrados e raios originais dos componentes |
| `src/test/setup.ts` | Cleanup do DOM após cada teste |
| `src/vite-env.d.ts` | Tipos do cliente Vite e imports de assets |
| `index.html` | Idioma pt-BR, metadados, fontes e entrada React |
| `package.json`, `package-lock.json` | Scripts e dependências |
| `tsconfig*.json` | Configuração TypeScript de app, ferramentas e referências |
| `vite.config.ts` | Plugin React |
| `vitest.config.ts` | Plugin React, ambiente jsdom e setup |
| `design/pendev.pen` | Design editável; acessar conteúdo pelo MCP Pencil |
| `design/pendev-assets/` | PNGs originais com caminhos relativos estáveis |
| `.gitignore` | Ignora node_modules, dist, .env/.env.* e .agents |
| `LICENSE` | Licença do projeto |

## Documento visual e dependências

A captura pelo MCP contém **836 nós**, **25 elementos de primeiro nível** e **434 nós no Desktop**. Tipos: 519 frames, 52 retângulos, 227 textos, 18 elipses, 12 paths e 8 grupos.

Há **88 referências a 26 PNGs**, todos presentes no filesystem, somando **23.464.961 bytes**. Uma referência a `image-import-95.png` está desativada. O manifesto registra uso no documento inteiro, uso no Desktop, referências desativadas e imports web.

As 26 imagens são `design/pendev-assets/image-import-N.png`, com N:
`7, 8, 15, 17, 41, 49, 56, 61, 87, 89, 90, 92, 94, 95, 96, 97, 99, 100, 101, 106, 107, 109, 110, 111, 112, 114`.

O design usa Funnel Sans, Funnel Display e Inter. A web carrega Funnel Sans e Funnel Display, pesos 400–700, via Google Fonts em `index.html`, com fallback sans-serif. Isso é uma dependência de rede em runtime; os PNGs são empacotados localmente pelo Vite.

Não foram encontrados scripts, shaders, browser nodes, bibliotecas de ícones ou instâncias `ref` nos nós capturados. As variáveis estão vazias. A API consultada **não expõe imports/metadados da raiz**: não há prova de ausência absoluta de bibliotecas `.lib.pen` ou imports apenas declarados ali. O snapshot não substitui o arquivo editável.

## Estrutura visual escolhida

O Desktop `EAVtG` mede **1920 × 6340**; seu container `F1TIs` mede **1920 × 6372**. Essa diferença de 32 px está registrada, não corrigida.

| Bloco Pencil | Papel na landing | Implementação |
|---|---|---|
| `G8k5su` / home | Header, arte do mascote, headline e CTAs | `.hero`, `.header`, `.hero-art`, `.hero-copy` |
| `XWN8T` / section-2-3 | Transparência e métricas | `#causa`, `#impacto` |
| `d1xXmo` / section-4-5 | Impacto e depoimentos | `.stories` |
| `kNNhp` / section-6 | Apoio e comunidade | `#apoio`, `#comunidade` |
| `xZ1d6` / footer | CTA final, canais e navegação | `.footer` |

Todos os IDs, textos, dimensões e variantes estão na [referência detalhada](design/DESIGN_REFERENCE.md). As prévias são exportações do Pencil, não screenshots da implementação web.

### Hero: composição obrigatória

Preservar a ordem e independência das camadas:

1. Fundo azul e grade.
2. Retângulo azul claro `SMH31`.
3. Corpo do mascote no recorte `EiMyw`, contendo `s5HLt1`.
4. Moedas `PVgNq`.
5. Header/copy e cards flutuantes `Yb7F3` e `uCbVF`.
6. Cabelo sobreposto `D7Mx2W`, contendo `OYht1`, acima do card branco.

O recorte inferior termina na borda inferior do retângulo azul claro, sem prender o mascote lateralmente. O cabelo tem recorte e ordem próprios. Não voltar a combinar mascote e fundo em um único wrapper que elimine esse efeito.

O hero web ocupa **100% da largura**, como os fundos das demais seções. Não restabelecer um max-width exclusivo para o banner. Os containers internos podem manter limites de leitura; eles não são a largura externa da seção.

**Estado real da web:** a composição atual ainda usa uma imagem `.hero-mascot`, sem camadas separadas de corpo recortado e cabelo. O Pencil foi atualizado além da implementação. Esta diferença precisa ser tratada em uma tarefa visual específica; a documentação não deve marcar essa sincronização como concluída.

### Tipografia, cores e responsividade web

Tokens CSS atuais: azul `#2e52f2`, texto `#101e64`, secundário `#566080`, borda `#e3e8ff`. Fundo base branco, áreas suaves em tons `#f1f4fd`/`#f5f7ff`. Títulos usam Funnel Display e texto usa Funnel Sans.

| Regra | Comportamento |
|---|---|
| Container base | `calc(100% - 64px)`, máximo 1376 px |
| ≥1600 px | Container com 71,667% da largura, mantendo máximo; h1 de 88 px |
| ≤1199 px | Ajustes dos cards flutuantes, fontes e espaços |
| ≤800 px | Menu recolhido, hero com copy acima da arte, planos/formulário em coluna, métricas em duas colunas |
| ≤420 px | Ajustes de tabela, cards e controles para telas estreitas |
| Movimento reduzido | Remove scroll suave e transições |

O mobile é uma adaptação CSS: não existe um frame mobile confirmado como referência oficial nesta captura. Não confundir as variantes `home` com versões mobile.

## Fluxos e estado

### Navegação e apoio

Âncoras: `#inicio`, `#conteudo`, `#causa`, `#impacto`, `#apoio`, `#comunidade`. `menuOpen` controla o menu mobile. Selecionar uma seção fecha o menu; Escape dentro da navegação também o fecha.

Todos os CTAs de contribuição abrem `https://apoia.se/soujunior` em nova aba com `rel="noreferrer"`. Não pré-selecionam valor via API e não processam pagamento. R$ 2, R$ 15 e R$ 50 são sugestões; condições e benefícios pertencem à campanha oficial.

Canais usados: [Apoia.se](https://apoia.se/soujunior), [Discord](https://discord.gg/FkBcf3vdQZ), [GitHub](https://github.com/SouJunior) e [WhatsApp de avisos](https://chat.whatsapp.com/JJzCMlqMKlw1YOhOk7QB3W). São links fornecidos pelo projeto; esta auditoria não realizou verificação externa de disponibilidade.

### Depoimentos

Dois relatos, de Thais Escobar e Renan Marques. Botões alternam `quoteIndex`; não existe temporizador de rotação automática. A região usa `aria-live="polite"`.

### Card de apoiador

- Nome obrigatório, máximo 60 caracteres; espaços isolados são rejeitados.
- LinkedIn/site opcional, máximo 100 caracteres, tratado como texto: não é aberto nem enviado.
- Foto opcional: MIME PNG, JPEG ou WebP; limite de 5 × 1024 × 1024 bytes. O arquivo também precisa ser decodificável como imagem.
- `FileReader` e `Image` leem a foto localmente. `photoVersion` impede que uma leitura antiga substitua a seleção mais recente.
- Durante a leitura, “Gerar card” fica desabilitado.
- Gerar captura uma cópia de nome/site/foto no estado `card`; editar o formulário depois não altera o card já gerado até uma nova geração.
- Download aguarda as fontes, desenha em Canvas **1200 × 630**, exporta `eu-apoio-soujunior.png` e revoga a URL temporária.
- Sem foto, usa a inicial do nome. Com foto, recorta a imagem de forma centralizada em um círculo.
- Erros de leitura, decodificação ou download são apresentados com `role="alert"`.
- Não há persistência entre recargas, envio ao servidor nem inserção automática no mural.
- Prévia HTML e PNG têm renderizações distintas; não há promessa de igualdade pixel a pixel.

### Mural

Ana Costa, Bruno Lima e Carla Souza são exemplos do design e estão identificados como ilustrativos. A inclusão de apoiadores reais depende de um processo de validação manual que não foi implementado. A numeração não representa classificação financeira verificada.

## Conteúdo e proveniência

Os dados foram adotados do material do projeto, consultado no histórico Git. Fontes atuais: [briefing](hackathon/product-brief.md), [gastos](content/expenses-2026.csv) e [depoimentos](content/testimonials.md). Fonte histórica: commit `f13acf0`, arquivos `docs/hackathon/product-brief.md`, `docs/Gastos/gastos_2026.csv` e `docs/Depoimentos/depoimentos.md`.

| Métrica exibida | Valor | Limite |
|---|---:|---|
| Mentores ativos | 35 | Fotografia fornecida pelo projeto |
| Pessoas empregadas | +50 | Por meio da SouJunior |
| Projetos em desenvolvimento | 3 | Não confundir com mentores |
| Membros | 120 | Atualização necessária antes de publicação |
| Apoiadores | 108 | Não é contador em tempo real |

| Serviço | Acumulado até setembro/2026 |
|---|---:|
| AWS | R$ 595,15 |
| Vultr | R$ 757,85 |
| DigitalOcean | R$ 8,78 |
| name.com | R$ 487,81 |
| **Total** | **R$ 1.849,59** |

O valor R$ 700/mês do canvas é ilustrativo, não o dado financeiro adotado. As equivalências “R$ 2 = um dia de servidor” e “R$ 15 = uma semana de ferramentas” também não foram adotadas como fatos. Textos lorem ipsum foram substituídos por conteúdo da causa. Depoimentos exibidos são trechos dos relatos fornecidos, com cargos correspondentes ao material.

## Validação e limites conhecidos

Oito testes em `src/App.test.tsx` cobrem o rótulo de apoiador ilustrativo, espera da leitura da foto, limite do upload, destinos dos CTAs/âncoras, menu mobile, geração sem cadastro no mural, rejeição de nome em branco e ressalvas de confirmação dos membros e de variação dos apoiadores. Não são testes de comparação visual ou download Canvas em navegador real.

A documentação anterior registra verificações manuais no Chromium em 320, 390, 768, 1440, 1920, 2560 e 3840 px, ausência de overflow horizontal, menu, foto válida/inválida e download PNG. Essas verificações não foram repetidas nesta consolidação e não equivalem a cobertura automática de todos os navegadores.

Acessibilidade implementada: semântica de seções/títulos, labels, foco visível, link de pulo, nome acessível do menu, anúncio de atualização/erro e movimento reduzido. Não foi realizada certificação WCAG nem auditoria completa com leitor de tela.

Pendências confirmadas:

- Sincronizar o recorte do corpo e a sobreposição do cabelo do Pencil com o React.
- Somente os backgrounds `.hero` e `.pale-section` usam cantos quadrados; componentes e retratos preservam seus formatos originais. O teste `src/styles.test.ts` verifica essa regra em jsdom, sem substituir a verificação visual responsiva.
- Otimizar os PNGs originais grandes; preservar originais/caminhos até definir uma mudança explícita.
- Revalidar dados de membros/apoiadores antes de publicação.
- Considerar a limitação do script `typecheck`: o build de referências é a verificação TypeScript efetiva atual.
- Rever a diferença de 32 px na altura do Desktop antes de exportações finais.
- Confirmar conteúdo real do mural e destino dos links antes de produção.
- Produzir screenshot ou vídeo do site em execução e registrar integrantes e responsabilidades para a submissão; as prévias do Pencil não substituem essa evidência.

## Versionamento e manutenção

Versionar fonte, lockfile, design, assets necessários e documentação juntos quando uma mudança os afetar. Não versionar `node_modules/`, `dist/`, `.env*` ou arquivos temporários de validação.

A integração preserva os commits das branches de origem e separa a adaptação visual da organização documental. Consulte [integration/README.md](integration/README.md) para decisões e procedência.

Toda alteração futura deve atualizar a documentação correspondente, explicar o motivo e executar `npm test`, `npm run typecheck` e `npm run build`. Usar commits pequenos e descritivos, sem incluir alterações alheias. O procedimento completo está em [MAINTENANCE.md](MAINTENANCE.md).
