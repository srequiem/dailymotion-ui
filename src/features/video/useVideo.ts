import { useQuery } from "@tanstack/react-query";

import { getVideo } from "@/lib/dailymotion";

export const useVideo = (id: string) =>
  useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideo(id),
    enabled: Boolean(id),
  });
