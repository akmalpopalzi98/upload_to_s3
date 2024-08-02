"use client";
import { CredentialsContext } from "@/app/context/CredentialsContext";
import { useContext, useEffect, useState } from "react";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
  _Object,
} from "@aws-sdk/client-s3";
import config from "$AmplifyOutputs";
import SpaceImage from "../components/SpaceImage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import styles from "../styles.module.css";
import RefreshUrlsButton from "../components/RefreshUrlsButton";

const MySpaces = () => {
  const [urls, setUrls] = useState<string[] | undefined>(undefined);
  const credentials = useContext(CredentialsContext);
  const client = new S3Client({ credentials, region: config.auth.aws_region });
  const [refresh, setRefresh] = useState<boolean>(false);
  console.log(refresh);

  const renderedImages = urls?.map((url) => <SpaceImage url={url} />);

  const getObjects = async () => {
    const cachedUrls = localStorage.getItem("resolved_urls");
    if (cachedUrls) {
      setUrls(JSON.parse(cachedUrls));
      return;
    }
    try {
      setRefresh(false);
      const objectsList = await client.send(
        new ListObjectsV2Command({
          Bucket: config.storage.bucket_name,
        })
      );
      const objectContentList = objectsList.Contents;
      const expiresIn = 3;
      if (objectContentList) {
        const signedUrls = objectContentList.map((obj) => {
          return getSignedUrl(
            client,
            new GetObjectCommand({
              Bucket: config.storage.bucket_name,
              Key: obj.Key,
            })
          );
        });

        const resolvedUrls = await Promise.all(signedUrls);
        localStorage.setItem("resolved_urls", JSON.stringify(resolvedUrls));
        console.log(resolvedUrls);
        setUrls(resolvedUrls);
      } else {
        throw new Error("No objects were found");
      }
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    getObjects();
  }, [refresh]);

  return (
    <div className={styles.imageslistdiv}>
      {renderedImages}
      <RefreshUrlsButton className={styles.button} setRefresh={setRefresh} />
    </div>
  );
};

export default MySpaces;
