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
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};
