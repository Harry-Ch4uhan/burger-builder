import React from "react";

import classes from "./BurgerControl.module.css";

const BurgerControl = (props) => {
  return (
    <div className={classes.BurgerControl}>
      <label>{props.label}</label>
      <button onClick={props.less} disabled={props.disabled}>
        Less
      </button>
      <button onClick={props.added}>More</button>
    </div>
  );
};

export default BurgerControl;
