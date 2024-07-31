"use client";
import { useEffect, useState } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import config from "$AmplifyOutputs";
import { GetCallerIdentityCommand, STSClient } from "@aws-sdk/client-sts";
import { fetchAuthSession } from "aws-amplify/auth";

const MySpaces = () => {
  return <div>My Spaces Page</div>;
};

export default MySpaces;
