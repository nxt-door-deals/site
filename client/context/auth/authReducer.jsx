import Cookies from "universal-cookie";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  CLEAR_ERROR,
  LOGOUT,
} from "../Types";

const cookie = new Cookies();

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case LOGIN_SUCCESS:
      var d = new Date();
      d.setMinutes(d.getMinutes() + 10);

      cookie.set("nddToken", action.payload.access_token, {
        path: "/",
        expires: d,
        sameSite: true,
        secure: false,
      });

      return {
        ...state,
        token: action.payload.access_token,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      cookie.remove("nddToken");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        authError: null,
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
      cookie.remove("nddToken");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        authError: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
