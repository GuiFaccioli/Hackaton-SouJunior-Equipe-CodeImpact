import { render } from "@testing-library/react";
import { createElement } from "react";
import { expect, it, vi } from "vitest";
import App from "./App";

it("keeps the main landing surfaces square", async () => {
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
      const radius = getComputedStyle(element as Element).borderRadius;
      const corners = radius.split(/\s+/).map((value) => Number.parseFloat(value));
      expect(corners.every((corner) => corner === 0), selector).toBe(true);
    }
  } finally {
    style.remove();
  }
});
