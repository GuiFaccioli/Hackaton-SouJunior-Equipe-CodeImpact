import { render } from "@testing-library/react";
import { createElement } from "react";
import { expect, it } from "vitest";
import App from "./App";

import cssText from "./styles.css?raw";

it("keeps the main landing surfaces square", () => {
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
      const radii = getComputedStyle(element as Element).borderRadius.split(/\s+/);
      expect(radii.every((radius) => Number.parseFloat(radius) === 0), selector).toBe(true);
    }
  } finally {
    style.remove();
  }
});
