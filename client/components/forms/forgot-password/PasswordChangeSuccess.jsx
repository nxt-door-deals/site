import React from "react";
import { motion } from "framer-motion";
import Router from "next/router";

const PasswordChangeSuccess = () => {
  return (
    <div>
      <div className="flex justify-center">
        <img
          src="/images/forgotpassword/password-changed.svg"
          alt="Password changed"
          height="200px"
          width="200px"
        />
      </div>
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Woohoo! You successfully changed your password.
        </p>
      </div>
      <div className="text-center mt-6">
        <motion.button
          className="w-48 h-12 bg-purple-500 text-white  font-bold rounded-md uppercase tracking-wide focus:outline-none"
          whileTap={{
            backgroundColor: "#D6BCFA",
            color: "#550052",
            y: "5px",
            boxShadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
          }}
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
