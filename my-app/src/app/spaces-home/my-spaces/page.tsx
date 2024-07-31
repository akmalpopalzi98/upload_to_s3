"use client";
import { CredentialsContext } from "@/app/context/CredentialsContext";
import { useContext } from "react";
import { GetCallerIdentityCommand, STSClient } from "@aws-sdk/client-sts";
import config from "$AmplifyOutputs";

const MySpaces = () => {
  const credentials = useContext(CredentialsContext);

  return <div>My Spaces Page</div>;
};

export default MySpaces;
