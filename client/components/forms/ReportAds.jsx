import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import SiteContext from "../../context/site/siteContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import cookie from "../../utils/cookieInit";
import { selectStylePurple } from "../../utils/styles";

import { reportAdReasons } from "../../utils/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

// Component Imports
import BouncingBalls from "../loaders/BouncingBalls";

const validationschema = Yup.object({
  reason: Yup.string().required("Please select a reason for your complaint"),
  description: Yup.string()
    .required("Please provide more details to help us investigate further")
    .trim()
    .matches(/^[^=<>`]+$/, "Cannot contain ^ = < > or `"),
});

// Framer variants
const buttonVariants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    y: "2px",
    backgroundColor: "#6D28D9",
  },
};

const linkVariants = {
  hover: {
    x: "-2px",
  },
};

const ReportAds = (props) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const siteContext = useContext(SiteContext);

  const { user, fetchUserAds, userAds, sendReportAdEmail } = authContext;
  const { getReportedAdUsers, reportedAd, reportAd } = siteContext;

  // Ad reported toast
  const adReportedToast = () =>
    toast(
      "Thanks! We appreciate your delligence. We will review the ad and take appropriate action.",
      {
        draggablePercent: 60,
        position: "top-center",
      }
    );

  // Ad already reported toast
  const adAlreadyReportedToast = () =>
    toast("Looks like you have already reported this ad", {
      draggablePercent: 60,
      position: "top-center",
    });

  useEffect(() => {
    setTimeout(() => getReportedAdUsers(props.adId), 1000);
  }, []);

  useEffect(() => {
    if (user && user && reportedAd && reportedAd) {
      fetchUserAds(user.id);
      if (
        reportedAd.users !== undefined &&
        reportedAd.users.length > 0 &&
        reportedAd.users.includes(user.id)
      ) {
        adAlreadyReportedToast();
        router.push(`/ads/${props.adId}`);
      }
    }
  }, [reportedAd]);

  useEffect(() => {
    if (userAds && userAds.length !== 0) {
      const matchAdWithUser =
        userAds !== [] && userAds.filter((ad) => ad.id === props.adId);

      if (matchAdWithUser.length > 0) router.push(`/ads/${props.adId}`);
    }
  }, [userAds]);

  return (
    <div>
      <div className=" flex items-center ml-4 mb-5">
        <Link href={`/ads/${props.adId}`}>
          <motion.a variants={linkVariants} whileHover="hover">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              className="text-4xl text-brand-purple focus-within:outline-none cursor-pointer"
            />
          </motion.a>
        </Link>
        <p className="pl-2">Back to ad</p>
      </div>
      <div className="rounded-3xl px-8 py-12 lg:px-20 lg:py-16 bg-white shadow-boxshadowlogin">
        <h1 className="component-heading">Report Ad</h1>
        <h2 className="text-sm text-center mb-6">
          ID:{" "}
          <span className="text-brand-purple font-semibold">
            {props.modifiedId}
          </span>
        </h2>

        <Formik
          initialValues={{
            reason: "",
            description: "",
          }}
          validationSchema={validationschema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            reportAd(
              props.adId,
              user && user.id,
              values.reason,
              values.description
            );
            adReportedToast();

            // Email the ad owner and nxtdoordeals.com about the ad being reported
            if (reportedAd && reportedAd.users.length < 5) {
              // Notify seller about the ad being reported
              sendReportAdEmail(
                props.title,
                values.description,
                props.adId,
                props.adOwnerEmail,
                "REPORTED_AD_NOTIFY_SELLER_TEMPLATE"
              );

              // Notify owners about ad being reported
              sendReportAdEmail(
                props.title,
                values.description,
                props.adId,
                props.adOwnerEmail,
                "REPORTED_AD_NOTIFY_OWNERS_TEMPLATE"
              );
            }

            // Email the ad owner that the ad is being taken down
            if (reportedAd && reportedAd.users.length === 4) {
              // Notify seller about the ad being reported
              sendReportAdEmail(
                props.title,
                values.description,
                props.adId,
                props.adOwnerEmail,
                "REPORTED_AD_NOTIFY_SELLER_ABOUT_REMOVAL_TEMPLATE"
              );
            }

            if (cookie.get("__adCookie")) cookie.remove("__adCookie");

            setTimeout(() => {
              router.push(`/neighbourhood/ads/${props.apartmentId}`);
            }, 3000);
          }}
        >
          {(props) => (
            <Form>
              {/* Reason dropdown */}
              <div>
                <div
                  className={`"flex items-center justify-center border-2 px-2 rounded-xl  " ${
                    props.touched.reason && props.errors.reason
                      ? "mb-1 error-border shadow-none"
                      : "mb-6 border-gray-300 focus-within:border-text-purple"
                  }`}
                >
                  <Select
                    id="reason"
                    name="reason"
                    instanceId="reason"
                    options={reportAdReasons}
                    styles={selectStylePurple}
                    className="text-sm p-1.5"
                    onBlur={() => props.setFieldTouched("reason", true)}
                    onChange={(o) => {
                      props.setFieldValue(
                        "reason",
                        (props.values.reason = o.value)
                      );
                    }}
                    placeholder="Select Reason*"
                    isSearchable
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        neutral50: "#4B5563", // Placeholder color
                      },
                    })}
                    aria-label="Drop down list to select the reason for reporting the ad"
                  />
                </div>
              </div>

              {/* Validation errors */}
              {props.touched.reason && props.errors.reason ? (
                <div className="font-axiforma text-xs error-text p-1 mb-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.reason}
                </div>
              ) : null}

              {/* Description */}
              <div
                className={`"flex items-center justify-center border-2 px-2 rounded-xl  " ${
                  props.touched.description && props.errors.description
                    ? "mb-1 error-border shadow-none"
                    : "mb-6 border-gray-300 focus-within:border-text-purple"
                }`}
              >
                <Field
                  id="description"
                  as="textarea"
                  name="description"
                  type="text"
                  placeholder="Describe complaint*"
                  maxLength="5000"
                  autoComplete="off"
                  spellCheck={true}
                  rows="6"
                  aria-required="true"
                  aria-invalid={
                    props.touched.description && props.errors.description
                      ? "true"
                      : null
                  }
                  aria-describedby={
                    props.touched.description && props.errors.description
                      ? "description-error"
                      : null
                  }
                  className="font-axiforma text-sm p-2 leading-6 outline-none w-full placeholder-gray-600"
                />
              </div>

              {/* Validation errors */}
              {props.touched.description && props.errors.description ? (
                <div
                  className="font-axiforma text-xs error-text p-1 mb-2"
                  id="description-error"
                >
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.description}
                </div>
              ) : null}

              {/* Submit Button */}
              <div className="text-center">
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={props.isSubmitting}
                  className="mt-4 w-64 md:w-100 h-12 bg-purple-700 shadow-buttonShadowPurple text-white text-center font-axiforma font-bold rounded-xl uppercase tracking-wide focus:outline-none"
                >
                  {!props.isSubmitting ? "Submit Complaint" : <BouncingBalls />}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReportAds;
