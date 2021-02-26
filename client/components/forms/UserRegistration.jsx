import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhoneAlt,
  faSearch,
  faBuilding,
  faExclamationTriangle,
  faMapPin,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// Component import
import VerifyEmail from "../utils/VerifyEmail";
import Alert from "../utils/Alert";
import Terms from "../utils/Terms";
import BouncingBalls from "../loaders/BouncingBalls";

const userRegistrationValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets and spaces allowed")
    .required("Please enter your name")
    .max(100)
    .trim(),
  email: Yup.string()
    .email("Please enter a valid email id")
    .required("Please enter your email id")
    .max(50)
    .trim(),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Your password should have at least 8 characters")
    .trim(),
  mobile: Yup.string().matches(/^[0-9]+$/, "Must be a number"),
  apartment: Yup.string().required("Please select your apartment/property"),
  apartmentNumber: Yup.string()
    .required("Please enter your apartment number")
    .matches(/^[^=<>`]+$/, "Title cannot contain ^ = < > or `"),
});

// Alert style
const alertTheme = "bg-blue-200 text-blue-600";

// Terms link style
const termsLinksStyle = "underline text-blue-600";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  searchResultsHover: {
    color: "#667EEA",
    fontWeight: 600,
  },
  buttonHover: {
    backgroundColor: "#1E40AF",
  },
  buttonTap: {
    backgroundColor: "#2563EB",
    y: "2px",
  },
  secondaryButtonHover: {
    backgroundColor: "#3182CE",
    color: "#FFFFFF",
  },
};

