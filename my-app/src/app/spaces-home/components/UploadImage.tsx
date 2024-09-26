"use client";
import { ChangeEvent, useRef, useState } from "react";
import styles from "../styles.module.css";
import assert from "assert";
import { sendImageUrl } from "@/app/actions/actions";
import config from "$AmplifyOutputs";
import axios from "axios";

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
  const [loadingStatus, setLoadingStatus] = useState<string | null>();

  const uploadImage = async () => {
    try {
      const url = await sendImageUrl({
        fileType: fileUploadData?.fileType,
        fileName: name,
        bucketName: config.storage.bucket_name,
      });
      setName("");
      setFileUploadData(undefined);
      const response = await axios.put(url, fileUploadData?.file);
      console.log(response.statusText);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

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
      <button onClick={uploadImage}>Upload</button>
      <button
        onClick={() => {
          const htmlInput = inputFile.current as HTMLInputElement;
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
      {fileUploadData && PreviewImage}
    </div>
  );
};

export default UploadImage;
