import { defineAuth } from "@aws-amplify/backend";
import { AmplifyBackendConstruct } from "../AmplifyBackend";
import { BackendType } from "../backend";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});

export class AuthResources extends AmplifyBackendConstruct {
  constructor(backend: BackendType, id: string) {
    super(backend, id);
    backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
      new PolicyStatement({
        actions: ["s3:GetObject", "s3:ListBucket", "s3:PuObject"],
        resources: [
          `${backend.storage.resources.bucket.bucketArn}/*`,
          backend.storage.resources.bucket.bucketArn,
        ],
      })
    );
  }
}
