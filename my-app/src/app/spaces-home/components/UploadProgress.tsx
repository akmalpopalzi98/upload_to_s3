import { Progress } from "@mantine/core";

const UploadProgress = ({
  progress,
  success,
}: {
  progress: number;
  success: boolean;
}) => {
  return (
    <div>
      {!success ? "...Uploading" : "Complete!"}
      <div>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default UploadProgress;
