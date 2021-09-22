import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sell } from "../../../utils/howItWorks";

const variants = {
  initial: { opacity: 0, scale: 0.9 },
  hover: { scale: 1.02, transition: { duration: 0.3 } },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  exit: {
    opacity: 0,
    transition: { duration: 0.7 },
  },
};

const Sell = () => {
  return (
    <div>
      <h1 className="py-12 text-center text-2xl xl:text-3xl text-brand-gray xxl:text-sm font-bold">
        Selling on <span className="text-purple-700">nxtdoordeals.com</span>
      </h1>
      <div
        id="sell"
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-8 mx-5 md:mx-2"
      >
        {sell.map((item, index) => {
          return (
            <motion.div
              variants={variants}
              initial="initial"
              whileHover="hover"
              animate="animate"
              key={index}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-white"
            >
              <div className="flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={250}
                  height={250}
                />
              </div>

              <div className="px-6 py-4">
                <div className="font-bold text-brand-gray text-xl mb-2">
                  {item.heading}
                </div>
                <p className="text-gray-600 text-base cursor-default">
                  {item.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Sell;
