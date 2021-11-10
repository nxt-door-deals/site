import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { forgotPasswordChanged } from "../../../utils/siteImages";

const buttonVariants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
};

const PasswordChangeSuccess = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={forgotPasswordChanged}
          alt="Password changed"
          height={200}
          width={200}
        />
      </div>
      <div className="text-center mt-6 px-5">
        <p className="text-brand-gray">
          Woohoo! You successfully changed your password.
        </p>
      </div>
      <div className="text-center mt-6">
        <motion.button
          className="w-48 h-12 bg-purple-700 text-white  font-bold rounded-xl uppercase tracking-wide focus:outline-none"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </motion.button>
      </div>
    </div>
  );
};

export default PasswordChangeSuccess;
