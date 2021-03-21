import React, { useContext, useState, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import Link from "next/link";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import states from "../../utils/states";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import keys from "../../utils/keys";
import { selectStyleBlue } from "../../utils/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faBuilding,
  faMapMarkerAlt,
  faMapPin,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import Terms from "../utils/Terms";
import BouncingBalls from "../loaders/BouncingBalls";
import NeighbourCreationNotification from "../utils/NeighbourCreationNotification";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
  },
  hover: {
    backgroundColor: "#1E3A8A",
  },
  tap: {
    y: "2px",
    backgroundColor: "#2563EB",
  },
};

const createNeighbourhoodValidationSchema = Yup.object({
  name: Yup.string().required("Please enter the name of your apartment").trim(),
  address1: Yup.string().required("Please enter your address").trim(),
  city: Yup.string().required("Please enter the name of your city").trim(),
  state: Yup.string().required("Please select a state/UT"),
  pincode: Yup.string()
    .required("Pincode is required")
    .trim()
    .matches(/^[0-9]+$/, "Only numbers!"),
  email: Yup.string()
    .required("Please enter your email id")
    .email("Please enter a valid email id")
    .trim(),
});

// Terms link style
const termsLinksStyle = "underline text-blue-600";

const CreateNeighbourhood = (props) => {
  const [showForm, setShowForm] = useState(true);
  const [enableFormSubmission, setEnableFormSubmission] = useState(false);
  const siteContext = useContext(SiteContext);

  const {
    createApartment,
    apartmentCreated,
    submittedNeighbourhood,
    sendNbhRegistrationEmailToUser,
    sendNbhRegistrationVerificationRequestEmail,
  } = siteContext;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (apartmentCreated) {
      const neighbourhoodVerificationHash =
        submittedNeighbourhood.verification_hash +
        "|" +
        submittedNeighbourhood.id;

      const verificationUrl = `${keys.SERVER}/verifyneighbourhood/${neighbourhoodVerificationHash}`;

      // Send email to contact@nxtdoordeals.com
      sendNbhRegistrationVerificationRequestEmail(
        submittedNeighbourhood.name,
        submittedNeighbourhood.address1,
        submittedNeighbourhood.address2,
        submittedNeighbourhood.city,
        submittedNeighbourhood.state,
        submittedNeighbourhood.pincode,
        submittedNeighbourhood.submitted_by,
        verificationUrl
      );
      setShowForm(false);
    }
  }, [apartmentCreated]);

  return (
    <AnimatePresence exitBeforeEnter>
      {showForm ? (
        <motion.div
          key="form"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="pb-20 bg-purple-50 bg-opacity-40 -mt-1"
        >
          <div className="invisible lg:visible lg:opacity-50 pt-10 lg:pt-20 lg:mx-10 lg:bg-purple-50 lg:flex lg:justify-center">
            <img src="/images/neighbourhood/skyline.svg" />
          </div>
          <div className="rounded-3xl shadow-boxshadowregister text-brand-gray bg-white py-10 px-6 lg:px-8 mx-4 overflow-x-hidden lg:mx-20">
            <h1 className="font-bold text-3xl text-center text-brand-gray tracking-wide mb-10">
              Register Your Neighbourhood
            </h1>

            {/* Flex container with form */}
            <div className="flex flex-col lg:flex-row lg:justify-center divide-y-2 lg:divide-y-0 lg:divide-x-2">
              {/* Registration procedure */}
              <div
                id="information"
                className="pb-4 lg:pr-4 lg:pb-0 text-brand-gray pt-6"
              >
                <h2 className="text-xl text-center font-semibold mb-6">
                  How does it work?
                </h2>
                <ul>
                  <li className="flex items-center pb-3">
                    <FontAwesomeIcon
                      icon={faHandPointRight}
                      className="text-blue-900 text-3xl lg:text-3xl"
                    />
                    <p className="pl-2 text-sm cursor-default">
                      A neighbourhood needs to be registered only once. Anyone
                      can register a neighbourhood. It does not matter whether
                      you are an owner or a tenant.
                    </p>
                  </li>
                  <li className="flex items-center pb-3">
                    <FontAwesomeIcon
                      icon={faHandPointRight}
                      className="text-blue-700 text-3xl lg:text-3xl"
                    />
                    <p className="pl-2 text-sm cursor-default">
                      After you register a neighbourhood (for{" "}
                      <span className="text-blue-800 font-bold">FREE!</span>),
                      our review process kicks off. The review ensures that the
                      neighbourhood is genuine, trustworthy and not duplicated.
                    </p>
                  </li>
                  <li className="flex items-center pb-3">
                    <FontAwesomeIcon
                      icon={faHandPointRight}
                      className="text-blue-500 text-3xl lg:text-3xl"
                    />
                    <p className="pl-2 text-sm cursor-default">
                      In case additional details are required to complete
                      verification, we will hit you up via email.
                    </p>
                  </li>
                  <li className="flex items-center pb-3">
                    <FontAwesomeIcon
                      icon={faHandPointRight}
                      className="text-blue-400 text-3xl lg:text-3xl"
                    />
                    <p className="pl-2 text-sm cursor-default">
                      You will receive an email once the neighbourhood is
                      successfully verified.
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center pb-3">
                      <FontAwesomeIcon
                        icon={faHandPointRight}
                        className="text-blue-300 text-3xl lg:text-3xl"
                      />
                      <p className="pl-2 text-sm cursor-default">
                        Residents of your neighbourhood can then sign up for a{" "}
                        <Link href="/registeruser">
                          <a className="hover:underline">
                            <span className="text-blue-800 font-bold">
                              FREE
                            </span>{" "}
                            account
                          </a>
                        </Link>{" "}
                        and enjoy all the{" "}
                        <Link href="/">
                          <a className="text-brand-purple font-semibold hover:underline">
                            nxtdoordeals.com
                          </a>
                        </Link>{" "}
                        awesomeness!
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* The form for neighbourhood registration */}
              <div id="form" className="pt-6 lg:mt-0 lg:ml-2 md:px-16">
                <Formik
                  initialValues={{
                    name: props.aptNameFromUrl ? props.aptNameFromUrl : "",
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    pincode: "",
                    email: "",
                  }}
                  validationSchema={createNeighbourhoodValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    createApartment(
                      values.name,
                      values.address1,
                      values.address2,
                      values.city,
                      values.state,
                      values.pincode,
                      values.email
                    );
                    setTimeout(
                      () =>
                        sendNbhRegistrationEmailToUser(
                          values.name,
                          values.email
                        ),
                      500
                    );
                  }}
                >
                  {(props) => (
                    <Form>
                      <h2 className="text-xl text-center font-semibold mb-6">
                        Enter neighbourhood details
                      </h2>

                      {/* Apartment name */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  lg:w-128 " ${
                          props.touched.name && props.errors.name
                            ? "mb-1 border-red-800 shadow-none"
                            : "mb-8 border-gray-300 focus-within:border-text-blue"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className="align-middle fill-current text-gray-400 text-lg ml-2"
                        />
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Apartment Name*"
                          maxLength="100"
                          autoComplete="off"
                          value={props.values.name}
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - apartment name */}
                      {props.touched.name && props.errors.name ? (
                        <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.name}
                        </div>
                      ) : null}

                      {/* Apartment address 1 */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  lg:w-128 " ${
                          props.touched.address1 && props.errors.address1
                            ? "mb-1 border-red-800 shadow-none"
                            : "mb-8 border-gray-300 focus-within:border-text-blue"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="align-middle fill-current text-gray-400 text-lg ml-2"
                        />
                        <Field
                          id="address1"
                          name="address1"
                          type="text"
                          placeholder="Address Line 1*"
                          maxLength="150"
                          autoComplete="off"
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - address 1 */}
                      {props.touched.address1 && props.errors.address1 ? (
                        <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.address1}
                        </div>
                      ) : null}

                      {/* Apartment address 2 */}
                      <div
                        className={
                          "flex items-center border-2 rounded-xl  lg:w-128 mb-8 border-gray-300 focus-within:border-text-blue"
                        }
                      >
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="align-middle fill-current text-gray-400 text-lg ml-2"
                        />
                        <Field
                          id="address2"
                          name="address2"
                          type="text"
                          placeholder="Address Line 2"
                          maxLength="150"
                          autoComplete="off"
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* City */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  lg:w-128 " ${
                          props.touched.city && props.errors.city
                            ? "mb-1 border-red-800 shadow-none"
                            : "mb-8 border-gray-300 focus-within:border-text-blue"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="align-middle fill-current text-gray-400 text-lg ml-2"
                        />
                        <Field
                          id="city"
                          name="city"
                          type="text"
                          placeholder="City*"
                          maxLength="50"
                          autoComplete="off"
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - city */}
                      {props.touched.city && props.errors.city ? (
                        <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.city}
                        </div>
                      ) : null}

                      {/* State and pincode */}
                      <div className="flex justify-between">
                        {/* State */}
                        <div className="w-48 lg:w-64">
                          <div
                            className={`${
                              props.touched.state && props.errors.state
                                ? "mb-1  border-2 border-red-800 rounded-xl shadow-none"
                                : "mb-8 border-2 border-gray-300 rounded-xl   focus-within:border-text-blue"
                            }`}
                          >
                            <Select
                              id="state"
                              name="state"
                              instanceId="state"
                              options={states}
                              placeholder="Select State/UT"
                              styles={selectStyleBlue}
                              className="text-xs lg:text-sm p-1.5"
                              onBlur={() =>
                                props.setFieldTouched("state", true)
                              }
                              onChange={(o) => {
                                props.setFieldValue(
                                  "state",
                                  (props.values.state = o.value)
                                );
                              }}
                              isSearchable
                              theme={(theme) => ({
                                ...theme,
                                colors: {
                                  ...theme.colors,
                                  neutral50: "#4B5563", // Placeholder color
                                },
                              })}
                            />
                          </div>
                          {props.touched.state && props.errors.state ? (
                            <div className="font-axiforma text-xs text-red-800 py-1 mb-2">
                              <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                              {props.errors.state}
                            </div>
                          ) : null}
                        </div>

                        {/* Pincode */}
                        <div className="flex flex-col ml-5">
                          <div
                            className={`"flex items-center justify-center border-2 rounded-xl  lg:w-64" ${
                              props.touched.pincode && props.errors.pincode
                                ? "mb-1 border-red-800 shadow-none"
                                : "mb-8 border-gray-300 focus-within:border-text-blue"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={faMapPin}
                              className="align-middle fill-current text-gray-400 text-lg ml-2"
                            />
                            <Field
                              id="pincode"
                              name="pincode"
                              type="text"
                              placeholder="Pincode*"
                              maxLength="15"
                              autoComplete="off"
                              className="textbox-input w-9/12 lg:10/12 placeholder-gray-600 placeholder-opacity-50"
                            />
                          </div>

                          {/* Validation errors - pincode */}
                          {props.touched.pincode && props.errors.pincode ? (
                            <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                              <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                              {props.errors.pincode}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/* Email */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  lg:w-128 " ${
                          props.touched.email && props.errors.email
                            ? "mb-1 border-red-800 shadow-none"
                            : "mb-8 border-gray-300 focus-within:border-text-blue"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="align-middle fill-current text-gray-400 text-lg ml-2"
                        />
                        <Field
                          id="email"
                          name="email"
                          type="text"
                          placeholder="Your email*"
                          maxLength="50"
                          autoComplete="off"
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - email */}
                      {props.touched.email && props.errors.email ? (
                        <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.email}
                        </div>
                      ) : null}

                      <ReCAPTCHA
                        id="recaptcha"
                        name="recaptcha"
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        className="mb-8"
                        onChange={() =>
                          setEnableFormSubmission(!enableFormSubmission)
                        }
                      />

                      <div className="flex justify-center my-8">
                        <motion.button
                          type="submit"
                          variants={variants}
                          whileHover="hover"
                          whileTap="tap"
                          className={`"py-6 px-6 h-12 bg-blue-600 shadow-buttonShadowBlue text-white font-bold rounded-xl uppercase tracking-wide focus:outline-none " ${
                            !enableFormSubmission && "cursor-not-allowed"
                          } ${props.isSubmitting && "cursor-not-allowed"}`}
                          disabled={!enableFormSubmission ? true : false}
                        >
                          {!props.isSubmitting ? (
                            "Register Neighbourhood"
                          ) : (
                            <BouncingBalls />
                          )}
                        </motion.button>
                      </div>

                      <Terms termsLinksStyle={termsLinksStyle} />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div variants={variants} initial="initial" animate="animate">
          <NeighbourCreationNotification
            email={submittedNeighbourhood.submitted_by}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateNeighbourhood;
