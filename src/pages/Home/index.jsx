import LOGO from "../../assets/images/logo.svg";
import "./css/style.scss";

function HomePage() {
  return (
    <div className="container">
      <div className="header-bar">
        <div className="logo">
          <img src={LOGO} alt="" />
        </div>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
