import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { greeting } from "../../../utils/greeting";

// Component imports

const variants = {
  hover: {
    color: "#550052",
    scale: 1.05,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
  tap: {
    y: "2px",
  },
};

const FAQGuidelineList = () => {
  return (
    <div>
      <section id="grid">
        <div
          id="header"
          className="h-80 bg-faq-main-background bg-cover bg-no-repeat text-brand-gray"
        >
          <h1 className="pt-20 md:pt-24 px-10 lg:px-0 lg:pt-28 text-center font-bold text-2xl lg:text-3xl leading-10">
            {greeting}! How may we assist?
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center h-full w-full bg-gradient-to-b from-white via-white bg-opacity-50 to-white text-brand-gray px-10 md:px-20 py-10 lg:pt-10 lg:pb-20">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <Link href="/faqs/buyer">
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  whileTap="tap"
                  className="faq-box"
                >
                  BUYER FAQs
                </motion.a>
              </Link>

              <Link href="/faqs/seller">
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  whileTap="tap"
                  className="faq-box"
                >
                  SELLER FAQs
                </motion.a>
              </Link>

              <Link href="/faqs/generic">
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  whileTap="tap"
                  className="faq-box"
                >
                  GENERIC FAQs
                </motion.a>
              </Link>

              <Link href="/guidelines#buyer">
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  whileTap="tap"
                  className="faq-box"
                >
                  BUYER GUIDELINES
                </motion.a>
              </Link>

              <Link href="/guidelines#seller">
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  whileTap="tap"
                  className="faq-box"
                >
                  SELLER GUIDELINES
                </motion.a>
              </Link>

              <Link href="/guidelines#chat">
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  whileTap="tap"
                  className="faq-box"
                >
                  CHAT GUIDELINES
                </motion.a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQGuidelineList;
