import React from "react";
import { useDropzone } from "react-dropzone";
import "./index.scss";

const DropZone = () => {
  const onDrop = (acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles", acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="drop-zone" {...getRootProps()}>
      <input {...getInputProps()} />
      Drag and drop any files up to 2 files, 5Mbs each or Browse Upgrade to get more space
    </div>
  );
};

export default DropZone;
