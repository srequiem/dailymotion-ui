import { Link, useSearchParams } from "react-router-dom";

import SearchBar from "../search/components/SearchBar";

import styles from "./Header.module.css";

const Header = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";

  const handleSearch = (value: string) => {
    setParams(value ? { q: value } : {}, { replace: false });
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

        <div className={styles.search}>
          <SearchBar initialValue={query} onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;
