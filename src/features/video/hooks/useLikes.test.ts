import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useLikes } from "./useLikes";

describe("useLikes", () => {
  beforeEach(() => localStorage.clear());

  it("starts unliked and toggles on", () => {
    const { result } = renderHook(() => useLikes("x123"));
    expect(result.current.isLiked).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isLiked).toBe(true);
  });

  it("toggles back off", () => {
    const { result } = renderHook(() => useLikes("x123"));
    act(() => result.current.toggle());
    act(() => result.current.toggle());
    expect(result.current.isLiked).toBe(false);
  });

  it("persists a like across separate hook instances", () => {
    const first = renderHook(() => useLikes("x999"));
    act(() => first.result.current.toggle());
    const second = renderHook(() => useLikes("x999"));
    expect(second.result.current.isLiked).toBe(true);
  });
});
