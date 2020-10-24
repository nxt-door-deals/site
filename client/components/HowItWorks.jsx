import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import Buy from "./utils/Buy";
import Sell from "./utils/Sell";

const variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  exit: {
    opacity: 0,
    transition: { duration: 0.7 },
  },
};

const HowItWorks = () => {
  const [showGrid, setShowGrid] = useState(true);

  return (
    <AnimatePresence>
      <div className="bg-howitworks-background bg-cover bg-no-repeat pb-3 font-axiforma">
        <div className="flex justify-center mt-16 pt-32">
          <button
            className={
              "font-bold py-2 px-4 rounded-l uppercase focus:outline-none " +
              `${
                showGrid
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`
            }
            onClick={() => setShowGrid(true)}
            disabled={showGrid ? "disabled" : null}
          >
            Sell
          </button>
          <button
            className={
              "font-bold py-2 px-4 rounded-l uppercase focus:outline-none " +
              `${
                !showGrid
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`
            }
            onClick={() => setShowGrid(false)}
            disabled={!showGrid ? "disabled" : null}
          >
            Buy
          </button>
        </div>
        <h1 className="pt-12 text-center text-2xl lg:text-2xl xl:text-3xl text-brand-gray xxl:text-sm font-axiforma font-bold">
          <motion.span
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {showGrid ? "Selling" : "Buying"}
          </motion.span>{" "}
          on <span className="text-purple-600">nxt-door deals</span>
        </h1>

        <div className="pt-8 mb-16">
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
        </div>
      </div>
    </AnimatePresence>
  );
};

export default HowItWorks;
