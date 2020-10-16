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
          props.authError || props.genericMessage
            ? props.alertTheme +
              " border-2 text-center align-middle p-2 mb-2 font-axiforma font-semibold rounded-md text-sm"
            : "hidden"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
        {props.authError ? props.authError : props.genericMessage}{" "}
      </p>
    </motion.div>
  );
};

export default Alert;
