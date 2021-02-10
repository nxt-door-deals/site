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
    backgroundColor: "#5B21B6",
  },
  tap: {
    backgroundColor: "#8B5CF6",
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
    <div className="rounded-3xl mx-5 px-12 py-12 lg:px-16 lg:py-16 bg-white shadow-boxshadowlogin">
      <h1 className="font-semibold text-xl text-center text-brand-gray tracking-wide mb-6">
        Enter your registered email to <br />
        unsubscribe from our mailing list
      </h1>
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
            setSubmitting(false);
            router.push("/");
          }, 4000);
        }}
      >
        {(props) => (
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
                className="textbox-input w-10/12 placeholder-gray-600 "
              />
            </div>

            {/* Validation errors */}
            {props.touched.email && props.errors.email ? (
              <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
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
                className="mt-2 mb-8 h-12 w-80 md:w-100 bg-purple-500 text-white font-axiforma font-bold rounded-xl uppercase tracking-wide focus:outline-none"
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
