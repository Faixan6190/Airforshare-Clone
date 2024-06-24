import React from "react";
import { useDropzone } from "react-dropzone";
import "./index.scss";

const DropZone = ({ textElement, onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="drop-zone" {...getRootProps()}>
      <input {...getInputProps()} />
      <div>{textElement}</div>
    </div>
  );
};

export default DropZone;
