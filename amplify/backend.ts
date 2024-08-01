import { defineBackend } from "@aws-amplify/backend";
import { auth, AuthResources } from "./auth/resource";
import { data } from "./data/resource";
import {
  LambdaRestApiIntegration,
  uploadToS3Function,
} from "./microservices/resource";
import { storage } from "./storage/resource";

export const backend = defineBackend({
  auth,
  uploadToS3Function,
  storage,
});

export type BackendType = typeof backend;

new LambdaRestApiIntegration(backend, "LambdaIntergationStack");

new AuthResources(backend, "AuthCongifStack");
