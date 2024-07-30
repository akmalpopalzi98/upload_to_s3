"use client";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function Home() {
  const { signOut } = useAuthenticator();
  return (
    <Authenticator>
      <div>
        Hello there
        <button onClick={() => signOut()}>sign out</button>
      </div>
    </Authenticator>
  );
}
