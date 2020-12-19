import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
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
} from "@fortawesome/free-solid-svg-icons";

const userAccountValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets and spaces allowed")
    .required("Please enter your name")
    .max(100)
    .trim(),
  mobile: Yup.string().matches(/^[0-9]+$/, "Must be a number"),
});

const UserAccount = () => {
  const [name, setName] = useState("");
  const [profileUpdate, setProfileUpdate] = useState(false);
  const authContext = useContext(AuthContext);
  const focusRef = useRef();
  const { user, loadUser, sendEmail } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const verificationUrl = `http://${keys.SERVER}/verifyemail/${
    user && user.email_verification_hash + "|" + user && user.id
  }`;

  // User account toast
  const emailVerificationTost = () =>
    toast("Verification link sent to your registered email id", {
      draggablePercent: 60,
      position: "top-center",
    });

  return (
    <div className="font-axiforma rounded-3xl shadow-postadshadow bg-white p-8 px-24 mb-4">
      <Formik
        initialValues={{
          name: "",
          email: "",
          mobile: "",
          neighbourhood: "",
          apartmentNumber: "",
          emailVerified: "",
          deactivateAccount: "",
        }}
        validationSchema={userAccountValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          {
            /* setSubmitting(true);
          setTimeout(() => setSubmitting(false), 2000); */
          }
        }}
      >
        {(props) => (
          <div>
            <h1 className="font-bold text-3xl text-center text-brand-gray tracking-wide mb-5">
              Your profile
            </h1>
            <h2 className="font-semibold text-xl text-center text-purple-600 mb-5">
              {user && user.email}
            </h2>
            <Form>
              {/* Name */}
              <div
                className={`${
                  profileUpdate ? "border-2 rounded-xl " : "border-b-2 "
                } " flex items-center justify-center w-88 " ${
                  props.touched.name && props.errors.name
                    ? "mb-1 border-red-800 shadow-none"
                    : "mb-6 border-gray-300 focus-within:border-text-blue"
                }`}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="inline fill-current text-gray-400 text-lg ml-2"
                />
                <Field
                  id="name"
                  name="name"
                  type="text"
                  maxLength="50"
                  autoComplete="off"
                  placeholder={name}
                  disabled={!profileUpdate}
                  value={props.values.name}
                  onFocus={() =>
                    props.setFieldValue(
                      "name",
                      (props.values.name = user && user.name)
                    )
                  }
                  className="textbox-input w-10/12 placeholder-brand-gray bg-white"
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
                  profileUpdate ? "border-2 rounded-xl " : "border-b-2 "
                } " flex items-center justify-center " ${
                  props.touched.mobile && props.errors.mobile
                    ? "mb-1 border-red-800 shadow-none"
                    : "mb-6 border-gray-300 focus-within:border-text-blue"
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
                  innerRef={focusRef}
                  placeholder={user && user.mobile}
                  maxLength="15"
                  autoComplete="off"
                  onFocus={() =>
                    props.setFieldValue(
                      "mobile",
                      (props.values.mobile = user && user.mobile)
                    )
                  }
                  className="textbox-input w-10/12 placeholder-brand-gray bg-white"
                />
              </div>

              {/* Validation errors */}
              {props.touched.mobile && props.errors.mobile ? (
                <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.mobile}
                </div>
              ) : null}

              {/* Apartment number */}
              <div
                className={`${
                  profileUpdate ? "border-2 rounded-xl " : "border-b-2 "
                } " flex items-center justify-center " ${
                  props.touched.apartmentNumber && props.errors.apartmentNumber
                    ? "mb-1 border-red-800 shadow-none"
                    : "mb-6 border-gray-300 focus-within:border-text-blue"
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
                  placeholder={user && user.apartment_number}
                  maxLength="10"
                  autoComplete="off"
                  disabled={!profileUpdate}
                  onFocus={() =>
                    props.setFieldValue(
                      "apartmentNumber",
                      (props.values.apartmentNumber =
                        user && user.apartment_number)
                    )
                  }
                  className="textbox-input w-10/12 placeholder-brand-gray bg-white"
                />
              </div>

              {/* Validation errors */}
              {props.touched.apartmentNumber && props.errors.apartmentNumber ? (
                <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.apartmentNumber}
                </div>
              ) : null}

              {/* Buttons */}
              <div className="mb-10 flex justify-center">
                {!profileUpdate ? (
                  <button
                    type="button"
                    onClick={() => {
                      focusRef.current.focus();
                      setProfileUpdate(true);
                    }}
                    className="h-12 w-full tracking-wide font-bold bg-purple-500 uppercase text-white rounded-xl focus:outline-none"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="p-4 bg-purple-500 uppercase text-white rounded-lg focus:outline-none"
                  >
                    Update Profile
                  </button>
                )}
              </div>

              {/* Email verification link */}
              <div className="flex mb-6">
                <p className="text-base mr-2">Email verified</p>
                <div>
                  {user && user.email_verified ? (
                    <FontAwesomeIcon
                      icon={faCheckDouble}
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
                            user && user.name,
                            user && user.email,
                            verificationUrl
                          );
                          setTimeout(() => emailVerificationTost(), 500);
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
                  {user && user.mail_subscribed ? (
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
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default UserAccount;
