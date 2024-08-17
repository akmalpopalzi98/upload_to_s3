import { defineFunction } from "@aws-amplify/backend";
import { AmplifyBackendConstruct } from "../AmplifyBackend";
import { backend, BackendType } from "../backend";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export const uploadToS3Function = defineFunction({
  entry: "./handler/index.ts",
});

export class LambdaRestApiIntegration extends AmplifyBackendConstruct {
  constructor(backend: BackendType, id: string) {
    super(backend, id);
    const lambdaFunction = backend.uploadToS3Function.resources.lambda;
    const restApi = new LambdaRestApi(this, "lambdaRestApi", {
      handler: lambdaFunction,
      proxy: false,
    });

    lambdaFunction.addToRolePolicy(
      new PolicyStatement({
        actions: ["s3:PutObject"],
        resources: [`${backend.storage.resources.bucket.bucketArn}/*`],
      })
    );

    const pictures = restApi.root.addResource("presigned-url");
    pictures.addMethod("POST");

    backend.addOutput({
      custom: {
        lambdaEndpoint: restApi.url,
      },
    });
  }
}
