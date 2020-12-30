import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Router from "next/router";

const buttonVariants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    backgroundColor: "#8B5CF6",
    y: "2px",
  },
};

const PasswordChangeSuccess = () => {
  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={"/images/forgotpassword/password-changed.svg"}
          alt={"Password changed"}
          height={200}
          width={200}
        />
      </div>
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Woohoo! You successfully changed your password.
        </p>
      </div>
      <div className="text-center mt-6">
        <motion.button
          className="w-48 h-12 bg-purple-500 text-white  font-bold rounded-xl uppercase tracking-wide focus:outline-none"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => {
            Router.push("/login");
          }}
        >
          Login
        </motion.button>
      </div>
    </div>
  );
};

export default PasswordChangeSuccess;
