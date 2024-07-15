import React from "react";

const ThemeButton = ({ disabled, title, onClick }) => {
  return (
    <button disabled={disabled} className="theme-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default ThemeButton;

