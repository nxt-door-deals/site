import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LetsVerifyYourEmail = (props) => {
  return (
    <div className="text-brand-gray">
      <div className="flex flex-col justify-center items-center h-screen px-5">
        <h1 className="component-heading">
          Let's verify your email before you can {props.message}{" "}
        </h1>
        <h2 className="flex text-2xl my-5">
          Redirecting you shortly. Hang tight
          <ul className="flex">
            <motion.li
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              .
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.51, repeat: Infinity }}
            >
              .
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.52, repeat: Infinity }}
            >
              .
            </motion.li>
          </ul>
        </h2>
        <Image
          height={300}
          width={300}
          src={"/images/email/verify-email.svg"}
          alt={"Verify Email"}
        />
      </div>
    </div>
  );
};

export default LetsVerifyYourEmail;
