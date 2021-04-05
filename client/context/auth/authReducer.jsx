import cookie from "../../utils/cookieInit";
import keys from "../../utils/keys";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  ALT_USER_LOADED,
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
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  DELETE_USER,
  DELETE_AD,
  USER_ADS_FETCHED_SUCCESS,
  USER_ADS_FETCHED_FAILURE,
  LOAD_SELLER_CHATS,
  LOAD_BUYER_CHATS,
  CHAT_ERROR,
  SET_LOADING,
  MARK_DELETE_SELLER_CHAT,
  MARK_DELETE_BUYER_CHAT,
  USER_SUBSCRIPTION_UPDATE_SUCCESS,
  USER_SUBSCRIPTION_UPDATE_FAILURE,
  UPDATE_NUMBER_SOLD,
  UPDATE_NUMBER_SOLD_ERROR,
} from "../Types";

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
      // let d = new Date();
      // d.setMinutes(d.getMinutes() + 1440);

      // cookie.set("nddToken", action.payload.access_token, {
      //   domain: keys.DOMAIN,
      //   path: "/",
      //   expires: d,
      //   sameSite: keys.SAME_SITE_COOKIE_SETTING,
      //   secure: keys.SECURE_COOKIE,
      // });

      if (typeof window !== "undefined") {
        localStorage.setItem("nddToken", action.payload.access_token);
      }

      return {
        ...state,
        token: action.payload.access_token,
        isAuthenticated: true,
        loading: false,
      };
    case ALT_USER_LOADED:
      return {
        ...state,
        altUser: action.payload,
        loading: false,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
      };
    case LOGOUT:
      // cookie.remove("nddToken", {
      //   domain: keys.DOMAIN,
      //   path: "/",
      //   sameSite: keys.SAME_SITE_COOKIE_SETTING,
      //   secure: keys.SECURE_COOKIE,
      // });
      if (typeof window !== "undefined") {
        localStorage.removeItem("nddToken");
      }

      cookie.remove("__redirChatCookie", {
        domain: keys.DOMAIN,
        path: "/",
        sameSite: keys.SAME_SITE_COOKIE_SETTING,
        secure: keys.SECURE_COOKIE,
      });
      cookie.remove("__adCookie", {
        domain: keys.DOMAIN,
        path: "/",
        sameSite: keys.SAME_SITE_COOKIE_SETTING,
        secure: keys.SECURE_COOKIE,
      });

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
    case USER_ADS_FETCHED_SUCCESS:
      return {
        ...state,
        userAds: action.payload,
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
        userFlag: true,
      };
    case EMAIL_NOT_FOUND:
      return {
        ...state,
        authError: action.payload,
      };
    case OTP_GENERATED_SUCCESS:
      return {
        ...state,
        user: action.payload,
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
    case USER_SUBSCRIPTION_UPDATE_SUCCESS:
      return {
        ...state,
        userFlag: action.payload,
      };
    case UPDATE_NUMBER_SOLD:
      return {
        ...state,
      };
    case EMAIL_VERIFICATION_TIMESTAMP_UPDATED:
    case OTP_VERIFICATION_TIMESTAMP_UPDATED:
      return {
        ...state,
        genericMessage: action.payload,
      };
    case MARK_DELETE_SELLER_CHAT:
    case MARK_DELETE_BUYER_CHAT:
      return {
        ...state,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      // cookie.remove("nddToken", {
      //   domain: keys.DOMAIN,
      //   path: "/",
      //   sameSite: keys.SAME_SITE_COOKIE_SETTING,
      //   secure: keys.SECURE_COOKIE,
      // });

      if (typeof window !== "undefined") {
        localStorage.removeItem("nddToken");
      }

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        authError: action.payload,
      };
    case USER_UPDATE_FAILURE:
    case DELETE_USER:
    case DELETE_AD:
    case USER_ADS_FETCHED_FAILURE:
    case USER_SUBSCRIPTION_UPDATE_FAILURE:
    case UPDATE_NUMBER_SOLD_ERROR:
      return {
        ...state,
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
    case LOAD_SELLER_CHATS:
      return {
        ...state,
        loading: false,
        sellerChats: action.payload,
      };
    case LOAD_BUYER_CHATS:
      return {
        ...state,
        buyerChats: action.payload,
      };
    case CHAT_ERROR:
      return {
        ...state,
        chatError: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
