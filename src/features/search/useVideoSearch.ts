import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getDefaultVideos, searchVideos } from "@/lib/dailymotion";

// Pas de query -> feed par défaut. Query -> recherche. keepPreviousData lisse la frappe.
export const useVideoSearch = (query: string) => {
  const trimmed = query.trim();
  return useQuery({
    queryKey: ["videos", trimmed || "__default__"],
    queryFn: () => (trimmed ? searchVideos(trimmed) : getDefaultVideos()),
    placeholderData: keepPreviousData,
  });
};
