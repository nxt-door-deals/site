import React, { useState, useContext } from "react";
import SiteContext from "../../context/site/siteContext";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhoneAlt,
  faBuilding,
  faExclamationTriangle,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Router from "next/router";

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
});

const UserRegistration = () => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [parentDiv, setparentDiv] = useState("visible");
  const siteContext = useContext(SiteContext);
  const {
    fetchApartments,
    numApartmentsFetched,
    apartmentData,
    clearApartmentSearchResults,
  } = siteContext;

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
    <div className="rounded-md shadow-boxshadowregister z-50 bg-white p-12">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          mobile: "",
          apartment: "",
        }}
        validationSchema={userRegistrationValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values.email);
          setSubmitting(false);
        }}
      >
        {(props) => (
          <div>
            <h2 className="font-axiforma font-bold text-3xl text-center text-brand-gray tracking-wide mb-4">
              Let's begin!
            </h2>
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
                  className="inline fill-current text-gray-600 text-lg opacity-50 ml-4"
                />
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name*"
                  maxLength="50"
                  autoComplete="off"
                  autoFocus=""
                  className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-50"
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
                  className="inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-4"
                />
                <Field
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email*"
                  maxLength="50"
                  autoComplete="off"
                  autoFocus=""
                  className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-50"
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
                  className="inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-4"
                />
                <Field
                  id="mobile"
                  name="mobile"
                  type="text"
                  placeholder="Mobile"
                  maxLength="15"
                  autoComplete="off"
                  autoFocus=""
                  className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-50"
                />
              </div>

              {/* Validation errors */}
              {props.touched.mobile && props.errors.mobile ? (
                <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.mobile}
                </div>
              ) : null}

              {/* Password Fields */}
              <div
                className={`"flex items-center justify-center border-2 rounded-md " ${
                  props.touched.password && props.errors.password
                    ? "mb-1 border-red-800"
                    : "mb-4 border-gray-300"
                }`}
              >
                <FontAwesomeIcon
                  icon={faLock}
                  className="inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-4"
                />
                <Field
                  id="password"
                  name="password"
                  type={!displayPassword ? "password" : "text"}
                  placeholder="Password*"
                  maxLength="50"
                  autoComplete="off"
                  autoFocus=""
                  className="textbox-input w-9/12 md:w-10/12 placeholder-purple-900 placeholder-opacity-50"
                />
                <FontAwesomeIcon
                  icon={!displayPassword ? faEye : faEyeSlash}
                  className="text-sm align-middle top-0 right-0 opacity-50 cursor-pointer"
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
                    : "border-gray-300"
                }`}
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="inline align-middle fill-current text-gray-600 text-lg opacity-50 ml-4"
                />
                <Field
                  id="apartment"
                  name="apartment"
                  type="text"
                  placeholder="Search Apartment*"
                  maxLength="100"
                  autoComplete="off"
                  autoFocus=""
                  onKeyUp={searchApartment}
                  className="textbox-input w-10/12 placeholder-purple-900 placeholder-opacity-50"
                />
              </div>

              {/* Validation errors */}
              {props.touched.apartment && props.errors.apartment ? (
                <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.apartment}
                </div>
              ) : null}

              {/* Menu to display search results */}
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
                          whileHover={{ color: "#667EEA", fontWeight: "bold" }}
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
                      ? "absolute p-2 pt-4 mt-1 border-2 border-solid border-blue-400 bg-white z-20 rounded-lg  text-brand-gray; w-full h-20 align-middle overflow-auto"
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

              <div>
                <motion.button
                  whileTap={{
                    backgroundColor: "#7F9CF5",
                    y: "5px",
                    boxShadow: "0px 8px 15px rgba(151, 201, 251, 0.2)",
                  }}
                  className="mt-6 mb-8 w-64 md:w-100 h-12 bg-blue-600 text-white font-axiforma font-bold rounded-md uppercase tracking-wide focus:outline-none"
                  type="submit"
                  arira-aria-label="User registration button"
                >
                  Register
                </motion.button>
              </div>
            </Form>
            <div className="font-axiforma text-blue-700 text-center mt-4 text-sm  lg:text-md">
              Already have an account?{" "}
              <motion.button
                className="ml-2 inline bg-opacity-25 bg-blue-400 text-brand-gray p-3 shadow-sm z-30 font-semibold focus:outline-none"
                whileHover={{
                  backgroundColor: "#4C51BF",
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
    </div>
  );
};

export default UserRegistration;
