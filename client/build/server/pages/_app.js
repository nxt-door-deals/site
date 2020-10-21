module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ MyApp; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./styles/styles.css
var styles = __webpack_require__("vJJZ");

// CONCATENATED MODULE: ./context/Types.jsx
// Site
const FETCH_APARTMENT = "FETCH_APARTMENT";
const FETCH_APARTMENT_ERROR = "FETCH_APARTMENT_ERROR";
const CLEAR_APARTMENT_SEARCH_RESULTS = "CLEAR_APARTMENT_SEARCH_RESULTS";
const LOADING = "LOADING"; // Auth

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const AUTH_ERROR = "AUTH_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";
const CLEAR_MESSAGE = "CLEAR_MESSAGE";
const USER_LOADED = "USER_LOADED";
const LOGOUT = "LOGOUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";
const REGISTER_ERROR = "REGISTER_ERROR";
const EMAIL_SEND_SUCCESS = "EMAIL_SEND_SUCCESS";
const EMAIL_SEND_FAILURE = "EMAIL_SEND_FAILURE";
const EMAIL_VERIFICATION_SUCCESS = "EMAIL_VERIFICATION_SUCCESS";
const EMAIL_VERIFICATION_FAIL = "EMAIL_VERIFICATION_FAIL";
const EMAIL_FOUND = "EMAIL_FOUND";
const EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND";
const OTP_GENERATED_SUCCESS = "OTP_GENERATED_SUCCESS";
const OTP_GENERATED_FAILURE = "OTP_GENERATED_FAILURE";
const OTP_VALIDATED_SUCCESS = "OTP_VALIDATED_SUCCESS";
const OTP_VALIDATED_FAILURE = "OTP_VALIDATED_FAILURE";
const PASSWORD_CHANGE_SUCCESS = "PASSWORD_CHANGE_SUCCESS";
const PASSWORD_CHANGE_FAILURE = "PASSWORD_CHANGE_FAILURE";
const EMAIL_VERIFICATION_TIMESTAMP_UPDATED = "EMAIL_VERIFICATION_TIMESTAMP_UPDATED";
// CONCATENATED MODULE: ./context/site/siteReducer.jsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const siteReducer = (state, action) => {
  switch (action.type) {
    case FETCH_APARTMENT:
      return _objectSpread(_objectSpread({}, state), {}, {
        apartmentData: action.payload,
        numApartmentsFetched: action.payload.length,
        loading: false
      });

    case FETCH_APARTMENT_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, {
        fetchError: action.payload
      });

    case CLEAR_APARTMENT_SEARCH_RESULTS:
      return _objectSpread(_objectSpread({}, state), {}, {
        apartmentData: "",
        numApartmentsFetched: ""
      });

    case LOADING:
      return _objectSpread(_objectSpread({}, state), {}, {
        loading: true
      });

    default:
      return state;
  }
};

/* harmony default export */ var site_siteReducer = (siteReducer);
// EXTERNAL MODULE: ./context/site/siteContext.jsx
var siteContext = __webpack_require__("vn1b");

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// CONCATENATED MODULE: ./context/site/SiteState.jsx
var __jsx = external_react_default.a.createElement;






const SiteState = props => {
  const initialState = {
    numApartmentsFetched: "",
    fetchError: null,
    loading: false,
    apartmentData: ""
  };
  const {
    0: state,
    1: dispatch
  } = Object(external_react_["useReducer"])(site_siteReducer, initialState);

  const fetchApartments = async aptName => {
    try {
      const res = await external_axios_default.a.get(`${"http://localhost:8000/api/v1"}/apartments/search/?name=${aptName}`);
      dispatch({
        type: FETCH_APARTMENT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FETCH_APARTMENT_ERROR,
        payload: err.response.data.detail
      });
    }
  };

  const clearApartmentSearchResults = () => {
    dispatch({
      type: CLEAR_APARTMENT_SEARCH_RESULTS
    });
  };

  const setLoading = () => {
    dispatch({
      type: LOADING
    });
  };

  return __jsx(siteContext["a" /* default */].Provider, {
    value: {
      numApartmentsFetched: state.numApartmentsFetched,
      loading: state.loading,
      apartmentData: state.apartmentData,
      fetchError: state.fetchError,
      fetchApartments,
      clearApartmentSearchResults,
      setLoading
    }
  }, props.children);
};

/* harmony default export */ var site_SiteState = (SiteState);
// EXTERNAL MODULE: external "universal-cookie"
var external_universal_cookie_ = __webpack_require__("RE4Q");
var external_universal_cookie_default = /*#__PURE__*/__webpack_require__.n(external_universal_cookie_);

