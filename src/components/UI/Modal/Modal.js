import React from "react";

import classes from "./Modal.module.css";
import BGoverlay from "../BG Overlay/BGoverlay";

const Modal = (props) => {
  return (
    <>
      <BGoverlay show={props.show} hide={props.hide} />
      <div
        style={{
          visibility: props.show ? "visible" : "hidden",
          transform: props.show ? null : "translate(-60vh, -100vh)",
          opacity: props.show ? 1 : 0,
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
