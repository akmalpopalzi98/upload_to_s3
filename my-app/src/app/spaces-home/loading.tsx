import { Box } from "@mantine/core";
import { Loader } from "@mantine/core";
import styles from "./styles.module.css";

const LoadingSpinner2 = async () => {
  return (
    <Box className={styles.loadingSpinner}>
      <Loader color="green" />
    </Box>
  );
};

export default LoadingSpinner2;