// CONCATENATED MODULE: ./context/auth/authReducer.jsx
function authReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function authReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { authReducer_ownKeys(Object(source), true).forEach(function (key) { authReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { authReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function authReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const cookie = new external_universal_cookie_default.a();

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        isAuthenticated: true,
        loading: false,
        user: action.payload
      });

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      var d = new Date();
      d.setMinutes(d.getMinutes() + 1440);
      cookie.set("nddToken", action.payload.access_token, {
        path: "/",
        expires: d,
        sameSite: "strict"
      });
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        token: action.payload.access_token,
        isAuthenticated: true,
        loading: false
      });

    case LOGOUT:
      cookie.remove("nddToken", {
        path: "/"
      });
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        authError: null
      });

    case EMAIL_SEND_SUCCESS:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        emailSent: true,
        genericMessage: action.payload
      });

    case EMAIL_VERIFICATION_SUCCESS:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        emailVerified: true,
        loading: false,
        verificationStatus: action.payload
      });

    case EMAIL_VERIFICATION_FAIL:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        emailVerified: false,
        loading: false,
        verificationStatus: action.payload
      });

    case EMAIL_SEND_FAILURE:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        emailSent: false,
        genericMessage: action.payload
      });

    case EMAIL_FOUND:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        user: action.payload
      });

    case EMAIL_NOT_FOUND:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        authError: action.payload
      });

    case OTP_GENERATED_SUCCESS:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        otpGenerated: true
      });

    case OTP_GENERATED_FAILURE:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        otpGenerated: false,
        authError: action.payload
      });

    case OTP_VALIDATED_SUCCESS:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        otpValidated: true
      });

    case OTP_VALIDATED_FAILURE:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        otpValidated: false,
        authError: action.payload
      });

    case PASSWORD_CHANGE_SUCCESS:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        passwordChanged: true
      });

    case PASSWORD_CHANGE_FAILURE:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        passwordChanged: false,
        authError: action.payload
      });

    case EMAIL_VERIFICATION_TIMESTAMP_UPDATED:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        genericMessage: action.payload
      });

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      cookie.remove("nddToken");
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        authError: action.payload
      });

    case CLEAR_ERROR:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        authError: null
      });

    case CLEAR_MESSAGE:
      return authReducer_objectSpread(authReducer_objectSpread({}, state), {}, {
        genericMessage: null
      });

    default:
      return state;
  }
};

/* harmony default export */ var auth_authReducer = (authReducer);
// EXTERNAL MODULE: ./context/auth/authContext.jsx
var authContext = __webpack_require__("IYH+");

// CONCATENATED MODULE: ./utils/setToken.js


const setAuthToken = token => {
  if (token) {
    external_axios_default.a.defaults.headers.common.Authorization = "Bearer " + token;
  } else {
    delete external_axios_default.a.defaults.headers.common.Authorization;
  }
};

/* harmony default export */ var setToken = (setAuthToken);
// CONCATENATED MODULE: ./context/auth/AuthState.jsx
var AuthState_jsx = external_react_default.a.createElement;







const AuthState_cookie = new external_universal_cookie_default.a(); // Will be used in the copyright section in the email footer

var currentYear = new Date().getFullYear(); // Email sender

const fromEmail = process.env.FROM_EMAIL;

