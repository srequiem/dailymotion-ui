import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dm:liked-videos";

const readLiked = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
};

export const useLikes = (videoId: string) => {
  const [liked, setLiked] = useState<Set<string>>(readLiked);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...liked]));
    } catch {
      // Erreur de stockage, on pourrait logguer l'erreur ici si besoin
    }
  }, [liked]);

  const toggle = useCallback(() => {
    setLiked((previous) => {
      const next = new Set(previous);
      if (next.has(videoId)) next.delete(videoId);
      else next.add(videoId);
      return next;
    });
  }, [videoId]);

  return { isLiked: liked.has(videoId), toggle };
};
