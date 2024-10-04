import { Progress, Text } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Alert } from "@mantine/core";

const UploadProgress = ({
  progress,
  success,
  setIsUploading,
}: {
  progress: number;
  success: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Progress value={progress} style={{ width: "200px" }} />
        <Text>{progress}%</Text>
      </div>
      {success ? (
        <Alert
          variant="filled"
          color={success ? "green" : "red"}
          title={success ? "Upload Complete" : "Upload Failed"}
          withCloseButton
          onClose={() => {
            setIsUploading(false);
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
          quae tempore necessitatibus placeat saepe.
        </Alert>
      ) : null}
    </div>
  );
};

export default UploadProgress;
