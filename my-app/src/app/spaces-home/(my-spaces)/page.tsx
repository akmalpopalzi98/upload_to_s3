import { AuthGetCredentials, getUrls } from "@/app/utils";
import { S3Client } from "@aws-sdk/client-s3";
import config from "$AmplifyOutputs";
import styles from "../styles.module.css";
import SpaceImage from "../components/SpaceImage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MySpaces = async () => {
  console.log("rendering page....");
  const credentials = await AuthGetCredentials();
  const client = new S3Client({ credentials, region: config.auth.aws_region });
  const urls = await getUrls(client);

  // const queryClient = useQueryClient();
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["urls"],
  //   queryFn: async () => {
  //     await getUrls(client);
  //   },
  // });

  // console.log(data);

  return (
    <div className={styles.imageslistdiv}>
      {urls?.map((url) => (
        <SpaceImage key={url} url={url} />
      ))}
    </div>
  );
};

export default MySpaces;
