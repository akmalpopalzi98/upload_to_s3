"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import outputs from "$AmplifyOutputs";
import Compressor from "compressorjs";

const cacheStore = new Map();
const cache = cacheStore.get("s3Objects");
export const clearCache = () => {
  console.log("clearing cache");
  console.log(cache);
  //   cacheStore.clear();
  revalidatePath("/spaces-home/my-spaces", "page");
};

export const sendImage = async (data: any) => {
  const response = await axios.post(
    `${outputs.custom.lambdaEndpoint}/pictures`
  );
  console.log(response.data);
};
