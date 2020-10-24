import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

// Component Import
import Alert from "../../utils/Alert";
import ChangePassword from "./ChangePassword";

const otpValidationSchema = Yup.object({
  otp1: Yup.string().required(),
  otp2: Yup.string().required(),
  otp3: Yup.string().required(),
  otp4: Yup.string().required(),
  otp5: Yup.string().required(),
  otp6: Yup.string().required(),
});

const OtpForm = (props) => {
  const authContext = useContext(AuthContext);
  const [showForm, setShowForm] = useState(true);

  const { validateOtp, authError, otpValidated } = authContext;

  useEffect(() => {
    if (otpValidated) {
      setShowForm(false);
    }
  }, [otpValidated]);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      {showForm ? (
        <motion.div
          key="form2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="flex justify-center">
            <img
              src="/images/forgotpassword/otp.svg"
              alt="Otp sent"
              height="200px"
              width="200px"
            />
          </div>
          <div className="text-center mt-6 pl-4 pr-4">
            <p className="text-gray-600">
              We have sent a one-time password (OTP) to your email id,{" "}
              <span className="font-bold text-purple-600">
                {props.user.email}
              </span>
              . Please enter the six-character OTP below. The OTP is valid for{" "}
              <span className="font-semibold">10 minutes only</span>.{" "}
            </p>
          </div>
          <div className="text-center mt-6">
            <h2 className="font-semibold text-brand-gray text-xl mb-4">
              Enter the OTP
            </h2>
          </div>
          <div className="flex justify-center items-center w-full">
            <Alert authError={authError} alertTheme={props.alertTheme} />
          </div>

          <div className="mt-3 w-full">
            <Formik
              initialValues={{
                otp1: "",
                otp2: "",
                otp3: "",
                otp4: "",
                otp5: "",
                otp6: "",
              }}
              validationSchema={otpValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                validateOtp(
                  props.user.id,
                  values.otp1 +
                    values.otp2 +
                    values.otp3 +
                    values.otp4 +
                    values.otp5 +
                    values.otp6
                );
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <div className="flex justify-center mb-4">
                    <Field
                      id="otp1"
                      name="otp1"
                      type="text"
                      placeholder=""
                      maxLength="1"
                      className={
                        props.touched.otp1 && props.errors.otp1
                          ? "border-red-800 otp-text"
                          : "border-gray-300 otp-text"
                      }
                      onKeyUp={() => otp2.focus()}
                    />
                    <Field
                      id="otp2"
                      name="otp2"
                      type="text"
                      placeholder=""
                      maxLength="1"
                      className={
                        props.touched.otp2 && props.errors.otp2
                          ? "border-red-800 otp-text"
                          : "border-gray-300 otp-text"
                      }
                      onKeyUp={() => otp3.focus()}
                    />
                    <Field
                      id="otp3"
                      name="otp3"
                      type="text"
                      placeholder=""
                      maxLength="1"
                      className={
                        props.touched.otp3 && props.errors.otp3
                          ? "border-red-800 otp-text"
                          : "border-gray-300 otp-text"
                      }
                      onKeyUp={() => otp4.focus()}
                    />
                    <Field
                      id="otp4"
                      name="otp4"
                      type="text"
                      placeholder=""
                      maxLength="1"
                      className={
                        props.touched.otp4 && props.errors.otp4
                          ? "border-red-800 otp-text"
                          : "border-gray-300 otp-text"
                      }
                      onKeyUp={() => otp5.focus()}
                    />
                    <Field
                      id="otp5"
                      name="otp5"
                      type="text"
                      placeholder=""
                      maxLength="1"
                      className={
                        props.touched.otp5 && props.errors.otp5
                          ? "border-red-800 otp-text"
                          : "border-gray-300 otp-text"
                      }
                      onKeyUp={() => otp6.focus()}
                    />
                    <Field
                      id="otp6"
                      name="otp6"
                      type="text"
                      placeholder=""
                      maxLength="1"
                      className={
                        props.touched.otp6 && props.errors.otp6
                          ? "border-red-800 otp-text"
                          : "border-gray-300 otp-text"
                      }
                    />
                  </div>

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
                      Validate OTP
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
          <ChangePassword user={props.user} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OtpForm;
