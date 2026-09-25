import { render } from "@testing-library/react";
import { createElement } from "react";
import { expect, it, vi } from "vitest";
import App from "./App";

it("keeps section backgrounds square and restores component corner radii", async () => {
  const { readFileSync } = await vi.importActual<{
    readFileSync: (path: string, encoding: "utf8") => string;
  }>("node:fs");
  const { cwd } = await vi.importActual<{ cwd: () => string }>("node:process");
  const cssText = readFileSync(`${cwd()}/src/styles.css`, "utf8");
  const style = document.createElement("style");
  style.textContent = cssText.replace(/@import[^;]+;/, "");
  document.head.append(style);
  try {
    const { container } = render(createElement(App));
    expect(cssText.length).toBeGreaterThan(0);
    expect(cssText).toMatch(/input\.upload-input\[type="file"\]\s*\{[^}]*width:\s*1px;[^}]*height:\s*1px;/s);
    expect(cssText).not.toMatch(/\.official-page\s*\{[^}]*max-width:\s*390px/s);
    expect(style.sheet?.cssRules.length).toBeGreaterThan(0);
    expect(cssText).toMatch(
      /\.hero-mascot\s*\{[^}]*object-fit:\s*contain;/s,
    );
    expect(cssText).toMatch(
      /\.preview-mascot\s*\{[^}]*object-fit:\s*contain;/s,
    );
    expect(cssText).not.toMatch(
      /\.hero-mascot\s*\{[^}]*object-fit:\s*fill;/s,
    );
    expect(cssText).not.toMatch(
      /\.preview-mascot\s*\{[^}]*object-fit:\s*fill;/s,
    );
    expect(cssText).toMatch(
      /\.card-form input::file-selector-button\s*\{[^}]*border-radius:\s*5px;/s,
    );
    const expectedRadii = new Map([
      [".button", 999],
      [".menu-toggle", 8],
      [".floating-member", 12],
      [".floating-support", 12],
      [".eyebrow", 999],
      [".member-top > span", 0],
      [".value-card", 16],
      [".expense-card", 16],
      [".metric", 16],
      [".plan", 32],
      [".card-form", 0],
      [".card-preview", 16],
      [".supporter-row", 0],
      [".footer-inner", 24],
    ]);
    for (const [selector, expectedRadius] of expectedRadii) {
      const element = container.querySelector(selector);
      expect(element, selector).not.toBeNull();
      const radius = getComputedStyle(element as Element).borderRadius;
      const corners = radius.split(/\s+/).map((value) => Number.parseFloat(value));
      expect(corners.every((corner) => corner === expectedRadius), selector).toBe(true);
    }
    expect(getComputedStyle(container.querySelector(".hero") as Element).borderRadius).toBe("0 0 40px 40px");
    expect(getComputedStyle(container.querySelector(".pale-stage") as Element).borderRadius).toBe("32px 32px 0 0");
  } finally {
    style.remove();
  }
});
