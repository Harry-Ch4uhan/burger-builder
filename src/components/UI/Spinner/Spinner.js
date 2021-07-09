import React from "react";

import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <>
      <div className={classes.colsm2}>
        <div className={classes.pulseLoader}> </div>
      </div>
    </>
  );
};

export default Spinner;
