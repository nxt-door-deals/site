import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { adsQuotaReached } from "../../../utils/siteImages";

const AdQuotaReached = (props) => {
  return (
    <div className="text-brand-gray">
      <div className="flex flex-col justify-center items-center h-full w-full pt-10 lg:pt-32 px-10 lg:px-32">
        <Image
          height={300}
          width={300}
          src={adsQuotaReached}
          alt={"Reached Ad Quota"}
        />
        <h1 className="text-2xl pt-5 text-brand-gray text-center">
          Oops... Looks like you've reached your quota of{" "}
          <span className="text-brand-purple underline font-semibold">
            five
          </span>{" "}
          ads. Please delete any existing ads from your account page before
          creating a new ad.
        </h1>
        <h2 className="text-xl my-5 text-center">
          Redirecting you to your account page shortly.
        </h2>
        <p className="flex text-xl text-center">
          Hang tight
          <ul className="flex">
            <motion.li
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              .
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.51, repeat: Infinity }}
            >
              .
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.52, repeat: Infinity }}
            >
              .
            </motion.li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default AdQuotaReached;
