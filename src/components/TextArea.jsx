import React, { useRef } from "react";
import "./index.scss";

const TextArea = ({ onChange }) => {
  const textAreaRef = useRef();
  const resizeTextArea = (event) => {
    textAreaRef.current.style.height = "24px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 12 + "px";
  };
  return (
    <textarea
      onChange={onChange}
      ref={textAreaRef}
      onInput={resizeTextArea}
      placeholder="Type something..."
      className="text-area"
    ></textarea>
  );
};

export default TextArea;
