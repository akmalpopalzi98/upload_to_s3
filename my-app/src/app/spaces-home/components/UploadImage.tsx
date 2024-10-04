"use client";
import { ChangeEvent, useRef, useState } from "react";
import styles from "../styles.module.css";
import assert from "assert";
import PreviewImageUpload from "./PreviewImage";
import NotificationAlert from "./NotificationAlert";
import UploadProgress from "./UploadProgress";

export interface FileDataInterface {
  fileName: string;
  fileType: string;
  fileContent: string;
  file: File;
}

const UploadImage = () => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [fileUploadData, setFileUploadData] = useState<
    FileDataInterface | undefined
  >(undefined);
  const [name, setName] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  if (success) {
    setTimeout(() => {
      setSuccess(false);
      setFileUploadData(undefined);
      setProgress(0);
    }, 9000);
  }

  if (notification) {
    setTimeout(() => {
      setNotification(null);
    }, 8000);
  }

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
      {progress == 0 ? (
        <>
          <h3 style={{ textAlign: "center" }}>Choose File</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleLoadImage}
            ref={inputFile}
          />
          {inputFile.current?.value && (
            <PreviewImageUpload
              setProgress={setProgress}
              name={name}
              fileUploadData={fileUploadData}
              setName={setName}
              setFileUploadData={setFileUploadData}
              setNotification={setNotification}
              setSuccess={setSuccess}
              inputFile={inputFile}
            />
          )}
          {notification && <NotificationAlert notification={notification} />}
        </>
      ) : (
        <UploadProgress progress={progress} success={success} />
      )}
    </div>
  );
};

export default UploadImage;
