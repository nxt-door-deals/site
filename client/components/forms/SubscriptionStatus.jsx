import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import BouncingBalls from "../../components/loaders/BouncingBalls";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your registered email")
    .email("Please enter a valid email address"),
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

const SubscriptionStatus = () => {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const { updateUserSubscription } = authContext;

  // Unsubscribe toast
  const unsubscribeToast = () =>
    toast("If that email exists, it has been removed from the mailing list", {
      draggablePercent: 60,
      position: "top-center",
    });

  return (
    <div className="rounded-3xl mx-5 py-12 px-7 lg:px-10 lg:py-16 bg-white shadow-xl">
      <div className="text-center">
        <h1 className="font-semibold text-lg lg:text-xl text-brand-gray tracking-wide">
          Enter your registered email to <br />
          unsubscribe from our mailing list
        </h1>
        <p className="text-sm py-5">It works ;)</p>
      </div>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          updateUserSubscription(values.email, false);
          unsubscribeToast();
          values.email = "";
          setTimeout(() => {
            router.push("/");
          }, 4000);
        }}
      >
        {(props) => (
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

            <div className="font-axiforma text-center mt-4">
              <motion.button
                type="submit"
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                className={`mt-2 mb-8 h-12 w-80 md:w-100 bg-purple-700 shadow-buttonShadowPurple text-white font-axiforma font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                  props.isSubmitting && "cursor-not-allowed"
                }`}
                disabled={props.isSubmitting}
              >
                {!props.isSubmitting ? "Unsubscribe" : <BouncingBalls />}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubscriptionStatus;
