import React, { useContext } from "react";
import Image from "next/image";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Component import
import Alert from "../page_components/common/Alert";

const contactValidationSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your email id")
    .email("Please enter a valid email id")
    .trim(),
  message: Yup.string()
    .required("Please type in your message (1000 characters max!)")
    .trim(),
});

const formVariants = {
  initial: {
    y: "100vh",
  },
  animate: {
    y: 0,
  },
  transition: {
    duration: 2,
    type: "tween",
  },
  exit: {
    y: "100vh",
    transition: { duration: 1 },
  },
};

const buttonVariants = {
  buttonTap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
  buttonHover: {
    backgroundColor: "#4C1D95",
  },
};

const alertTheme = "bg-purple-200 text-brand-purple";

const Contact = (props) => {
  const authContext = useContext(AuthContext);
  const { sendContactUsEmail, genericMessage } = authContext;

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={formVariants}
        initial="initial"
        animate="animate"
        transition="transition"
        exit="exit"
        className="bg-white w-90 lg:w-100 px-5 pt-5 shadow-modalShadow rounded-lg"
      >
        <div
          className="absolute text-lg top-4 right-5 text-brand-gray cursor-pointer"
          onClick={() => props.setIsModalOpen(false)}
          alt="Close Menu"
        >
          <FontAwesomeIcon icon={faTimes} className="close-button-animation" />
        </div>
        <span className="invisible lg:visible text-xs absolute top-10 right-3.5 text-gray-500">
          ESC
        </span>
        <div className="flex justify-center">
          <Image
            src={"/images/contact/typewriter.svg"}
            alt={"Typewriter"}
            height={100}
            width={100}
          />
        </div>
        <h1 className="font-semibold text-center text-xl text-brand-gray mt-6 mb-6">
          We're great listeners, talk to us...
        </h1>
        <Alert genericMessage={genericMessage} alertTheme={alertTheme} />
        <div>
          <Formik
            initialValues={{
              email: "",
              message: "",
            }}
            validationSchema={contactValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              sendContactUsEmail(values.email, values.message);
              setTimeout(() => {
                values.email = "";
                values.message = "";
              }, 500);
              setTimeout(() => {
                props.setIsModalOpen(false);
              }, 2500);
              setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <div
                  className={`"relative border-2 rounded-xl " ${
                    props.touched.email && props.errors.email
                      ? "mb-1 error-border"
                      : "mb-6 border-gray-300 focus-within:border-text-purple"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="inline align-middle fill-current text-gray-400 text-lg opacity-50 ml-2"
                  />
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Email*"
                    maxLength="50"
                    autoComplete="off"
                    className="textbox-input w-10/12 placeholder-gray-600 text-brand-gray"
                  />
                </div>

                {/* Validation errors */}
                {props.touched.email && props.errors.email ? (
                  <div className=" text-xs error-text p-1 mb-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                    {props.errors.email}
                  </div>
                ) : null}

                <div
                  className={`"relative border-2 rounded-xl " ${
                    props.touched.message && props.errors.message
                      ? "mb-1 error-border"
                      : "mb-6 border-gray-300 focus-within:border-text-purple"
                  }`}
                >
                  <Field
                    id="message"
                    as="textarea"
                    name="message"
                    type="text"
                    placeholder="Message*"
                    maxLength="1000"
                    rows="5"
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={
                      props.touched.message && props.errors.message
                        ? "true"
                        : null
                    }
                    aria-describedby={
                      props.touched.message && props.errors.message
                        ? "message-error"
                        : null
                    }
                    className="text-sm leading-5 outline-none rounded-xl w-full p-1.5 placeholder-gray-600 text-brand-gray"
                  />
                </div>

                {/* Validation errors */}
                {props.touched.message && props.errors.message ? (
                  <div
                    className=" text-xs error-text p-1 mb-2"
                    id="message-error"
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                    {props.errors.message}
                  </div>
                ) : null}

                <div className="text-center pb-20">
                  <motion.button
                    variants={buttonVariants}
                    type="submit"
                    disabled={props.isSubmitting}
                    className={`w-36 h-10 mt-3 bg-purple-700 shadow-buttonShadowPurple text-white  font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                      props.isSubmitting && "cursor-not-allowed"
                    }`}
                    whileHover="buttonHover"
                    whileTap="buttonTap"
                  >
                    Send
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Contact;
