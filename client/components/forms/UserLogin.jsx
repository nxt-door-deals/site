import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { greeting } from "../../utils/greeting";
import cookie from "../../utils/cookieInit";
import keys from "../../utils/keys";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faExclamationTriangle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// Component imports
import Alert from "../page_components/common/Alert";
import BouncingBalls from "../loaders/BouncingBalls";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#__next");

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
  const [modalOpen, setModalOpen] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const {
    loginUser,
    isAuthenticated,
    loadUser,
    user,
    loginCount,
    getLoginCount,
    authError,
  } = authContext;

  useEffect(() => {
    if (loginCount && loginCount >= 5) {
      setModalOpen(true);
      setTimeout(() => router.push("/forgotpassword"), 6000);
    }
  }, [loginCount]);

  useEffect(() => {
    if (isAuthenticated) {
      // if (!cookie.get("nddToken")) {
      //   createCookie(token);
      // }

      // Delay user load until cookie is created (auth issue in Firefox mobile ios
      setTimeout(() => loadUser(), 1000);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user && user !== null) {
      if (typeof window !== "undefined") {
        localStorage.setItem("nddUser", user.id);
      }

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
                "+" +
                chatCookie["_slrId"] +
                "+" +
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

  const handleInvalidLoginCounts = (email) => {
    getLoginCount(email);
  };

  return (
    <div className="flex justify-center items-center h-screen lg:bg-login-background lg:bg-cover lg:bg-no-repeat overflow-hidden -z-20 lg:pt-16">
      <div className="mt-20 lg:mt-10 rounded-3xl shadow-boxshadowregister bg-white p-3 py-8 lg:p-8 mb-10">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            loginUser(values.email, values.password);
            setTimeout(() => handleInvalidLoginCounts(values.email), 1000);
            setTimeout(() => setSubmitting(false), 2000);
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
                      ? "mb-1 error-border shadow-none"
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
                    className="font-axiforma text-xs error-text p-1 mb-2"
                    id="email-error"
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                    {props.errors.email}
                  </div>
                ) : null}

                <div
                  className={`"flex items-center justify-center border-2 rounded-xl " ${
                    props.touched.password && props.errors.password
                      ? "mb-1 error-border shadow-none"
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
                    className="font-axiforma text-xs error-text p-1 mt-1 mb-2 "
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
                    className={`mt-2 mb-8 w-80 md:w-100 h-12 bg-purple-700 shadow-buttonShadowPurple text-white font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                      props.isSubmitting ||
                      (loginCount && loginCount >= 5 && "cursor-not-allowed")
                    }`}
                    disabled={
                      props.isSubmitting ||
                      isAuthenticated ||
                      (loginCount && loginCount >= 5)
                    }
                  >
                    {!props.isSubmitting && !isAuthenticated ? (
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

      <Modal
        style={{
          overlay: {
            zIndex: 99999,
            opacity: 1,
          },
        }}
        isOpen={modalOpen}
        shouldFocusAfterRender={true}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setModalOpen(false)}
        className="flex justify-center items-center h-screen px-10"
      >
        <div className="bg-white border-2 p-5 lg:p-10 lg:text-lg text-center tracking-wide">
          <Image
            src={"/images/login/forgot-password.svg"}
            alt={"reset password"}
            height={150}
            width={150}
          />
          <p className="mt-3">
            Hey there! Looks like you need some help with your password. Let's
            reset it. It's quick!
          </p>
          <p className="flex mt-5 justify-center">
            Hang tight
            <ul className="flex">
              <motion.li
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                .
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.51, repeat: Infinity }}
              >
                .
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.52, repeat: Infinity }}
              >
                .
              </motion.li>
            </ul>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default UserLogin;
