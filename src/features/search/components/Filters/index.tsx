import { useRef } from "react";

import Button from "@/components/ui/Button/Button";
import type { ChannelCategory } from "@/lib/types";

import { handlePointerMove, resetTilt } from "./utils";

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
  const groupRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={groupRef}
      className={styles.filtersContainer}
      role="group"
      aria-label="Filter by category"
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = active === option.value;
        const classes = [styles.glassButton, isActive ? styles.active : ""]
          .filter(Boolean)
          .join(" ");

        return (
          <Button
            key={option.value}
            type="button"
            className={classes}
            aria-pressed={isActive}
            onClick={() => onToggle(option.value)}
            onMouseMove={handlePointerMove}
            onMouseLeave={resetTilt}
          >
            <span className={styles.label}>{option.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default Filters;
