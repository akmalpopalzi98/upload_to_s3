"use client";
import { useState } from "react";
import styles from "../styles.module.css";
import assert from "assert";

const UploadImage = () => {
  const [file, setFile] = useState({});
  const [fileUploadData, setFileUploadData] = useState({});
  return (
    <div className={styles.uploadimagediv}>
      <h3 style={{ textAlign: "center" }}>Choose File</h3>
      <input
        type="file"
        onChange={(e) => {
          let files = e.target.files;
          assert(files, "No files found");
          setFile({
            fileName: files[0].name,
            fileType: files[0].type,
            fileData: "",
          });
          console.log(files[0].type);
        }}
      />
    </div>
  );
};

export default UploadImage;
