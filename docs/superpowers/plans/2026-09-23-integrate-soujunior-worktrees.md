# SouJunior Worktree Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to execute this plan task-by-task. Each task produces one reviewable commit.

**Goal:** Rebuild the denied PR branch with a corrected atomic UI Kit commit, then add the current landing page, design source, and documentation from the active worktrees as small, coherent commits.

**Architecture:** Work in the clean linked worktree at hawkfish, starting from f13acf0. Recreate the existing UI Kit move as the first commit with a descriptive message, then import only the intended files from main and remove-rounded-borders; keep the source worktrees untouched. Push the finished history to the existing remote branch with an explicit force-with-lease after final verification.

**Tech Stack:** Git, React, TypeScript, Vite, Vitest. No new dependencies.

**Spec:** User request and clarification in this conversation (2026-09-23): correct the commit from GuiFaccioli/organize-design-pen-dev, then put the current worktree changes on top; the PR was denied and the changes did not reach production. The current repository briefing and AGENTS.md constrain product and documentation changes.

## Global Constraints

- The Landing Page is the primary product; the supporter wall remains an engagement and social-proof feature.
- Use only official or verified impact numbers; do not invent counts of people impacted.
- Preserve the existing approval flow for supporter-wall entries; do not add payment integration, authentication, backend services, or dependencies.
- Preserve docs/hackathon/, docs/Gastos/gastos_2026.csv, and docs/Depoimentos/depoimentos.md; they contain required project context and sources used by the page.
- Keep the source worktrees intact. Do not reset, clean, or delete their pending changes.
- Do not deploy. The requested remote update is only to origin/GuiFaccioli/organize-design-pen-dev.
- Before pushing, capture the current remote SHA and use --force-with-lease against that exact SHA.
- Use precise path staging per commit; never use git add -A for a mixed worktree.
- Use TDD for code changes made during this plan. The existing landing-page implementation predates this task; validate it with its existing tests rather than claiming retroactive TDD.

## Review Focus

- The first corrected commit contains only the eight UI Kit moves and the two matching path updates.
- The new application imports every design image from a path that exists in the integration branch.
- Pencil snapshots and asset manifests describe the committed pendev.pen and pendev-assets/ files; design previews are not labelled as web screenshots.
- The integration does not delete hackathon context, expense sources, or testimonial sources.
- The latest README and project documentation describe the new App.tsx / styles.css structure and do not retain paths to the deleted component tree.
- Any copy of member/supporter counts preserves the existing warning that figures need confirmation before publication.
- No production deployment or new PR is created as part of the branch push.

---

## File Structure

- pen.dev/Ui-Kit/ — existing UI Kit source assets moved by the corrected first commit.
- pendev.pen, pendev-assets/, docs/design/ — editable Pencil design, its source images, and the captured design inventory.
- src/App.tsx, src/SupporterCard.tsx, src/assets.ts, src/styles.css — current landing-page implementation.
- src/App.test.tsx, src/styles.test.ts — behavior tests and the CSS regression test for square UI surfaces.
- docs/hackathon/, docs/Gastos/, docs/Depoimentos/ — durable project context and source data retained from f13acf0.
- README.md, docs/PROJECT_DOCUMENTATION.md, docs/MAINTENANCE.md, docs/CHANGELOG.md — current project usage and maintenance documentation.
- docs/superpowers/plans/2026-09-23-integrate-soujunior-worktrees.md — this reviewed integration plan.

## Task 1: Recreate the UI Kit Move Commit with a Correct Message

**Files:**

