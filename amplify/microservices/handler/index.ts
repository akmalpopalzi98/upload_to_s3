import type { Handler, APIGatewayEvent } from "aws-lambda";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface Body {
  fileName: string;
  fileType: string;
  bucketName: string;
}

export const handler: Handler = async (event: APIGatewayEvent, context) => {
  const client = new S3Client({});
  const body: Body = JSON.parse(event.body || "{}");
  const command = new PutObjectCommand({
    Key: `${body.fileName}.${body.fileType.split("/")[1]}`,
    Bucket: body.bucketName,
  });
  try {
    const url = await getSignedUrl(client, command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        presignedUrl: url,
        key: body.fileName,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err,
        key: body.fileName,
      }),
    };
  }
};
