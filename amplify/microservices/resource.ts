import { defineFunction } from "@aws-amplify/backend";
import { AmplifyBackendConstruct } from "../AmplifyBackend";
import { BackendType } from "../backend";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";

export const uploadToS3Function = defineFunction({
  entry: "./handler/index.ts",
});

// Make api private and only accessible if user is logged in to aws

export class LambdaRestApiIntegration extends AmplifyBackendConstruct {
  constructor(backend: BackendType, id: string) {
    super(backend, id);
    const lambdaFunction = backend.uploadToS3Function.resources.lambda;
    const restApi = new LambdaRestApi(this, "lambdaRestApi", {
      handler: lambdaFunction,
      proxy: false,
    });

    const pictures = restApi.root.addResource("pictures");
    pictures.addMethod("POST");
  }
}
