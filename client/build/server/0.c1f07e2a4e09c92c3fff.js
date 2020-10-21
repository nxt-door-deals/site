exports.ids = [0];
exports.modules = {

/***/ "mzvJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_auth_authContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("IYH+");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wmQq");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const AlreadyLoggedIn = () => {
  const authContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_context_auth_authContext__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
  const {
    loadUser,
    user,
    logout
  } = authContext;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    loadUser();
  }, []);

  const homeClick = () => {
    next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push("/");
  };

  return __jsx(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, __jsx("div", {
    className: "pt-28 pr-20 pb-10 pl-20 text-center font-axiforma text-xl text-gray-600"
  }, __jsx("h1", null, "Hello,", " ", __jsx("span", {
    className: "text-brand-purple font-semibold"
  }, user !== null ? user.name : "friend"), "! You are seeing this page because you are already logged in. Please logout if you want to register or login as another user.")), __jsx("div", {
    className: "flex justify-center p-5 pt-3"
  }, __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__["motion"].button, {
    className: "w-48 h-12 rounded-lg bg-purple-500 text-white uppercase font-bold text-center tracking-wide cursor-pointer mr-4 focus:outline-none border-none",
    whileTap: {
      backgroundColor: "#D6BCFA",
      color: "#550052",
      y: "5px"
    },
    onClick: homeClick,
    "aria-label": "Home button"
  }, "Home"), __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_3__["motion"].button, {
    type: "button",
    className: "w-48 h-12 rounded-lg bg-pink-500 text-white uppercase font-bold text-center tracking-wide cursor-pointer mr-4 focus:outline-none border-none",
    whileTap: {
      backgroundColor: "#FED7E2",
      color: "#550052",
      y: "5px"
    },
    onClick: () => {
      logout();
      next_router__WEBPACK_IMPORTED_MODULE_2___default.a.push("/login");
    },
    "aria-label": "Logout button"
  }, "Logout")), __jsx("div", {
    className: "flex justify-center mt-12"
  }, __jsx("img", {
    src: "/images/logout/detective.svg",
    alt: "Exploring the site",
    width: "300px",
    height: "300px"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (AlreadyLoggedIn);

/***/ })

};;