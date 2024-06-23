import React from "react";
import { CiFileOn } from "react-icons/ci";
import DropZone from "./DropZone";
import { GoPlus } from "react-icons/go";

const FilesList = () => {
  return (
    <div className="files-list">
      <div>
        <CiFileOn />
        <span>index.html</span>
      </div>
      <div>
        <DropZone
          textElement={
            <span className="add-more-files">
              <GoPlus />
              <p>Add file</p>
              <span>(Upto 5 MB)</span>
            </span>
          }
        />
      </div>
    </div>
  );
};

export default FilesList;
