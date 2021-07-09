import React from "react";

import classes from "./BGoverlay.module.css";

const BGoverlay = (props) => {
  return (
    <div
      className={classes.BGoverlay}
      style={{
        visibility: props.show ? "visible" : "hidden",
        opacity: props.show ? 1 : 0,
      }}
      onClick={props.hide}
    ></div>
  );
};

export default BGoverlay;
