import React from "react";

import Logo from "../../../../assets/Images/logo.png";
import NavItems from "../NavItems/NavItems";
import classes from "./SideDrawer.module.css";
import BGOverlay from "../../BG Overlay/BGoverlay";

const SideDrawer = (props) => {
  let attachClasses = [classes.SideDrawer, classes.Close];
  if (props.opened) {
    attachClasses = [classes.SideDrawer, classes.Open];
  } else {
    attachClasses = [classes.SideDrawer, classes.Close];
  }
  return (
    <>
      <BGOverlay show={props.opened} hide={props.closeS} />
      <div className={attachClasses.join(" ")} onClick={props.closeS}>
        <img src={Logo} alt="Burger Builder" />
        <NavItems device={false} />
      </div>
    </>
  );
};

export default SideDrawer;
