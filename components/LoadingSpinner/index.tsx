import React from "react";
import styles from "./styles.module.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles["loading-spinner"]}>
      <div className={styles["pac-man"]} />
    </div>
  );
};

export default LoadingSpinner;
