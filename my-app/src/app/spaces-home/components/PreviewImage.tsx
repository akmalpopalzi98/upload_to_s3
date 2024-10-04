import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { FileDataInterface } from "./UploadImage";
import { getImageUrl } from "@/app/actions/actions";
import axios from "axios";
import config from "$AmplifyOutputs";

interface PreviewImageProps {
  name: string;
  fileUploadData: FileDataInterface | undefined;
  setName: Dispatch<SetStateAction<string>>;
  setFileUploadData: Dispatch<SetStateAction<FileDataInterface | undefined>>;
  inputFile: MutableRefObject<HTMLInputElement | null>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  setProgress: Dispatch<SetStateAction<number>>;
  setIsUploading: Dispatch<SetStateAction<boolean>>;

  setNotification: Dispatch<SetStateAction<string | null>>;
}

const PreviewImageUpload = (props: PreviewImageProps) => {
  const {
    name,
    fileUploadData,
    setName,
    setFileUploadData,
    inputFile,
    setSuccess,
    setNotification,
    setProgress,
    setIsUploading,
  } = props;

  const uploadImage = async () => {
    if (name) {
      try {
        setIsUploading(true);
        const url = await getImageUrl({
          fileType: fileUploadData?.fileType,
          fileName: name,
          bucketName: config.storage.bucket_name,
        });
        setName("");
        const response = await axios.put(url, fileUploadData?.file, {
          onUploadProgress(progressEvent) {
            const progress =
              (progressEvent.loaded / progressEvent.total!) * 100;
            setProgress(progress);
          },
        });
        setSuccess(true);
        setFileUploadData(undefined);
        console.log(response.statusText);
      } catch (err) {
        console.error("Error uploading image:", err);
        setSuccess(false);
      }
    } else {
      setNotification("Please enter a name for the file");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h4 style={{ textAlign: "center" }}>Image Preview</h4>
      <img
        src={fileUploadData?.fileContent}
        alt="image-preview"
        width="400px"
        height="250px"
      />
      <label>Save file as:</label>
      <input
        onChange={(e) => {
          setName(e.target.value);
          console.log(name);
        }}
        value={name}
      />
      <button onClick={uploadImage}>Upload</button>
      <button
        style={{ marginBottom: "20px" }}
        onClick={() => {
          if (inputFile.current) {
            setFileUploadData(undefined);
            inputFile.current.value = "";
          }
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default PreviewImageUpload;
