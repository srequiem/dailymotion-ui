import { useCallback, useState } from "react";

import type { ChannelCategory } from "@/lib/types";

// Une seule catégorie active à la fois, persistée pour survivre au refresh.
// Recliquer la catégorie déjà activée la retire (toggle-to-clear).
const STORAGE_KEY = "dm:active-category";

const readStored = (): ChannelCategory | null => {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ChannelCategory | null) ?? null;
  } catch {
    return null;
  }
};

const writeStored = (category: ChannelCategory | null) => {
  try {
    if (category) localStorage.setItem(STORAGE_KEY, category);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // écriture impossible (navigation privée, quota) -> on ignore silencieusement
  }
};

export const useCategoryFilter = () => {
  const [category, setCategory] = useState<ChannelCategory | null>(readStored);

  const toggle = useCallback((next: ChannelCategory) => {
    setCategory((current) => {
      const updated = current === next ? null : next;
      writeStored(updated);
      return updated;
    });
  }, []);

  return { category, toggle };
};
