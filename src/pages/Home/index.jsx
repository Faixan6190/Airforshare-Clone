import LOGO from "../../assets/images/logo.svg";
import "./css/style.scss";
import TEXT_GREY from "../../assets/images/text-grey.svg";
import TEXT_COLOR from "../../assets/images/text-color.svg";
import FILE_GREY from "../../assets/images/files-grey.svg";
import FILE_COLOR from "../../assets/images/files-color.svg";
import { useEffect, useState } from "react";
import TextArea from "../../components/TextArea";
import ThemeButton from "../../components/Button";
import FilesList from "../../components/FilesList";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DropZone from "../../components/DropZone";
import { db, ref, set, onValue } from "../../db";

function HomePage() {
  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    console.log("acceptedFiles", acceptedFiles);
    setFiles([...files, ...acceptedFiles]);
  };

  const saveChanges = () => {
    set(ref(db, "sharing"), {
      text: textValue,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "sharing");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTextValue(data.text);
    });
  }, []);

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
                <ThemeButton onClick={saveChanges} disabled={textValue ? false : true} title={"Save"} />
              </div>
            </div>
          ) : (
            <div className="files-section">
              <div className="files-header">
                <h1>Files</h1>
                <div className="files-btn">
                  <div className="download-btn">
                    <FaDownload />
                    Download All
                  </div>
                  <div onClick={() => setFiles([])} className="delete-btn">
                    <MdDelete />
                    Delete All
                  </div>
                </div>
              </div>
              {files.length ? (
                <FilesList files={files} onDrop={onDrop} />
              ) : (
                <DropZone
                  onDrop={onDrop}
                  textElement={
                    <>
                      Drag and drop any files up to 2 files, 5Mbs each or <span>Browse Upgrade</span> to get more space
                    </>
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
