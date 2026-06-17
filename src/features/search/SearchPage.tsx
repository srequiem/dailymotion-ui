import { useSearchParams } from "react-router-dom";

import Button from "@/components/ui/Button/Button";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import Filters from "./components/Filters";
import Spinner from "@/components/ui/Spinner/Spinner";

import SearchBar from "./components/SearchBar";
import VideoGrid from "./components/VideoGrid";

import { useCategoryFilter } from "./hooks/useCategoryFilter";
import { useVideoSearch } from "./hooks/useVideoSearch";

import styles from "./SearchPage.module.css";

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const { category, toggle } = useCategoryFilter();

  const { data, isLoading, isError, isFetching, refetch } = useVideoSearch(query, category);

  const handleSearch = (value: string) => {
    setParams(value ? { q: value } : {}, { replace: false });
  };

  const heading = query
    ? `Results for “${query}”` : "";

  return (
    <main className={`container ${styles.page}`}>
      <section className={styles.hero}>
        <h1 className={styles.headline}>Find something worth watching<span>.</span></h1>
        <div id="mobile-search" className={styles.mobileSearch}>
          <SearchBar initialValue={query} onSearch={handleSearch} />
        </div>
        <div className={styles.filters}>
          <Filters active={category} onToggle={toggle} />
        </div>
      </section>

      <section aria-busy={isFetching}>
        <div className={styles.resultsHead}>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        {isLoading && <Spinner />}
        {isError && (
          <EmptyState
            message="Couldn’t reach Dailymotion. Check your connection and try again."
            action={
              <Button variant="primary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          />
        )}
        {data && data.list.length === 0 && (
          <EmptyState
            message={
              query
                ? `No results for “${query}”. Try another search.`
                : "Nothing to show right now."
            }
          />
        )}
        {data && data.list.length > 0 && <VideoGrid videos={data.list} />}
      </section>
    </main>
  );
};

export default SearchPage;
