import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { buy } from "../../utils/howItWorks";

const Buy = () => {
  return (
    <div
      id="buy"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-8 md:gap-6 mx-5 md:mx-0"
    >
      {buy.map((item, index) => {
        return (
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5 },
            }}
            key={index}
            className="rounded-xl overflow-hidden shadow-lg bg-purple-50"
          >
            <div className="flex items-center justify-center">
              <Image src={item.image} alt={item.alt} width={250} height={250} />
            </div>

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

export default Buy;
