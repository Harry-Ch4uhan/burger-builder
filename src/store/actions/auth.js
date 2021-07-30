//url's are hidden for security purposes

import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authUser = () => {
  return {
    type: actionTypes.AUTH_USER,
  };
};

export const authSuccess = (token, userId) => {
  // console.log(authData);
  return {
    type: actionTypes.AUTH_SUCCESS,
    // authData: authData,
    token: token,
    userId: userId,
  };
};

export const authFailed = (error) => {
  console.log(error);
  return {
    type: actionTypes.AUTH_FAILED,
    error: error.message,
  };
};

export const clearLogin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.CLEAR_LOGIN,
  };
};

export const logoutTimer = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(clearLogin());
    }, time * 1000);
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authUser());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        "////////",
        authData
      )
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(logoutTimer(res.data.expiresIn));
      })
      .catch((err) => dispatch(authFailed(err)));
  };
};

export const authLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authUser());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        "///////",
        authData
      )
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(logoutTimer(res.data.expiresIn));
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((error) => dispatch(authFailed(error.response.data.error)));
  };
};

export const authCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(clearLogin());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(clearLogin());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          logoutTimer((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
