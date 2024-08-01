"use client";
import { CredentialsContext } from "@/app/context/CredentialsContext";
import { useContext, useEffect, useState } from "react";
import { ListObjectsV2Command, S3Client, _Object } from "@aws-sdk/client-s3";
import config from "$AmplifyOutputs";

const MySpaces = () => {
  const [objects, setObjects] = useState<_Object[] | undefined>(undefined);
  const credentials = useContext(CredentialsContext);
  const client = new S3Client({ credentials, region: config.auth.aws_region });

  const getObjects = async () => {
    try {
      const objectsList = await client.send(
        new ListObjectsV2Command({
          Bucket: config.storage.bucket_name,
        })
      );
      setObjects(objectsList.Contents);
      console.log(objectsList);
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    getObjects();
  }, []);

  return <div>My Spaces Page</div>;
};

export default MySpaces;
