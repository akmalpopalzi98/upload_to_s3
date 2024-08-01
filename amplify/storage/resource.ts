import { defineStorage } from "@aws-amplify/backend";
import { AmplifyBackendConstruct } from "../AmplifyBackend";
import { BackendType } from "../backend";

export const storage = defineStorage({
  name: "spaces-bucket",
});

export class StorageResources extends AmplifyBackendConstruct {
  constructor(backend: BackendType, id: string) {
    super(backend, id);
    backend.addOutput({
      storage: {
        bucket_name: backend.storage.resources.bucket.bucketName,
      },
    });
  }
}
