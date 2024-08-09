"use client";
import { ChangeEvent, useState } from "react";
import styles from "../styles.module.css";
import assert from "assert";

interface FileData {
  fileName: string;
  fileType: string;
  fileContent: string;
}

const UploadImage = () => {
  const [fileContent, setFileContent] = useState<string | undefined>();
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
      <img src={fileContent} alt="image-preview" width="400px" height="250px" />
      <button>Upload</button>
    </div>
  );

  const handleLoadImage = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    const reader = new FileReader();
    assert(files, "No files found");

    reader.onload = () => {
      setFileContent(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
    console.log(files);
  };

  return (
    <div className={styles.uploadimagediv}>
      <h3 style={{ textAlign: "center" }}>Choose File</h3>
      <input type="file" accept="image/*" onChange={handleLoadImage} />
      {fileContent && PreviewImage}
    </div>
  );
};

export default UploadImage;
