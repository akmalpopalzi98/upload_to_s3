// utils/amplify-utils.ts
import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession } from "aws-amplify/auth/server";
import config from "$AmplifyOutputs";
import { CognitoIdentity } from "@aws-sdk/client-cognito-identity";
import assert from "node:assert";
import {
  ListObjectsV2Command,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
}

interface CredentialsCache {
  value: AWSCredentials;
  expiry: number; // Unix timestamp in milliseconds
}

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

const CACHED_CREDENTIALS_KEY = "credentials";
const credentialsCache = new Map();

const cognito = new CognitoIdentity({ region: config.auth.aws_region });

export async function AuthGetCredentials(): Promise<
  AWSCredentials | undefined
> {
  const now = Date.now();
  const cache: CredentialsCache = credentialsCache.get(CACHED_CREDENTIALS_KEY);

  const difference = cache?.expiry / (1000 * 60) - now / (1000 * 60);

  if (cache && now - difference > 5) {
    console.log("returning cached credentials");
    return cache.value;
  }
  try {
    console.log("new credentials");
    const authSession = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec),
    });
    assert(authSession.tokens?.idToken, "No token found");
    const credentialdetails = await cognito.getCredentialsForIdentity({
      IdentityId: authSession.identityId,
      Logins: {
        [`cognito-idp.${config.auth.aws_region}.amazonaws.com/${config.auth.user_pool_id}`]:
          authSession.tokens.idToken?.toString(),
      },
    });

    assert(credentialdetails.Credentials?.AccessKeyId, "No Access Key Id");
    assert(credentialdetails.Credentials?.SecretKey, " No session Token Found");

    const credentials = {
      accessKeyId: credentialdetails.Credentials?.AccessKeyId,
      secretAccessKey: credentialdetails.Credentials?.SecretKey,
      sessionToken: credentialdetails.Credentials?.SessionToken,
    };

    credentialsCache.set(CACHED_CREDENTIALS_KEY, {
      value: credentials,
      expiry: credentialdetails.Credentials.Expiration?.getTime(),
    });

    return credentials;
  } catch (error) {
    console.error(error);
  }
}

const CACHED_URLS_KEY = "s3Objects";
const CACHED_TTL = 300;
export const cacheStore = new Map();

export const getUrls = async (
  client: S3Client
): Promise<string[] | undefined> => {
  const now = Date.now();
  const cache = cacheStore.get(CACHED_URLS_KEY);
  if (cache && now - cache.timestamp < 1000 * CACHED_TTL) {
    console.log("cached data");
    return cache.values;
  }

  try {
    console.log("new api call");
    const objectsList = await client.send(
      new ListObjectsV2Command({
        Bucket: config.storage.bucket_name,
      })
    );
    const objectContentList = objectsList.Contents;
    if (objectContentList) {
      const signedUrls = objectContentList.map((obj) => {
        return getSignedUrl(
          client,
          new GetObjectCommand({
            Bucket: config.storage.bucket_name,
            Key: obj.Key,
          }),
          { expiresIn: 3600 }
        );
      });

      const resolvedUrls = await Promise.all(signedUrls);
      cacheStore.set(CACHED_URLS_KEY, { values: resolvedUrls, timestamp: now });
      return resolvedUrls;
    } else {
      throw new Error("No objects were found");
    }
  } catch (er) {
    console.log(er);
  }
};
