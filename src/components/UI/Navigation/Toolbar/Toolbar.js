import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../../../assets/Images/logo.png";
import NavItems from "../NavItems/NavItems";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <img src={Logo} alt="Burger Builder"></img>
      <NavItems device={true} className={classes.Navi} />
      <div
        className={(classes.HamBtn, classes.DrawerToggle)}
        onClick={props.openS}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Toolbar;
