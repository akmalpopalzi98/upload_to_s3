"use client";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Home() {
  const router = useRouter();
  const { signOut, user } = useAuthenticator();
  return (
    <Authenticator
      components={{
        Header() {
          return (
            <div style={{ textAlign: "center", padding: "10px" }}>
              <img
                alt="Amplify image"
                src="https://docs.amplify.aws/assets/logo-dark.svg"
              />
            </div>
          );
        },
      }}
    >
      <div className={styles.rootdiv}>
        <h1 className={styles.header}>
          Welcome {user?.signInDetails?.loginId}!
        </h1>
        <h2 className={styles.subheader}>
          Press <strong>Enter</strong> to start using the app
        </h2>
        <button
          className={styles.enter}
          onClick={() => {
            router.push("/spaces-home/my-spaces");
          }}
        >
          Enter 😀
        </button>
        <button
          className={styles.logout}
          onClick={() => {
            signOut();
          }}
        >
          sign out
        </button>
      </div>
    </Authenticator>
  );
}
