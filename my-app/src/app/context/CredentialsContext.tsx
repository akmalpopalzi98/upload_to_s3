"use client";
import { fetchAuthSession } from "aws-amplify/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CognitoIdentity } from "@aws-sdk/client-cognito-identity";
import config from "$AmplifyOutputs";
import assert from "assert";

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
}

const cognito = new CognitoIdentity({ region: config.auth.aws_region });

export const CredentialsContext = createContext<AWSCredentials | undefined>(
  undefined
);

export const CredentialsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [credentials, setCredentials] = useState<AWSCredentials | undefined>(
    undefined
  );

  const updateCredentials = async () => {
    const session = await fetchAuthSession();
    assert(session.tokens?.idToken, "No token found");
    const credentialsResults = await cognito.getCredentialsForIdentity({
      IdentityId: session.identityId,
      Logins: {
        [`cognito-idp.${config.auth.aws_region}.amazonaws.com/${config.auth.user_pool_id}`]:
          session.tokens.idToken?.toString(),
      },
    });
    assert(
      credentialsResults.Credentials?.AccessKeyId,
      "Access Id is required"
    );
    assert(credentialsResults.Credentials.SecretKey, "Secret key is required");
    setCredentials({
      accessKeyId: credentialsResults.Credentials?.AccessKeyId,
      secretAccessKey: credentialsResults.Credentials?.SecretKey,
      sessionToken: credentialsResults.Credentials?.SessionToken,
      expiration: credentialsResults.Credentials?.Expiration,
    });
  };

  useEffect(() => {
    updateCredentials();
  }, []);
  return (
    <CredentialsContext.Provider value={credentials}>
      {children}
    </CredentialsContext.Provider>
  );
};
