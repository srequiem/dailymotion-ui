import Button from "@/components/ui/Button";

import styles from "./Filters.module.css";


const Filters = () => {
  return (
    <div className={styles.filtersContainer}>
      <Button className={styles.filterButton}>News</Button>
      <Button className={styles.filterButton}>Music</Button>
      <Button className={styles.filterButton}>Sports</Button>
      <Button className={styles.filterButton}>Gaming</Button>
      <Button className={styles.filterButton}>Travel</Button>
      <Button className={styles.filterButton}>TV Shows</Button>
    </div>
  );
};

export default Filters;
