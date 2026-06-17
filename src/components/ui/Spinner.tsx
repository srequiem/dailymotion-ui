import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.container} role="status" aria-label="Loading">
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
  </div>
);

export default Spinner;
