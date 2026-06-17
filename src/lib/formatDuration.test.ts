import { describe, it, expect } from "vitest";
import { formatDuration } from "./formatDuration";

describe("formatDuration", () => {
  it("formats durations under a minute", () => {
    expect(formatDuration(45)).toBe("0:45");
  });

  it("pads seconds in the minutes range", () => {
    expect(formatDuration(423)).toBe("7:03");
  });

  it("formats durations over an hour", () => {
    expect(formatDuration(3725)).toBe("1:02:05");
  });

  it("guards against invalid input", () => {
    expect(formatDuration(-5)).toBe("0:00");
    expect(formatDuration(Number.NaN)).toBe("0:00");
  });
});
