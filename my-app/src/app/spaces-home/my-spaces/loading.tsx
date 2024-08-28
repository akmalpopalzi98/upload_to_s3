import { Box } from "@mantine/core";
import { Loader } from "@mantine/core";
import styles from "../styles.module.css";

const LoadingSpinner = () => {
  return (
    <Box className={styles.loadingSpinner}>
      <Loader />
    </Box>
  );
};

export default LoadingSpinner;
