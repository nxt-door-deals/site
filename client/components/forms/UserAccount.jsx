import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import AuthContext from "../../context/auth/authContext";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import keys from "../../utils/keys";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faExclamationTriangle,
  faPhoneAlt,
  faDoorOpen,
  faTimes,
  faCheck,
  faBuilding,
  faMapPin,
  faInfoCircle,
  faTrash,
  faTrashAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import Alert from "../page_components/common/Alert";

const userAccountValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets and spaces allowed")
    .required("Please enter your name")
    .max(100)
    .trim(),
  mobile: Yup.string().matches(
    /^(\+91)\d{10}$/,
    "Must be a valid mobile number with country code (+91xxxxxxxxxx)"
  ),
  neighbourhood: Yup.string().required("Please select your apartment"),
  apartmentNumber: Yup.string()
    .required("Please enter your apartment number")
    .matches(/^[^=<>`]+$/, "Title cannot contain ^ = < > or `"),
});

const userAccountVariants = {
  saveEditButtonHover: {
    backgroundColor: "#4C1D95",
  },
  saveEditButtonTap: {
    y: "2px",
    backgroundColor: "#6D28D9",
  },
  cancelButtonHover: {
    backgroundColor: "#991B1B",
  },
  cancelButtonTap: {
    y: "2px",
    backgroundColor: "#F87171",
  },
};