- Rename: docs/Ui-Kit/* to pen.dev/Ui-Kit/*
- Modify: src/components/Header.tsx
- Modify: src/styles/official-kit.css

**Interfaces:**

- Consumes: clean integration branch at f13acf0; source commit fa6734ab62d723b3f7435fd9347f9fb82ba58c2b.
- Produces: one commit titled chore(assets): move UI Kit to pen.dev.

- [ ] Confirm the integration worktree is clean and HEAD is f13acf0.
- [ ] Apply the source commit without retaining its old commit message: git cherry-pick --no-commit fa6734ab62d723b3f7435fd9347f9fb82ba58c2b.
- [ ] Inspect the staged paths and run git diff --cached --check; confirm only the eight asset moves and two path updates are staged.
- [ ] Commit with git commit -m "chore(assets): move UI Kit to pen.dev".
- [ ] Verify the commit parent is f13acf0 and its file list matches the expected ten paths.

## Task 2: Add the Pencil Source and Design Inventory

**Files:**

- Create: pendev.pen
- Create: pendev-assets/ (all 26 source PNGs)
- Create: docs/design/DESIGN_REFERENCE.md
- Create: docs/design/asset-manifest.json
- Create: docs/design/asset-references.json
- Create: docs/design/pencil-snapshot.json
- Create: docs/design/previews/EAVtG.png
- Create: docs/design/previews/G8k5su.png

**Interfaces:**

- Consumes: source files in the main worktree at C:/Users/guifa/Desktop/Hackaton-SouJunior-Equipe-CodeImpact.
- Produces: design artifacts with the same relative paths required by src/assets.ts and the documentation.

- [ ] Copy only pendev.pen, pendev-assets/, and docs/design/ from the main worktree into the integration worktree.
- [ ] Confirm the inventory lists the copied assets and that every path referenced by asset-references.json resolves.
- [ ] Validate every PNG hash recorded in asset-manifest.json with this PowerShell check from the repository root:

~~~powershell
$manifest = Get-Content docs/design/asset-manifest.json -Raw | ConvertFrom-Json
foreach ($asset in $manifest.assets) {
  $actualHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $asset.path).Hash.ToLowerInvariant()
  if ($actualHash -ne $asset.sha256) {
    throw "Hash mismatch: $($asset.path)"
  }
}
~~~

- [ ] Parse asset-manifest.json, asset-references.json, and pencil-snapshot.json with ConvertFrom-Json to confirm all three files are valid JSON.
- [ ] Run git diff --check, stage only the listed design paths, and commit with docs(design): add Pencil source and inventory.

## Task 3: Replace the Previous Landing Implementation

**Files:**

- Modify: index.html
- Modify: src/App.tsx
- Modify: src/main.tsx
- Modify: src/test/setup.ts
- Modify: src/vite-env.d.ts
- Create: src/SupporterCard.tsx
- Create: src/assets.ts
- Create: src/styles.css
- Create: src/App.test.tsx
- Delete: src/components/, src/data/, src/lib/, and the old src/styles/ files

**Interfaces:**

- Consumes: design-image paths added in Task 2.
- Produces: the responsive Pencil Desktop landing page, local supporter-card generator, and six behavior tests.

- [ ] Copy the current application files from the main worktree, preserving the source worktree unchanged.
- [ ] Remove the obsolete component, data, library, stylesheet, and test files that the new entry point no longer imports.
- [ ] Confirm every import in src/assets.ts resolves to a file committed in Task 2.
- [ ] Run npm test; expected result is all six existing landing-page tests pass.
- [ ] Run npm run build; expected result is TypeScript project build and Vite production build succeed.
- [ ] Stage only the application files and obsolete application paths listed above; commit with feat(landing): rebuild page from Pencil Desktop.

## Task 4: Apply Square Corners to the Current Landing Page with TDD

**Files:**

- Create: src/styles.test.ts
- Modify: src/styles.css

**Interfaces:**

- Consumes: the current landing markup from Task 3 and the existing team decision to use square corners for framed UI surfaces.
- Produces: a failing-then-passing CSS regression test and square corners for the hero, buttons, cards, form surfaces, badges, and footer panel. Circular avatars and decorative dots remain circular.

- [ ] Add this test to src/styles.test.ts:

~~~tsx
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import App from "./App";
import cssText from "./styles.css?inline";

it("keeps the main landing surfaces square", () => {
  const style = document.createElement("style");
  style.textContent = cssText.replace(/@import[^;]+;/, "");
  document.head.append(style);
  try {
    const { container } = render(<App />);
    const selectors = [
      ".hero",
      ".button",
      ".menu-toggle",
      ".floating-member",
      ".floating-support",
      ".pale-section",
      ".eyebrow",
      ".member-top > span",
      ".value-card",
      ".expense-card",
      ".metric",
      ".testimonial",
      ".testimonial > small",
      ".plan",
      ".plan-badge",
      ".card-form",
      ".card-form input",
      ".card-preview",
      ".preview-empty",
      ".supporter-row",
      ".supporter-badge",
      ".footer-panel",
    ];
    for (const selector of selectors) {
      const element = container.querySelector(selector);
      expect(element, selector).not.toBeNull();
      expect(
        Number.parseFloat(
          getComputedStyle(element as Element).borderTopLeftRadius || "0",
        ),
        selector,
      ).toBe(0);
    }
  } finally {
    style.remove();
  }
});
~~~

- [ ] Run npx vitest run src/styles.test.ts; confirm it fails because the existing stylesheet rounds the selected UI surfaces.
- [ ] After confirming the test fails for existing nonzero radii, append this override after all media rules in src/styles.css:

~~~css
.button,
.menu-toggle,
.hero,
.pale-section,
.floating-member,
.floating-support,
.eyebrow,
.member-top > span,
.value-card,
.expense-card,
.metric,
.testimonial,
.testimonial > small,
.plan,
.plan-badge,
.card-form,
.card-form input,
.card-form input::file-selector-button,
.card-preview,
.preview-empty,
.supporter-row,
.supporter-badge,
.footer-panel {
  border-radius: 0;
}
~~~

- [ ] Keep avatar images and decorative dots out of the selector list.
- [ ] Run the focused style test and confirm it passes.
- [ ] Run the full npm test suite and npm run build; confirm all tests and the production build pass.
- [ ] Stage only src/styles.test.ts and src/styles.css; commit with fix(ui): square landing page surfaces.

## Task 5: Reconcile and Update Project Documentation

**Files:**

- Create or update: README.md
- Create or update: docs/PROJECT_DOCUMENTATION.md
- Create or update: docs/MAINTENANCE.md
- Create or update: docs/CHANGELOG.md
- Include: this plan file
- Preserve unchanged: docs/hackathon/, docs/Gastos/gastos_2026.csv, docs/Depoimentos/depoimentos.md

**Interfaces:**

- Consumes: final app structure from Tasks 2–4, current documentation in the main worktree, and the older untracked README/project document in monkfish.
- Produces: one accurate set of project docs for the current landing page and retained hackathon sources.

- [ ] Use the main README and project-documentation versions as the base because they describe the current App.tsx, Pencil source, and design inventory.
- [ ] Reuse only compatible information from the monkfish documents; remove descriptions of the deleted component tree and transient MCP/session state.
- [ ] Remove statements that say the hackathon documents, expense CSV, or testimonials are absent; link to their retained paths.
- [ ] Clearly label Pencil previews as design references, not screenshots of the running website.
- [ ] Keep the existing freshness caveat for 120 members and 108 supporters; do not invent updated counts or team member responsibilities.
- [ ] Confirm the README covers the project purpose, problem/solution, differentiator, stack, run/test/build commands, structure, technical decisions, accessibility, and license with information available in the repository.
- [ ] State plainly that a website screenshot/video and named team-responsibility list are still submission follow-ups; do not present Pencil previews as website output or infer team roles from Git authors.
- [ ] Run git diff --check; verify all local links in the updated documents resolve.
- [ ] Stage only the documentation files listed above and commit with docs: document the landing page and design workflow.

## Task 6: Final Review and Remote Branch Update

**Files:**

- Review all commits after f13acf0.
- Update remote ref: origin/GuiFaccioli/organize-design-pen-dev.

**Interfaces:**

- Consumes: clean, tested integration branch containing Tasks 1–5.
- Produces: corrected remote branch history; no deploy and no newly created PR.

- [ ] Run npm test and npm run build on the final integration worktree.
- [ ] Run git diff --check f13acf0..HEAD.
- [ ] Inspect the ordered commit list and confirm each commit contains one logical change.
- [ ] Verify docs/hackathon/README.md, the expense CSV, and testimonial source are present.
- [ ] Query the current remote SHA and stop if it differs from the audited value fa6734ab62d723b3f7435fd9347f9fb82ba58c2b:

~~~powershell
$expectedRemote = "fa6734ab62d723b3f7435fd9347f9fb82ba58c2b"
$currentRemote = (git ls-remote origin refs/heads/GuiFaccioli/organize-design-pen-dev).Split()[0]
if ($currentRemote -ne $expectedRemote) {
  throw "Remote branch moved; inspect before pushing."
}
git push --force-with-lease=refs/heads/GuiFaccioli/organize-design-pen-dev:$expectedRemote origin HEAD:refs/heads/GuiFaccioli/organize-design-pen-dev
~~~

## Self-Review

- **Coverage:** Tasks 1–6 cover commit correction, design source import, landing implementation, TDD styling correction, documentation reconciliation, verification, and the requested branch push.
- **Scope:** No new product feature, service, dependency, deployment, or PR creation is included.
- **Consistency:** Tasks 2–3 order assets before imports; Task 4 tests the final stylesheet after the new implementation is present; Task 5 documents the final file tree.
- **Preservation:** Source worktrees remain intact; permanent hackathon context and content sources remain in the integration branch.
- **Review focus:** Every global constraint has a preservation or verification step above. The freshness of changing impact counts remains a publication follow-up, not something to guess during this history task.
