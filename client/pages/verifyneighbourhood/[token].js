import React, { Fragment, useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const variants = {
  hover: {
    backgroundColor: "#5B21B6",
  },
  tap: {
    backgroundColor: "#7C3AED",
    y: "2px",
  },
};

const VerifyNeighbourhood = (props) => {
  const siteContext = useContext(SiteContext);
  const router = useRouter();

  const {
    verifyNeighbourhood,
    neighbourhoodVerified,
    verifiedNeighbourhoodDetails,
    sendNbhRegistrationSuccessEmailToUser,
  } = siteContext;

  useEffect(() => {
    verifyNeighbourhood(props.value);
  }, []);

  useEffect(() => {
    if (neighbourhoodVerified) {
      sendNbhRegistrationSuccessEmailToUser(
        verifiedNeighbourhoodDetails.name,
        verifiedNeighbourhoodDetails.email
      );
    }
  }, [neighbourhoodVerified]);

  return (
    <Fragment>
      <div className="flex justify-center items-center rounded-md shadow-boxshadowemail border-purple-600 border-b-8 m-12 lg:ml-64 lg:mr-64 mt-28 pt-16 pb-16 z-50">
        <div className="flex flex-col items-center m-5">
          {neighbourhoodVerified !== null && neighbourhoodVerified ? (
            <img
              src="/images/email/check.gif"
              height="150px"
              width="150px"
              alt="neighbourhood verified"
            />
          ) : (
            neighbourhoodVerified !== null &&
            !neighbourhoodVerified && (
              <img
                src="/images/email/error.gif"
                height="150px"
                width="150px"
                alt="neighbourhood unverified"
              />
            )
          )}
          {neighbourhoodVerified !== null && neighbourhoodVerified ? (
            <p className="font-axiforma text-gray-600 mt-10 text-center">
              <span className="font-semibold text-purple-600">
                {verifiedNeighbourhoodDetails !== null &&
                  verifiedNeighbourhoodDetails.name}
              </span>{" "}
              has been verified.
              <br />
              <br />
              <span className="font-semibold text-purple-600">
                {verifiedNeighbourhoodDetails !== null &&
                  verifiedNeighbourhoodDetails.email}
              </span>
              , who submitted the request, has been notified
            </p>
          ) : (
            <p className="font-axiforma text-gray-600 mt-10 text-center">
              There is a problem with the verification link
            </p>
          )}
          <motion.button
            variants={variants}
            whileHover="hover"
            whileTap="tap"
            className="mt-10 w-64 md:w-100 h-12 bg-purple-600 text-white font-axiforma font-bold rounded-md uppercase tracking-wide focus:outline-none"
            onClick={() => {
              router.push("/");
            }}
            arira-aria-label="Continue to site button"
          >
            Continue to site
          </motion.button>
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps = (context) => {
  const { token } = context.query;
  return {
    props: {
      value: token,
    },
  };
};

export default VerifyNeighbourhood;
