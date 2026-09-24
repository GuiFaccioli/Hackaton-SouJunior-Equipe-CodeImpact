# Manutenção e versionamento

## Antes de trabalhar

1. Ler `AGENTS.md`, `README.md` e `docs/PROJECT_DOCUMENTATION.md`.
2. Conferir `git status --short` para separar alterações existentes das novas.
3. Executar `get_app_state` pelo MCP Pencil e confirmar `design/pendev.pen`.
4. Ler o Desktop `EAVtG` e a seção que será alterada. Não usar filesystem para interpretar o conteúdo do `.pen`.
5. Consultar `docs/design/DESIGN_REFERENCE.md` e preservar a composição do hero. O JSON registra uma captura, não o estado ao vivo do editor.

## Ao alterar

- Visual editável: modificar `design/pendev.pen` pelo MCP, preservando camadas e URLs `pendev-assets/` relativas ao documento. Os arquivos ficam em `design/pendev-assets/`.
- Comportamento web: modificar somente os arquivos necessários em `src/`.
- Documentação: atualizar o contrato correspondente, registrar o motivo em `docs/CHANGELOG.md` e declarar divergências entre design e código.
- Evitar modificar código para que a documentação pareça correta: registrar o estado real e tratar correções fora do escopo separadamente.
- Não marcar implementado o que existe somente no canvas. Não converter exemplos de mural, valores ilustrativos ou lorem ipsum em dados reais.
- Não adicionar dependências ou infraestrutura para necessidades futuras.

## Atualizar a captura do Pencil

Os exemplos abaixo são snippets para `execute` do MCP Pencil, não comandos de terminal. Ler a documentação da ferramenta antes de executá-los. O levantamento usa operações de leitura; a exportação escreve apenas as prévias indicadas.

### Nós e propriedades

```js
const nodes = Get((node, context) => {
  const properties = {};
  for (const [key, value] of Object.entries(node)) {
    if (key !== "children") properties[key] = value;
  }
  return {
    parentId: context.parentCtx ? context.parentCtx.node.id : null,
    depth: context.depth,
    index: context.index,
    bounds: context.bounds,
    properties,
  };
}, { includePathGeometry: true });
Print(JSON.stringify({ variables: GetVariables(), nodes }));
```

Salvar o JSON retornado em `docs/design/pencil-snapshot.json`, mantendo o envelope `source` com data, documento, método e limites. Não gravar o texto `OK`/`Print output` como parte do JSON. Preservar a ordem do array para tornar a comparação entre capturas estável.

O inventário é plano: `parentId` + `index` reconstituem a árvore; omitir `children` evita duplicação de subárvores. Não arredondar os números do JSON. A tabela Markdown pode arredondar para leitura humana.

### Referências e manifesto

1. Percorrer recursivamente as propriedades de cada nó, coletando preenchimentos `type: "image"` com `url`.
2. Registrar o ID/nome do nó, o caminho da propriedade, o estado `enabled` e se o nó descende de `EAVtG` em `asset-references.json`.
3. As URLs de `asset-references.json` e das propriedades do snapshot são relativas a `design/pendev.pen`; resolva-as a partir de `design/`. O campo `path` do manifesto é relativo à raiz do repositório. Para cada arquivo referenciado, verificar existência, tamanho, dimensões PNG e SHA-256 pelo filesystem; isso não requer ler o `.pen` pelo filesystem.
4. Verificar usos nos imports de `src/assets.ts` e URLs de `src/styles.css`; atualizar `asset-manifest.json`.
5. Se surgirem imagens em strokes, overrides, variáveis ou novos tipos de propriedade, manter a coleta recursiva. Não limitar o inventário a `fill.url`.
6. Inspecionar também scripts, shaders, refs, bibliotecas, URLs e fontes. Declarar o limite da API sobre imports/metadados da raiz.
7. Atualizar os totais e o índice hierárquico em `DESIGN_REFERENCE.md` e na documentação principal.

O campo `enabled` do inventário descreve o preenchimento, não garante visibilidade final: um ancestral pode estar desativado, recortado ou fora do viewport.

### Prévias

```js
Export(["EAVtG", "G8k5su"], "png", "<raiz-do-repositorio>/docs/design/previews", { scale: 0.5 });
```

Substituir `<raiz-do-repositorio>` pelo caminho real. Conferir os caminhos retornados pelo MCP e verificar os PNGs. Não exportar por cima das imagens-fonte de `design/pendev-assets/`. As prévias representam o Pencil, não comprovam igualdade com o site.

## Verificação obrigatória

```sh
npm test
npm run typecheck
npm run build
git diff --check
```

Registrar resultados reais em `docs/CHANGELOG.md`. Se um comando falhar, não marcar a tarefa como validada. `typecheck` usa o tsconfig raiz de referências; o `tsc -b` do build é necessário para verificar efetivamente os projetos atuais.

Para mudança visual, verificar no navegador desktop e mobile e comparar com o frame correspondente. Para largura externa do hero, incluir 2560/3840 px. Para upload/card, verificar nome vazio, leitura pendente, arquivo inválido, limite de tamanho e download real do PNG. Testes em jsdom não verificam a aparência nem o Canvas real.

Também verificar que todos os links locais da documentação existem, que os JSONs são válidos, que os IDs não estão duplicados, que os pais existem e que hashes dos assets correspondem aos arquivos.

## Git

Devem ser versionáveis: `src/`, `index.html`, configurações, `package.json`, `package-lock.json`, `design/pendev.pen`, `design/pendev-assets/`, `README.md` e `docs/` atuais. No estado auditado, esses caminhos não são bloqueados pelo `.gitignore`.

Não adicionar diretórios gerados, segredos ou temporários. Não usar `git add .` sem revisar as exclusões e alterações preexistentes. `git check-ignore -v --no-index <caminho>` identifica regras que impedem inclusão; saída vazia e código 1 significam ausência de regra correspondente.

Planejar commits por mudança concreta: por exemplo, documentação do estado atual em um commit; sincronização das camadas do hero em outro, quando implementada e validada. Não separar uma correção da documentação que explica seu contrato. Não inventar commits históricos para alterações já existentes.

Ao concluir, informar os arquivos alterados, o motivo, os comandos executados e os limites restantes. Distinguir arquivos preparados, arquivos staged, commit local e push remoto.
