import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router";
import Spinner from "../../components/UI/Spinner/Spinner";
// import { Redirect } from "react-router";

class Auth extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    error: null,
    register: true,
  };

  componentDidMount() {
    this.setState({ email: "", password: "", error: null });
  }

  onChangeHandler = (event, controlName) => {
    if (controlName === "email") {
      let newValue = event.target.value;
      this.setState({ email: newValue });
    }
    if (controlName === "password") {
      let newValue = event.target.value;
      this.setState({ password: newValue });
    }
    if (controlName === "password2") {
      let newValue = event.target.value;
      this.setState({ password2: newValue });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.register) {
      if (
        this.state.email === "" &&
        this.state.password === "" &&
        this.state.password === ""
      ) {
        this.setState({ error: "Please enter valid details" });
      } else {
        if (this.state.password === this.state.password2) {
          this.setState({ error: null });
          let email = this.state.email;
          let password = this.state.password;
          this.props.authenticate(email, password);
          this.setState({ email: "", password: "", password2: "" });
        } else {
          this.setState({ error: "Please enter matching passwords" });
        }
      }
    } else {
      if (this.state.email === "" && this.state.password === "") {
        this.setState({ error: "Please enter valid details" });
      } else {
        this.setState({ error: null });
        let email = this.state.email;
        let password = this.state.password;
        this.props.login(email, password);
        this.setState({ email: "", password: "", password2: "" });
      }
    }
  };

  cancelHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
  };

  switchFormHandler = (event) => {
    event.preventDefault();
    this.setState({ email: "", password: "", password2: "", error: null });
    this.setState({ register: !this.state.register });
  };

  render() {
    let err = null;
    if (this.state.error) {
      err = (
        <div>
          <h1>{this.state.error}</h1>
        </div>
      );
    }
    let authError = null;
    if (this.props.authErr) {
      let str = this.props.authErr;
      err = (
        <div>
          <h1>{str.replaceAll("_", " ")}</h1>
        </div>
      );
    }
    let form = (
      <form className={classes.Form}>
        {err}
        {authError}
        <input
          placeholder="Email"
          name="email"
          type="email"
          onChange={(event) => this.onChangeHandler(event, "email")}
        ></input>

        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={(event) => this.onChangeHandler(event, "password")}
        ></input>

        <input
          placeholder="Confirm Password"
          name="password2"
          type="password"
          onChange={(event) => this.onChangeHandler(event, "password2")}
        ></input>

        <div className={classes.BtnContainer}>
          <button
            onClick={(event) => this.cancelHandler(event)}
            className={classes.Cancel}
          >
            Go Back
          </button>
          <button
            type="Submit"
            onClick={(event) => this.submitHandler(event)}
            className={classes.Submit}
          >
            Continue
          </button>
        </div>
        <p>
          Already a customer? <br />
          <span
            style={{ color: "blue", textDecoration: "underline" }}
            onClick={(event) => this.switchFormHandler(event)}
          >
            Sign in
          </span>
        </p>
      </form>
    );
    if (!this.state.register) {
      form = (
        <form className={classes.Form}>
          {err}
          {authError}
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={(event) => this.onChangeHandler(event, "email")}
          ></input>

          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={(event) => this.onChangeHandler(event, "password")}
          ></input>

          <div className={classes.BtnContainer}>
            <button
              onClick={(event) => this.cancelHandler(event)}
              className={classes.Cancel}
            >
              Go Back
            </button>
            <button
              type="Submit"
              onClick={(event) => this.submitHandler(event)}
              className={classes.Submit}
            >
              Continue
            </button>
          </div>
          <p>
            New Here? <br />
            <span
              style={{ color: "blue", textDecoration: "underline" }}
              onClick={(event) => this.switchFormHandler(event)}
            >
              Create an account
            </span>
          </p>
        </form>
      );
    }

    let redr = null;
    if (this.props.authenticated) {
      redr = <Redirect to="/" />;
    } else {
      if (this.props.loading) {
        redr = (
          <div className={classes.FormContainer}>
            <Spinner />
          </div>
        );
      } else {
        redr = <div className={classes.FormContainer}>{form}</div>;
      }
    }

    return redr;
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
    loading: state.loading,
    authErr: state.authErr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password) => dispatch(actions.auth(email, password)),
    login: (email, password) => dispatch(actions.authLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
