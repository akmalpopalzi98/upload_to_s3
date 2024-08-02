// components/ConfigureAmplify.tsx
"use client";

import { Amplify } from "aws-amplify";
import outputs from "$AmplifyOutputs";
import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";

Amplify.configure(outputs, { ssr: true });

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};
