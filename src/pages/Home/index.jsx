import LOGO from "../../assets/images/logo.svg";
import "./css/style.scss";
import { MdOutlineTextFields } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import TEXT_GREY from "../../assets/images/text-grey.svg";
import TEXT_COLOR from "../../assets/images/text-color.svg";
import FILE_GREY from "../../assets/images/files-grey.svg";
import FILE_COLOR from "../../assets/images/files-color.svg";

function HomePage() {
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
          <div className="active">
            <MdOutlineTextFields size={40} />
          </div>
          <div>
            <FaRegFileAlt size={35} />
          </div>
        </div>
        <div className="card-container"></div>
      </div>
    </div>
  );
}

export default HomePage;
