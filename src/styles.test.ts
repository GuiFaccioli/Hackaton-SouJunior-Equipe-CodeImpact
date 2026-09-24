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
    expect(style.sheet?.cssRules.length).toBeGreaterThan(0);
    expect(cssText).toMatch(
      /\.card-form input::file-selector-button\s*\{[^}]*border-radius:\s*5px;/s,
    );
    const expectedRadii = new Map([
      [".hero", 0],
      [".pale-section", 0],
      [".button", 999],
      [".menu-toggle", 8],
      [".floating-member", 20],
      [".floating-support", 16],
      [".eyebrow", 999],
      [".member-top > span", 8],
      [".value-card", 20],
      [".expense-card", 24],
      [".metric", 20],
      [".testimonial", 0],
      [".testimonial > small", 99],
      [".plan", 32],
      [".plan-badge", 5],
      [".card-form", 24],
      [".card-form input", 10],
      [".card-preview", 24],
      [".preview-empty", 0],
      [".supporter-row", 12],
      [".supporter-badge", 99],
      [".footer-panel", 48],
    ]);
    for (const [selector, expectedRadius] of expectedRadii) {
      const element = container.querySelector(selector);
      expect(element, selector).not.toBeNull();
      // jsdom may return an empty string for the initial border-radius (0).
      const radius = getComputedStyle(element as Element).borderRadius || "0px";
      const corners = radius.split(/\s+/).map((value) => Number.parseFloat(value));
      expect(corners, `${selector}: ${radius}`).toEqual(corners.map(() => expectedRadius));
    }
  } finally {
    style.remove();
  }
});
