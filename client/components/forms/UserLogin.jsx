import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { greeting } from "../../utils/greeting";
import cookie from "../../utils/cookieInit";
import keys from "../../utils/keys";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// Component imports
import Alert from "../utils/Alert";
import BouncingBalls from "../loaders/BouncingBalls";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your registered email id")
    .email("Please enter a valid email id")
    .trim(),

  password: Yup.string().required("Please enter your password").trim(),
});

const variants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
};

const alertTheme = "bg-purple-200 text-brand-purple";

// Greeting toast
const greetingToast = (message) =>
  toast(`${message}`, {
    draggablePercent: 60,
    position: "top-center",
  });

const UserLogin = (props) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const {
    loginUser,
    isAuthenticated,
    loadUser,
    user,
    authError,
    token,
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      var d = new Date();
      d.setMinutes(d.getMinutes() + 1440);

      cookie.set("nddToken", token, {
        domain: keys.DOMAIN,
        path: "/",
        expires: d,
        sameSite: keys.SAME_SITE_COOKIE_SETTING,
        secure: keys.SECURE_COOKIE,
      });

      // Delay user load until cookie is created (auth issue in Firefox mobile ios)
      setTimeout(() => loadUser(), 1000);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user && user !== null) {
      greetingToast(`${greeting}, ${user && user.name}!`);
      if (props.pathProp === "/chat/[id]") {
        let chatCookie = cookie.get("__redirChatCookie");
        chatCookie["_byrId"] = user.id;

        cookie.set("__redirChatCookie", chatCookie, {
          domain: keys.DOMAIN,
          path: "/",
          sameSite: keys.SAME_SITE_COOKIE_SETTING,
          secure: keys.SECURE_COOKIE,
        });
        setTimeout(
          () =>
            router.push(
              `/chat/${
                chatCookie["_adId"] +
                "-" +
                chatCookie["_slrId"] +
                "-" +
                chatCookie["_byrId"]
              }`
            ),
          1000
        );
      } else if (props.pathProp === "/reportad/[id]") {
        let adCookie = cookie.get("__adCookie");
        let adId = adCookie["_id"];
        cookie.remove("__adCookie");
        setTimeout(() => router.push(`/reportad/${adId}`), 1000);
      } else if (
        props.pathProp === "/account" ||
        props.pathProp === "/postad"
      ) {
        setTimeout(() => router.push(props.pathProp), 1000);
      } else {
        setTimeout(
          () => router.push(`/neighbourhood/ads/${user.apartment_id}`),
          1000
        );
      }
    }
  }, [user]);

  const setPasswordDisplay = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-login-background bg-cover bg-no-repeat overflow-hidden -z-20">
      <div className="font-axiforma rounded-3xl shadow-boxshadowlogin bg-white p-8 mb-4">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            loginUser(values.email, values.password);
            setTimeout(() => setSubmitting(false), 1000);
          }}
        >
          {(props) => (
            <div>
              <h2 className="component-heading">Welcome Back!</h2>
              <Alert authError={authError} alertTheme={alertTheme} />
              <Form>
                <div
                  className={`"flex items-center justify-center border-2 rounded-xl " ${
                    props.touched.email && props.errors.email
                      ? "mb-1 border-red-800 shadow-none"
                      : "mb-8 border-gray-300 focus-within:border-text-purple"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="align-middle text-gray-400 text-lg ml-2"
                  />
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    maxLength="50"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={
                      props.touched.email && props.errors.email ? "true" : null
                    }
                    aria-describedby={
                      props.touched.email && props.errors.email
                        ? "email-error"
                        : null
                    }
                    className="textbox-input w-10/12 placeholder-gray-600 "
                  />
                </div>

                {/* Validation errors */}
                {props.touched.email && props.errors.email ? (
                  <div
                    className="font-axiforma text-xs text-red-800 p-1 mb-2"
                    id="email-error"
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                    {props.errors.email}
                  </div>
                ) : null}

                <div
                  className={`"flex items-center justify-center border-2 rounded-xl " ${
                    props.touched.password && props.errors.password
                      ? "mb-1 border-red-800 shadow-none"
                      : "mb-8 border-gray-300 focus-within:border-text-purple"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faLock}
                    className="inline align-middle fill-current text-gray-400 text-lg ml-2"
                  />
                  <Field
                    id="password"
                    name="password"
                    type={!displayPassword ? "password" : "text"}
                    placeholder="Password"
                    maxLength="50"
                    aria-required="true"
                    aria-invalid={
                      props.touched.password && props.errors.password
                        ? "true"
                        : null
                    }
                    aria-describedby={
                      props.touched.password && props.errors.password
                        ? "password-error"
                        : null
                    }
                    className="textbox-input w-10/12 placeholder-gray-600 "
                  />
                  <FontAwesomeIcon
                    icon={!displayPassword ? faEye : faEyeSlash}
                    className="inline text-sm align-middle top-0 right-0 text-gray-500 cursor-pointer"
                    onClick={setPasswordDisplay}
                    aria-label={
                      !displayPassword ? "Show Password" : "Hide Password"
                    }
                  />
                </div>

                {/* Validation errors */}
                {props.touched.password && props.errors.password ? (
                  <div
                    className="font-axiforma text-xs text-red-800 p-1 mt-1 mb-2 "
                    id="password-error"
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                    {props.errors.password}
                  </div>
                ) : null}

                <div className="font-axiforma text-center mt-4">
                  <motion.button
                    type="submit"
                    variants={variants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`mt-2 mb-8 w-80 md:w-100 h-12 bg-purple-700 shadow-buttonShadowPurple text-white font-axiforma font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                      props.isSubmitting && "cursor-not-allowed"
                    }`}
                    disabled={props.isSubmitting}
                  >
                    {!props.isSubmitting ? (
                      "Login"
                    ) : authError && authError ? (
                      "Login"
                    ) : (
                      <BouncingBalls />
                    )}
                  </motion.button>
                </div>
              </Form>
              <div className="text-center font-axiforma text-purple-600 text-sm tracking-wide">
                <Link href="/forgotpassword">
                  <a className="styled-link pb-1">Forgot password?</a>
                </Link>
              </div>
              <div className="font-axiforma text-purple-600 text-center mt-6 text-sm  lg:text-md">
                Don't have an account?{" "}
                <motion.button
                  className="ml-2 inline bg-opacity-25 bg-purple-400 text-brand-purple p-3 shadow-sm font-semibold rounded-xl focus:outline-none"
                  whileHover={{
                    backgroundColor: "#9F7AEA",
                    color: "#FFFFFF",
                  }}
                  onClick={() => {
                    router.push("/registeruser");
                  }}
                  aria-label="Button for the user registration page"
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserLogin;
