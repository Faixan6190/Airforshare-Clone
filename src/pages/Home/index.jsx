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
import { db, ref, set, onValue, remove, storage, storageRef, uploadBytesResumable, getDownloadURL } from "../../db";

function HomePage() {
  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [isText, setIsText] = useState(false);
  const [files, setFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);

  const onDrop = async (acceptedFiles) => {
    setTempFiles([...tempFiles, ...acceptedFiles]);
    let arr = [];
    for (var i = 0; i < acceptedFiles.length; i++) {
      arr.push(uploadFile(acceptedFiles[i], i));
    }
    const allFiles = await Promise.all(arr);
    setFiles([...files, ...allFiles]);
    set(ref(db, "file-sharing"), {
      files: [...files, ...allFiles],
    });
    setTempFiles([]);
  };
  console.log("files", files);

  const uploadFile = (file, i) => {
    return new Promise((resolve, reject) => {
      const fileRef = storageRef(storage, `files/file-${i}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ url: downloadURL, type: file.type, name: file.name });
          });
        }
      );
    });
  };

  const saveChanges = () => {
    set(ref(db, "text-sharing"), {
      text: textValue,
    });
  };

  const clearText = async () => {
    await remove(ref(db, "text-sharing"));
    setTextValue("");
    setIsText(false);
  };

  useEffect(() => {
    const starCountRef = ref(db, "text-sharing");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setTextValue(data?.text);
      if (data?.text) {
        setIsText(true);
      }
    });
  }, []);

  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  const links = textValue?.match(regex) || [];

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
                <TextArea
                  value={textValue}
                  onChange={(e) => {
                    setTextValue(e.target.value);
                    setIsText(false);
                  }}
                />
              </div>
              <div className="text-footer">
                <div className="links">
                  {links.map((v, i) => (
                    <div key={i}>
                      <span>
                        <a href={v} target="_blank" rel="noopener noreferrer">
                          {v}
                        </a>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="save-btn-section">
                  <span onClick={clearText}>Clear</span>
                  {isText ? (
                    <ThemeButton
                      onClick={() => {
                        navigator.clipboard.writeText(textValue);
                      }}
                      title={"Copy"}
                    />
                  ) : (
                    <ThemeButton onClick={saveChanges} disabled={textValue ? false : true} title={"Save"} />
                  )}
                </div>
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
              {tempFiles.length || files.length ? (
                <FilesList tempFiles={tempFiles} files={files} onDrop={onDrop} />
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
