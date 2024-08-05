import { AuthGetCredentials } from "@/app/utils";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
  _Object,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import config from "$AmplifyOutputs";

const MySpaces = async () => {
  const credentials = await AuthGetCredentials();
  const client = new S3Client({ credentials, region: config.auth.aws_region });

  return <div>Server component</div>;
};

export default MySpaces;
