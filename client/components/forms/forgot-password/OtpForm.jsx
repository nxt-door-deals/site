import React, { useState, useContext, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import AuthContext from "../../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { forgotPasswordOtp } from "../../../utils/siteImages";

// Component Import
import Alert from "../../page_components/common/Alert";
import ChangePassword from "./ChangePassword";
import BouncingBalls from "../../loaders/BouncingBalls";

// Dynamic import allows the cookie to be created before the component is loaded
const Timer = dynamic(() => import("../../page_components/common/Timer"));

const otpValidationSchema = Yup.object({
  otp1: Yup.string().required(),
  otp2: Yup.string().required(),
  otp3: Yup.string().required(),
  otp4: Yup.string().required(),
  otp5: Yup.string().required(),
  otp6: Yup.string().required(),
});

const buttonVariants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
};

const OtpForm = (props) => {
  const authContext = useContext(AuthContext);
  const [showForm, setShowForm] = useState(true);

  const [regenerateOtp, setRegenerateOtp] = useState(false);
  const [regenerateCount, setRegenerateCount] = useState(0);
  const [renderKey, setRenderKey] = useState(0);
  const [disableInput, setDisableInput] = useState(false);

  const showTimer = useRef(false);
  const router = useRouter();

  const {
    user,
    validateOtp,
    authError,
    otpValidated,
    otpGenerated,
    generateOtp,
    sendOtpByEmail,
    updateOtpVerificationTimestamp,
  } = authContext;

  useEffect(() => {
    setTimeout(() => {
      if (regenerateOtp && user.count < 3) {
        // showTimer.current = true;
        setRenderKey(renderKey + 1);
        updateOtpVerificationTimestamp(user.id);
        sendOtpByEmail(user.email);
        otpSentToast();
      }
    }, 500);

    return () => setRegenerateOtp(false);
  }, [regenerateOtp]);

  useEffect(() => {
    generateOtp(user && user.email);
  }, []);

  useEffect(() => {
    if (otpGenerated && otpGenerated) {
      sendOtpByEmail(user.email);
      showTimer.current = true;
    }
  }, [otpGenerated]);

  useEffect(() => {
    if (otpValidated) {
      setShowForm(false);
    }
  }, [otpValidated]);

  useEffect(() => {
    if (authError && !authError) {
      showTimer.current = true;
    }
  }, [authError]);

  useEffect(() => {
    if (
      authError &&
      (authError ===
        "Too many otp requests. Please wait for 10 minutes before regenerating an otp" ||
        authError === "Too many invalid otp's. Please enter your email again")
    ) {
      setDisableInput(true);

      setTimeout(() => router.reload("/"), 6000);
    }
  }, [authError]);

  // Otp sent toast
  const otpSentToast = () =>
    toast(`Otp resent to ${user && user.email}`, {
      draggablePercent: 60,
      position: "top-center",
    });

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
            <Image
              src={forgotPasswordOtp}
              alt={"Otp sent"}
              height={200}
              width={200}
            />
          </div>
          <div id="otpform" className="text-center mt-6 pl-4 pr-4">
            <p className="text-brand-gray">
              We have sent a one-time password (OTP) to your email id,{" "}
              <span className="font-bold text-purple-600">{user.email}</span>.
              Please enter the six-character OTP below. The OTP is valid for{" "}
              <span className="font-semibold">only 10 minutes</span>.{" "}
            </p>
          </div>

          <p className="text-sm text-center text-brand-gray mt-2">
            Didn't receive our email?{" "}
            <span className="text-purple-600 font-semibold hover:underline focus-within:outline-none">
              <Link href="">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setRegenerateOtp(true);
                    setRegenerateCount(regenerateCount + 1);
                    generateOtp(user.email);
                  }}
                >
                  Regenerate OTP
                </a>
              </Link>
            </span>
          </p>

          <div className="text-center mt-4">
            <h2 className="font-semibold text-brand-gray text-xl mb-2">
              Enter the OTP
            </h2>
          </div>
          <div className="flex justify-center items-center w-full">
            <Alert authError={authError} alertTheme={props.alertTheme} />
          </div>

          <div className="mt-1 w-full">
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
                  user.id,
                  values.otp1 +
                    values.otp2 +
                    values.otp3 +
                    values.otp4 +
                    values.otp5 +
                    values.otp6
                );
                setTimeout(() => setSubmitting(false), 2000);
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
                      disabled={disableInput}
                      className={
                        props.touched.otp1 && props.errors.otp1
                          ? "error-border otp-text"
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
                      disabled={disableInput}
                      className={
                        props.touched.otp2 && props.errors.otp2
                          ? "error-border otp-text"
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
                      disabled={disableInput}
                      className={
                        props.touched.otp3 && props.errors.otp3
                          ? "error-border otp-text"
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
                      disabled={disableInput}
                      className={
                        props.touched.otp4 && props.errors.otp4
                          ? "error-border otp-text"
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
                      disabled={disableInput}
                      className={
                        props.touched.otp5 && props.errors.otp5
                          ? "error-border otp-text"
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
                      disabled={disableInput}
                      className={
                        props.touched.otp6 && props.errors.otp6
                          ? "error-border otp-text"
                          : "border-gray-300 otp-text"
                      }
                    />
                  </div>
                  <div className="flex flex-col items-center mb-3">
                    {/* <Progress minutes={minutes} seconds={seconds} /> */}

                    {showTimer.current && <Timer key={renderKey} />}
                  </div>
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      disabled={props.isSubmitting}
                      className={`w-48 h-12 bg-purple-700 shadow-buttonShadowPurple text-white  font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                        props.isSubmitting && "cursor-not-allowed"
                      }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {props.isSubmitting ? <BouncingBalls /> : "Validate OTP"}
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
          <ChangePassword />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OtpForm;
