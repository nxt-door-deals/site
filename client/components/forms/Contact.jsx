import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faComments,
  faExclamationTriangle,
  faPaperPlane,
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

const alertTheme = "bg-purple-200 text-brand-purple";

const Contact = (props) => {
  const authContext = useContext(AuthContext);
  const { sendContactUsEmail, genericMessage } = authContext;

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: 0, transition: { duration: 1 } }}
        exit={{ y: "100vh", transition: { duration: 1 } }}
        className="h-128 w-88 md:w-100 bg-white border-brand-purple border-dashed border-2 p-3 font-axiforma"
      >
        <motion.div
          className="absolute text-lg right-0 mr-4 text-purple-900 cursor-pointer"
          onClick={() => props.setIsModalOpen(false)}
          alt="Close Menu"
        >
          <FontAwesomeIcon
            icon={faTimes}
          />
        </motion.div>
        <div className="flex justify-center">
          <img
            src="/images/contact/typewriter.svg"
            alt="Typewriter"
            height="100px"
            width="100px"
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
                  className={`"relative border-2 rounded-md " ${
                    props.touched.email && props.errors.email
                      ? "mb-1 border-red-800"
                      : "mb-6 border-gray-300"
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
                    placeholder="Email*"
                    maxLength="50"
                    autoComplete="off"
                    className="textbox-input w-10/12 md:w-11/12 placeholder-purple-900 placeholder-opacity-50"
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
                  className={`"relative border-2 rounded-md " ${
                    props.touched.message && props.errors.message
                      ? "mb-1 border-red-800"
                      : "mb-6 border-gray-300"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faComments}
                    className="inline align-top fill-current text-gray-600 text-lg opacity-50 mt-2 ml-2"
                  />
                  <Field
                    id="emmessageail"
                    as="textarea"
                    name="message"
                    type="text"
                    placeholder="Message*"
                    maxLength="1000"
                    autoComplete="off"
                    className="text-sm p-2 leading-6 outline-none w-10/12 md:w-11/12 placeholder-purple-900 placeholder-opacity-50"
                  />
                </div>

                {/* Validation errors */}
                {props.touched.message && props.errors.message ? (
                  <div className=" text-xs text-red-800 p-1 mb-2">
                    <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                    {props.errors.message}
                  </div>
                ) : null}

                <div className="text-center">
                  <motion.button
                    type="submit"
                    className="w-28 h-10 mt-3 bg-purple-500 text-white  font-bold rounded-md uppercase tracking-wide focus:outline-none"
                    whileTap={{
                      backgroundColor: "#D6BCFA",
                      color: "#550052",
                      y: "5px",
                      boxShadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} /> Send
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
