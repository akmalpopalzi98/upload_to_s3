"use client";

import { clearCache } from "@/app/actions/actions";
import styles from "../styles.module.css";

const RefreshUrlsButton = () => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        clearCache();
      }}
    >
      Refresh
    </button>
  );
};

export default RefreshUrlsButton;
