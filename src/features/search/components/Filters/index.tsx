import Button from "@/components/ui/Button/Button";

import type { ChannelCategory } from "@/lib/types";

import styles from "./Filters.module.css";

type FilterOption = { value: ChannelCategory; label: string };

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
