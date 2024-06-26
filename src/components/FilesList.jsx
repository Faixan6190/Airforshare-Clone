import React from "react";
import { CiFileOn } from "react-icons/ci";
import DropZone from "./DropZone";
import { GoPlus } from "react-icons/go";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";

const FilesList = ({ tempFiles, files, onDrop }) => {
  return (
    <div className="files-list">
      {files?.map((v, i) => {
        let icon;
        switch (v.type) {
          case "text/html":
            icon = <FaHtml5 />;
            break;
          case "text/css":
            icon = <FaCss3Alt />;
            break;
          case "text/javascript":
            icon = <IoLogoJavascript />;
            break;
          default:
            icon = <CiFileOn />;
        }
        return (
          <div key={i}>
            {v.type.indexOf("image") !== -1 ? (
              <img className="image-file" width={100} height={100} src={v.url} alt="" />
            ) : (
              <>
                {icon}
                <span className="file-name">
                  {v.name.slice(0, 10)}
                  <b>{v.name.slice(v.name.lastIndexOf("."))}</b>
                </span>
              </>
            )}
          </div>
        );
      })}
      {tempFiles.map((v, i) => {
        let icon;
        switch (v.type) {
          case "text/html":
            icon = <FaHtml5 />;
            break;
          case "text/css":
            icon = <FaCss3Alt />;
            break;
          case "text/javascript":
            icon = <IoLogoJavascript />;
            break;
          default:
            icon = <CiFileOn />;
        }
        return (
          <div className="temp-file" key={i}>
            {v.type.indexOf("image") !== -1 ? (
              <img className="image-file" width={100} height={100} src={URL.createObjectURL(v)} alt="" />
            ) : (
              <>
                {icon}
                <span className="file-name">
                  {v.name.slice(0, 10)}
                  <b>{v.name.slice(v.name.lastIndexOf("."))}</b>
                </span>
              </>
            )}
          </div>
        );
      })}
x``
      <div>
        <DropZone
          onDrop={onDrop}
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
