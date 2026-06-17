import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getVideos } from "@/lib/dailymotion";
import type { ChannelCategory } from "@/lib/types";

export const useVideoSearch = (query: string, category: ChannelCategory | null = null) => {
  const trimmed = query.trim();
  return useQuery({
    queryKey: ["videos", trimmed || "__default__", category ?? "__all__"],
    queryFn: () => getVideos({ search: trimmed || undefined, channel: category ?? undefined }),
    placeholderData: keepPreviousData,
  });
};
