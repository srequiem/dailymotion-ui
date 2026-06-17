import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useCategoryFilter } from "./useCategoryFilter";

describe("useCategoryFilter", () => {
  beforeEach(() => localStorage.clear());

  it("starts with no active category", () => {
    const { result } = renderHook(() => useCategoryFilter());
    expect(result.current.category).toBeNull();
  });

  it("activates a category on toggle", () => {
    const { result } = renderHook(() => useCategoryFilter());
    act(() => result.current.toggle("sport"));
    expect(result.current.category).toBe("sport");
  });

  it("clears the category when toggling the same one again", () => {
    const { result } = renderHook(() => useCategoryFilter());
    act(() => result.current.toggle("sport"));
    act(() => result.current.toggle("sport"));
    expect(result.current.category).toBeNull();
  });

  it("only ever keeps one category active at a time", () => {
    const { result } = renderHook(() => useCategoryFilter());
    act(() => result.current.toggle("sport"));
    act(() => result.current.toggle("travel"));
    expect(result.current.category).toBe("travel");
  });

  it("persists the active category across separate hook instances (survives refresh)", () => {
    const first = renderHook(() => useCategoryFilter());
    act(() => first.result.current.toggle("music"));

    const second = renderHook(() => useCategoryFilter());
    expect(second.result.current.category).toBe("music");
  });
});
