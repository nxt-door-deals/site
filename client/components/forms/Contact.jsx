import React, { useContext } from "react";
import Image from "next/image";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faComments,
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Component import
import Alert from "../utils/Alert";

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
    backgroundColor: "#8B5CF6",
    y: "2px",
  },
  buttonHover: {
    backgroundColor: "#5B21B6",
  },
};

const alertTheme = "bg-purple-200 text-brand-purple";

const Contact = (props) => {
  const authContext = useContext(AuthContext);
  const { sendContactUsEmail, genericMessage } = authContext;

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          variants={formVariants}
          initial="initial"
          animate="animate"
          transition="transition"
          exit="exit"
          className="w-90 lg:w-100 bg-white border-brand-purple border-dashed border-2 px-5 pt-5"
        >
          <div
            className="absolute text-lg right-0 mr-4 text-brand-gray cursor-pointer"
            onClick={() => props.setIsModalOpen(false)}
            alt="Close Menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="flex justify-center">
            <Image
              src={"/images/contact/typewriter.svg"}
              alt={"Typewriter"}
              height={100}
              width={100}
            />
          </div>
          <h1 className="font-semibold text-center text-2xl mt-6 mb-6">
            Write to us
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
                  props.setIsModalOpen(false);
                }, 6000);
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <div
                    className={`"relative border-2 rounded-xl " ${
                      props.touched.email && props.errors.email
                        ? "mb-1 border-red-800"
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
                      className="textbox-input w-10/12 placeholder-gray-600"
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.email && props.errors.email ? (
                    <div className=" text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.email}
                    </div>
                  ) : null}

                  <div
                    className={`"relative border-2 rounded-xl " ${
                      props.touched.message && props.errors.message
                        ? "mb-1 border-red-800"
                        : "mb-6 border-gray-300 focus-within:border-text-purple"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faComments}
                      className="inline align-top fill-current text-gray-400 text-lg opacity-50 mt-2 ml-2"
                    />
                    <Field
                      id="message"
                      as="textarea"
                      name="message"
                      type="text"
                      placeholder="Message*"
                      maxLength="1000"
                      autoComplete="off"
                      className="text-sm leading-6 outline-none rounded-xl w-10/12 lg:w-11/12 p-2 placeholder-gray-600"
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.message && props.errors.message ? (
                    <div className=" text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.message}
                    </div>
                  ) : null}

                  <div className="text-center pb-20">
                    <motion.button
                      variants={buttonVariants}
                      type="submit"
                      disabled={props.isSubmitting}
                      className={`w-36 h-10 mt-3 bg-purple-500 text-white  font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
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
    </div>
  );
};

export default Contact;
