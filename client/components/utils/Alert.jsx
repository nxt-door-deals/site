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
      className="p-1"
    >
      <p
        className={
          props.authError || props.genericMessage || props.fetchError
            ? props.alertTheme +
              " text-center p-2 mb-2 font-axiforma font-semibold rounded-md text-sm"
            : "hidden"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
        {props.authError
          ? props.authError
          : props.genericMessage
          ? props.genericMessage
          : props.fetchError}{" "}
      </p>
    </motion.div>
  );
};

export default Alert;
