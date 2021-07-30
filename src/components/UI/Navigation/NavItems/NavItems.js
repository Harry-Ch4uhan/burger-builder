import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavItems.module.css";
import { connect } from "react-redux";

const NavItems = (props) => {
  let authContent = (
    <li>
      <NavLink activeClassName={classes.activeNav} to="/auth">
        Login
      </NavLink>
    </li>
  );

  if (props.authenticated) {
    authContent = (
      <>
        <li>
          <NavLink activeClassName={classes.activeNav} to="/my-orders">
            My Orders
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.activeNav} to="/logout">
            Logout
          </NavLink>
        </li>
      </>
    );
  }
  return (
    <ul className={props.device ? classes.Main : classes.Sidebar}>
      <li>
        <NavLink activeClassName={classes.activeNav} to="/">
          Home
        </NavLink>
      </li>
      {authContent}
      <li>
        <NavLink activeClassName={classes.activeNav} to="/">
          About Us
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
  };
};

export default connect(mapStateToProps)(NavItems);
