# Agent Guidelines

These rules apply to all work performed in this repository.

## Communication and feedback

- Be direct, objective, and technically honest.
- Do not praise ideas, decisions, implementations, or architecture merely to be agreeable.
- Do not soften technical criticism when something is clearly weak, incorrect, risky, unnecessary, overengineered, or poorly justified.
- When identifying a problem, explain:
  - what is wrong;
  - why it matters;
  - what concrete impact it may cause;
  - what simpler or safer alternative exists.
- Prefer useful technical feedback over validation, encouragement, or diplomatic wording.
- Distinguish clearly between:
  - confirmed issues;
  - assumptions;
  - trade-offs;
  - preferences;
  - future risks.
- Do not present a subjective preference as a technical requirement.
- If an existing solution is already sufficient, say so instead of proposing changes for the sake of improvement.
- If the requested approach is technically unsound, challenge it and explain why before implementing it.
- Avoid unnecessary verbosity. Lead with the conclusion, then provide the reasoning that materially affects the decision.

## YAGNI — You Aren’t Gonna Need It

- Do not implement functionality based only on hypothetical future requirements.
- Do not add abstractions, infrastructure, configuration, extensibility, indirection, or generalized architecture without a concrete current use case.
- Before adding complexity, verify:
  - Is this required by the current scope?
  - Is there a concrete use case for it now?
  - Is there an existing problem that this solves?
  - Does the benefit justify the additional maintenance cost?
- If the answer is no, prefer the simpler implementation.
- When rejecting unnecessary future-oriented complexity, explicitly state:

  `YAGNI — we don't need this yet.`
- Do not build systems around imagined scale, future teams, future tenants, future integrations, or future traffic unless those constraints are already part of the current requirements.
- Do not create extension points merely because something "might be useful later."
- Do not introduce generic abstractions when a concrete implementation is currently sufficient.
- Do not create configuration for values that do not currently need to vary.
- Do not add fallback mechanisms, compatibility layers, migration paths, or alternate providers unless there is a real current need for them.
- Prefer postponing complexity until the requirement actually exists.

## Prefer simple and boring solutions

- Prefer the simplest solution that correctly satisfies the current requirement.
- Favor predictable, conventional, easy-to-debug implementations over clever or highly abstract designs.
- Optimize primarily for:
  - correctness;
  - clarity;
  - maintainability;
  - ease of debugging;
  - low operational complexity.
- Avoid unnecessary architectural novelty.
- Do not introduce the following without a concrete justification tied to a current requirement:
  - microservices;
  - Redis;
  - queues;
  - event buses;
  - message brokers;
  - distributed workers;
  - API gateways;
  - premature caching;
  - generic repository layers;
  - unnecessary service layers;
  - excessive dependency injection;
  - plugin systems;
  - generalized adapters;
  - premature horizontal scaling;
  - complex deployment infrastructure;
  - unnecessary background processing.
- Prefer a direct function call over messaging when synchronous execution is sufficient.
- Prefer a single service or application over multiple deployable services when separation is not required.
- Prefer the existing database over adding another datastore unless the current database cannot reasonably solve the problem.
- Prefer existing project conventions over introducing new patterns without a clear benefit.
- Complexity must be a response to an observed requirement, not anticipation of a possible future one.

## Scope discipline

- Implement only what is necessary to satisfy the requested task.
- Do not refactor unrelated code while working on a focused change.
- Do not rename, move, reorganize, or modernize unrelated files unless required for the task.
- Do not expand the scope because an adjacent improvement appears convenient.
- Do not add dependencies unless they provide clear value for the current requirement and the same result cannot be achieved reasonably with existing tools.
- Do not create abstractions around code used only once unless there is a clear readability or correctness benefit.
- Preserve working behavior outside the requested scope.
- If you identify unrelated issues, report them separately instead of silently fixing them.

## Architecture decisions

