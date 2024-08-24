"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import outputs from "$AmplifyOutputs";
import { S3Client } from "@aws-sdk/client-s3";
import Compressor from "compressorjs";

const cacheStore = new Map();
const cache = cacheStore.get("s3Objects");
export const clearCache = () => {
  console.log("clearing cache");
  console.log(cache);
  //   cacheStore.clear();
  revalidatePath("/spaces-home/my-spaces", "page");
};

export const sendImageUrl = async (data: any): Promise<string> => {
  try {
    const response = await axios.post(
      `${outputs.custom.lambdaEndpoint}/presigned-url`,
      data
    );
    if (response.status !== 200) throw new Error("API returned an error");
    return response.data.presignedUrl;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
