"use client";
import { ChangeEvent, useState } from "react";
import styles from "../styles.module.css";
import assert from "assert";
import { sendImage } from "@/app/actions/actions";
import config from "$AmplifyOutputs";

interface FileData {
  fileName: string;
  fileType: string;
  fileContent: string;
}

const UploadImage = () => {
  const [fileUploadData, setFileUploadData] = useState<FileData | undefined>(
    undefined
  );
  const [name, setName] = useState<string>("");

  const PreviewImage = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
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
      <button
        onClick={() => {
          sendImage({
            fileType: fileUploadData?.fileType,
            fileName: name,
            bucketName: config.storage.bucket_name,
          });
          setName("");
        }}
      >
        Upload
      </button>
    </div>
  );

  const handleLoadImage = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    const reader = new FileReader();
    assert(files, "No files found");
    reader.onload = () => {
      setFileUploadData({
        fileName: files[0].name,
        fileType: files[0].type,
        fileContent: reader.result as string,
      });
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <div className={styles.uploadimagediv}>
      <h3 style={{ textAlign: "center" }}>Choose File</h3>
      <input type="file" accept="image/*" onChange={handleLoadImage} />
      {fileUploadData && PreviewImage}
    </div>
  );
};

export default UploadImage;
