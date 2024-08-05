"use server";
import { revalidatePath } from "next/cache";

const cacheStore = new Map();
const cache = cacheStore.get("s3Objects");
export const clearCache = () => {
  console.log("clearing cache");
  console.log(cache);
  //   cacheStore.clear();
  revalidatePath("/spaces-home/my-spaces", "page");
};
