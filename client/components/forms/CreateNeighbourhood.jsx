import React, { useContext, useState, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import states from "../../utils/states";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import keys from "../../utils/keys";
import { selectStyleBlue } from "../../utils/styles";
import { skyline } from "../../utils/siteImages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faBuilding,
  faMapMarkerAlt,
  faMapPin,
  faEnvelope,
  faExclamationTriangle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import Terms from "../page_components/common/Terms";
import BouncingBalls from "../loaders/BouncingBalls";
import NeighbourCreationNotification from "../page_components/neighbourhood_registration/NeighbourCreationNotification";
import NeighbourhoodRegistrationProcedure from "../page_components/neighbourhood_registration/NeighbourhoodRegistrationProcedure";

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

  // useEffect(() => {
  //   window.scroll({ top: 0, left: 0, behavior: "smooth" });
  // }, []);

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
          className="pb-20 bg-white -mt-1"
        >
          <div className="invisible lg:visible lg:opacity-50 pt-10 lg:pt-20 lg:mx-10 lg:bg-white lg:flex lg:justify-center">
            <img src={skyline} alt="City skyline" />
          </div>
          <div className="rounded-3xl shadow-boxshadowregister text-brand-gray bg-white py-10 px-6 lg:px-8 mx-4 overflow-x-hidden lg:mx-20">
            <h1 className="font-bold text-3xl text-center text-brand-gray tracking-wide mb-5">
              Register Your Apartment
            </h1>
            <p className="text-blue-800 mb-5 text-center text-sm">
              <FontAwesomeIcon icon={faStar} /> Pro tip: Providing the official
              name of your apartment will ensure a smoother registration process
            </p>

            {/* Flex container with form */}
            <div className="flex flex-col lg:flex-row lg:justify-center divide-y-2 lg:divide-y-0 lg:divide-x-2">
              {/* Registration procedure */}
              <NeighbourhoodRegistrationProcedure />

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
                    setSubmitting(true);
                    createApartment(
                      values.name,
                      values.address1,
                      values.address2,
                      values.city,
                      values.state,
                      values.pincode,
                      values.email
                    );
                    setTimeout(() => {
                      sendNbhRegistrationEmailToUser(values.name, values.email);
                      setSubmitting(false);
                    }, 500);
                  }}
                >
                  {(props) => (
                    <Form>
                      <h2 className="text-xl text-center font-semibold mb-6">
                        Enter your apartment details
                      </h2>

                      {/* Apartment name */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  lg:w-128 " ${
                          props.touched.name && props.errors.name
                            ? "mb-1 error-border shadow-none"
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
                          aria-required="true"
                          aria-invalid={
                            props.touched.name && props.errors.name
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.name && props.errors.name
                              ? "name-error"
                              : null
                          }
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - apartment name */}
                      {props.touched.name && props.errors.name ? (
                        <div
                          className="font-axiforma text-xs error-text p-1 mb-2"
                          id="name-error"
                        >
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.name}
                        </div>
                      ) : null}

                      {/* Apartment address 1 */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  lg:w-128 " ${
                          props.touched.address1 && props.errors.address1
                            ? "mb-1 error-border shadow-none"
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
                          aria-required="true"
                          aria-invalid={
                            props.touched.address1 && props.errors.address1
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.address1 && props.errors.address1
                              ? "address1-error"
                              : null
                          }
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - address 1 */}
                      {props.touched.address1 && props.errors.address1 ? (
                        <div
                          className="font-axiforma text-xs error-text p-1 mb-2"
                          id="address1-error"
                        >
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
                            ? "mb-1 error-border shadow-none"
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
                          aria-required="true"
                          aria-invalid={
                            props.touched.city && props.errors.city
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.city && props.errors.city
                              ? "city-error"
                              : null
                          }
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - city */}
                      {props.touched.city && props.errors.city ? (
                        <div
                          className="font-axiforma text-xs error-text p-1 mb-2"
                          id="city-error"
                        >
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
                                ? "mb-1  border-2 error-border rounded-xl shadow-none"
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
                              aria-label="Drop down list to selct an Indian state"
                            />
                          </div>
                          {props.touched.state && props.errors.state ? (
                            <div className="font-axiforma text-xs error-text py-1 mb-2">
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
                                ? "mb-1 error-border shadow-none"
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
                              aria-required="true"
                              aria-invalid={
                                props.touched.pincode && props.errors.pincode
                                  ? "true"
                                  : null
                              }
                              aria-describedby={
                                props.touched.pincode && props.errors.pincode
                                  ? "pincode-error"
                                  : null
                              }
                              className="textbox-input w-9/12 lg:10/12 placeholder-gray-600 placeholder-opacity-50"
                            />
                          </div>

                          {/* Validation errors - pincode */}
                          {props.touched.pincode && props.errors.pincode ? (
                            <div
                              className="font-axiforma text-xs error-text p-1 mb-2"
                              id="pincode-error"
                            >
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
                            ? "mb-1 error-border shadow-none"
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
                          aria-required="true"
                          aria-invalid={
                            props.touched.email && props.errors.email
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.email && props.errors.email
                              ? "email-error"
                              : null
                          }
                          className="textbox-input w-10/12 lg:w-11/12 placeholder-gray-600 placeholder-opacity-50"
                        />
                      </div>

                      {/* Validation errors - email */}
                      {props.touched.email && props.errors.email ? (
                        <div
                          className="font-axiforma text-xs error-text p-1 mb-2"
                          id="email-error"
                        >
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
                          className={`"px-6 h-12 bg-blue-600 shadow-buttonShadowBlue text-white font-bold rounded-xl uppercase tracking-wide focus:outline-none w-full " ${
                            !enableFormSubmission && "cursor-not-allowed"
                          } ${props.isSubmitting && "cursor-not-allowed"}`}
                          disabled={!enableFormSubmission ? true : false}
                        >
                          {!props.isSubmitting ? (
                            "Register Apartment"
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
