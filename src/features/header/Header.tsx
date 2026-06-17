import { Link, useSearchParams } from "react-router-dom";

import SearchBar from "../search/components/SearchBar";

import styles from "./Header.module.css";

const Header = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";

  const handleSearch = (value: string) => {
    setParams(value ? { q: value } : {}, { replace: false });
  };

  const scrollToMobileSearch = () => {
    document.getElementById("mobile-search")?.querySelector("input")?.focus();
    document
      .getElementById("mobile-search")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleContainer}>
          <Link to="/" className={styles.title} aria-label="dailymotion home">
            <span className={styles.daily}>daily</span>
            <span className={styles.motion}>motion</span>
          </Link>
        </div>

        {/* Desktop / tablet (≥ 920px) — the real search bar lives in the header. */}
        <div className={styles.search}>
          <SearchBar initialValue={query} onSearch={handleSearch} />
        </div>

        {/* Mobile (< 920px) — just a trigger; the actual input sits under the hero title. */}
        <button
          type="button"
          className={styles.searchTrigger}
          onClick={scrollToMobileSearch}
          aria-label="Search videos"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <line
              x1="16.5"
              y1="16.5"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
