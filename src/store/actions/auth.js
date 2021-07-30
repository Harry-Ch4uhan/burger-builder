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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4_a3oglFuoi-M00vV-YhAcHVPTYGC584",
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4_a3oglFuoi-M00vV-YhAcHVPTYGC584",
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

// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=

// export const auth = (email, password) => {
//   return (dispatch) => {
//     dispatch(authUser());
//     fire
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((res) => dispatch(authSuccess(res)))
//       .catch((err) => console.log(err));
//   };
// };

// export const authLogin = (email, password) => {
//   return (dispatch) => {
//     dispatch(authUser());
//     fire
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then((res) => dispatch(authSuccess(res)))
//       .catch((err) => dispatch(authFailed(err.message)));
//   };
// };

// const data = {
//   kind: "identitytoolkit#SignupNewUserResponse",
//   idToken:
//     "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3MTBiMDE3ZmQ5YjcxMWUwMDljNmMzNmIwNzNiOGE2N2NiNjgyMTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVyZ2VyLWJ1aWxkZXItZjM1NzYiLCJhdWQiOiJidXJnZXItYnVpbGRlci1mMzU3NiIsImF1dGhfdGltZSI6MTYyNjM1NzY3MywidXNlcl9pZCI6ImhON1NKS081SXBidkhJakV3ZXhrSHFVRDVPVzIiLCJzdWIiOiJoTjdTSktPNUlwYnZISWpFd2V4a0hxVUQ1T1cyIiwiaWF0IjoxNjI2MzU3NjczLCJleHAiOjE2MjYzNjEyNzMsImVtYWlsIjoiZmdoQGZnaC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZmdoQGZnaC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Ci2QW8HqTcpy9Wv6vtbhsfaD_l8eQjxM233306FYPZgz6fUlOaTtj_WkgYpLFqHPjUe4rGL8B107kZsjZICOfFXfEyVwiJ6H1nBf41Ub2taghRL30XP_NMrZ5J20WS0icFWQgXLVjKimiFq22leksULCFjrVkSjGD41sJZvCERHIgtsLOFSKOdBIjEqawWWtOjByDh5FWlUYJsqeGAwiDVfnXouI8Z6xkp3SaO2n0vkfmch6sU2SBuJGuobdPWvI4YSnnD82S5YIbZTZSb7IWsMoUFEv5AR6e-crRf7xNbpl5Vz2CsONloDZI3hJOEht6kQmEGQpCFDTMBRZ_1Dklg",
//   email: "fgh@fgh.com",
//   refreshToken:
//     "AGEhc0Cephh67Xguokap2VTlGddjm-1HDRS5wYYj49otIhczEDpYtvQDVnfsgHNhJ_4VBjWD2VwJTWqN0GrHSGQ-n5EVISWCoSzcOi-hrBwMzLNcf10-KfeNwjRF-8iSOwJym3cX8VtRfDbFkmnwhv9n9N5uqttoJwMjURcvDyL1PXhoJZNnGOYNj59QEt9J1zhn-pEdW1X8bmwHKNu6mk9kVFKETG87ug",
//   expiresIn: "3600",
//   localId: "hN7SJKO5IpbvHIjEwexkHqUD5OW2",
// };
