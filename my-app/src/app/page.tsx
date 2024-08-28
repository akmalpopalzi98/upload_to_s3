"use client";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Box, Button, Title } from "@mantine/core";

export default function Home() {
  const router = useRouter();
  const { signOut, user } = useAuthenticator();
  return (
    <Authenticator
      components={{
        Header() {
          return (
            <Box style={{ textAlign: "center", padding: "10px" }}>
              <img
                alt="Amplify image"
                src="https://docs.amplify.aws/assets/logo-dark.svg"
              />
            </Box>
          );
        },
      }}
    >
      <Box className={styles.rootdiv}>
        <Title order={1} className={styles.header}>
          Welcome {user?.signInDetails?.loginId}!
        </Title>
        <Title order={2} className={styles.subheader}>
          Press <strong>Enter</strong> to start using the app
        </Title>
        <Button
          className={styles.enter}
          onClick={() => {
            router.push("/spaces-home/my-spaces");
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
    </Authenticator>
  );
}
