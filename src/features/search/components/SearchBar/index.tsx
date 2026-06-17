import { useEffect, useRef, useState } from "react";

import styles from "./SearchBar.module.css";

type SearchBarProps = {
  initialValue: string;
  onSearch: (value: string) => void;
};

const DEBOUNCE_MS = 350;

const SearchBar = ({ initialValue, onSearch }: SearchBarProps) => {
  const [text, setText] = useState(initialValue);
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const id = setTimeout(() => onSearchRef.current(text.trim()), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [text]);

  return (
    <div className={styles.bar}>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        className={styles.input}
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Search"
        aria-label="Search videos"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
