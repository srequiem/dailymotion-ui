import Button from "@/components/ui/Button/Button";
import type { ChannelCategory } from "@/lib/types";

import styles from "./Filters.module.css";

type FilterOption = { value: ChannelCategory; label: string };

// Sous-ensemble des catégories officielles (voir lib/types.ts) mis en avant
// dans l'UI. Labels alignés sur la vraie liste : pas de "Sports" (pluriel) ni
// de "Gaming" côté API — ce sont "sport" et "videogames".
const FILTER_OPTIONS: FilterOption[] = [
  { value: "news", label: "News" },
  { value: "music", label: "Music" },
  { value: "sport", label: "Sport" },
  { value: "videogames", label: "Video games" },
  { value: "travel", label: "Travel" },
  { value: "tv", label: "TV Shows" },
];

type FiltersProps = {
  active: ChannelCategory | null;
  onToggle: (category: ChannelCategory) => void;
};

const Filters = ({ active, onToggle }: FiltersProps) => {
  return (
    <div className={styles.filtersContainer} role="group" aria-label="Filter by category">
      {FILTER_OPTIONS.map((option) => {
        const isActive = active === option.value;
        return (
          <Button
            key={option.value}
            type="button"
            variant={isActive ? "primary" : "ghost"}
            className={styles.filterButton}
            aria-pressed={isActive}
            onClick={() => onToggle(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default Filters;
