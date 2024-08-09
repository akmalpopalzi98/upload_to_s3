"use client";
import { ChangeEvent, useState } from "react";
import styles from "../styles.module.css";
import assert from "assert";
import { sendImage } from "@/app/actions/actions";

interface FileData {
  fileName: string;
  fileType: string;
  fileContent: string;
}

const UploadImage = () => {
  const [fileUploadData, setFileUploadData] = useState<FileData | undefined>(
    undefined
  );

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
      <button
        onClick={() => {
          sendImage(fileUploadData);
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
    console.log(files);
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
