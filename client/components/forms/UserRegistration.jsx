import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";
import debounce from "lodash.debounce";

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
import VerifyEmail from "../page_components/user_registration/VerifyEmail";
import Alert from "../page_components/common/Alert";
import Terms from "../page_components/common/Terms";
import BouncingBalls from "../loaders/BouncingBalls";
import MobileInfo from "../page_components/user_registration/MobileInfo";

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
  mobile: Yup.string().matches(/^\d{10}$/, "Must be a valid mobile number"),
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
  const [mobileModal, setMobileModal] = useState(false);
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
  const { loadUser, user, registerUser, isAuthenticated, authError } =
    authContext;

  useEffect(() => {
    loadAllApartments();
  }, []);

  useEffect(() => {
    if (fetchError || authError) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    return setHideResults("hidden");
  }, [fetchError, authError]);

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();

      setTimeout(() => setShowForm(false), 1000);
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

  const debouncedApartmentSearch = useMemo(
    () => debounce(searchApartment, 300),
    []
  );

  useEffect(() => {
    debouncedApartmentSearch.cancel();
  }, []);

  const setPasswordDisplay = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="flex justify-center items-center h-full pt-32 bg-gradient-to-b from-blue-50 to-white">
        <div
          className={`mx-2 md:mx-8 mb-16 ${showForm ? "lg:w-1/3" : "lg:w-2/3"}`}
        >
          {showForm ? (
            <motion.div
              key="form"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-3xl shadow-boxshadowregister bg-white px-4 py-8 lg:p-8  mb-4"
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
                      "Please select an apartment from the list"
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
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 1000);
                  }
                }}
              >
                {(props) => (
                  <div>
                    <h1 className="component-heading">Let's begin!</h1>
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
                            ? "mb-1 error-border shadow-none"
                            : "mb-8 border-gray-300 focus-within:border-text-blue"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className="inline fill-current text-gray-400 text-lg ml-4"
                        />
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Name*"
                          maxLength="50"
                          autoComplete="off"
                          autoFocus
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
                          className="textbox-input w-10/12 placeholder-gray-600 "
                        />
                      </div>

                      {/* Validation errors */}
                      {props.touched.name && props.errors.name ? (
                        <div
                          className="font-axiforma text-xs error-text p-1 mb-2"
                          id="name-error"
                        >
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.name}
                        </div>
                      ) : null}

                      {/* Email */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  " ${
                          props.touched.email && props.errors.email
                            ? "mb-1 error-border shadow-none"
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

                      {/* Mobile */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  " ${
                          props.touched.mobile && props.errors.mobile
                            ? "mb-1 error-border shadow-none"
                            : "mb-1 border-gray-300 focus-within:border-text-blue"
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
                          aria-required="true"
                          aria-invalid={
                            props.touched.mobile && props.errors.mobile
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.mobile && props.errors.mobile
                              ? "mobile-error"
                              : null
                          }
                          className="textbox-input w-10/12 placeholder-gray-600 "
                        />
                      </div>

                      {/* Validation errors */}
                      {props.touched.mobile && props.errors.mobile ? (
                        <div
                          className="text-xs error-text p-1 mb-1"
                          id="mobile-error"
                        >
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.mobile}
                        </div>
                      ) : null}

                      {/* Note about the mobile number */}
                      <div
                        className={`mb-6 ml-1 ${
                          props.touched.mobile && props.errors.mobile && "mb-5"
                        }`}
                      >
                        <Link href="#">
                          <a
                            className="text-blue-800 pb-1 text-xs cursor-pointer max-w-max focus-within:outline-none"
                            onClick={() => setMobileModal(true)}
                          >
                            <span className="styled-link pb-1">
                              Why do we ask for your mobile number?
                            </span>
                          </a>
                        </Link>
                      </div>

                      {/* Password Field */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  " ${
                          props.touched.password && props.errors.password
                            ? "mb-1 error-border shadow-none"
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
                          aria-required="true"
                          aria-invalid={
                            props.touched.password && props.errors.password
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.password && props.errors.password
                              ? "password-error"
                              : null
                          }
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
                        <div
                          className="text-xs error-text p-1 mb-2"
                          id="password-error"
                        >
                          <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                          {props.errors.password}
                        </div>
                      ) : null}

                      {/* Apartment */}
                      <div
                        className={`"flex items-center justify-center border-2 rounded-xl  " ${
                          props.touched.apartment && props.errors.apartment
                            ? "mb-1 error-border shadow-none"
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
                          onKeyUp={debouncedApartmentSearch}
                          aria-required="true"
                          aria-invalid={
                            props.touched.apartment && props.errors.apartment
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.apartment && props.errors.apartment
                              ? "apartment-error"
                              : null
                          }
                          className="textbox-input w-10/12 placeholder-gray-600 "
                        />
                      </div>

                      {/* Validation errors */}
                      {props.touched.apartment && props.errors.apartment ? (
                        <div
                          className="font-axiforma text-xs error-text p-1 mb-2"
                          id="apartment-error"
                        >
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
                          Not found? You can create a marketplace for{" "}
                          <Link
                            href={`/register/neighbourhood/${props.values.apartment}`}
                          >
                            <a className="text-blue-700 font-bold underline focus-within:outline-none">
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
                        className={`"flex items-center justify-center border-2 rounded-xl " ${
                          props.touched.apartment && props.errors.apartment
                            ? " mt-1 "
                            : " mt-8"
                        } ${
                          props.touched.apartmentNumber &&
                          props.errors.apartmentNumber
                            ? "mb-1 error-border shadow-none"
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
                          aria-required="true"
                          aria-invalid={
                            props.touched.apartmentNumber &&
                            props.errors.apartmentNumber
                              ? "true"
                              : null
                          }
                          aria-describedby={
                            props.touched.apartmentNumber &&
                            props.errors.apartmentNumber
                              ? "apartmentNumber-error"
                              : null
                          }
                          className="textbox-input w-10/12 placeholder-gray-600 "
                        />
                      </div>

                      {/* Validation errors */}
                      {props.touched.apartmentNumber &&
                      props.errors.apartmentNumber ? (
                        <div
                          className="font-axiforma text-xs error-text p-1 mb-2"
                          id="apartmentNumber-error"
                        >
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
                          className={`w-full h-12 bg-blue-600 shadow-buttonShadowBlue text-white font-axiforma font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                            props.isSubmitting && "cursor-not-allowed"
                          }`}
                          type="submit"
                          aria-label="User registration button"
                          disabled={
                            authError !== null ||
                            !enableFormSubmission ||
                            (props.isSubmitting && isAuthenticated)
                          }
                        >
                          {authError ? (
                            "Register"
                          ) : props.isSubmitting || isAuthenticated ? (
                            <BouncingBalls />
                          ) : (
                            "Register"
                          )}
                        </motion.button>
                      </div>
                    </Form>

                    {/* T&C */}
                    <Terms
                      termsLinksStyle={termsLinksStyle}
                      termsReason="registering"
                    />

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

              <Modal
                style={{
                  overlay: {
                    zIndex: 99999,
                    opacity: 1,
                    background: "var(--modal-overlay-color)",
                  },
                }}
                isOpen={mobileModal}
                shouldFocusAfterRender={true}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setMobileModal(false)}
                className="flex justify-center items-center h-screen px-10"
                scrollable={true}
                className="h-full py-10 lg:flex overflow-scroll lg:items-center lg:justify-center lg:overflow-hidden lg:pt-0 px-2"
              >
                <div>
                  <MobileInfo
                    mobileModal={mobileModal}
                    setMobileModal={setMobileModal}
                  />
                </div>
              </Modal>
            </motion.div>
          ) : (
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              className="rounded-3xl shadow-boxshadowregister bg-white p-6 lg:p-12"
            >
              <VerifyEmail user={user && user} />
            </motion.div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default UserRegistration;
