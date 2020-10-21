webpackHotUpdate_N_E("pages/_app",{

/***/ "./context/auth/AuthState.jsx":
/*!************************************!*\
  !*** ./context/auth/AuthState.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _authReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authReducer */ "./context/auth/authReducer.jsx");
/* harmony import */ var _authContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authContext */ "./context/auth/authContext.jsx");
/* harmony import */ var _utils_setToken__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/setToken */ "./utils/setToken.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! universal-cookie */ "./node_modules/universal-cookie/es6/index.js");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Types */ "./context/Types.jsx");



var _this = undefined,
    _jsxFileName = "C:\\nxt_door_deals\\site\\client\\context\\auth\\AuthState.jsx",
    _s = $RefreshSig$();

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;







var cookie = new universal_cookie__WEBPACK_IMPORTED_MODULE_7__["default"](); // Will be used in the copyright section in the email footer

var currentYear = new Date().getFullYear(); // Email sender

var fromEmail = process.env.FROM_EMAIL;

var AuthState = function AuthState(props) {
  _s();

  var initialState = {
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

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_2__["useReducer"])(_authReducer__WEBPACK_IMPORTED_MODULE_3__["default"], initialState),
      state = _useReducer[0],
      dispatch = _useReducer[1]; // Register user


  var registerUser = /*#__PURE__*/function () {
    var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(name, email) {
      var mobile,
          password,
          apartment,
          jsonPayload,
          _res,
          _args = arguments;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mobile = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
              password = _args.length > 3 ? _args[3] : undefined;
              apartment = _args.length > 4 ? _args[4] : undefined;
              jsonPayload = {
                name: name,
                email: email,
                mobile: mobile,
                password: password,
                apartment_id: apartment
              };
              _context.prev = 4;
              _context.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.post("".concat(process.env.API_PROXY, "/register/user"), jsonPayload, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 7:
              _res = _context.sent;
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["REGISTER_SUCCESS"],
                payload: _res.data
              });
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](4);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["REGISTER_FAIL"],
                payload: _context.t0.response.data.detail
              });
              setTimeout(function () {
                return dispatch({
                  type: _Types__WEBPACK_IMPORTED_MODULE_8__["CLEAR_ERROR"]
                });
              }, 5000);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 11]]);
    }));

    return function registerUser(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(); // Load user


  var loadUser = /*#__PURE__*/function () {
    var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var _res2;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (cookie.get("nddToken")) {
                Object(_utils_setToken__WEBPACK_IMPORTED_MODULE_5__["default"])(cookie.get("nddToken"));
              }

              _context2.prev = 1;
              _context2.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.get("".concat(process.env.API_PROXY, "/auth/current_user"));

            case 4:
              _res2 = _context2.sent;
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["USER_LOADED"],
                payload: _res2.data
              });
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["AUTH_ERROR"],
                payload: _context2.t0.message
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    return function loadUser() {
      return _ref2.apply(this, arguments);
    };
  }(); // User login


  var loginUser = /*#__PURE__*/function () {
    var _ref3 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(email, password) {
      var formData, _res3;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              formData = new FormData();
              formData.set("username", email);
              formData.set("password", password);
              _context3.prev = 3;
              _context3.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.post("".concat(process.env.API_PROXY, "/auth"), formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });

            case 6:
              _res3 = _context3.sent;
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["LOGIN_SUCCESS"],
                payload: _res3.data
              });
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](3);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["LOGIN_FAIL"],
                payload: _context3.t0.response.data.detail
              });
              setTimeout(function () {
                return dispatch({
                  type: _Types__WEBPACK_IMPORTED_MODULE_8__["CLEAR_ERROR"]
                });
              }, 5000);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 10]]);
    }));

    return function loginUser(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }(); // Send email - user registration, welcome etc...


  var sendEmail = /*#__PURE__*/function () {
    var _ref4 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(name, email, verificationUrl) {
      var jsonPayload;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              Object(_utils_setToken__WEBPACK_IMPORTED_MODULE_5__["default"])(process.env.SENDGRID_API_KEY);
              jsonPayload = {
                from_email: fromEmail,
                to_email: email,
                template_name: "VERIFY_EMAIL_TEMPLATE",
                name: name,
                verificationurl: verificationUrl,
                year: currentYear
              };
              _context4.prev = 2;
              _context4.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.post("".concat(process.env.API_PROXY, "/email/send"), jsonPayload, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 5:
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_SEND_SUCCESS"]
              });
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](2);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_SEND_FAILURE"]
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 8]]);
    }));

    return function sendEmail(_x5, _x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }(); // Refresh the email verification timestamp


  var updateEmailVerificationTimestamp = /*#__PURE__*/function () {
    var _ref5 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(id) {
      var jsonPayload;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              jsonPayload = {
                id: id
              };
              _context5.prev = 1;
              _context5.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.put("".concat(process.env.API_PROXY, "/email_timestamp/refresh"), jsonPayload, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 4:
              dispatch({
                type: null
              });
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](1);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_VERIFICATION_TIMESTAMP_UPDATED"],
                payload: _context5.t0.response.data.detail
              });

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 7]]);
    }));

    return function updateEmailVerificationTimestamp(_x8) {
      return _ref5.apply(this, arguments);
    };
  }(); // Email the otp to the user during password change


  var sendOtpByEmail = /*#__PURE__*/function () {
    var _ref6 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(email) {
      var jsonPayload;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              Object(_utils_setToken__WEBPACK_IMPORTED_MODULE_5__["default"])(process.env.SENDGRID_API_KEY);
              jsonPayload = {
                from_email: fromEmail,
                to_email: email,
                template_name: "OTP_EMAIL_TEMPLATE",
                year: currentYear
              };
              _context6.prev = 2;
              _context6.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.post("".concat(process.env.API_PROXY, "/email/send/otp"), jsonPayload, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 5:
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_SEND_SUCCESS"]
              });
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](2);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_SEND_FAILURE"]
              });

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 8]]);
    }));

    return function sendOtpByEmail(_x9) {
      return _ref6.apply(this, arguments);
    };
  }(); // Send the contact us email


  var sendContactUsEmail = /*#__PURE__*/function () {
    var _ref7 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(email, message) {
      var emailBody, jsonPayload, _res4;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              Object(_utils_setToken__WEBPACK_IMPORTED_MODULE_5__["default"])(process.env.SENDGRID_API_KEY);
              emailBody = "".concat(email, " wrote: \n\n").concat(message);
              jsonPayload = {
                from_email: fromEmail,
                to_email: fromEmail,
                body: emailBody
              };
              _context7.prev = 3;
              _context7.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.post("".concat(process.env.API_PROXY, "/email/send/contact"), jsonPayload, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 6:
              _res4 = _context7.sent;
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_SEND_SUCCESS"],
                payload: _res4.data
              });
              setTimeout(function () {
                return dispatch({
                  type: _Types__WEBPACK_IMPORTED_MODULE_8__["CLEAR_MESSAGE"]
                });
              }, 5000);
              _context7.next = 15;
              break;

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](3);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_SEND_FAILURE"],
                payload: res.data
              });
              setTimeout(function () {
                return dispatch({
                  type: _Types__WEBPACK_IMPORTED_MODULE_8__["CLEAR_MESSAGE"]
                });
              }, 5000);

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[3, 11]]);
    }));

    return function sendContactUsEmail(_x10, _x11) {
      return _ref7.apply(this, arguments);
    };
  }(); // Complete the user's email verification process


  var verifyEmail = /*#__PURE__*/function () {
    var _ref8 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(token) {
      var utcTime, _res5;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              utcTime = new Date().toJSON();
              _context8.prev = 1;
              _context8.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.put("".concat(process.env.API_PROXY, "/user/emailverification/").concat(token), {
                timestamp: utcTime
              }, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 4:
              _res5 = _context8.sent;
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_VERIFICATION_SUCCESS"],
                payload: _res5.data
              });
              _context8.next = 11;
              break;

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](1);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_VERIFICATION_FAIL"],
                payload: _context8.t0.response.data.detail
              });

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[1, 8]]);
    }));

    return function verifyEmail(_x12) {
      return _ref8.apply(this, arguments);
    };
  }(); // Method for forgot password - email validation


  var validateEmail = /*#__PURE__*/function () {
    var _ref9 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(email) {
      var _res6;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.get("".concat(process.env.API_PROXY, "/user/validate_email/").concat(email));

            case 3:
              _res6 = _context9.sent;
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_FOUND"],
                payload: _res6.data
              });
              _context9.next = 11;
              break;

            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["EMAIL_NOT_FOUND"],
                payload: _context9.t0.response.data.detail
              });
              setTimeout(function () {
                return dispatch({
                  type: _Types__WEBPACK_IMPORTED_MODULE_8__["CLEAR_ERROR"]
                });
              }, 5000);

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 7]]);
    }));

    return function validateEmail(_x13) {
      return _ref9.apply(this, arguments);
    };
  }(); // Method for forgot password - otp generation


  var generateOtp = /*#__PURE__*/function () {
    var _ref10 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(id, email) {
      var jsonPayload;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              jsonPayload = {
                id: id,
                email: email
              };
              _context10.prev = 1;
              _context10.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.put("".concat(process.env.API_PROXY, "/user/otp_generation"), jsonPayload, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 4:
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["OTP_GENERATED_SUCCESS"]
              });
              _context10.next = 10;
              break;

            case 7:
              _context10.prev = 7;
              _context10.t0 = _context10["catch"](1);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["OTP_GENERATED_FAILURE"],
                payload: _context10.t0.response.data.detail
              });

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[1, 7]]);
    }));

    return function generateOtp(_x14, _x15) {
      return _ref10.apply(this, arguments);
    };
  }(); // Method for forgot password - otp generation


  var validateOtp = /*#__PURE__*/function () {
    var _ref11 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(id, otp) {
      var utcTime;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              utcTime = new Date().toJSON();
              _context11.prev = 1;
              _context11.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.get("".concat(process.env.API_PROXY, "/user/verify_otp/").concat(id, "?otp=").concat(otp, "&timestamp=").concat(utcTime));

            case 4:
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["OTP_VALIDATED_SUCCESS"]
              });
              _context11.next = 11;
              break;

            case 7:
              _context11.prev = 7;
              _context11.t0 = _context11["catch"](1);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["OTP_VALIDATED_FAILURE"],
                payload: _context11.t0.response.data.detail
              });
              setTimeout(function () {
                return dispatch({
                  type: _Types__WEBPACK_IMPORTED_MODULE_8__["CLEAR_ERROR"]
                });
              }, 5000);

            case 11:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[1, 7]]);
    }));

    return function validateOtp(_x16, _x17) {
      return _ref11.apply(this, arguments);
    };
  }(); // Method for forgot password - password update


  var updatePassword = /*#__PURE__*/function () {
    var _ref12 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee12(password, userId) {
      var jsonPayload;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              jsonPayload = {
                password: password
              };
              _context12.prev = 1;
              _context12.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_6___default.a.put("".concat(process.env.API_PROXY, "/user/password/").concat(userId), jsonPayload, {
                headers: {
                  "Content-Type": "application/json"
                }
              });

            case 4:
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["PASSWORD_CHANGE_SUCCESS"]
              });
              _context12.next = 10;
              break;

            case 7:
              _context12.prev = 7;
              _context12.t0 = _context12["catch"](1);
              dispatch({
                type: _Types__WEBPACK_IMPORTED_MODULE_8__["PASSWORD_CHANGE_FAILURE"],
                payload: _context12.t0.response.data.detail
              });

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[1, 7]]);
    }));

    return function updatePassword(_x18, _x19) {
      return _ref12.apply(this, arguments);
    };
  }();

  var logout = function logout() {
    dispatch({
      type: _Types__WEBPACK_IMPORTED_MODULE_8__["LOGOUT"]
    });
  };

  return __jsx(_authContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
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
      registerUser: registerUser,
      loginUser: loginUser,
      loadUser: loadUser,
      sendEmail: sendEmail,
      sendOtpByEmail: sendOtpByEmail,
      verifyEmail: verifyEmail,
      validateEmail: validateEmail,
      updateEmailVerificationTimestamp: updateEmailVerificationTimestamp,
      sendContactUsEmail: sendContactUsEmail,
      generateOtp: generateOtp,
      validateOtp: validateOtp,
      updatePassword: updatePassword,
      logout: logout
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 358,
      columnNumber: 5
    }
  }, props.children);
};