const UserRegistration = () => {
  var apartment;
  const [displayPassword, setDisplayPassword] = useState(false);
  const [parentDiv, setparentDiv] = useState("visible");
  const [hideResults, setHideResults] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const selectedApartment = useRef(null);
  const [enableFormSubmission, setEnableFormSubmission] = useState(false);
  const router = useRouter();

  const siteContext = useContext(SiteContext);
  const {
    fetchApartments,
    numApartmentsFetched,
    apartmentData,
    validateApartmentSelection,
    fetchError,
    loadAllApartments,
    allApartments,
  } = siteContext;

  const authContext = useContext(AuthContext);
  const {
    loadUser,
    user,
    registerUser,
    isAuthenticated,
    authError,
  } = authContext;

  useEffect(() => {
    loadAllApartments();
  }, []);

  useEffect(() => {
    if (fetchError) {
      window.scrollTo(0, 0);
    }

    return setHideResults("hidden");
  }, [fetchError]);

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      setShowForm(false);
    }
  }, [isAuthenticated]);

  const searchApartment = (e) => {
    setHideResults(null);
    setparentDiv("visible");
    fetchApartments(e.target.value);

    if (e.which === 13) {
      e.preventDefault();
    }
  };

  const setPasswordDisplay = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {showForm ? (
        <motion.div
          key="form"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="rounded-3xl shadow-boxshadowregister bg-white p-8 mb-4"
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              mobile: "",
              password: "",
              apartment: "",
              apartmentNumber: "",
            }}
            validationSchema={userRegistrationValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setHideResults("hidden");

              apartment = allApartments.find(
                (o) => o.name === values.apartment
              );

              if (!apartment) {
                validateApartmentSelection(
                  "Please select a neighbourhood from the list"
                );
                setHideResults(null);
                setSubmitting(false);
              }

              if (enableFormSubmission && apartment) {
                setSubmitting(true);

                registerUser(
                  values.name,
                  values.email,
                  values.mobile,
                  values.password,
                  values.apartmentNumber,
                  selectedApartment.current
                );
                setTimeout(() => setSubmitting(false), 2000);
              }
            }}
          >
            {(props) => (
              <div>
                <h2 className="component-heading">Let's begin!</h2>
                <Alert
                  authError={authError}
                  fetchError={fetchError}
                  alertTheme={alertTheme}
                />
                <Form>
                  {/* Name Fields */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-xl " ${
                      props.touched.name && props.errors.name
                        ? "mb-1 border-red-800 shadow-none"
                        : "mb-8 border-gray-300 focus-within:border-text-blue"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="inline fill-current text-gray-400 text-lg  ml-4"
                    />
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name*"
                      maxLength="50"
                      autoComplete="off"
                      autoFocus=""
                      className="textbox-input w-10/12 placeholder-gray-600 "
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.name && props.errors.name ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.name}
                    </div>
                  ) : null}

                  {/* Email */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-xl  " ${
                      props.touched.email && props.errors.email
                        ? "mb-1 border-red-800 shadow-none"
                        : "mb-8 border-gray-300 focus-within:border-text-blue"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="inline align-middle fill-current text-gray-400 text-lg z-10 ml-4"
                    />
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email*"
                      maxLength="50"
                      autoComplete="off"
                      autoFocus=""
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

                  {/* Mobile */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-xl  " ${
                      props.touched.mobile && props.errors.mobile
                        ? "mb-1 border-red-800 shadow-none"
                        : "mb-8 border-gray-300 focus-within:border-text-blue"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faPhoneAlt}
                      className="inline align-middle fill-current text-gray-400 text-lg  ml-4"
                    />
                    <Field
                      id="mobile"
                      name="mobile"
                      type="text"
                      placeholder="Mobile"
                      maxLength="15"
                      autoComplete="off"
                      autoFocus=""
                      className="textbox-input w-10/12 placeholder-gray-600 "
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.mobile && props.errors.mobile ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.mobile}
                    </div>
                  ) : null}

                  {/* Password Field */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-xl  " ${
                      props.touched.password && props.errors.password
                        ? "mb-1 border-red-800 shadow-none"
                        : "mb-8 border-gray-300 focus-within:border-text-blue"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faLock}
                      className="inline align-middle fill-current text-gray-400 text-lg  ml-4"
                    />
                    <Field
                      id="password"
                      name="password"
                      type={!displayPassword ? "password" : "text"}
                      placeholder="Password*"
                      maxLength="50"
                      autoComplete="off"
                      autoFocus=""
                      className="textbox-input w-9/12 md:w-10/12 placeholder-gray-600 "
                    />
                    <FontAwesomeIcon
                      icon={!displayPassword ? faEye : faEyeSlash}
                      className="text-sm align-middle top-0 right-0 text-gray-400 cursor-pointer"
                      onClick={setPasswordDisplay}
                      aria-label={
                        !displayPassword ? "Show Password" : "Hide Password"
                      }
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.password && props.errors.password ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.password}
                    </div>
                  ) : null}

                  {/* Apartment */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-xl  " ${
                      props.touched.apartment && props.errors.apartment
                        ? "mb-1 border-red-800 shadow-none"
                        : "border-gray-300 focus-within:border-text-blue"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="inline align-middle fill-current text-gray-400 text-lg ml-4"
                    />
                    <Field
                      id="apartment"
                      name="apartment"
                      type="text"
                      placeholder="Your Apartment*"
                      maxLength="100"
                      autoComplete="off"
                      autoFocus=""
                      onKeyUp={searchApartment}
                      className="textbox-input w-10/12 placeholder-gray-600 "
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.apartment && props.errors.apartment ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.apartment}
                    </div>
                  ) : null}

                  {/* Menu to display apartment search results */}
                  <div className="relative ">
                    <div
                      className={
                        numApartmentsFetched > 0
                          ? hideResults +
                            " search-results border-blue-400 w-full overflow-auto" +
                            " " +
                            parentDiv
                          : "invisible"
                      }
                    >
                      {apartmentData.length > 0 &&
                        apartmentData.map((o, index) => {
                          return (
                            <motion.div
                              key={index}
                              className="cursor-pointer"
                              variants={variants}
                              whileHover="searchResultsHover"
                              onClick={() => {
                                props.setFieldValue(
                                  apartment,
                                  (props.values.apartment = o.name)
                                );
                                setparentDiv("invisible");

                                {
                                  /* This will help with multiple apartments with the same name */
                                }
                                selectedApartment.current = o.id;
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faBuilding}
                                className="inline mr-2 text-lg align-middle"
                              />
                              <p
                                className="text-base align-middle inline"
                                key={index}
                                value={o.name}
                              >
                                {o.name}
                              </p>
                              <br />
                              <FontAwesomeIcon
                                icon={faMapPin}
                                className="inline mr-1 align-middle"
                              />
                              <p className="text-xs mt-1 mb-1 inline align-middle">
                                {o.address1}, {o.city} - {o.pincode}
                              </p>

                              <hr className="border-1 border-indigo-700 mt-1 mb-3" />
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Menu to display if neighbourhood does not exist */}
                  <div className="relative">
                    <div
                      className={
                        props.values.apartment === ""
                          ? "hidden"
                          : numApartmentsFetched === 0
                          ? hideResults +
                            " absolute p-2 pt-4 mt-1 border-2 border-solid border-blue-400 bg-white rounded-lg  text-brand-gray; w-full h-20 align-middle overflow-auto"
                          : "hidden"
                      }
                    >
                      Not found? You can create a neighbourhood for{" "}
                      <Link href={`/neighbourhood/${props.values.apartment}`}>
                        <a className="text-blue-700 font-bold underline">
                          {props.values.apartment}
                        </a>
                      </Link>{" "}
                      and then register. It's{" "}
                      <span className="font-semibold text-blue-700">
                        absolutely free!
                      </span>
                    </div>
                  </div>

                  {/* Apartment number */}
                  <div
                    className={`"flex items-center justify-center border-2 mt-8 rounded-xl " ${
                      props.errors.apartment && " mt-0 "
                    } ${
                      props.touched.apartmentNumber &&
                      props.errors.apartmentNumber
                        ? "mb-1 border-red-800 shadow-none"
                        : "mb-8 border-gray-300 focus-within:border-text-blue"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faDoorOpen}
                      className="inline align-middle fill-current text-gray-400 text-lg  ml-4"
                    />
                    <Field
                      id="apartmentNumber"
                      name="apartmentNumber"
                      type="text"
                      placeholder="Flat/house number* (Ex: 77, A2)"
                      maxLength="10"
                      autoComplete="off"
                      className="textbox-input w-10/12 placeholder-gray-600 "
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.apartmentNumber &&
                  props.errors.apartmentNumber ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.apartmentNumber}
                    </div>
                  ) : null}

                  <ReCAPTCHA
                    id="recaptcha"
                    name="recaptcha"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    className="mt-4"
                    onChange={() =>
                      setEnableFormSubmission(!enableFormSubmission)
                    }
                  />

                  <div className="text-center mt-7 mb-8 ">
                    <motion.button
                      variants={variants}
                      whileHover="buttonHover"
                      whileTap="buttonTap"
                      className={`w-full h-12 bg-blue-600 text-white font-axiforma font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                        props.isSubmitting && "cursor-not-allowed"
                      }`}
                      type="submit"
                      arira-aria-label="User registration button"
                      disabled={
                        authError !== null ||
                        !enableFormSubmission ||
                        props.isSubmitting
                      }
                    >
                      {authError ? (
                        "Register"
                      ) : props.isSubmitting ? (
                        <BouncingBalls />
                      ) : (
                        "Register"
                      )}
                    </motion.button>
                  </div>
                </Form>

                {/* T&C */}
                <Terms termsLinksStyle={termsLinksStyle} />

                <div className="font-axiforma text-center mt-4">
                  Already have an account?{" "}
                  <motion.button
                    className="ml-2 inline bg-opacity-25 bg-blue-400 text-blue-800 py-3 px-4 shadow-sm  font-semibold focus:outline-none rounded-xl"
                    variants={variants}
                    whileHover="secondaryButtonHover"
                    onClick={() => {
                      router.push("/login");
                    }}
                    aria-label="Button for login page"
                  >
                    Login
                  </motion.button>
                </div>
              </div>
            )}
          </Formik>
        </motion.div>
      ) : (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className="rounded-3xl shadow-boxshadowregister bg-white p-12"
        >
          <VerifyEmail user={user} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserRegistration;
