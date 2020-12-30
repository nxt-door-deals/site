import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import AuthContext from "../../../context/auth/authContext";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import PasswordChangeSuccess from "./PasswordChangeSuccess";

const buttonVariants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    backgroundColor: "#8B5CF6",
    y: "2px",
  },
};

const passwordValidationSchema = Yup.object({
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Your password should have at least 8 characters")
    .trim(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .trim(),
});

const ChangePassword = (props) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const authContext = useContext(AuthContext);
  const { passwordChanged, updatePassword } = authContext;

  useEffect(() => {
    if (passwordChanged) {
      setShowForm(false);
    }
  }, [passwordChanged]);

  const setPasswordDisplay = () => {
    setDisplayPassword(!displayPassword);
  };

  const setConfirmPasswordDisplay = () => {
    setDisplayConfirmPassword(!displayConfirmPassword);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {showForm ? (
        <motion.div
          key="form3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="flex justify-center">
            <Image
              src={"/images/forgotpassword/password.svg"}
              alt={"Update password"}
              height={200}
              width={200}
            />
          </div>
          <div className="text-center mt-6 pl-2 pr-2">
            <p className="text-gray-600">
              Time to think of a new super secret password.
            </p>
          </div>
          <div className="text-center mt-6">
            <h2 className="font-semibold text-brand-gray text-xl mb-4">
              Enter your new password
            </h2>
          </div>
          <div className="mt-3 w-full pl-2 pr-2">
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={passwordValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                updatePassword(values.password, props.user.id);
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  {/* Password */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-xl " ${
                      props.touched.password && props.errors.password
                        ? "mb-1 border-red-800 shadow-none"
                        : "mb-6 border-gray-300 focus-within:border-text-purple"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faLock}
                      className="inline align-middle fill-current text-gray-500 text-lg ml-4"
                    />
                    <Field
                      id="password"
                      name="password"
                      type={!displayPassword ? "password" : "text"}
                      placeholder="Password*"
                      maxLength="50"
                      autoComplete="off"
                      className="textbox-input w-10/12 placeholder-gray-600 placeholder-opacity-50"
                    />
                    <FontAwesomeIcon
                      icon={!displayPassword ? faEye : faEyeSlash}
                      className="text-sm align-middle top-0 right-0 text-gray-500 cursor-pointer"
                      onClick={setPasswordDisplay}
                      aria-label={
                        !displayPassword ? "Show Password" : "Hide Password"
                      }
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.password && props.errors.password ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.password}
                    </div>
                  ) : null}

                  {/* Confirm password */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-xl " ${
                      props.touched.confirmPassword &&
                      props.errors.confirmPassword
                        ? "mb-1 border-red-800 shadow-none"
                        : "mb-6 border-gray-300 focus-within:border-text-purple"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faLock}
                      className="inline align-middle fill-current text-gray-500 text-lg ml-4"
                    />
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={!displayConfirmPassword ? "password" : "text"}
                      placeholder="Confirm Password*"
                      maxLength="50"
                      autoComplete="off"
                      className="textbox-input w-10/12 placeholder-gray-600 placeholder-opacity-50"
                    />
                    <FontAwesomeIcon
                      icon={!displayConfirmPassword ? faEye : faEyeSlash}
                      className="text-sm align-middle top-0 right-0 text-gray-500 cursor-pointer"
                      onClick={setConfirmPasswordDisplay}
                      aria-label={
                        !displayConfirmPassword
                          ? "Show Password"
                          : "Hide Password"
                      }
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.confirmPassword &&
                  props.errors.confirmPassword ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.confirmPassword}
                    </div>
                  ) : null}

                  <div className="text-center">
                    <motion.button
                      type="submit"
                      className="w-48 h-12 bg-purple-500 text-white font-bold rounded-xl uppercase tracking-wide focus:outline-none"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Update Password
                    </motion.button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center items-center min-h-screen"
        >
          <PasswordChangeSuccess />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangePassword;
