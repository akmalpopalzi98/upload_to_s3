import { type S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getSignedUrls = async (client: S3Client, key: string) => {};
