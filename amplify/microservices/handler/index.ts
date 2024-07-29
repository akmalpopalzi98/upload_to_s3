import type { Handler, APIGatewayEvent } from "aws-lambda";

export const handler: Handler = async (event: APIGatewayEvent, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify("Hello there!!"),
  };
};
