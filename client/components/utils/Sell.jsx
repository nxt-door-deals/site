import React from "react";
import { motion } from "framer-motion";
import { sell } from "../../utils/howItWorks";

const Sell = () => {
  return (
    <div
      id="sell"
      className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-8 md:gap-6"
    >
      {sell.map((item, index) => {
        return (
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5 },
            }}
            key={index}
            className="rounded-md overflow-hidden shadow-lg"
          >
            <img className="w-full h-48 mb-2" src={item.image} alt={item.alt} />
            <div className="px-6 py-4">
              <div className="font-bold text-brand-gray text-xl mb-2">
                {item.heading}
              </div>
              <p className="text-gray-600 text-base">{item.content}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Sell;
