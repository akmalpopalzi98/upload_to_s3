"use client";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Home() {
  const router = useRouter();
  const { signOut } = useAuthenticator();
  return (
    <Authenticator>
      <div className={styles.rootdiv}>
        <h1 className={styles.header}>Welcome!</h1>
        <h2 className={styles.subheader}>
          Press <strong>Enter</strong> to start using the app
        </h2>
        <button
          className={styles.enter}
          onClick={() => {
            router.push("/spaces-home");
          }}
        >
          Enter 😀{" "}
        </button>
        <button className={styles.logout} onClick={() => signOut()}>
          sign out
        </button>
      </div>
    </Authenticator>
  );
}
