import React from "react";

import classes from "./NavItems.module.css";

const NavItems = (props) => {
  return (
    <ul className={props.device ? classes.Main : classes.Sidebar}>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/">My Orders</a>
      </li>
      <li>
        <a href="/">About Us</a>
      </li>
    </ul>
  );
};

export default NavItems;
