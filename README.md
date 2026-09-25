# SouJunior — Landing Page CodeImpact

Landing page responsiva para apresentar a causa da SouJunior, mostrar impacto e transparência financeira e encaminhar visitantes para a campanha oficial no [Apoia.se](https://apoia.se/soujunior).

## Sobre o projeto

A SouJunior apoia pessoas que estão começando na área de tecnologia. O projeto organiza essa história em uma jornada simples: explicar a causa, mostrar como os recursos são utilizados, apresentar resultados da comunidade e facilitar o apoio recorrente.

Principais funcionalidades implementadas:

- hero com chamada para apoiar a SouJunior a partir de R$ 2;
- navegação por âncoras e menu responsivo para telas menores;
- seções de causa, transparência financeira, métricas de impacto e depoimentos;
- planos de apoio que direcionam para a campanha oficial;
- seção de mentorias e mural ilustrativo de apoiadores;
- formulário para gerar e baixar localmente um card de apoiador em PNG;
- links para os canais oficiais da SouJunior;
- suporte a teclado, foco visível, labels de formulário, link para pular ao conteúdo e preferência por movimento reduzido.

O mural é ilustrativo e não representa um ranking financeiro verificado. O projeto não processa pagamentos, não cadastra apoiadores automaticamente e não envia nome, site ou foto do card para um servidor.

## Tecnologias utilizadas

- **Frontend:** React `19.3.0`, React DOM `19.3.0` e TypeScript `7.0.2`.
- **Desenvolvimento e build:** Vite `8.3.0`, `@vitejs/plugin-react` `6.1.1` e npm.
- **Estilos e assets:** CSS, imagens PNG empacotadas pelo Vite e Google Fonts com Funnel Sans e Funnel Display.
- **Testes:** Vitest `5.0.1`, Testing Library React `16.3.3`, Testing Library User Event `14.6.7` e jsdom `29.1.1`.
- **Backend e banco de dados:** não há. A aplicação é um frontend estático e não possui API própria, autenticação ou integração automática com pagamentos.

## Como executar

### Pré-requisitos

- Git;
- Node.js com npm.

### Instalação

```bash
git clone https://github.com/GuiFaccioli/Hackaton-SouJunior-Equipe-CodeImpact.git
cd Hackaton-SouJunior-Equipe-CodeImpact
npm ci
```

### Variáveis de ambiente

Nenhuma variável de ambiente é necessária para executar o projeto. Não há arquivo `.env`, segredo ou chave de API exigido pela aplicação.

### Desenvolvimento local

```bash
npm run dev
```

O Vite informa no terminal o endereço local, normalmente `http://localhost:5173/`.

### Testes, validação e build

```bash
npm test
npm run typecheck
npm run build
```

O comando `npm test` executa os testes com Vitest. O `npm run typecheck` executa `tsc --noEmit`. O `npm run build` verifica os projetos TypeScript referenciados e gera o build estático em `dist/`.

## Estrutura principal

| Caminho | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Composição da landing page, conteúdo, navegação, CTAs e seções da campanha. |
| `src/SupporterCard.tsx` | Formulário, prévia e geração local do card de apoiador. |
| `src/styles.css` | Layout, identidade visual, responsividade e estados de acessibilidade. |
| `src/assets.ts` | Imports das imagens usadas pela aplicação. |
| `src/App.test.tsx` | Testes dos fluxos principais da landing page. |
| `src/styles.test.ts` | Testes de regras visuais das superfícies. |
| `docs/hackathon/` | Briefing, regras, critérios e decisões do hackathon. |
| `docs/content/` | Fontes dos dados financeiros e depoimentos. |
| `docs/design/` | Inventário e referências do design no Pencil. |

## Limites conhecidos

- Os botões de apoio abrem a campanha oficial; não há pagamento dentro da aplicação.
- O mural usa exemplos ilustrativos e não possui cadastro automático.
- A geração do card acontece no navegador e não comprova uma doação.
- As imagens originais do design ainda são grandes e sua otimização permanece como pendência antes de uma publicação em produção.
- As prévias do Pencil são referências de design, não screenshots da aplicação em execução.

## Integrantes

- Guilherme Faccioli — Dev Jr
- Thainá Galvão — PM Jr
- Letícia Ribeiro — Mentora Produto
- Mel Almeida — Designer Jr
- Rafa — QA
- Thiago Miranda — Product Designer Mentor
- Alexandre Nunes — Dev Jr
- Edivaldo Junior — Mentor Dev
- Renan — QA
- Georgia Salomon — PM Jr

## Documentação relacionada

- [Documentação oficial do projeto](docs/PROJECT_DOCUMENTATION.md)
- [Contexto e requisitos do hackathon](docs/hackathon/README.md)
- [Fontes de conteúdo](docs/content/README.md)
- [Referência do design](docs/design/DESIGN_REFERENCE.md)
- [Manutenção e versionamento](docs/MAINTENANCE.md)
- [Histórico de mudanças](docs/CHANGELOG.md)
- [Licença MIT](LICENSE)
