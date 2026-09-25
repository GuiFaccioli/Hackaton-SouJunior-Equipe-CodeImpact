import { describe, expect, it } from "vitest";
import { wrapOffset } from "./useCircularTrack";

describe("circular track coordinate", () => {
  it("wraps exactly at the join", () => {
    expect(wrapOffset(1260, 1260)).toBe(0);
    expect(wrapOffset(1261, 1260)).toBe(1);
  });
  it("handles fast repeated gestures in either direction", () => {
    expect(wrapOffset(1260 * 100 + 51, 1260)).toBe(51);
    expect(wrapOffset(-1260 * 100 - 51, 1260)).toBe(1209);
  });
  it("handles unmeasured layouts safely", () => {
    expect(wrapOffset(300, 0)).toBe(0);
  });
});
