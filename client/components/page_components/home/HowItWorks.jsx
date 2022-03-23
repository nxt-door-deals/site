import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import Tab from "../common/Tab";

const variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  exit: {
    opacity: 0,
    transition: { duration: 0.7 },
  },
};

const howItWorksTabs = [
  { label: "Sell", value: 0 },
  { label: "Buy", value: 1 },
];

const tabStyle = {
  textColor: "text-purple-700",
  backgroundColor: "bg-purple-700",
  borderColor: "border-purple-700",
};

const HowItWorks = (props) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="relative">
        <div className="tilt">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="bg-gradient-to-b from-slate-100 to-white pb-20">
          <div className="flex justify-center mt-16 pt-32">
            <Tab
              route={props.pathname}
              tabs={howItWorksTabs}
              tabStyle={tabStyle}
            />
          </div>

          {/* <div className="pt-8 mb-16">
          {showGrid ? (
            <motion.div
              key="sell"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Sell />
            </motion.div>
          ) : (
            <motion.div
              key="buy"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Buy />
            </motion.div>
          )}
        </div> */}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default HowItWorks;
