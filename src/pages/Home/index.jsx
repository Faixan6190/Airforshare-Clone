import LOGO from "../../assets/images/logo.svg";
import "./css/style.scss";
import { MdOutlineTextFields } from "react-icons/md";

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
          <MdOutlineTextFields style={{ width: 30, height: 25 }} />
        </div>
        <div className="card-container"></div>
      </div>
    </div>
  );
}

export default HomePage;
