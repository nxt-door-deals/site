import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import keys from "../../utils/keys";
import { toast } from "react-toastify";

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
import Alert from "../utils/Alert";

const userAccountValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets and spaces allowed")
    .required("Please enter your name")
    .max(100)
    .trim(),
  mobile: Yup.string().matches(/^[0-9]+$/, "Must be a number"),
  neighbourhood: Yup.string().required("Please select your apartment/property"),
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
    backgroundColor: "#8B5CF6",
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
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const siteContext = useContext(SiteContext);
  const focusRef = useRef();
  const selectedApartment = useRef(null);

  const { sendEmail, updateUserProfile, deleteUser } = authContext;
  const {
    fetchApartments,
    apartmentData,
    numApartmentsFetched,
    fetchError,
    validateApartmentSelection,
    loadAllApartments,
    allApartments,
  } = siteContext;

  useEffect(() => {
    loadAllApartments();
  }, []);

  const currentUser = props.currentUser;

  const initial = props.currentUser.name[0];

  const verificationUrl = `http://${keys.SERVER}/verifyemail/${currentUser.email_verification_hash}|${currentUser.id}`;

  const alertTheme = "bg-purple-200 text-brand-purple";

  // User account toast
  const emailVerificationToast = () =>
    toast("Verification link sent to your registered email id", {
      draggablePercent: 60,
      position: "top-center",
    });

  const searchApartment = (e) => {
    setHideResults(null);
    setparentDiv("visible");
    fetchApartments(e.target.value);

    if (e.which === 13) {
      e.preventDefault();
    }
  };

  const checkDeactivateValue = (e) => {
    if (e.target.value === "delete") {
      setEnableDeactivateButton(true);
      setDeactivateMessage(null);
    } else {
      setEnableDeactivateButton(false);
      setDeactivateMessage("Please enter the text exactly as indicated");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-12 font-axiforma rounded-3xl shadow-postadshadow bg-white p-8 text-brand-gray">
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
                "Please select a neighbourhood from the list"
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
              <h1 className="font-bold text-3xl text-center text-brand-gray tracking-wide mb-5">
                Your profile
              </h1>
              <h2 className="font-semibold text-xl text-center text-purple-600 mb-8">
                {currentUser && currentUser.email}
              </h2>

              {/* The form starts here */}
              <div className="lg:flex lg:justify-center">
                <div id="form" className="mr-10 w-88">
                  <Alert fetchError={fetchError} alertTheme={alertTheme} />
                  <Form>
                    {/* Name */}
                    <div
                      className={`${
                        profileUpdate
                          ? "border-2 rounded-xl border-gray-300 "
                          : "border-b-2 border-gray-100 "
                      } " flex items-center justify-center " ${
                        props.touched.name && props.errors.name
                          ? "mb-1 border-red-800 shadow-none"
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
                        className="textbox-input w-10/12 placeholder-gray-600  bg-white"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.name && props.errors.name ? (
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.name}
                      </div>
                    ) : null}

                    {/* Mobile */}
                    <div
                      className={`${
                        profileUpdate
                          ? "border-2 rounded-xl border-gray-300 "
                          : "border-b-2  border-gray-100 "
                      } " flex items-center justify-center  " ${
                        props.touched.mobile && props.errors.mobile
                          ? "mb-1 border-red-800 shadow-none"
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
                        placeholder="Mobile"
                        autoComplete="off"
                        disabled={!profileUpdate}
                        onFocus={() =>
                          props.setFieldValue(
                            "mobile",
                            (props.values.mobile =
                              currentUser && currentUser.mobile)
                          )
                        }
                        className="textbox-input w-10/12 placeholder-gray-600  bg-white"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.mobile && props.errors.mobile ? (
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.mobile}
                      </div>
                    ) : null}

                    {/* Neighbourhood */}
                    <div
                      className={`${
                        profileUpdate
                          ? "border-2 rounded-xl border-gray-300 "
                          : "border-b-2 border-gray-100 "
                      } " flex items-center justify-center  " ${
                        props.touched.neighbourhood &&
                        props.errors.neighbourhood
                          ? "mb-1 border-red-800 shadow-none"
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
                        onKeyUp={searchApartment}
                        className="textbox-input bg-white w-10/12 placeholder-gray-600 "
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.neighbourhood &&
                    props.errors.neighbourhood ? (
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
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
                        Not found? You can create a neighborhood for{" "}
                        <Link
                          href={`/neighbourhood/${props.values.neighbourhood}`}
                        >
                          <a className="text-blue-700 font-bold underline">
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
                          ? "border-2 rounded-xl border-gray-300 "
                          : "border-b-2 border-gray-100 "
                      } " flex items-center justify-center mt-6  " ${
                        props.touched.apartmentNumber &&
                        props.errors.apartmentNumber
                          ? "mb-1 border-red-800 shadow-none"
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
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.apartmentNumber}
                      </div>
                    ) : null}

                    {/* Buttons */}
                    <div className="my-10">
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
                          className="h-12 w-full tracking-wide font-semibold focus:outline-none bg-purple-500 uppercase text-white rounded-xl "
                        >
                          Edit Profile
                        </motion.button>
                      ) : (
                        <div className="flex justify-around">
                          <motion.button
                            variants={userAccountVariants}
                            whileHover="saveEditButtonHover"
                            whileTap="saveEditButtonTap"
                            type="submit"
                            disabled={props.isSubmitting}
                            className="h-12 px-14 bg-purple-500 uppercase text-white rounded-xl tracking-wide font-semibold focus:outline-none"
                          >
                            Save
                          </motion.button>
                          <motion.button
                            variants={userAccountVariants}
                            whileHover="cancelButtonHover"
                            whileTap="cancelButtonTap"
                            type="button"
                            className="h-12 px-12 bg-red-400 uppercase text-white rounded-xl tracking-wide font-semibold focus:outline-none"
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
                  <div className=" hidden lg:flex justify-center items-center mb-10">
                    <div className="h-24 w-24 rounded-3xl ring-4 ring-offset-2 align-middle text-center relative bg-purple-500  text-white text-5xl uppercase">
                      <span className="absolute top-7 right-8">{initial}</span>
                    </div>
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
                              sendEmail(
                                currentUser && currentUser.name,
                                currentUser && currentUser.email,
                                verificationUrl
                              );
                              setTimeout(() => emailVerificationToast(), 500);
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
                            className="text-red-900 text-xl"
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

                    <div className="relative border-2 w-60 border-red-800 rounded-xl flex items-center py-1">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-gray-400 text-sm ml-2"
                      />
                      <input
                        name="delete"
                        id="delete"
                        type="text"
                        placeholder="delete"
                        maxLength="6"
                        className="text-sm pl-2 py-1 pr-2 focus:outline-none align-middle"
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
                          setTimeout(() => router.push("/goodbye"), 3000);
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
                      <div className="font-axiforma text-xs text-red-800 mt-1 p-1 mb-2">
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
