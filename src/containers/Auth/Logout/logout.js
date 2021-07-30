import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../../store/actions/index";

class logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Redirect to="/" />
        You're being logged out
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.clearLogin),
  };
};

export default connect(null, mapDispatchToProps)(logout);
