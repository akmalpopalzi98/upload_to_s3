import { BackendType } from "./backend";
import { Construct } from "constructs/lib/construct";
import assert from "node:assert";

export class AmplifyBackendConstruct extends Construct {
  constructor(backend: BackendType, id: string) {
    const rootStack = backend.auth.resources.userPool.stack.nestedStackParent;
    assert(rootStack, new Error("Could not find root stack"));
    super(rootStack, id);
  }
}
