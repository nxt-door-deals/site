import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import Buy from "./utils/Buy";
import Sell from "./utils/Sell";
import Tab from "./utils/Tab";

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
      <div className="bg-howitworks-background bg-cover bg-no-repeat pb-20">
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
    </AnimatePresence>
  );
};

export default HowItWorks;
