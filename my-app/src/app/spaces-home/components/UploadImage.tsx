"use client";
import { ChangeEvent, useRef, useState } from "react";
import styles from "../styles.module.css";
import assert from "assert";
import { getImageUrl } from "@/app/actions/actions";
import config from "$AmplifyOutputs";
import axios from "axios";
import { Progress } from "@mantine/core";
import { Notification } from "@mantine/core";

interface FileData {
  fileName: string;
  fileType: string;
  fileContent: string;
  file: File;
}

const UploadImage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [fileUploadData, setFileUploadData] = useState<FileData | undefined>(
    undefined
  );
  const [name, setName] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const uploadImage = async () => {
    if (name) {
      try {
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
      }
    } else {
      setNotification("Please enter a name for the file");
    }
  };

  const PreviewImage = (
    <>
      {progress === 0 && (
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
      )}
      {progress !== 0 && (
        <>
          <Progress
            value={progress}
            size="lg"
            color="orange"
            style={{ width: "230px" }}
          />
          {success && (
            <Notification title="File has been uploaded!">
              You can now view your new image
            </Notification>
          )}
        </>
      )}
    </>
  );

  if (success) {
    setTimeout(() => {
      const file = inputFile.current as HTMLInputElement;
      file.value = "";
      setProgress(0);
      setSuccess(false);
      setFileUploadData(undefined);
    }, 9000);
  }

  if (notification) {
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }

  const notificationAlert = <div>{notification}</div>;

  const handleLoadImage = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    const reader = new FileReader();
    assert(files, "No files found");
    reader.onload = () => {
      setFileUploadData({
        fileName: files[0].name,
        fileType: files[0].type,
        fileContent: reader.result as string,
        file: files[0],
      });
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className={styles.uploadimagediv}>
      <h3 style={{ textAlign: "center" }}>Choose File</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleLoadImage}
        ref={inputFile}
      />
      {inputFile.current?.value && PreviewImage}
      {notificationAlert}
    </div>
  );
};

export default UploadImage;
