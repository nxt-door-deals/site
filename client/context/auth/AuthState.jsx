import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import { setAuthToken, setApiKey } from "../../utils/setToken";
import axios from "axios";
import keys from "../../utils/keys";

import {
  SET_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  ALT_USER_LOADED,
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
  OTP_VERIFICATION_TIMESTAMP_UPDATED,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  DELETE_USER,
  DELETE_AD,
  USER_ADS_FETCHED_SUCCESS,
  USER_ADS_FETCHED_FAILURE,
  LOAD_SELLER_CHATS,
  LOAD_BUYER_CHATS,
  USER_SUBSCRIPTION_UPDATE_SUCCESS,
  USER_SUBSCRIPTION_UPDATE_FAILURE,
  MARK_DELETE_BUYER_CHAT,
  MARK_DELETE_SELLER_CHAT,
  CHAT_ERROR,
  UPDATE_NUMBER_SOLD,
  UPDATE_NUMBER_SOLD_ERROR,
  INVALID_LOGIN_COUNTS,
  TOKEN_STATUS,
} from "../Types";

// Will be used in the copyright section in the email footer
var currentYear = new Date().getFullYear();

// Email sender
const fromEmail = keys.FROM_EMAIL;

const AuthState = (props) => {
  const initialState = {
    userFlag: null,
    token: null,
    isAuthenticated: false,
    user: null,
    altUser: null,
    loading: false,
    authError: null,
    emailVerified: null,
    verificationStatus: null,
    emailSent: null,
    otpGenerated: null,
    otpValidated: null,
    passwordChanged: null,
    genericMessage: null,
    userAds: [],
    buyerChats: null,
    sellerChats: null,
    chatError: null,
    loginCount: null,
    balanceUserAds: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const registerUser = async (
    name,
    email,
    mobile = null,
    password,
    apartmentNumber,
    apartment
  ) => {
    const jsonPayload = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      apartment_id: apartment,
      apartment_number: apartmentNumber,
    };

    try {
      const res = await axios.post(
        `${keys.API_PROXY}/register/user`,
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
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3000);
    }
  };

  // Load user
  const loadUser = async () => {
    // if (typeof window !== "undefined") {
    //   setAuthToken(localStorage.getItem("nddToken"));
    // } else {
    //   localStorage.setItem("nddToken", state.token);

    //   setTimeout(() => setAuthToken(localStorage.getItem("nddToken")), 500);
    // }

    setAuthToken("auth");

    try {
      const res = await axios.get(`${keys.API_PROXY}/auth/current_user`);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3000);
    }
  };

  // User login
  const loginUser = async (email, password) => {
    const formData = new FormData();

    formData.set("username", email);
    formData.set("password", password);

    try {
      const res = await axios.post(`${keys.API_PROXY}/auth`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.detail });

      if (state.loginCount < 5)
        setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3000);
    }
  };

  const verifyTokenStatus = async () => {
    try {
      await axios.get(`${keys.API_PROXY}/token/verify`);
    } catch (err) {
      dispatch({ type: TOKEN_STATUS, payload: err.response.data.detail });
    }
  };

  const getLoginCount = async (email) => {
    try {
      const res = await axios.get(
        `${keys.API_PROXY}/counts?email=${email.toLowerCase()}`
      );

      dispatch({ type: INVALID_LOGIN_COUNTS, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3000);
    }
  };

  // Get user from id
  const getUserFromId = async (userId) => {
    setAuthToken("auth");

    try {
      const res = await axios.get(`${keys.API_PROXY}/user/${userId}`);
      dispatch({ type: ALT_USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
    }
  };

  // Update user
  const updateUserProfile = async (
    userId,
    name,
    email,
    mobile,
    apartmentId,
    apartmentNumber,
    neighbourhood
  ) => {
    setAuthToken("auth");

    const jsonPayload = {
      name: name,
      email: email,
      mobile: mobile,
      apartment_id: apartmentId,
      apartment_number: apartmentNumber,
    };

    try {
      const res = await axios.put(
        `${keys.API_PROXY}/user/update/${userId}`,
        jsonPayload
      );

      state.user.name = res.data.name;
      state.user.mobile = res.data.mobile;
      state.user.apartment_id = apartmentId;
      state.user.apartment_number = apartmentNumber;
      state.user.apartment_name = neighbourhood;

      dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: USER_UPDATE_FAILURE,
        payload: err.response.data.detail,
      });
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    setAuthToken("auth");

    try {
      await axios.delete(`${keys.API_PROXY}/user/delete/${userId}`);
    } catch (err) {
      dispatch({ type: DELETE_USER, payload: err.response.data.detail });
    }
  };

  // Delete ad
  const deleteAd = async (userId, adId) => {
    setAuthToken("auth");
    try {
      await axios.delete(
        `${keys.API_PROXY}/userads/delete/?user_id=${userId}&ad_id=${adId}`
      );

      // if (state.userAds !== []) state.userAds.splice(index, 1);

      // state.user && state.fetchUserAds(state.user.id);
    } catch (err) {
      dispatch({ type: DELETE_AD, payload: err.response.data.detail });
    }
  };

  // User ads
  const fetchUserAds = async (userId) => {
    setAuthToken("auth");

    try {
      const res = await axios.get(`${keys.API_PROXY}/userads/get/${userId}`);
      dispatch({ type: USER_ADS_FETCHED_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: USER_ADS_FETCHED_FAILURE,
        payload: err.response.data.detail,
      });
    }
  };

  // Send email - user registration, welcome etc...
  const sendEmail = async (name, email, verificationUrl) => {
    setAuthToken("sendgrid");

    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      template_name: "VERIFY_EMAIL_TEMPLATE",
      name: name,
      verificationurl: verificationUrl,
      year: currentYear,
    };

    try {
      await axios
        .post(`${keys.API_PROXY}/email/send`, jsonPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => dispatch({ type: EMAIL_SEND_SUCCESS }));
    } catch (error) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  // Refresh the email verification timestamp
  const updateEmailVerificationTimestamp = async (id) => {
    const jsonPayload = { id: id };

    setAuthToken("auth");

    try {
      await axios
        .put(`${keys.API_PROXY}/email_timestamp/refresh`, jsonPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => dispatch({ type: EMAIL_VERIFICATION_TIMESTAMP_UPDATED }));
    } catch (err) {
      dispatch({
        type: EMAIL_VERIFICATION_TIMESTAMP_UPDATED,
        payload: err.response.data.detail,
      });
    }
  };

  // Refresh the otp verification timestamp
  const updateOtpVerificationTimestamp = async (id) => {
    setAuthToken("auth");

    const jsonPayload = { id: id };

    try {
      await axios
        .put(`${keys.API_PROXY}/otp_timestamp/refresh`, jsonPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => dispatch({ type: OTP_VERIFICATION_TIMESTAMP_UPDATED }));
    } catch (err) {
      dispatch({
        type: OTP_VERIFICATION_TIMESTAMP_UPDATED,
        payload: err.response.data.detail,
      });
    }
  };

  // Email the otp to the user during password change
  const sendOtpByEmail = async (email) => {
    setAuthToken("sendgrid");

    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      template_name: "OTP_EMAIL_TEMPLATE",
      year: currentYear,
    };

    try {
      await axios
        .post(`${keys.API_PROXY}/email/send/otp`, jsonPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => dispatch({ type: EMAIL_SEND_SUCCESS }));
    } catch (err) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  // Send the contact us email
  const sendContactUsEmail = async (email, message) => {
    setAuthToken("sendgrid");

    var emailBody = `${email} wrote: \n\n${message}`;

    const jsonPayload = {
      from_email: fromEmail,
      to_email: fromEmail,
      body: emailBody,
    };

    try {
      const res = await axios.post(
        `${keys.API_PROXY}/email/send/contact`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: EMAIL_SEND_SUCCESS, payload: res.data });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 4000);
    } catch (error) {
      dispatch({ type: EMAIL_SEND_FAILURE, payload: res.data });
      setTimeout(() => dispatch({ type: CLEAR_MESSAGE }), 4000);
    }
  };

  // Report ad emails
  const sendReportAdEmail = async (
    adTitle,
    reportDescription,
    adId,
    toEmail,
    templateName
  ) => {
    setAuthToken("sendgrid");

    const jsonPayload = {
      ad_title: adTitle,
      description: reportDescription,
      ad_id: adId,
      from_email: fromEmail,
      to_email: toEmail,
      template_name: templateName,
    };

    try {
      await axios
        .post(`${keys.API_PROXY}/email/reported_ad/`, jsonPayload)
        .then(() => dispatch({ type: EMAIL_SEND_SUCCESS }));
    } catch (err) {
      dispatch({ type: EMAIL_SEND_FAILURE });
    }
  };

  const notifySellerAboutChatMessage = async (
    sellerId,
    sellerName,
    sellerEmail,
    buyerId,
    buyerName,
    adId,
    adName
  ) => {
    const jsonPayload = {
      seller_id: sellerId,
      seller_name: sellerName,
      seller_email: sellerEmail,
      buyer_id: buyerId,
      buyer_name: buyerName,
      ad_id: adId,
      ad_name: adName,
    };

    console.log(jsonPayload);

    try {
      const res = axios.post(
        `${keys.API_PROXY}/email/chat_notification`,
        jsonPayload
      );
      dispatch({ type: EMAIL_VERIFICATION_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: EMAIL_VERIFICATION_FAIL,
        payload: err.response.data.detail,
      });
    }
  };

  // Complete the user's email verification process
  const verifyEmail = async (token) => {
    const utcTime = new Date().toJSON();
    try {
      const res = await axios.put(
        `${keys.API_PROXY}/user/emailverification/${token}`,
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
        `${keys.API_PROXY}/user/validate_email/${email}`
      );

      dispatch({ type: EMAIL_FOUND, payload: res.data });
    } catch (err) {
      dispatch({ type: EMAIL_NOT_FOUND, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3000);
    }
  };

  // Method for forgot password - otp generation
  const generateOtp = async (email) => {
    const jsonPayload = {
      email: email,
    };

    try {
      const res = await axios.put(
        `${keys.API_PROXY}/user/otp_generation`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: OTP_GENERATED_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: OTP_GENERATED_FAILURE,
        payload: err.response.data.detail,
      });

      // setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  // Method for forgot password - otp generation
  const validateOtp = async (id, otp) => {
    const utcTime = new Date().toJSON();
    try {
      await axios
        .get(
          `${keys.API_PROXY}/user/verify_otp/${id}?otp=${otp}&timestamp=${utcTime}`
        )
        .then(() => dispatch({ type: OTP_VALIDATED_SUCCESS }));
    } catch (err) {
      dispatch({
        type: OTP_VALIDATED_FAILURE,
        payload: err.response.data.detail,
      });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3000);
    }
  };

  // Method for forgot password - password update
  const updatePassword = async (password, userId) => {
    const jsonPayload = {
      password: password,
    };

    try {
      await axios
        .put(`${keys.API_PROXY}/user/password/${userId}`, jsonPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => dispatch({ type: PASSWORD_CHANGE_SUCCESS }));
    } catch (err) {
      dispatch({
        type: PASSWORD_CHANGE_FAILURE,
        payload: err.response.data.detail,
      });
    }
  };

  // Chat related end-points
  const loadSellerChats = async (userId) => {
    setAuthToken("auth");

    try {
      const res = await axios.get(`${keys.API_PROXY}/chats/seller/${userId}`);
      dispatch({ type: LOAD_SELLER_CHATS, payload: res.data });
    } catch (err) {
      dispatch({ type: CHAT_ERROR, payload: err.response.data.detail });
    }
  };

  const loadBuyerChats = async (userId) => {
    setAuthToken("auth");

    try {
      const res = await axios.get(`${keys.API_PROXY}/chats/buyer/${userId}`);
      dispatch({ type: LOAD_BUYER_CHATS, payload: res.data });
    } catch (err) {
      dispatch({ type: CHAT_ERROR, payload: err.response.data.detail });
    }
  };

  const updateUserSubscription = async (email, subscriptionStatus) => {
    const jsonPayload = {
      subscription_status: subscriptionStatus,
      email: email,
    };

    try {
      const res = await axios.put(
        `${keys.API_PROXY}/user/subscription/`,
        jsonPayload
      );

      if (state.user) state.user.mail_subscribed = subscriptionStatus;

      dispatch({ type: USER_SUBSCRIPTION_UPDATE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: USER_SUBSCRIPTION_UPDATE_FAILURE,
        payload: err.response.data.detail,
      });
    }
  };

  const markSellerChatForDeletion = async (userId, chatId) => {
    setAuthToken("auth");

    try {
      await axios
        .put(
          `${keys.API_PROXY}/seller/chat/delete/?seller_id=${userId}&chat_id=${chatId}`
        )
        .then(() => dispatch({ type: MARK_DELETE_SELLER_CHAT }));
    } catch (err) {
      dispatch({ type: CHAT_ERROR, payload: err.response.data.detail });
    }
  };

  const markBuyerChatForDeletion = async (userId, chatId) => {
    setAuthToken("auth");

    try {
      await axios
        .put(
          `${keys.API_PROXY}/buyer/chat/delete/?buyer_id=${userId}&chat_id=${chatId}`
        )
        .then(() => dispatch({ type: MARK_DELETE_BUYER_CHAT }));
    } catch (err) {
      dispatch({ type: CHAT_ERROR, payload: err.response.data.detail });
    }
  };

  const updateNumberSold = async (userId) => {
    setAuthToken("auth");
    try {
      await axios
        .put(`${keys.API_PROXY}/update/sold/${userId}`)
        .then(() => dispatch({ type: UPDATE_NUMBER_SOLD }));
    } catch (err) {
      dispatch({ type: UPDATE_NUMBER_SOLD_ERROR });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <AuthContext.Provider
      value={{
        userFlag: state.userFlag,
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
        userAds: state.userAds,
        altUser: state.altUser,
        sellerChats: state.sellerChats,
        buyerChats: state.buyerChats,
        loginCount: state.loginCount,
        chatError: state.chatError,
        getUserFromId,
        registerUser,
        loginUser,
        loadUser,
        verifyTokenStatus,
        deleteUser,
        deleteAd,
        fetchUserAds,
        updateUserProfile,
        sendEmail,
        sendReportAdEmail,
        sendOtpByEmail,
        notifySellerAboutChatMessage,
        verifyEmail,
        validateEmail,
        updateEmailVerificationTimestamp,
        updateOtpVerificationTimestamp,
        sendContactUsEmail,
        generateOtp,
        validateOtp,
        updatePassword,
        loadSellerChats,
        loadBuyerChats,
        updateUserSubscription,
        markSellerChatForDeletion,
        markBuyerChatForDeletion,
        updateNumberSold,
        getLoginCount,
        logout,
        setLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