_s(AuthState, "6JWkGZ32UPfojeNx+xqn8ZU8A0Q=");

_c = AuthState;
/* harmony default export */ __webpack_exports__["default"] = (AuthState);

var _c;

$RefreshReg$(_c, "AuthState");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29udGV4dC9hdXRoL0F1dGhTdGF0ZS5qc3giXSwibmFtZXMiOlsiY29va2llIiwiQ29va2llcyIsImN1cnJlbnRZZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwiZnJvbUVtYWlsIiwicHJvY2VzcyIsImVudiIsIkZST01fRU1BSUwiLCJBdXRoU3RhdGUiLCJwcm9wcyIsImluaXRpYWxTdGF0ZSIsInRva2VuIiwiaXNBdXRoZW50aWNhdGVkIiwidXNlciIsImxvYWRpbmciLCJhdXRoRXJyb3IiLCJlbWFpbFZlcmlmaWVkIiwidmVyaWZpY2F0aW9uU3RhdHVzIiwiZW1haWxTZW50Iiwib3RwR2VuZXJhdGVkIiwib3RwVmFsaWRhdGVkIiwicGFzc3dvcmRDaGFuZ2VkIiwiZ2VuZXJpY01lc3NhZ2UiLCJ1c2VSZWR1Y2VyIiwiYXV0aFJlZHVjZXIiLCJzdGF0ZSIsImRpc3BhdGNoIiwicmVnaXN0ZXJVc2VyIiwibmFtZSIsImVtYWlsIiwibW9iaWxlIiwicGFzc3dvcmQiLCJhcGFydG1lbnQiLCJqc29uUGF5bG9hZCIsImFwYXJ0bWVudF9pZCIsImF4aW9zIiwicG9zdCIsIkFQSV9QUk9YWSIsImhlYWRlcnMiLCJyZXMiLCJ0eXBlIiwiUkVHSVNURVJfU1VDQ0VTUyIsInBheWxvYWQiLCJkYXRhIiwiUkVHSVNURVJfRkFJTCIsInJlc3BvbnNlIiwiZGV0YWlsIiwic2V0VGltZW91dCIsIkNMRUFSX0VSUk9SIiwibG9hZFVzZXIiLCJnZXQiLCJzZXRBdXRoVG9rZW4iLCJVU0VSX0xPQURFRCIsIkFVVEhfRVJST1IiLCJtZXNzYWdlIiwibG9naW5Vc2VyIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsInNldCIsIkxPR0lOX1NVQ0NFU1MiLCJMT0dJTl9GQUlMIiwic2VuZEVtYWlsIiwidmVyaWZpY2F0aW9uVXJsIiwiU0VOREdSSURfQVBJX0tFWSIsImZyb21fZW1haWwiLCJ0b19lbWFpbCIsInRlbXBsYXRlX25hbWUiLCJ2ZXJpZmljYXRpb251cmwiLCJ5ZWFyIiwiRU1BSUxfU0VORF9TVUNDRVNTIiwiRU1BSUxfU0VORF9GQUlMVVJFIiwidXBkYXRlRW1haWxWZXJpZmljYXRpb25UaW1lc3RhbXAiLCJpZCIsInB1dCIsIkVNQUlMX1ZFUklGSUNBVElPTl9USU1FU1RBTVBfVVBEQVRFRCIsInNlbmRPdHBCeUVtYWlsIiwic2VuZENvbnRhY3RVc0VtYWlsIiwiZW1haWxCb2R5IiwiYm9keSIsIkNMRUFSX01FU1NBR0UiLCJ2ZXJpZnlFbWFpbCIsInV0Y1RpbWUiLCJ0b0pTT04iLCJ0aW1lc3RhbXAiLCJFTUFJTF9WRVJJRklDQVRJT05fU1VDQ0VTUyIsIkVNQUlMX1ZFUklGSUNBVElPTl9GQUlMIiwidmFsaWRhdGVFbWFpbCIsIkVNQUlMX0ZPVU5EIiwiRU1BSUxfTk9UX0ZPVU5EIiwiZ2VuZXJhdGVPdHAiLCJPVFBfR0VORVJBVEVEX1NVQ0NFU1MiLCJPVFBfR0VORVJBVEVEX0ZBSUxVUkUiLCJ2YWxpZGF0ZU90cCIsIm90cCIsIk9UUF9WQUxJREFURURfU1VDQ0VTUyIsIk9UUF9WQUxJREFURURfRkFJTFVSRSIsInVwZGF0ZVBhc3N3b3JkIiwidXNlcklkIiwiUEFTU1dPUkRfQ0hBTkdFX1NVQ0NFU1MiLCJQQVNTV09SRF9DSEFOR0VfRkFJTFVSRSIsImxvZ291dCIsIkxPR09VVCIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUF5QkEsSUFBTUEsTUFBTSxHQUFHLElBQUlDLHdEQUFKLEVBQWYsQyxDQUVBOztBQUNBLElBQUlDLFdBQVcsR0FBRyxJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFBbEIsQyxDQUVBOztBQUNBLElBQU1DLFNBQVMsR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFVBQTlCOztBQUVBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLEtBQUQsRUFBVztBQUFBOztBQUMzQixNQUFN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QUFLLENBQUNQLFNBUlo7QUFTTEMsa0JBQVksRUFBRU0sS0FBSyxDQUFDTixZQVRmO0FBVUxDLGtCQUFZLEVBQUVLLEtBQUssQ0FBQ0wsWUFWZjtBQVdMQyxxQkFBZSxFQUFFSSxLQUFLLENBQUNKLGVBWGxCO0FBWUxDLG9CQUFjLEVBQUVHLEtBQUssQ0FBQ0gsY0FaakI7QUFhTEssa0JBQVksRUFBWkEsWUFiSztBQWNMNEIsZUFBUyxFQUFUQSxTQWRLO0FBZUxOLGNBQVEsRUFBUkEsUUFmSztBQWdCTFksZUFBUyxFQUFUQSxTQWhCSztBQWlCTGMsb0JBQWMsRUFBZEEsY0FqQks7QUFrQkxLLGlCQUFXLEVBQVhBLFdBbEJLO0FBbUJMTSxtQkFBYSxFQUFiQSxhQW5CSztBQW9CTGYsc0NBQWdDLEVBQWhDQSxnQ0FwQks7QUFxQkxLLHdCQUFrQixFQUFsQkEsa0JBckJLO0FBc0JMYSxpQkFBVyxFQUFYQSxXQXRCSztBQXVCTEcsaUJBQVcsRUFBWEEsV0F2Qks7QUF3QkxJLG9CQUFjLEVBQWRBLGNBeEJLO0FBeUJMSSxZQUFNLEVBQU5BO0FBekJLLEtBRFQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQTZCRzNGLEtBQUssQ0FBQzZGLFFBN0JULENBREY7QUFpQ0QsQ0E3VkQ7O0dBQU05RixTOztLQUFBQSxTO0FBK1ZTQSx3RUFBZiIsImZpbGUiOiJzdGF0aWMvd2VicGFjay9wYWdlcy9fYXBwLmEzNDZkNWIxZGY5MzA4ZjhlODNiLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgYXV0aFJlZHVjZXIgZnJvbSBcIi4vYXV0aFJlZHVjZXJcIjtcclxuaW1wb3J0IEF1dGhDb250ZXh0IGZyb20gXCIuL2F1dGhDb250ZXh0XCI7XHJcbmltcG9ydCBzZXRBdXRoVG9rZW4gZnJvbSBcIi4uLy4uL3V0aWxzL3NldFRva2VuXCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IENvb2tpZXMgZnJvbSBcInVuaXZlcnNhbC1jb29raWVcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgUkVHSVNURVJfU1VDQ0VTUyxcclxuICBSRUdJU1RFUl9GQUlMLFxyXG4gIExPR0lOX1NVQ0NFU1MsXHJcbiAgTE9HSU5fRkFJTCxcclxuICBVU0VSX0xPQURFRCxcclxuICBBVVRIX0VSUk9SLFxyXG4gIENMRUFSX0VSUk9SLFxyXG4gIENMRUFSX01FU1NBR0UsXHJcbiAgTE9HT1VULFxyXG4gIEVNQUlMX1NFTkRfU1VDQ0VTUyxcclxuICBFTUFJTF9TRU5EX0ZBSUxVUkUsXHJcbiAgRU1BSUxfVkVSSUZJQ0FUSU9OX1NVQ0NFU1MsXHJcbiAgRU1BSUxfVkVSSUZJQ0FUSU9OX0ZBSUwsXHJcbiAgRU1BSUxfRk9VTkQsXHJcbiAgRU1BSUxfTk9UX0ZPVU5ELFxyXG4gIE9UUF9HRU5FUkFURURfU1VDQ0VTUyxcclxuICBPVFBfR0VORVJBVEVEX0ZBSUxVUkUsXHJcbiAgT1RQX1ZBTElEQVRFRF9TVUNDRVNTLFxyXG4gIE9UUF9WQUxJREFURURfRkFJTFVSRSxcclxuICBQQVNTV09SRF9DSEFOR0VfU1VDQ0VTUyxcclxuICBQQVNTV09SRF9DSEFOR0VfRkFJTFVSRSxcclxuICBFTUFJTF9WRVJJRklDQVRJT05fVElNRVNUQU1QX1VQREFURUQsXHJcbn0gZnJvbSBcIi4uL1R5cGVzXCI7XHJcblxyXG5jb25zdCBjb29raWUgPSBuZXcgQ29va2llcygpO1xyXG5cclxuLy8gV2lsbCBiZSB1c2VkIGluIHRoZSBjb3B5cmlnaHQgc2VjdGlvbiBpbiB0aGUgZW1haWwgZm9vdGVyXHJcbnZhciBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbi8vIEVtYWlsIHNlbmRlclxyXG5jb25zdCBmcm9tRW1haWwgPSBwcm9jZXNzLmVudi5GUk9NX0VNQUlMO1xyXG5cclxuY29uc3QgQXV0aFN0YXRlID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgdG9rZW46IG51bGwsXHJcbiAgICBpc0F1dGhlbnRpY2F0ZWQ6IG51bGwsXHJcbiAgICB1c2VyOiBudWxsLFxyXG4gICAgbG9hZGluZzogdHJ1ZSxcclxuICAgIGF1dGhFcnJvcjogbnVsbCxcclxuICAgIGVtYWlsVmVyaWZpZWQ6IG51bGwsXHJcbiAgICB2ZXJpZmljYXRpb25TdGF0dXM6IG51bGwsXHJcbiAgICBlbWFpbFNlbnQ6IG51bGwsXHJcbiAgICBvdHBHZW5lcmF0ZWQ6IG51bGwsXHJcbiAgICBvdHBWYWxpZGF0ZWQ6IG51bGwsXHJcbiAgICBwYXNzd29yZENoYW5nZWQ6IG51bGwsXHJcbiAgICBnZW5lcmljTWVzc2FnZTogbnVsbCxcclxuICB9O1xyXG5cclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIoYXV0aFJlZHVjZXIsIGluaXRpYWxTdGF0ZSk7XHJcblxyXG4gIC8vIFJlZ2lzdGVyIHVzZXJcclxuICBjb25zdCByZWdpc3RlclVzZXIgPSBhc3luYyAoXHJcbiAgICBuYW1lLFxyXG4gICAgZW1haWwsXHJcbiAgICBtb2JpbGUgPSBudWxsLFxyXG4gICAgcGFzc3dvcmQsXHJcbiAgICBhcGFydG1lbnRcclxuICApID0+IHtcclxuICAgIGNvbnN0IGpzb25QYXlsb2FkID0ge1xyXG4gICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgIG1vYmlsZTogbW9iaWxlLFxyXG4gICAgICBwYXNzd29yZDogcGFzc3dvcmQsXHJcbiAgICAgIGFwYXJ0bWVudF9pZDogYXBhcnRtZW50LFxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICAgIGAke3Byb2Nlc3MuZW52LkFQSV9QUk9YWX0vcmVnaXN0ZXIvdXNlcmAsXHJcbiAgICAgICAganNvblBheWxvYWQsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IFJFR0lTVEVSX1NVQ0NFU1MsIHBheWxvYWQ6IHJlcy5kYXRhIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogUkVHSVNURVJfRkFJTCwgcGF5bG9hZDogZXJyLnJlc3BvbnNlLmRhdGEuZGV0YWlsIH0pO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGRpc3BhdGNoKHsgdHlwZTogQ0xFQVJfRVJST1IgfSksIDUwMDApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIExvYWQgdXNlclxyXG4gIGNvbnN0IGxvYWRVc2VyID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGNvb2tpZS5nZXQoXCJuZGRUb2tlblwiKSkge1xyXG4gICAgICBzZXRBdXRoVG9rZW4oY29va2llLmdldChcIm5kZFRva2VuXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoXHJcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuQVBJX1BST1hZfS9hdXRoL2N1cnJlbnRfdXNlcmBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogVVNFUl9MT0FERUQsIHBheWxvYWQ6IHJlcy5kYXRhIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogQVVUSF9FUlJPUiwgcGF5bG9hZDogZXJyLm1lc3NhZ2UgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gVXNlciBsb2dpblxyXG4gIGNvbnN0IGxvZ2luVXNlciA9IGFzeW5jIChlbWFpbCwgcGFzc3dvcmQpID0+IHtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgZm9ybURhdGEuc2V0KFwidXNlcm5hbWVcIiwgZW1haWwpO1xyXG4gICAgZm9ybURhdGEuc2V0KFwicGFzc3dvcmRcIiwgcGFzc3dvcmQpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLnBvc3QoXHJcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuQVBJX1BST1hZfS9hdXRoYCxcclxuICAgICAgICBmb3JtRGF0YSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HSU5fU1VDQ0VTUywgcGF5bG9hZDogcmVzLmRhdGEgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dJTl9GQUlMLCBwYXlsb2FkOiBlcnIucmVzcG9uc2UuZGF0YS5kZXRhaWwgfSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiBDTEVBUl9FUlJPUiB9KSwgNTAwMCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gU2VuZCBlbWFpbCAtIHVzZXIgcmVnaXN0cmF0aW9uLCB3ZWxjb21lIGV0Yy4uLlxyXG4gIGNvbnN0IHNlbmRFbWFpbCA9IGFzeW5jIChuYW1lLCBlbWFpbCwgdmVyaWZpY2F0aW9uVXJsKSA9PiB7XHJcbiAgICBzZXRBdXRoVG9rZW4ocHJvY2Vzcy5lbnYuU0VOREdSSURfQVBJX0tFWSk7XHJcblxyXG4gICAgY29uc3QganNvblBheWxvYWQgPSB7XHJcbiAgICAgIGZyb21fZW1haWw6IGZyb21FbWFpbCxcclxuICAgICAgdG9fZW1haWw6IGVtYWlsLFxyXG4gICAgICB0ZW1wbGF0ZV9uYW1lOiBcIlZFUklGWV9FTUFJTF9URU1QTEFURVwiLFxyXG4gICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICB2ZXJpZmljYXRpb251cmw6IHZlcmlmaWNhdGlvblVybCxcclxuICAgICAgeWVhcjogY3VycmVudFllYXIsXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGF4aW9zLnBvc3QoXHJcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuQVBJX1BST1hZfS9lbWFpbC9zZW5kYCxcclxuICAgICAgICBqc29uUGF5bG9hZCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogRU1BSUxfU0VORF9TVUNDRVNTIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBFTUFJTF9TRU5EX0ZBSUxVUkUgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gUmVmcmVzaCB0aGUgZW1haWwgdmVyaWZpY2F0aW9uIHRpbWVzdGFtcFxyXG4gIGNvbnN0IHVwZGF0ZUVtYWlsVmVyaWZpY2F0aW9uVGltZXN0YW1wID0gYXN5bmMgKGlkKSA9PiB7XHJcbiAgICBjb25zdCBqc29uUGF5bG9hZCA9IHsgaWQ6IGlkIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgYXhpb3MucHV0KFxyXG4gICAgICAgIGAke3Byb2Nlc3MuZW52LkFQSV9QUk9YWX0vZW1haWxfdGltZXN0YW1wL3JlZnJlc2hgLFxyXG4gICAgICAgIGpzb25QYXlsb2FkLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogbnVsbCB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogRU1BSUxfVkVSSUZJQ0FUSU9OX1RJTUVTVEFNUF9VUERBVEVELFxyXG4gICAgICAgIHBheWxvYWQ6IGVyci5yZXNwb25zZS5kYXRhLmRldGFpbCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gRW1haWwgdGhlIG90cCB0byB0aGUgdXNlciBkdXJpbmcgcGFzc3dvcmQgY2hhbmdlXHJcbiAgY29uc3Qgc2VuZE90cEJ5RW1haWwgPSBhc3luYyAoZW1haWwpID0+IHtcclxuICAgIHNldEF1dGhUb2tlbihwcm9jZXNzLmVudi5TRU5ER1JJRF9BUElfS0VZKTtcclxuXHJcbiAgICBjb25zdCBqc29uUGF5bG9hZCA9IHtcclxuICAgICAgZnJvbV9lbWFpbDogZnJvbUVtYWlsLFxyXG4gICAgICB0b19lbWFpbDogZW1haWwsXHJcbiAgICAgIHRlbXBsYXRlX25hbWU6IFwiT1RQX0VNQUlMX1RFTVBMQVRFXCIsXHJcbiAgICAgIHllYXI6IGN1cnJlbnRZZWFyLFxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICAgIGAke3Byb2Nlc3MuZW52LkFQSV9QUk9YWX0vZW1haWwvc2VuZC9vdHBgLFxyXG4gICAgICAgIGpzb25QYXlsb2FkLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBFTUFJTF9TRU5EX1NVQ0NFU1MgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IEVNQUlMX1NFTkRfRkFJTFVSRSB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBTZW5kIHRoZSBjb250YWN0IHVzIGVtYWlsXHJcbiAgY29uc3Qgc2VuZENvbnRhY3RVc0VtYWlsID0gYXN5bmMgKGVtYWlsLCBtZXNzYWdlKSA9PiB7XHJcbiAgICBzZXRBdXRoVG9rZW4ocHJvY2Vzcy5lbnYuU0VOREdSSURfQVBJX0tFWSk7XHJcblxyXG4gICAgdmFyIGVtYWlsQm9keSA9IGAke2VtYWlsfSB3cm90ZTogXFxuXFxuJHttZXNzYWdlfWA7XHJcblxyXG4gICAgY29uc3QganNvblBheWxvYWQgPSB7XHJcbiAgICAgIGZyb21fZW1haWw6IGZyb21FbWFpbCxcclxuICAgICAgdG9fZW1haWw6IGZyb21FbWFpbCxcclxuICAgICAgYm9keTogZW1haWxCb2R5LFxyXG4gICAgfTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICAgIGAke3Byb2Nlc3MuZW52LkFQSV9QUk9YWX0vZW1haWwvc2VuZC9jb250YWN0YCxcclxuICAgICAgICBqc29uUGF5bG9hZCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IEVNQUlMX1NFTkRfU1VDQ0VTUywgcGF5bG9hZDogcmVzLmRhdGEgfSk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiBDTEVBUl9NRVNTQUdFIH0pLCA1MDAwKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogRU1BSUxfU0VORF9GQUlMVVJFLCBwYXlsb2FkOiByZXMuZGF0YSB9KTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBkaXNwYXRjaCh7IHR5cGU6IENMRUFSX01FU1NBR0UgfSksIDUwMDApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIENvbXBsZXRlIHRoZSB1c2VyJ3MgZW1haWwgdmVyaWZpY2F0aW9uIHByb2Nlc3NcclxuICBjb25zdCB2ZXJpZnlFbWFpbCA9IGFzeW5jICh0b2tlbikgPT4ge1xyXG4gICAgY29uc3QgdXRjVGltZSA9IG5ldyBEYXRlKCkudG9KU09OKCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5wdXQoXHJcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuQVBJX1BST1hZfS91c2VyL2VtYWlsdmVyaWZpY2F0aW9uLyR7dG9rZW59YCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aW1lc3RhbXA6IHV0Y1RpbWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcblxyXG4gICAgICBkaXNwYXRjaCh7IHR5cGU6IEVNQUlMX1ZFUklGSUNBVElPTl9TVUNDRVNTLCBwYXlsb2FkOiByZXMuZGF0YSB9KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogRU1BSUxfVkVSSUZJQ0FUSU9OX0ZBSUwsXHJcbiAgICAgICAgcGF5bG9hZDogZXJyLnJlc3BvbnNlLmRhdGEuZGV0YWlsLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBNZXRob2QgZm9yIGZvcmdvdCBwYXNzd29yZCAtIGVtYWlsIHZhbGlkYXRpb25cclxuICBjb25zdCB2YWxpZGF0ZUVtYWlsID0gYXN5bmMgKGVtYWlsKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoXHJcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuQVBJX1BST1hZfS91c2VyL3ZhbGlkYXRlX2VtYWlsLyR7ZW1haWx9YFxyXG4gICAgICApO1xyXG5cclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBFTUFJTF9GT1VORCwgcGF5bG9hZDogcmVzLmRhdGEgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBFTUFJTF9OT1RfRk9VTkQsIHBheWxvYWQ6IGVyci5yZXNwb25zZS5kYXRhLmRldGFpbCB9KTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBkaXNwYXRjaCh7IHR5cGU6IENMRUFSX0VSUk9SIH0pLCA1MDAwKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBNZXRob2QgZm9yIGZvcmdvdCBwYXNzd29yZCAtIG90cCBnZW5lcmF0aW9uXHJcbiAgY29uc3QgZ2VuZXJhdGVPdHAgPSBhc3luYyAoaWQsIGVtYWlsKSA9PiB7XHJcbiAgICBjb25zdCBqc29uUGF5bG9hZCA9IHtcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgICBlbWFpbDogZW1haWwsXHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGF4aW9zLnB1dChcclxuICAgICAgICBgJHtwcm9jZXNzLmVudi5BUElfUFJPWFl9L3VzZXIvb3RwX2dlbmVyYXRpb25gLFxyXG4gICAgICAgIGpzb25QYXlsb2FkLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBPVFBfR0VORVJBVEVEX1NVQ0NFU1MgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IE9UUF9HRU5FUkFURURfRkFJTFVSRSxcclxuICAgICAgICBwYXlsb2FkOiBlcnIucmVzcG9uc2UuZGF0YS5kZXRhaWwsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIE1ldGhvZCBmb3IgZm9yZ290IHBhc3N3b3JkIC0gb3RwIGdlbmVyYXRpb25cclxuICBjb25zdCB2YWxpZGF0ZU90cCA9IGFzeW5jIChpZCwgb3RwKSA9PiB7XHJcbiAgICBjb25zdCB1dGNUaW1lID0gbmV3IERhdGUoKS50b0pTT04oKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGF4aW9zLmdldChcclxuICAgICAgICBgJHtwcm9jZXNzLmVudi5BUElfUFJPWFl9L3VzZXIvdmVyaWZ5X290cC8ke2lkfT9vdHA9JHtvdHB9JnRpbWVzdGFtcD0ke3V0Y1RpbWV9YFxyXG4gICAgICApO1xyXG5cclxuICAgICAgZGlzcGF0Y2goeyB0eXBlOiBPVFBfVkFMSURBVEVEX1NVQ0NFU1MgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IE9UUF9WQUxJREFURURfRkFJTFVSRSxcclxuICAgICAgICBwYXlsb2FkOiBlcnIucmVzcG9uc2UuZGF0YS5kZXRhaWwsXHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IGRpc3BhdGNoKHsgdHlwZTogQ0xFQVJfRVJST1IgfSksIDUwMDApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIE1ldGhvZCBmb3IgZm9yZ290IHBhc3N3b3JkIC0gcGFzc3dvcmQgdXBkYXRlXHJcbiAgY29uc3QgdXBkYXRlUGFzc3dvcmQgPSBhc3luYyAocGFzc3dvcmQsIHVzZXJJZCkgPT4ge1xyXG4gICAgY29uc3QganNvblBheWxvYWQgPSB7XHJcbiAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgYXhpb3MucHV0KFxyXG4gICAgICAgIGAke3Byb2Nlc3MuZW52LkFQSV9QUk9YWX0vdXNlci9wYXNzd29yZC8ke3VzZXJJZH1gLFxyXG4gICAgICAgIGpzb25QYXlsb2FkLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogUEFTU1dPUkRfQ0hBTkdFX1NVQ0NFU1MgfSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFBBU1NXT1JEX0NIQU5HRV9GQUlMVVJFLFxyXG4gICAgICAgIHBheWxvYWQ6IGVyci5yZXNwb25zZS5kYXRhLmRldGFpbCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dPVVQgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlclxyXG4gICAgICB2YWx1ZT17e1xyXG4gICAgICAgIHRva2VuOiBzdGF0ZS50b2tlbixcclxuICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHN0YXRlLmlzQXV0aGVudGljYXRlZCxcclxuICAgICAgICB1c2VyOiBzdGF0ZS51c2VyLFxyXG4gICAgICAgIGxvYWRpbmc6IHN0YXRlLmxvYWRpbmcsXHJcbiAgICAgICAgYXV0aEVycm9yOiBzdGF0ZS5hdXRoRXJyb3IsXHJcbiAgICAgICAgZW1haWxWZXJpZmllZDogc3RhdGUuZW1haWxWZXJpZmllZCxcclxuICAgICAgICB2ZXJpZmljYXRpb25TdGF0dXM6IHN0YXRlLnZlcmlmaWNhdGlvblN0YXR1cyxcclxuICAgICAgICBlbWFpbFNlbnQ6IHN0YXRlLmVtYWlsU2VudCxcclxuICAgICAgICBvdHBHZW5lcmF0ZWQ6IHN0YXRlLm90cEdlbmVyYXRlZCxcclxuICAgICAgICBvdHBWYWxpZGF0ZWQ6IHN0YXRlLm90cFZhbGlkYXRlZCxcclxuICAgICAgICBwYXNzd29yZENoYW5nZWQ6IHN0YXRlLnBhc3N3b3JkQ2hhbmdlZCxcclxuICAgICAgICBnZW5lcmljTWVzc2FnZTogc3RhdGUuZ2VuZXJpY01lc3NhZ2UsXHJcbiAgICAgICAgcmVnaXN0ZXJVc2VyLFxyXG4gICAgICAgIGxvZ2luVXNlcixcclxuICAgICAgICBsb2FkVXNlcixcclxuICAgICAgICBzZW5kRW1haWwsXHJcbiAgICAgICAgc2VuZE90cEJ5RW1haWwsXHJcbiAgICAgICAgdmVyaWZ5RW1haWwsXHJcbiAgICAgICAgdmFsaWRhdGVFbWFpbCxcclxuICAgICAgICB1cGRhdGVFbWFpbFZlcmlmaWNhdGlvblRpbWVzdGFtcCxcclxuICAgICAgICBzZW5kQ29udGFjdFVzRW1haWwsXHJcbiAgICAgICAgZ2VuZXJhdGVPdHAsXHJcbiAgICAgICAgdmFsaWRhdGVPdHAsXHJcbiAgICAgICAgdXBkYXRlUGFzc3dvcmQsXHJcbiAgICAgICAgbG9nb3V0LFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7cHJvcHMuY2hpbGRyZW59XHJcbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRoU3RhdGU7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=