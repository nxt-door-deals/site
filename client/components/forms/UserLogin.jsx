import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import Router from "next/router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// Component imports
import Alert from "../utils/Alert";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your registered email id")
    .email("Please enter a valid email id")
    .trim(),

  password: Yup.string().required("Please enter your password").trim(),
});

const UserLogin = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const { loginUser, isAuthenticated, loadUser, user, authError } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();

      user !== null && Router.push(`/ads/${user.apartment_name}`);
    }
  }, [isAuthenticated, user]);

  const setPasswordDisplay = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <div className="rounded-md shadow-boxshadowlogin z-50 bg-white pt-5 pl-10 pr-10 pb-10">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          loginUser(values.email, values.password);
          setSubmitting(false);
        }}
      >
        {(props) => (
          <div>
            <h2 className="font-axiforma font-bold text-3xl text-center text-brand-gray tracking-wide mb-4">
              Welcome Back!
            </h2>
            <Alert authError={authError} />
            <Form>
              <div
                className={`"flex items-center justify-center relative border-2 rounded-md " ${
                  props.touched.email && props.errors.email
                    ? "mb-1 border-red-800"
                    : "mb-8 border-gray-300"
                }`}
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-2"
                />
                <Field
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  maxLength="50"
                  autoComplete="off"
                  autoFocus=""
                  className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-50"
                />
              </div>

              {/* Validation errors */}
              {props.touched.email && props.errors.email ? (
                <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.email}
                </div>
              ) : null}

              <div
                className={`"flex items-center justify-center relative border-2 rounded-md " ${
                  props.touched.password && props.errors.password
                    ? "mb-1 border-red-800"
                    : "mb-8 border-gray-300"
                }`}
              >
                <FontAwesomeIcon
                  icon={faLock}
                  className="inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-2"
                />
                <Field
                  id="password"
                  name="password"
                  type={!displayPassword ? "password" : "text"}
                  placeholder="Password"
                  maxLength="50"
                  className="textbox-input md:w-10/12 placeholder-purple-900 placeholder-opacity-50"
                />
                <FontAwesomeIcon
                  icon={!displayPassword ? faEye : faEyeSlash}
                  className="absolute text-sm align-middle top-0 right-0 mt-4 mr-2 opacity-50 cursor-pointer"
                  onClick={setPasswordDisplay}
                  aria-label={
                    !displayPassword ? "Show Password" : "Hide Password"
                  }
                />
              </div>

              {/* Validation errors */}
              {props.touched.password && props.errors.password ? (
                <div className="font-axiforma text-xs text-red-800 p-1 mt-1 mb-2 ">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.password}
                </div>
              ) : null}

              <div className="text-center">
                <motion.button
                  type="submit"
                  className="mt-2 mb-8 w-64 md:w-100 h-12 bg-purple-500 text-white font-axiforma font-bold rounded-md uppercase tracking-wide focus:outline-none"
                  whileTap={{
                    backgroundColor: "#D6BCFA",
                    color: "#550052",
                    y: "5px",
                    boxShadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
                  }}
                >
                  Login
                </motion.button>
              </div>
            </Form>
            <div className="text-center font-axiforma text-purple-600 text-sm tracking-wide">
              <Link href="/forgotpassword">
                <motion.a
                  whileHover={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#550052",
                    textDecorationColor: "#550052",
                  }}
                >
                  Forgot password?
                </motion.a>
              </Link>
            </div>
            <div className="font-axiforma text-purple-600 text-center mt-6 text-sm  lg:text-md">
              Don't have an account?{" "}
              <motion.button
                className="ml-2 inline bg-opacity-25 bg-purple-400 text-brand-gray p-3 shadow-sm z-30 font-semibold"
                whileHover={{
                  backgroundColor: "#550052",
                  color: "#FFFFFF",
                }}
                onClick={() => {
                  Router.push("/registeruser");
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
  );
};

export default UserLogin;
