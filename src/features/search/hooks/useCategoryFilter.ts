import { useCallback, useState } from "react";

import type { ChannelCategory } from "@/lib/types";

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
