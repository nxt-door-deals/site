import React, { useContext } from "react";
import Image from "next/image";
import SiteContext from "../../context/site/siteContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { feature } from "../../utils/siteImages";

// Component import
import Alert from "../page_components/common/Alert";
import BouncingBalls from "../loaders/BouncingBalls";

const featureValidationSchema = Yup.object({
  message: Yup.string()
    .required("Please type in your feature request (go nuts!)")
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

const purpleButtonVariants = {
  buttonTap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
  buttonHover: {
    backgroundColor: "#4C1D95",
  },
};

const blueButtonVariants = {
  buttonHover: {
    backgroundColor: "#1E40AF",
  },
  buttonTap: {
    backgroundColor: "#2563EB",
    y: "2px",
  },
};

const alertTheme = "bg-purple-200 text-brand-purple";

const FeatureRequest = (props) => {
  const siteContext = useContext(SiteContext);
  const { sendFeatureRequestEmail, genericMessage } = siteContext;

  let buttonColor =
    props.modalButtonTheme === "purple" ? "bg-purple-700 " : "bg-blue-600 ";

  let buttonVariant =
    props.modalButtonTheme === "purple"
      ? purpleButtonVariants
      : blueButtonVariants;

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={formVariants}
        initial="initial"
        animate="animate"
        transition="transition"
        exit="exit"
        className="bg-white w-80 lg:w-100 px-5 shadow-modalShadow rounded-lg"
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
          <Image src={feature} alt="Feature request" height={200} width={200} />
        </div>
        <h1 className="font-semibold lg:text-center text-lg text-brand-gray mb-3">
          Have a feature idea in mind that you would like to see on the website?{" "}
          <span className="lg:hidden">We're all ears...</span>
        </h1>
        <p className="text-center mb-3 hidden lg:block">We're all ears...</p>
        <Alert genericMessage={genericMessage} alertTheme={alertTheme} />
        <div>
          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={featureValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

              setTimeout(() => {
                sendFeatureRequestEmail(values.message);
                values.message = "";
              }, 1000);
              setTimeout(() => {
                props.setIsModalOpen(false);
                setSubmitting(false);
              }, 2500);
            }}
          >
            {(props) => (
              <Form>
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
                    placeholder="Feature Request*"
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
                    variants={buttonVariant}
                    type="submit"
                    disabled={props.isSubmitting}
                    className={`${buttonColor} w-56 h-12 mt-3 ${
                      buttonColor.includes("purple")
                        ? "shadow-buttonShadowPurple"
                        : "shadow-buttonShadowBlue"
                    } text-white  font-bold rounded-xl uppercase tracking-wide focus:outline-none $ ${
                      props.isSubmitting && "cursor-not-allowed"
                    }`}
                    whileHover="buttonHover"
                    whileTap="buttonTap"
                  >
                    {props.isSubmitting ? <BouncingBalls /> : "Request Feature"}
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

export default FeatureRequest;
