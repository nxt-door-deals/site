import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../../utils/setToken";
import axios from "axios";
import Cookies from "universal-cookie";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERROR,
  LOGOUT,
} from "../Types";

const cookie = new Cookies();

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    loading: true,
    authError: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user
  const loadUser = async () => {
    if (cookie.get("nddToken")) {
      setAuthToken(cookie.get("nddToken"));
    }

    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/auth/current_user"
      );

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.message });
    }
  };

  // User login
  const loginUser = async (email, password) => {
    const formData = new FormData();

    formData.set("username", email);
    formData.set("password", password);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 50000);
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        authError: state.authError,
        loginUser,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
