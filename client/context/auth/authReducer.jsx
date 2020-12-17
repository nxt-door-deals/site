import Cookies from "universal-cookie";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
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
  OTP_VERIFICATION_TIMESTAMP_UPDATED,
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
    case REGISTER_SUCCESS:
      var d = new Date();
      d.setMinutes(d.getMinutes() + 1440);

      cookie.set("nddToken", action.payload.access_token, {
        path: "/",
        expires: d,
        sameSite: "strict",
      });

      return {
        ...state,
        token: action.payload.access_token,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      cookie.remove("nddToken", { path: "/" });

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        authError: null,
      };
    case EMAIL_SEND_SUCCESS:
      return {
        ...state,
        emailSent: true,
        genericMessage: action.payload,
      };
    case EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        emailVerified: true,
        loading: false,
        verificationStatus: action.payload,
      };
    case EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        emailVerified: false,
        loading: false,
        verificationStatus: action.payload,
      };
    case EMAIL_SEND_FAILURE:
      return {
        ...state,
        emailSent: false,
        genericMessage: action.payload,
      };
    case EMAIL_FOUND:
      return {
        ...state,
        user: action.payload,
      };
    case EMAIL_NOT_FOUND:
      return {
        ...state,
        authError: action.payload,
      };
    case OTP_GENERATED_SUCCESS:
      return {
        ...state,
        otpGenerated: true,
      };
    case OTP_GENERATED_FAILURE:
      return {
        ...state,
        otpGenerated: false,
        authError: action.payload,
      };
    case OTP_VALIDATED_SUCCESS:
      return {
        ...state,
        otpValidated: true,
      };
    case OTP_VALIDATED_FAILURE:
      return {
        ...state,
        otpValidated: false,
        authError: action.payload,
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        passwordChanged: true,
      };
    case PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        passwordChanged: false,
        authError: action.payload,
      };
    case EMAIL_VERIFICATION_TIMESTAMP_UPDATED:
    case OTP_VERIFICATION_TIMESTAMP_UPDATED:
      return {
        ...state,
        genericMessage: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
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
    case CLEAR_MESSAGE:
      return {
        ...state,
        genericMessage: null,
      };
    default:
      return state;
  }
};

export default authReducer;
