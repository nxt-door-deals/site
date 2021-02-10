import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sell } from "../../utils/howItWorks";

const Sell = () => {
  return (
    <div
      id="sell"
      className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 gap-8 md:gap-6 mx-5 md:mx-0"
    >
      {sell.map((item, index) => {
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

export default Sell;
