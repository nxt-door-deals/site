import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";
import { greeting } from "../../utils/greeting";

// Component imports
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import FAQHeadLayout from "../../components/layout/FAQHeadLayout";

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

const FAQIndex = () => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <FAQHeadLayout>
      <div className="h-80 bg-faq-main-background bg-cover bg-no-repeat text-brand-gray">
        <Navbar navStyle={navStylePurple} />
        <h1 className="pt-20 md:pt-24 lg:pt-28 text-center font-bold text-3xl">
          {greeting} How may we assist?
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center h-full w-full bg-purple-50 bg-opacity-25 text-brand-gray px-10 md:px-20 lg:pt-0 py-10 lg:py-20">
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
      <Footer footerGradientClass={footerGradientClassPurple} />
    </FAQHeadLayout>
  );
};

export default FAQIndex;
