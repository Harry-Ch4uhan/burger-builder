import React, { Component } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../UI/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSidebar: false,
  };

  closeSidebarHandler = () => {
    this.setState({ showSidebar: false });
  };

  openSidebarHandler = () => {
    this.setState({ showSidebar: true });
  };

  render() {
    return (
      <>
        <Toolbar openS={this.openSidebarHandler} />
        <SideDrawer
          opened={this.state.showSidebar}
          closeS={this.closeSidebarHandler}
        />
        <main className={classes.content}>{this.props.children}</main>
      </>
    );
  }
}
export default Layout;