const AuthState = props => {
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
    genericMessage: null
  };
  const {
    0: state,
    1: dispatch
  } = Object(external_react_["useReducer"])(auth_authReducer, initialState); // Register user

  const registerUser = async (name, email, mobile = null, password, apartment) => {
    const jsonPayload = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      apartment_id: apartment
    };

    try {
      const res = await external_axios_default.a.post(`${process.env.API_PROXY}/register/user`, jsonPayload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.detail
      });
      setTimeout(() => dispatch({
        type: CLEAR_ERROR
      }), 5000);
    }
  }; // Load user


  const loadUser = async () => {
    if (AuthState_cookie.get("nddToken")) {
      setToken(AuthState_cookie.get("nddToken"));
    }

    try {
      const res = await external_axios_default.a.get(`${process.env.API_PROXY}/auth/current_user`);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.message
      });
    }
  }; // User login


  const loginUser = async (email, password) => {
    const formData = new FormData();
    formData.set("username", email);
    formData.set("password", password);

    try {
      const res = await external_axios_default.a.post(`${process.env.API_PROXY}/auth`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.detail
      });
      setTimeout(() => dispatch({
        type: CLEAR_ERROR
      }), 5000);
    }
  }; // Send email - user registration, welcome etc...


  const sendEmail = async (name, email, verificationUrl) => {
    setToken(process.env.SENDGRID_API_KEY);
    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      template_name: "VERIFY_EMAIL_TEMPLATE",
      name: name,
      verificationurl: verificationUrl,
      year: currentYear
    };

    try {
      await external_axios_default.a.post(`${process.env.API_PROXY}/email/send`, jsonPayload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: EMAIL_SEND_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: EMAIL_SEND_FAILURE
      });
    }
  }; // Refresh the email verification timestamp


  const updateEmailVerificationTimestamp = async id => {
    const jsonPayload = {
      id: id
    };

    try {
      await external_axios_default.a.put(`${process.env.API_PROXY}/email_timestamp/refresh`, jsonPayload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: null
      });
    } catch (err) {
      dispatch({
        type: EMAIL_VERIFICATION_TIMESTAMP_UPDATED,
        payload: err.response.data.detail
      });
    }
  }; // Email the otp to the user during password change


  const sendOtpByEmail = async email => {
    setToken(process.env.SENDGRID_API_KEY);
    const jsonPayload = {
      from_email: fromEmail,
      to_email: email,
      template_name: "OTP_EMAIL_TEMPLATE",
      year: currentYear
    };

    try {
      await external_axios_default.a.post(`${process.env.API_PROXY}/email/send/otp`, jsonPayload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: EMAIL_SEND_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: EMAIL_SEND_FAILURE
      });
    }
  }; // Send the contact us email


  const sendContactUsEmail = async (email, message) => {
    setToken(process.env.SENDGRID_API_KEY);
    var emailBody = `${email} wrote: \n\n${message}`;
    const jsonPayload = {
      from_email: fromEmail,
      to_email: fromEmail,
      body: emailBody
    };

    try {
      const res = await external_axios_default.a.post(`${process.env.API_PROXY}/email/send/contact`, jsonPayload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: EMAIL_SEND_SUCCESS,
        payload: res.data
      });
      setTimeout(() => dispatch({
        type: CLEAR_MESSAGE
      }), 5000);
    } catch (error) {
      dispatch({
        type: EMAIL_SEND_FAILURE,
        payload: res.data
      });
      setTimeout(() => dispatch({
        type: CLEAR_MESSAGE
      }), 5000);
    }
  }; // Complete the user's email verification process


  const verifyEmail = async token => {
    const utcTime = new Date().toJSON();

    try {
      const res = await external_axios_default.a.put(`${process.env.API_PROXY}/user/emailverification/${token}`, {
        timestamp: utcTime
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: EMAIL_VERIFICATION_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EMAIL_VERIFICATION_FAIL,
        payload: err.response.data.detail
      });
    }
  }; // Method for forgot password - email validation


  const validateEmail = async email => {
    try {
      const res = await external_axios_default.a.get(`${process.env.API_PROXY}/user/validate_email/${email}`);
      dispatch({
        type: EMAIL_FOUND,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EMAIL_NOT_FOUND,
        payload: err.response.data.detail
      });
      setTimeout(() => dispatch({
        type: CLEAR_ERROR
      }), 5000);
    }
  }; // Method for forgot password - otp generation


  const generateOtp = async (id, email) => {
    const jsonPayload = {
      id: id,
      email: email
    };

    try {
      await external_axios_default.a.put(`${process.env.API_PROXY}/user/otp_generation`, jsonPayload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: OTP_GENERATED_SUCCESS
      });
    } catch (err) {
      dispatch({
        type: OTP_GENERATED_FAILURE,
        payload: err.response.data.detail
      });
    }
  }; // Method for forgot password - otp generation


  const validateOtp = async (id, otp) => {
    const utcTime = new Date().toJSON();

    try {
      await external_axios_default.a.get(`${process.env.API_PROXY}/user/verify_otp/${id}?otp=${otp}&timestamp=${utcTime}`);
      dispatch({
        type: OTP_VALIDATED_SUCCESS
      });
    } catch (err) {
      dispatch({
        type: OTP_VALIDATED_FAILURE,
        payload: err.response.data.detail
      });
      setTimeout(() => dispatch({
        type: CLEAR_ERROR
      }), 5000);
    }
  }; // Method for forgot password - password update


  const updatePassword = async (password, userId) => {
    const jsonPayload = {
      password: password
    };

    try {
      await external_axios_default.a.put(`${process.env.API_PROXY}/user/password/${userId}`, jsonPayload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_CHANGE_FAILURE,
        payload: err.response.data.detail
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  return AuthState_jsx(authContext["a" /* default */].Provider, {
    value: {
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
      logout
    }
  }, props.children);
};

/* harmony default export */ var auth_AuthState = (AuthState);
// EXTERNAL MODULE: external "framer-motion"
var external_framer_motion_ = __webpack_require__("wmQq");

// CONCATENATED MODULE: ./pages/_app.js

var _app_jsx = external_react_default.a.createElement;





const pageVariants = {
  pageInitial: {
    opacity: 0
  },
  pageAnimate: {
    opacity: 1
  }
};
function MyApp({
  Component,
  pageProps,
  router
}) {
  return _app_jsx(external_framer_motion_["motion"].div, {
    key: router.route,
    variants: pageVariants,
    initial: "pageInitial",
    animate: "pageAnimate"
  }, _app_jsx(auth_AuthState, null, _app_jsx(site_SiteState, null, _app_jsx(Component, pageProps))));
}

/***/ }),

/***/ "IYH+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const authContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])();
/* harmony default export */ __webpack_exports__["a"] = (authContext);

/***/ }),

/***/ "RE4Q":
/***/ (function(module, exports) {

module.exports = require("universal-cookie");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "vJJZ":
/***/ (function(module, exports) {



/***/ }),

/***/ "vn1b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const siteContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])();
/* harmony default export */ __webpack_exports__["a"] = (siteContext);

/***/ }),

/***/ "wmQq":
/***/ (function(module, exports) {

module.exports = require("framer-motion");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });