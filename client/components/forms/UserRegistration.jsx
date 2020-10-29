import React, { useState, useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha"
import keys from "../../utils/keys"

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
  faDoorOpen
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Router from "next/router";

// Component import
import VerifyEmail from "../utils/VerifyEmail";
import Alert from "../utils/Alert";

const userRegistrationValidationSchema = Yup.object({
  name: Yup.string().required("Please enter your name").max(100).trim(),
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
  apartmentNumber: Yup.string().required("Please enter your apartment number")
});

const alertTheme = "bg-blue-200 text-blue-800";

const UserRegistration = () => {
  var apartmentId;
  const [displayPassword, setDisplayPassword] = useState(false);
  const [parentDiv, setparentDiv] = useState("visible");
  const [showForm, setShowForm] = useState(true);
  const [enableFormSubmission, setEnableFormSubmission] = useState(false)

  const siteContext = useContext(SiteContext);
  const { fetchApartments, numApartmentsFetched, apartmentData, validateApartmentSelection, fetchError } = siteContext;

  const authContext = useContext(AuthContext);
  const {
    loadUser,
    user,
    registerUser,
    isAuthenticated,
    authError
  } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();

      setShowForm(false);
    }
  }, [isAuthenticated]);

  const searchApartment = (e) => {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="rounded-md shadow-boxshadowregister bg-white p-8 mb-4"
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              mobile: "",
              password: "",
              apartment: "",
              apartmentNumber: ""
            }}
            validationSchema={userRegistrationValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true)

              apartmentId = apartmentData.find(
                (o) => o.name === values.apartment
              );

              if (!apartmentId){
                validateApartmentSelection("Please select an apartment from the list")
              }

              registerUser(
                values.name,
                values.email,
                values.mobile,
                values.password,
                values.apartmentNumber,
                apartmentId.id
              );
              setSubmitting(false);
            }}
          >
            {(props) => (
              <div>
                <h2 className="font-axiforma font-bold text-3xl text-center text-brand-gray tracking-wide mb-4">
                  Let's begin!
                </h2>
                <Alert authError={authError} fetchError={fetchError} alertTheme={alertTheme} />
                <Form>
                  {/* Name Fields */}
                  <div
                    className={`"flex items-center justify-center border-2 rounded-md " ${
                      props.touched.name && props.errors.name
                        ? "mb-1 border-red-800"
                        : "mb-4 border-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="inline fill-current text-gray-500 text-lg  ml-4"
                    />
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name*"
                      maxLength="50"
                      autoComplete="off"
                      autoFocus=""
                      className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-75"
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
                    className={`"flex items-center justify-center border-2 rounded-md " ${
                      props.touched.email && props.errors.email
                        ? "mb-1 border-red-800"
                        : "mb-4 border-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="inline align-middle fill-current text-gray-500 text-lg z-10 ml-4"
                    />
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email*"
                      maxLength="50"
                      autoComplete="off"
                      autoFocus=""
                      className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-75"
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
                    className={`"flex items-center justify-center border-2 rounded-md " ${
                      props.touched.mobile && props.errors.mobile
                        ? "mb-1 border-red-800"
                        : "mb-4 border-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faPhoneAlt}
                      className="inline align-middle fill-current text-gray-500 text-lg  ml-4"
                    />
                    <Field
                      id="mobile"
                      name="mobile"
                      type="text"
                      placeholder="Mobile"
                      maxLength="15"
                      autoComplete="off"
                      autoFocus=""
                      className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-75"
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
                    className={`"flex items-center justify-center border-2 rounded-md " ${
                      props.touched.password && props.errors.password
                        ? "mb-1 border-red-800"
                        : "mb-4 border-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faLock}
                      className="inline align-middle fill-current text-gray-500 text-lg  ml-4"
                    />
                    <Field
                      id="password"
                      name="password"
                      type={!displayPassword ? "password" : "text"}
                      placeholder="Password*"
                      maxLength="50"
                      autoComplete="off"
                      autoFocus=""
                      className="textbox-input w-9/12 md:w-10/12 placeholder-purple-900 placeholder-opacity-75"
                    />
                    <FontAwesomeIcon
                      icon={!displayPassword ? faEye : faEyeSlash}
                      className="text-sm align-middle top-0 right-0 text-gray-500 cursor-pointer"
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
                    className={`"flex items-center justify-center border-2 rounded-md " ${
                      props.touched.apartment && props.errors.apartment
                        ? "mb-1 border-red-800"
                        : "mb-1 border-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="inline align-middle fill-current text-gray-500 text-lg  ml-4"
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
                      className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-75"
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
                          ? "search-results border-blue-400 w-full overflow-auto" +
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
                              whileHover={{
                                color: "#667EEA",
                                fontWeight: "bold",
                              }}
                              onClick={() => {
                                props.setFieldValue(
                                  apartment,
                                  (props.values.apartment = o.name)
                                );
                                setparentDiv("invisible");
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
                          ? "absolute p-2 pt-4 mt-1 border-2 border-solid border-blue-400 bg-white rounded-lg  text-brand-gray; w-full h-20 align-middle overflow-auto"
                          : "hidden"
                      }
                    >
                      Not found? You can create a neighborhood for{" "}
                      <Link href="/register">
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
                    className={`"flex items-center justify-center border-2 rounded-md " ${
                      props.touched.apartmentNumber && props.errors.apartmentNumber
                        ? "mb-1 border-red-800"
                        : "mb-4 mt-4 border-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faDoorOpen}
                      className="inline align-middle fill-current text-gray-500 text-lg  ml-4"
                    />
                    <Field
                      id="apartmentNumber"
                      name="apartmentNumber"
                      type="text"
                      placeholder="Flat/house number* (Ex: 77, A2, C123)"
                      maxLength="10"
                      autoComplete="off"
                      className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-75"
                    />
                  </div>

                  {/* Validation errors */}
                  {props.touched.apartmentNumber && props.errors.apartmentNumber ? (
                    <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                      <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                      {props.errors.apartmentNumber}
                    </div>
                  ) : null}

                  <ReCAPTCHA
                    id="recaptcha"
                    name="recaptcha"
                    sitekey={keys.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    className="mt-4"
                    onChange={() => setEnableFormSubmission(!enableFormSubmission)}
                  />

                  <div className="text-center">
                    <motion.button
                      whileTap={{
                        backgroundColor: "#7F9CF5",
                        y: "5px",
                        boxShadow: "0px 8px 15px rgba(151, 201, 251, 0.2)",
                      }}
                      className={ "mt-4 mb-8 w-full h-12 bg-blue-600 text-white font-axiforma font-bold rounded-md uppercase tracking-wide focus:outline-none " + (!enableFormSubmission ? "cursor-not-allowed " : null)}
                      type="submit"
                      arira-aria-label="User registration button"
                      disabled={!enableFormSubmission ? "disabled" : null}
                    >
                      Register
                    </motion.button>
                  </div>
                </Form>
                <div className="font-axiforma text-blue-700 text-center text-xs">
                  By registering, you acknowledge that you have read and understood our<br /> {"  "} 
                  <Link href="/"><a className="underline">Cookie Policy</a></Link>,{"  "}
                  <Link href="/"><a className="underline">Privacy Policy</a></Link> and our{"  "} 
                  <Link href="/"><a className="underline">Terms of Use</a></Link>.
                </div>
                <div className="font-axiforma text-blue-700 text-center mt-4 text-sm  lg:text-md">
                  Already have an account?{" "}
                  <motion.button
                    className="ml-2 inline bg-opacity-25 bg-blue-400 text-blue-800 p-3 shadow-sm  font-semibold focus:outline-none"
                    whileHover={{
                      backgroundColor: "#3182CE",
                      color: "#FFFFFF",
                    }}
                    onClick={() => {
                      Router.push("/login");
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-md shadow-boxshadowregister bg-white p-12"
        >
          <VerifyEmail user={user} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserRegistration;
