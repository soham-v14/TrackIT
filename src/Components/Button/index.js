import React from 'react'
import "./style.css"

function Button({text, onClick, blue, disabled}) {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;