- Start from the current requirements, not from a hypothetical ideal architecture.
- Prefer incremental architecture over speculative architecture.
- Before introducing a new architectural component, identify:
  - the current problem;
  - the failure mode of the simpler approach;
  - why the new component solves that problem;
  - the operational cost it introduces.
- Do not justify complexity using vague arguments such as:
  - "for scalability";
  - "for future growth";
  - "for best practices";
  - "for enterprise readiness";
  - "to make it more robust";  
  unless the specific requirement or failure scenario is demonstrated.
- "Best practice" alone is not sufficient justification. Explain why the practice applies to this repository and this specific problem.
- Prefer reversible decisions when uncertainty is high.
- Keep irreversible or high-cost decisions to a minimum.

## Implementation quality

- Simple does not mean careless.
- Do not use YAGNI as an excuse to ignore:
  - correctness;
  - security requirements relevant to the current feature;
  - data integrity;
  - error handling;
  - validation;
  - accessibility;
  - tests that protect important behavior.
- Implement the minimum necessary solution properly.
- Handle realistic failure cases that are part of the current execution path.
- Avoid defensive code for impossible or purely hypothetical scenarios.
- Prefer explicit code over hidden magic.
- Prefer readable names and straightforward control flow over clever compression.
- Keep functions and modules focused on clear responsibilities.
- Follow existing project conventions unless there is a concrete reason not to.

## Testing

- Test behavior that matters to the current requirement.
- Prioritize tests for:
  - business rules;
  - regressions;
  - critical paths;
  - important edge cases;
  - previously observed failures.
- Do not create large test infrastructures for trivial behavior.
- Do not mock everything by default.
- Prefer the smallest level of testing that provides meaningful confidence.
- Do not add tests solely to increase coverage percentages.
- If a change is too trivial to justify a test, say so instead of creating a meaningless one.

## Dependencies

- Prefer existing dependencies and platform capabilities before adding new packages.
- Before introducing a dependency, verify:
  - the problem cannot be solved reasonably with the current stack;
  - the package provides meaningful value;
  - its maintenance cost is justified.
- Avoid dependencies for trivial utilities that can be implemented clearly in a few lines.
- Avoid adding frameworks or libraries solely because they are popular or considered standard elsewhere.

## Performance and scalability

- Do not optimize without evidence of a real performance problem or a clearly defined requirement.
- Avoid speculative caching, batching, sharding, replication, concurrency, or distributed processing.
- Measure before optimizing when practical.
- If the simple implementation meets the current expected load, keep it.
- When proposing a performance optimization, explain the actual bottleneck it addresses.

## Security

- Apply security controls proportionate to the current threat model and requirements.
- Do not remove necessary security controls in the name of simplicity.
- Do not introduce enterprise-grade security infrastructure without a concrete need.
- Protect secrets, authentication data, sensitive user data, and external credentials appropriately.
- Never hardcode credentials or secrets.
- Clearly flag security risks when they are materially relevant to the current task.

## Decision rule

When choosing between two technically valid approaches, prefer the one that:

1. satisfies the current requirement;
2. introduces fewer moving parts;
3. is easier to understand;
4. is easier to test and debug;
5. is easier to change later;
6. requires less infrastructure;
7. creates less maintenance burden.

If the more complex option does not provide a concrete present-day benefit, do not choose it.

## Final review before completing a task

Before considering a task complete, check:

- Did I implement only what was requested?
- Did I add complexity that is not currently necessary?
- Did I introduce a dependency that could have been avoided?
- Did I change unrelated code?
- Did I create an abstraction for a hypothetical future use case?
- Is there a simpler implementation with the same current behavior?
- Are the important current failure cases handled?
- Can another developer understand this without unnecessary context?

If unnecessary complexity was introduced, simplify it before finishing.

## Hackathon context

Before making product, UX, architecture, scope, or implementation decisions, read [the Hackathon context](docs/hackathon/README.md) and the documents linked from it. Treat official requirements, explicit current team decisions, and future ideas according to the precedence defined there.
