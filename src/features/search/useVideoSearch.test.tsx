import type { ReactNode } from "react";

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, afterEach } from "vitest";


import { useVideoSearch } from "./useVideoSearch";

const createWrapper = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

const mockOk = (list: unknown[]) => ({
  ok: true,
  json: async () => ({ page: 1, limit: 18, total: list.length, has_more: false, list }),
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useVideoSearch", () => {
  it("loads the default feed (sort=trending) when the query is empty", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      mockOk([
        {
          id: "x1",
          title: "Trending one",
          duration: 10,
          thumbnail_360_url: "t.jpg",
          "owner.id": "o1",
          "owner.screenname": "Chan",
        },
      ])
    );
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useVideoSearch(""), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(String(fetchMock.mock.calls[0][0])).toContain("sort=trending");
    expect(result.current.data?.list[0].channelName).toBe("Chan");
  });

  it("hits the search endpoint when a query is provided and maps the response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      mockOk([
        {
          id: "x2",
          title: "Cats",
          duration: 20,
          thumbnail_360_url: "c.jpg",
          "owner.id": "o2",
          "owner.screenname": "Kitty",
        },
      ])
    );
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useVideoSearch("cats"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(String(fetchMock.mock.calls[0][0])).toContain("search=cats");
    expect(result.current.data?.list[0].title).toBe("Cats");
  });

  it("filters by category (channel param) when a category is active and there is no text query", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockOk([]));
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useVideoSearch("", "sport"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const requestUrl = String(fetchMock.mock.calls[0][0]);
    expect(requestUrl).toContain("channel=sport");
    expect(requestUrl).toContain("sort=trending"); // pas de texte -> tri par tendance, catégorie en plus
  });
});
