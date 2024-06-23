import LOGO from "../../assets/images/logo.svg";
import "./css/style.scss";
import TEXT_GREY from "../../assets/images/text-grey.svg";
import TEXT_COLOR from "../../assets/images/text-color.svg";
import FILE_GREY from "../../assets/images/files-grey.svg";
import FILE_COLOR from "../../assets/images/files-color.svg";
import { useState } from "react";
import TextArea from "../../components/TextArea";
import ThemeButton from "../../components/Button";
import { useDropzone } from "react-dropzone";

function HomePage() {
  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");

  const onDrop = (acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles", acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container">
      <div className="header-bar">
        <div className="logo">
          <img src={LOGO} alt="" />
        </div>
        <div className="menu-bar">
          <ul style={{ color: "white" }}>
            <li>How it works</li>
            <li>Download</li>
            <li>Upgrade</li>
            <li>Feedback</li>
            <li className="menu-btn">Login / Register</li>
          </ul>
        </div>
      </div>
      <div className="main-card">
        <div className="card-sidebar">
          <div onClick={() => setType("text")}>
            <img src={type === "text" ? TEXT_COLOR : TEXT_GREY} alt="" />
          </div>
          <div onClick={() => setType("files")}>
            <img src={type === "files" ? FILE_COLOR : FILE_GREY} alt="" />
          </div>
        </div>
        <div className="card-container">
          {type === "text" ? (
            <div className="text-section">
              <h1>Text</h1>
              <div className="resize-section">
                <TextArea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
              </div>
              <div className="save-btn-section">
                <span>Clear</span>
                <ThemeButton disabled={textValue ? false : true} title={"Save"} />
              </div>
            </div>
          ) : (
            <div className="files-section">
              <h1>Files</h1>
              <div className="drop-zone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
