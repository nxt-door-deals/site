import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../../utils/setToken";
import axios from "axios";
import Cookies from "universal-cookie";
import {API_PROXY, SENDGRID_API_KEY, FROM_EMAIL} from "../../utils/keys"

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  LOGOUT,
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAILURE,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAIL,
  EMAIL_FOUND,
  EMAIL_NOT_FOUND,
  OTP_GENERATED_SUCCESS,
  OTP_GENERATED_FAILURE,
  OTP_VALIDATED_SUCCESS,
  OTP_VALIDATED_FAILURE,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILURE,
  EMAIL_VERIFICATION_TIMESTAMP_UPDATED,
} from "../Types";

const cookie = new Cookies();

// Will be used in the copyright section in the email footer
var currentYear = new Date().getFullYear();

// Email sender
const fromEmail = FROM_EMAIL;

const AuthState = (props) => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    user: null,
    loading: true,
    authError: null,
    emailVerified: null,
    verificationStatus: null,
    emailSent: null,
    otpGenerated: null,
    otpValidated: null,
    passwordChanged: null,
    genericMessage: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const registerUser = async (
    name,
    email,
    mobile = null,
    password,
    apartment
  ) => {
    const jsonPayload = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      apartment_id: apartment,
    };

    try {
      const res = await axios.post(
        `${API_PROXY}/register/user`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  // Load user
  const loadUser = async () => {
    if (cookie.get("nddToken")) {
      setAuthToken(cookie.get("nddToken"));
    }

    try {
      const res = await axios.get(
        `${API_PROXY}/auth/current_user`
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
        `${API_PROXY}/auth`,
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
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  // Send email - user registration, welcome etc...
  const sendEmail = async (name, email, verificationUrl) => {
    setAuthToken(SENDGRID_API_KEY);

    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      template_name: "VERIFY_EMAIL_TEMPLATE",
      name: name,
      verificationurl: verificationUrl,
      year: currentYear,
    };

    try {
      await axios.post(
        `${API_PROXY}/email/send`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: EMAIL_SEND_SUCCESS });
    } catch (error) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  // Refresh the email verification timestamp
  const updateEmailVerificationTimestamp = async (id) => {
    const jsonPayload = { id: id };

    try {
      await axios.put(
        `${API_PROXY}/email_timestamp/refresh`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: null });
    } catch (err) {
      dispatch({
        type: EMAIL_VERIFICATION_TIMESTAMP_UPDATED,
        payload: err.response.data.detail,
      });
    }
  };

  // Email the otp to the user during password change
  const sendOtpByEmail = async (email) => {
    setAuthToken(SENDGRID_API_KEY);

    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      template_name: "OTP_EMAIL_TEMPLATE",
      year: currentYear,
    };

    try {
      await axios.post(
        `${API_PROXY}/email/send/otp`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: EMAIL_SEND_SUCCESS });
    } catch (error) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  // Send the contact us email
  const sendContactUsEmail = async (email, message) => {
    setAuthToken(SENDGRID_API_KEY);

    var emailBody = `${email} wrote: \n\n${message}`;

    const jsonPayload = {
      from_email: fromEmail,
      to_email: fromEmail,
      body: emailBody,
    };

    try {
      const res = await axios.post(
        `${API_PROXY}/email/send/contact`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: EMAIL_SEND_SUCCESS, payload: res.data });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 5000);
    } catch (error) {
      dispatch({ type: EMAIL_SEND_FAILURE, payload: res.data });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 5000);
    }
  };

  // Complete the user's email verification process
  const verifyEmail = async (token) => {
    const utcTime = new Date().toJSON();
    try {
      const res = await axios.put(
        `${API_PROXY}/user/emailverification/${token}`,
        {
          timestamp: utcTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: EMAIL_VERIFICATION_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: EMAIL_VERIFICATION_FAIL,
        payload: err.response.data.detail,
      });
    }
  };

  // Method for forgot password - email validation
  const validateEmail = async (email) => {
    try {
      const res = await axios.get(
        `${API_PROXY}/user/validate_email/${email}`
      );

      dispatch({ type: EMAIL_FOUND, payload: res.data });
    } catch (err) {
      dispatch({ type: EMAIL_NOT_FOUND, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  // Method for forgot password - otp generation
  const generateOtp = async (id, email) => {
    const jsonPayload = {
      id: id,
      email: email,
    };

    try {
      await axios.put(
        `${API_PROXY}/user/otp_generation`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: OTP_GENERATED_SUCCESS });
    } catch (err) {
      dispatch({
        type: OTP_GENERATED_FAILURE,
        payload: err.response.data.detail,
      });
    }
  };

  // Method for forgot password - otp generation
  const validateOtp = async (id, otp) => {
    const utcTime = new Date().toJSON();
    try {
      await axios.get(
        `${API_PROXY}/user/verify_otp/${id}?otp=${otp}&timestamp=${utcTime}`
      );

      dispatch({ type: OTP_VALIDATED_SUCCESS });
    } catch (err) {
      dispatch({
        type: OTP_VALIDATED_FAILURE,
        payload: err.response.data.detail,
      });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  // Method for forgot password - password update
  const updatePassword = async (password, userId) => {
    const jsonPayload = {
      password: password,
    };

    try {
      await axios.put(
        `${API_PROXY}/user/password/${userId}`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: PASSWORD_CHANGE_SUCCESS });
    } catch (err) {
      dispatch({
        type: PASSWORD_CHANGE_FAILURE,
        payload: err.response.data.detail,
      });
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
        emailVerified: state.emailVerified,
        verificationStatus: state.verificationStatus,
        emailSent: state.emailSent,
        otpGenerated: state.otpGenerated,
        otpValidated: state.otpValidated,
        passwordChanged: state.passwordChanged,
        genericMessage: state.genericMessage,
        registerUser,
        loginUser,
        loadUser,
        sendEmail,
        sendOtpByEmail,
        verifyEmail,
        validateEmail,
        updateEmailVerificationTimestamp,
        sendContactUsEmail,
        generateOtp,
        validateOtp,
        updatePassword,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
