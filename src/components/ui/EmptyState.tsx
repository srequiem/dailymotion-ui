import type { ReactNode } from "react";

import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  message: string;
  action?: ReactNode;
};

const EmptyState = ({ message, action }: EmptyStateProps) => (
  <div className={styles.container}>
    <p className={styles.message}>{message}</p>
    {action}
  </div>
);

export default EmptyState;
