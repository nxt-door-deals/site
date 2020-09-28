import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Alert = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        delay: 0.2,
      }}
    >
      <p
        className={
          props.authError
            ? "border-2 text-center align-middle p-2 mb-2 bg-purple-200 text-brand-purple font-axiforma font-semibold rounded-md tracking-wide text-sm leading-7"
            : "hidden"
        }
      >
        {/* <img
          src="/images/alert/info.svg"
          alt="Alert Information Icon"
          height="20px"
          width="20px"
          className="inline align-middle mr-2 opacity-50"
        /> */}
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
        {props.authError}{" "}
      </p>
    </motion.div>
  );
};

export default Alert;
