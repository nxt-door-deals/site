import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Component import
import Alert from "../../utils/Alert";
import OtpForm from "./OtpForm";

const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your registered email id")
    .email("Please enter a valid email id")
    .trim(),
});

const EnterEmailForm = (props) => {
  const authContext = useContext(AuthContext);
  const [showForm, setShowForm] = useState(true);

  const {
    user,
    validateEmail,
    authError,
    generateOtp,
    sendOtpByEmail,
  } = authContext;

  useEffect(() => {
    if (user) {
      generateOtp(user.id, user.email);
      // sendOtpByEmail(user.email);
      setShowForm(false);
    }
  }, [user]);

  return (
    <AnimatePresence exitBeforeEnter>
      {showForm ? (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="flex justify-center">
            <img
              src="/images/forgotpassword/forgot-password.svg"
              alt="Forgot Password"
              height="200px"
              width="200px"
            />
          </div>
          <div className="text-center mt-4 pl-4 pr-4">
            <p className=" text-gray-600">
              Forgot your password? No worries! Let's quickly reset it.
            </p>
          </div>
          <div className="text-center mt-6 pl-4 pr-4">
            <h2 className=" text-brand-gray font-semibold text-xl mb-4">
              Enter your registered email address
            </h2>
          </div>
          <Alert authError={authError} alertTheme={props.alertTheme} />
          <div className="mt-3 w-full pl-4 pr-4">
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                validateEmail(values.email);
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <div
                    className={`"relative border-2 rounded-md " ${
                      props.touched.email && props.errors.email
                        ? "mb-1 border-red-800"
                        : "mb-6 border-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="inline align-middle fill-current text-gray-500 text-lg ml-2"
                    />
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email"
                      maxLength="50"
                      autoComplete="off"
                      className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-50"
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.email && props.errors.email ? (
                    <div className=" text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.email}
                    </div>
                  ) : null}

                  <div className="text-center">
                    <motion.button
                      type="submit"
                      className="w-48 h-12 bg-purple-500 text-white  font-bold rounded-md uppercase tracking-wide focus:outline-none"
                      whileTap={{
                        backgroundColor: "#D6BCFA",
                        color: "#550052",
                        y: "5px",
                        boxShadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
                      }}
                    >
                      Validate Email
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
          <OtpForm user={user} alertTheme={props.alertTheme} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnterEmailForm;
