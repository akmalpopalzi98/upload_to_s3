// utils/amplify-utils.ts
import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession } from "aws-amplify/auth/server";
import config from "$AmplifyOutputs";
import { CognitoIdentity } from "@aws-sdk/client-cognito-identity";
import assert from "node:assert";

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
}

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

const cognito = new CognitoIdentity({ region: config.auth.aws_region });

export async function AuthGetCredentials() {
  try {
    const authSession = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec),
    });
    assert(authSession.tokens?.idToken, "No token found");
    const credentials = await cognito.getCredentialsForIdentity({
      IdentityId: authSession.identityId,
      Logins: {
        [`cognito-idp.${config.auth.aws_region}.amazonaws.com/${config.auth.user_pool_id}`]:
          authSession.tokens.idToken?.toString(),
      },
    });

    console.log(credentials.Credentials);
  } catch (error) {
    console.error(error);
  }
}
