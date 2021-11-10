import React, { useContext, useEffect } from "react";
import Image from "next/image";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { approveCheck, errorTimes } from "../../utils/siteImages";

// Component Import
import VerifyNeighbourhoodHeadLayout from "../../components/layout/head/VerifyNeighbourhoodHeadLayout";

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
    if (neighbourhoodVerified && verifiedNeighbourhoodDetails) {
      sendNbhRegistrationSuccessEmailToUser(
        verifiedNeighbourhoodDetails.name,
        verifiedNeighbourhoodDetails.email
      );
    }
  }, [neighbourhoodVerified]);

  return (
    <VerifyNeighbourhoodHeadLayout>
      <div
        id="header"
        className="flex justify-center items-center rounded-xl bg-white pt-32 px-10 z-50 text-brand-gray"
      >
        <div className="flex flex-col items-center m-5">
          {neighbourhoodVerified !== null && neighbourhoodVerified ? (
            <Image
              src={approveCheck}
              height={150}
              width={150}
              alt="Neighbourhood Verified"
            />
          ) : (
            neighbourhoodVerified !== null &&
            !neighbourhoodVerified && (
              <Image
                src={errorTimes}
                height={150}
                width={150}
                alt="Neighbourhood unverified"
              />
            )
          )}
          {neighbourhoodVerified !== null && neighbourhoodVerified ? (
            <p className="font-axiforma mt-10 text-center">
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
            <p className="font-axiforma mt-10 text-center">
              There is a problem with the verification link
            </p>
          )}
          <motion.button
            variants={variants}
            whileHover="hover"
            whileTap="tap"
            className="mt-10 w-64 md:w-100 h-12 bg-purple-600 text-white font-bold rounded-xl uppercase tracking-wide focus:outline-none"
            onClick={() => {
              router.push("/");
            }}
            aria-label="Continue to site button"
          >
            Continue to site
          </motion.button>
        </div>
      </div>
    </VerifyNeighbourhoodHeadLayout>
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
