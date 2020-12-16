import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHandPointRight } from "@fortawesome/free-regular-svg-icons";

const variants = {
  bounce: {
    x: [0, 5],
    transition: {
      delay: 1,
      duration: 0.5,
      yoyo: Infinity,
    },
  },
};

const PostAdHeader = (props) => {
  return (
    <div className="font-axiforma text-center mb-10 px-5">
      <h1 className="font-semibold md:pt-8 text-3xl text-brand-gray">
        {props.heading}
      </h1>
      <div className="pt-2 flex justify-center">
        <motion.div variants={variants} animate="bounce">
          <FontAwesomeIcon
            icon={faHandPointRight}
            className="text-xl text-brand-purple mr-2 lg:mr-3 -z-20"
          />
        </motion.div>
        {props.step === "Category" && (
          <p className="inline text-xs md:text-sm">
            Hey{props.userName !== null ? ", " + props.userName : ", there"}!
            Check out the sub-categories (
            <FontAwesomeIcon
              icon={faStar}
              className="text-brand-purple text-xs"
            />
            ) to know under what category your item falls.
          </p>
        )}
        {props.step === "Form" && (
          <p className="inline text-sm">
            Would you like to change the ad category? No worries! You can do
            that here.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostAdHeader;
