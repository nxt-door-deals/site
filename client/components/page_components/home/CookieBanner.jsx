import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const bannerVariants = {
  initial: {
    y: "100vh",
  },
  animate: {
    y: 0,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "tween",
    },
  },

  exit: {
    y: "100vh",
    transition: { duration: 2 },
  },
};

const buttonVariants = {
  hover: {
    backgroundColor: "#92400E",
    color: "#FFFFFF",
  },
  tap: {
    color: "#333333",
    backgroundColor: "#F59E0B",
    y: "2px",
  },
};

const CookieBanner = (props) => {
  // const [showBanner, setShowBanner] = useState(
  //   typeof window !== "undefined" &&
  //     JSON.parse(localStorage.getItem("ndd__user__preferences"))["showBanner"]
  // );

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setShowBanner(
  //       JSON.parse(localStorage.getItem("ndd__user__preferences"))["showBanner"]
  //     );
  //   }
  // }, []);

  return (
    <motion.div
      variants={bannerVariants}
      initial="initial"
      animate="animate"
      //transition="transition"
      exit="exit"
      className="flex justify-center items-center fixed left-0 right-0 bottom-0 h-auto w-full px-1 bg-banner-color text-white z-50 shadow-banner-shadow"
    >
      <div className="py-5 px-5 lg-px-0 text-sm lg:text-base">
        <p className="font-semibold pb-1">🍪 About cookies on this site 🍪</p>
        <p className="font-extralight">
          This site uses cookies to provide you the best possible experience.
          Disabling cookies will lead to unexpected behaviour. Read our{" "}
          <span className="text-yellow-500">
            <a href="/policies#cookie" className="styled-link">
              cookie policy
            </a>{" "}
          </span>
          for more details.
        </p>
      </div>
      <div className="w-10 h-10 mx-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="p-2 rounded-md bg-yellow-500 text-banner-color focus-within:outline-none align-middle font-semibold"
          onClick={() => {
            props.setShowBanner(false);
            localStorage.setItem(
              "ndd__user__preferences",
              JSON.stringify({ showBanner: false })
            );
          }}
        >
          OK
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CookieBanner;
