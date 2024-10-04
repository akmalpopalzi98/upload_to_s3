// components/ConfigureAmplify.tsx
"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { ReactNode } from "react";
import config from "$AmplifyOutputs";

Amplify.configure(config, { ssr: true });

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
      {children}
    </Authenticator>
  );
};
