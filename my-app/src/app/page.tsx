"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Box, Button, Title } from "@mantine/core";

export default function Home() {
  const router = useRouter();
  const { signOut, user } = useAuthenticator();
  return (
    <Box className={styles.rootdiv}>
      <Title order={1} className={styles.header}>
        Image Saver
      </Title>
      <Title order={2} className={styles.header}>
        Welcome {user?.signInDetails?.loginId}!
      </Title>
      <Title order={2} className={styles.subheader}>
        Press <strong>Enter</strong> to start using the app
      </Title>
      <Button
        className={styles.enter}
        onClick={() => {
          router.push("/spaces-home");
        }}
      >
        Enter
      </Button>
      <Button
        className={styles.logout}
        onClick={() => {
          signOut();
        }}
      >
        sign out
      </Button>
    </Box>
  );
}
