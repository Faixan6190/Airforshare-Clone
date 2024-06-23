import React from "react";
import { useDropzone } from "react-dropzone";
import "./index.scss";

const DropZone = ({ textElement }) => {
  const onDrop = (acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles", acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="drop-zone" {...getRootProps()}>
      <input {...getInputProps()} />
      <div>{textElement}</div>
    </div>
  );
};

export default DropZone;
