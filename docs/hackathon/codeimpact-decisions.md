# Decisões atuais da CodeImpact

Este documento registra decisões explícitas da equipe. Uma ideia mencionada em brainstorming não deve ser tratada como requisito sem atualização deste arquivo ou outra decisão registrada pelo time.

## Produto principal

A Landing Page é o produto principal.

Objetivo:

> Aumentar o engajamento e a conversão de novos apoiadores da SouJunior por meio de storytelling, transparência, prova social e reconhecimento da comunidade.

## Diferencial atual

Criar uma camada de reconhecimento dos apoiadores.

Primeira implementação prevista:

> Ranking / mural de apoiadores.

Objetivos do diferencial:

- gerar prova social;
- reconhecer quem apoia;
- incentivar participação;
- estimular novos apoios;
- tornar o apoio visível dentro da comunidade.

O ranking não é um produto separado. Ele deve aparecer como parte da jornada:

```text
Entender a causa
  → ver impacto
  → entender transparência
  → perceber apoio da comunidade
  → apoiar
```

## Guardrails do ranking

- Evitar sugerir que apoiadores com maior capacidade financeira são mais importantes.
- Considerar reconhecimento, badges, recorrência, mural, categorias e destaques.
- Não alterar o conceito definido pelo time sem discussão explícita.

## Fluxo inicial do MVP

```text
Pessoa apoia no Apoia.se
  → informa ou solicita entrada no mural
  → envia comprovação
  → validação manual
  → apoiador aparece no ranking/mural
```

Validação manual é suficiente para o MVP, salvo requisito concreto que justifique automação.

## Fora do escopo atual — not planned for current MVP

> Estes itens só entram após uma nova decisão explícita do time e uma justificativa concreta:

- integração automática com pagamentos do Apoia.se;
- scraping de pagamentos;
- sistema próprio de pagamentos;
- OAuth/social login complexo;
- Redis;
- message broker;
- event bus;
- microservices;
- API gateway;
- filas distribuídas;
- múltiplos rankings complexos;
- temporadas;
- sistema sofisticado de pontos;
- programa completo de indicação;
- sistema completo de embaixadores;
- infraestrutura de alta escala antecipada.

Se algum desses itens for proposto, explicar primeiro qual problema atual ele resolve, por que a solução simples não é suficiente e qual custo operacional ele introduz.

```text
YAGNI — we don't need this yet.
```

## Ideia futura: Indique / Embaixadores

Ideia futura, não requisito do MVP:

Um apoiador pode indicar novas pessoas ou empresas para conhecer a SouJunior. Se a indicação gerar participação ou novo apoio, a pessoa poderia receber reconhecimento ou um badge de “Embaixador da Comunidade”.

Isso amplia a gamificação para além do valor financeiro, mas não deve ser implementado agora sem decisão explícita do time.

## Princípios de engenharia

- Preferir arquitetura simples.
- Usar componentes claros e responsabilidades bem definidas.
- Manter documentação suficiente para onboarding.
- Usar tipagem e testes úteis.
- Tratar acessibilidade como requisito de qualidade.
- Evitar infraestrutura adicionada apenas para parecer mais profissional.
- “Scalability”, “enterprise-ready”, “best practice” e “future-proof” não são justificativas suficientes sozinhas.