const UserAccount = (props) => {
  const [parentDiv, setparentDiv] = useState("visible");
  const [hideResults, setHideResults] = useState(null);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [deactivate, setDeactivate] = useState(false);
  const [deactivateMessage, setDeactivateMessage] = useState(null);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [enableDeactivateButton, setEnableDeactivateButton] = useState(false);
  const [emailSentCount, setEmailSentCount] = useState(0);

  const router = useRouter();
  const authContext = useContext(AuthContext);
  const siteContext = useContext(SiteContext);
  const focusRef = useRef();
  const selectedApartment = useRef(null);

  const {
    sendEmail,
    updateUserProfile,
    updateEmailVerificationTimestamp,
    deleteUser,
    loadUser,
  } = authContext;
  const {
    fetchApartments,
    apartmentData,
    numApartmentsFetched,
    fetchError,
    validateApartmentSelection,
    loadAllApartments,
    allApartments,
    loading,
  } = siteContext;

  useEffect(() => {
    setTimeout(() => {
      loadAllApartments();
    }, 1500);
  }, []);

  const currentUser = props.currentUser;

  const initial = props.currentUser.name[0];

  const verificationUrl = `${keys.SERVER}/verifyemail/${currentUser.email_verification_hash}|${currentUser.id}`;

  const alertTheme = "bg-purple-200 text-brand-purple";

  // User account toast
  const emailVerificationToast = () =>
    toast("Verification link sent to your registered email id", {
      draggablePercent: 60,
      position: "top-center",
    });

  // Block verification email
  const emailBlockToast = () => {
    let message = `Too many attempts!! 😵
    Please try again after sometime`;

    toast(message, {
      draggablePercent: 60,
      position: "top-center",
    });
  };

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

  const checkDeactivateValue = (e) => {
    if (e.target.value === "delete") {
      setEnableDeactivateButton(true);
      setDeactivateMessage(null);
    } else {
      setEnableDeactivateButton(false);
      setDeactivateMessage("Please enter the text exactly as indicated");
    }
  };

  useEffect(() => {
    setparentDiv("invisible");
  }, []);

  useEffect(() => {
    if (emailSentCount >= 3) {
      emailBlockToast();
    } else if (emailSentCount > 0 && emailSentCount < 3) {
      updateEmailVerificationTimestamp(currentUser.id);
      sendEmail(
        currentUser && currentUser.name,
        currentUser && currentUser.email,
        verificationUrl
      );
      emailVerificationToast();
    }
  }, [emailSentCount]);

  if (loading) {
    return (
      <div className="py-8 px-8 lg:px-0">
        <div className="text-center">
          <Image
            src="/images/loader/loader.gif"
            alt="Loading..."
            height={100}
            width={100}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mb-20">
      <div className="mt-12 rounded-3xl shadow-userAccountShadow bg-white py-6 px-1 md:px-6 lg:px-4 text-brand-gray">
        <Formik
          initialValues={{
            name: currentUser.name,
            email: currentUser.email,
            mobile: currentUser.mobile || "",
            neighbourhood: currentUser.apartment_name,
            apartmentNumber: currentUser.apartment_number,
          }}
          validationSchema={userAccountValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setHideResults("hidden");

            const apartment = allApartments.find(
              (o) => o.name === values.neighbourhood
            );

            if (!apartment) {
              validateApartmentSelection(
                "Please select an apartment from the list"
              );
              setHideResults(null);
            } else {
              updateUserProfile(
                currentUser.id,
                values.name,
                currentUser.email,
                values.mobile,
                selectedApartment.current || currentUser.apartment_id,
                values.apartmentNumber,
                values.neighbourhood
              );
              setProfileUpdate(false);
            }

            setTimeout(() => setSubmitting(false), 2000);
          }}
        >
          {(props) => (
            <div className="text-brand-gray">
              <h1 className="component-heading">My profile</h1>
              <h2 className="font-semibold text-xl text-center text-purple-600 mb-8">
                {currentUser && currentUser.email}
              </h2>

              <div className="lg:hidden flex justify-center items-center mb-10">
                <div className="h-24 w-24 flex items-center justify-center rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm ring-4 ring-offset-2 text-center bg-purple-500  text-white text-5xl uppercase pt-1">
                  {currentUser.initial}
                </div>
              </div>

              {/* The form starts here */}
              <div className="lg:flex lg:justify-center">
                <div id="form" className="mx-0 lg:mx-10 w-88">
                  <Alert fetchError={fetchError} alertTheme={alertTheme} />
                  <Form>
                    {/* Name */}
                    <div
                      className={`${
                        profileUpdate
                          ? "border-2 rounded-xl border-gray-300 mx-2 lg:mx-0 "
                          : "border-b-2 border-gray-100 "
                      } " flex items-center justify-center " ${
                        props.touched.name && props.errors.name
                          ? "mb-1 error-border shadow-none"
                          : "mb-6 focus-within:border-text-blue"
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
                        innerRef={focusRef}
                        maxLength="50"
                        autoComplete="off"
                        placeholder="Name*"
                        disabled={!profileUpdate}
                        value={props.values.name}
                        onFocus={() =>
                          props.setFieldValue(
                            "name",
                            (props.values.name =
                              currentUser && currentUser.name)
                          )
                        }
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
                        className="textbox-input w-10/12 placeholder-gray-600  bg-white"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.name && props.errors.name ? (
                      <div
                        className="text-xs error-text p-1 mb-2"
                        id="name-error"
                      >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.name}
                      </div>
                    ) : null}

                    {/* Mobile */}
                    <div
                      className={`${
                        profileUpdate
                          ? "border-2 rounded-xl border-gray-300 mx-2 lg:mx-0 "
                          : "border-b-2  border-gray-100 "
                      } " flex items-center justify-center  " ${
                        props.touched.mobile && props.errors.mobile
                          ? "mb-1 error-border shadow-none"
                          : "mb-6 focus-within:border-text-blue"
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
                        maxLength="15"
                        placeholder="Mobile (with country code)"
                        autoComplete="off"
                        disabled={!profileUpdate}
                        onFocus={() =>
                          props.setFieldValue(
                            "mobile",
                            (props.values.mobile =
                              currentUser && currentUser.mobile)
                          )
                        }
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
                        className="textbox-input w-10/12 placeholder-gray-600  bg-white"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.mobile && props.errors.mobile ? (
                      <div
                        className="text-xs error-text p-1 mb-2"
                        id="mobile-error"
                      >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.mobile}
                      </div>
                    ) : null}

                    {/* Neighbourhood */}
                    <div
                      className={`${
                        profileUpdate
                          ? "border-2 rounded-xl border-gray-300 mx-2 lg:mx-0 "
                          : "border-b-2 border-gray-100 "
                      } " flex items-center justify-center  " ${
                        props.touched.neighbourhood &&
                        props.errors.neighbourhood
                          ? "mb-1 error-border shadow-none"
                          : "focus-within:border-text-blue"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="inline align-middle fill-current text-gray-400 text-lg ml-4"
                      />
                      <Field
                        id="neighbourhood"
                        name="neighbourhood"
                        type="text"
                        maxLength="100"
                        autoComplete="off"
                        disabled={!profileUpdate}
                        placeholder="Neighbourhood*"
                        value={props.values.neighbourhood}
                        onKeyUp={debouncedApartmentSearch}
                        aria-required="true"
                        aria-invalid={
                          props.touched.neighbourhood &&
                          props.errors.neighbourhood
                            ? "true"
                            : null
                        }
                        aria-describedby={
                          props.touched.neighbourhood &&
                          props.errors.neighbourhood
                            ? "neighbourhood-error"
                            : null
                        }
                        className="textbox-input bg-white w-10/12 placeholder-gray-600 "
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.neighbourhood &&
                    props.errors.neighbourhood ? (
                      <div
                        className="text-xs error-text p-1 mb-2"
                        id="neighbourhood-error"
                      >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.neighbourhood}
                      </div>
                    ) : null}

                    {/* Menu to display neighbourhood search results */}
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
                              <div
                                key={index}
                                className="cursor-pointer"
                                onClick={() => {
                                  props.setFieldValue(
                                    neighbourhood,
                                    (props.values.neighbourhood = o.name)
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
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    {/* Menu to display if neighbourhood does not exist */}
                    <div className="relative ">
                      <div
                        className={
                          props.values.neighbourhood === ""
                            ? "hidden"
                            : numApartmentsFetched === 0
                            ? hideResults +
                              " absolute p-2 pt-4 mt-1 border-2 border-solid border-blue-400 bg-white rounded-lg  text-brand-gray; w-full h-20 align-middle overflow-auto"
                            : "hidden"
                        }
                      >
                        Not found? You can a marketplace for{" "}
                        <Link
                          href={`register/neighbourhood/${props.values.neighbourhood}`}
                        >
                          <a className="text-blue-700 font-bold underline focus-within:outline-none">
                            {props.values.neighbourhood}
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
                      className={`${
                        profileUpdate
                          ? "border-2 rounded-xl border-gray-300 mx-2 lg:mx-0 "
                          : "border-b-2 border-gray-100 "
                      } " flex items-center justify-center mt-6  " ${
                        props.touched.apartmentNumber &&
                        props.errors.apartmentNumber
                          ? "mb-1 error-border shadow-none"
                          : "mb-6 focus-within:border-text-blue"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faDoorOpen}
                        className="inline align-middle fill-current text-gray-400 text-lg ml-4"
                      />
                      <Field
                        id="apartmentNumber"
                        name="apartmentNumber"
                        type="text"
                        maxLength="10"
                        placeholder="Apartment Number*"
                        autoComplete="off"
                        disabled={!profileUpdate}
                        onFocus={() =>
                          props.setFieldValue(
                            "apartmentNumber",
                            (props.values.apartmentNumber =
                              currentUser && currentUser.apartment_number)
                          )
                        }
                        className="textbox-input w-10/12 placeholder-gray-600  bg-white"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.apartmentNumber &&
                    props.errors.apartmentNumber ? (
                      <div className="text-xs error-text p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.apartmentNumber}
                      </div>
                    ) : null}

                    {/* Buttons */}
                    <div className="mx-2 lg:mx-0 my-10">
                      {!profileUpdate ? (
                        <motion.button
                          variants={userAccountVariants}
                          whileHover="saveEditButtonHover"
                          whileTap="saveEditButtonTap"
                          type="button"
                          onClick={() => {
                            focusRef.current.focus();
                            setProfileUpdate(true);
                          }}
                          className="h-12 w-full tracking-wide font-semibold focus:outline-none bg-purple-700 shadow-buttonShadowPurple uppercase text-white rounded-xl "
                        >
                          Edit Profile
                        </motion.button>
                      ) : (
                        <div className="flex justify-between">
                          <motion.button
                            variants={userAccountVariants}
                            whileHover="saveEditButtonHover"
                            whileTap="saveEditButtonTap"
                            type="submit"
                            disabled={props.isSubmitting}
                            className={`h-12 px-14 bg-purple-700 shadow-buttonShadowPurple uppercase text-white rounded-xl tracking-wide font-semibold focus:outline-none ${
                              props.isSubmitting && "cursor-not-allowed"
                            }`}
                          >
                            Save
                          </motion.button>
                          <motion.button
                            variants={userAccountVariants}
                            whileHover="cancelButtonHover"
                            whileTap="cancelButtonTap"
                            type="button"
                            className="h-12 px-12 bg-red-400 shadow-cancelButtonShadow uppercase text-white rounded-xl tracking-wide font-semibold focus:outline-none"
                            disabled={props.isSubmitting}
                            onClick={() => {
                              props.handleReset();
                              setProfileUpdate(false);
                              setHideResults("hidden");
                            }}
                          >
                            Cancel
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </Form>
                </div>

                <div
                  id="admin-options"
                  className="lg:border-l-2 border-purple-200 px-6"
                >
                  <div className="hidden lg:flex justify-center items-center mb-10">
                    <div className="h-24 w-24 flex items-center justify-center rounded-tr-2xl rounded-bl-2xl rounded-tl-sm rounded-br-sm ring-4 ring-offset-2 text-center bg-purple-500  text-white text-5xl uppercase pt-1">
                      {currentUser.initial}
                    </div>
                  </div>

                  <div className="mb-6 flex items-center">
                    Ads remaining:{" "}
                    <span className="font-bold text-lg ml-1">
                      {parseInt(keys.AD_QUOTA) - parseInt(currentUser.ad_count)}
                    </span>
                  </div>

                  {/* Email verification link */}
                  <div className="flex mb-6">
                    <p className="text-base mr-2">Email verified</p>
                    <div>
                      {currentUser.email_verified ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-700 text-xl"
                        />
                      ) : (
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-red-900 text-xl"
                          />

                          <div
                            onClick={() => {
                              {
                                /* sendEmail(
                                currentUser && currentUser.name,
                                currentUser && currentUser.email,
                                verificationUrl
                              );
                              setTimeout(() => emailVerificationToast(), 500); */
                              }
                              setEmailSentCount(emailSentCount + 1);
                            }}
                            className="text-xs ml-2 underline cursor-pointer text-purple-500"
                          >
                            (Resend link)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email subscribed */}
                  <div className="flex mb-6">
                    <p className="text-base mr-2">Email subscribed</p>
                    <div>
                      {currentUser.mail_subscribed ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-700 text-xl"
                        />
                      ) : (
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="close-button-animation text-red-900 text-xl"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Deactivate Account */}
                  <div className="mb-2">
                    Delete Account
                    <input
                      type="checkbox"
                      name="deactivateAccount"
                      id="deactivateAccount"
                      className="ml-2 checkbox-align cursor-pointer"
                      onChange={() => setDeactivate(!deactivate)}
                    />
                  </div>
                  <div className={`${deactivate ? "visible pt-2" : "hidden"}`}>
                    <p className="text-xs pb-2">
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                      To confirm deletion, type <em>delete</em> in the field.
                    </p>

                    <div className="relative border-2 w-60 error-border rounded-xl flex items-center py-1">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-400 text-sm invisible"
                      />
                      <input
                        name="delete"
                        id="delete"
                        type="text"
                        placeholder="delete"
                        maxLength="6"
                        className="text-sm pl-2 py-1 pr-2 focus:outline-none placeholder-gray-600"
                        onKeyUp={checkDeactivateValue}
                      />
                      <button
                        type="button"
                        disabled={!enableDeactivateButton}
                        className={`${
                          enableDeactivateButton
                            ? "bg-red-500 cursor-pointer focus:outline-none"
                            : "bg-gray-400 cursor-not-allowed focus:outline-none"
                        } absolute right-0.5 px-3 py-1 rounded-lg`}
                        onClick={() => {
                          deleteUser(currentUser.id);
                          setDeleteClicked(true);
                          setTimeout(() => router.push("/goodbye", "/"), 3000);
                        }}
                      >
                        {!deleteClicked ? (
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-sm text-white"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="text-sm text-white animate-spin"
                          />
                        )}
                      </button>
                    </div>

                    {deactivateMessage ? (
                      <div className="text-xs error-text mt-1 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {deactivateMessage}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserAccount;
