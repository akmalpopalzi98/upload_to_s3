import { Box } from "@mantine/core";
import { Loader } from "@mantine/core";
import styles from "../styles.module.css";

const LoadingSpinner = () => {
  return (
    <Box className={styles.loadingSpinner}>
      <Loader color="pink" />
    </Box>
  );
};

export default LoadingSpinner;
