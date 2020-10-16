import React from "react";
import { motion } from "framer-motion";
import { buy } from "../../utils/howItWorks";

const Buy = () => {
  return (
    <div
      id="buy"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-6"
    >
      {buy.map((item, index) => {
        return (
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5 },
            }}
            key={index}
            className="rounded-md overflow-hidden shadow-lg"
          >
            <img class="w-full h-48 mb-2" src={item.image} alt={item.alt} />
            <div class="px-6 py-4">
              <div class="font-bold text-brand-gray text-xl mb-2">
                {item.heading}
              </div>
              <p class="text-gray-600 text-base">{item.content}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Buy;
