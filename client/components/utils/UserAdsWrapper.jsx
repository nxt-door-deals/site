import React, { useState } from "react";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-regular-svg-icons";

// Component Imports
import UserAds from "./UserAds";

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

const UserAdsWrapper = (props) => {
  const [expanded, setExpanded] = useState(0);

  const userAdIndices = [...Array(props.ads.length).keys()];

  if (props.ads.length === 0) {
    return (
      <div className="py-16 lg:py-20 px-8">
        <p className="font-axiforma text-brand-gray text-xl text-center">
          Hmm... No ads? Remember, you have seven free ads across all
          categories. Start posting today!
        </p>
      </div>
    );
  } else {
    return (
      <div className="font-axiforma text-brand-gray w-full">
        <div className="py-6 flex justify-center  text-brand-purple">
          <motion.div variants={variants} animate="bounce">
            <FontAwesomeIcon
              icon={faHandPointRight}
              className="text-xl mr-2 lg:mr-3 -z-20"
            />
          </motion.div>
          <p className="inline text-xs md:text-sm">
            You can manage all your ads here
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row md:justify-center md:flex-wrap">
          {userAdIndices.map((i) => (
            <UserAds
              key={i}
              i={i}
              expanded={expanded}
              setExpanded={setExpanded}
              currentUser={props.currentUser}
              ads={props.ads}
              showForm={props.showForm}
              setShowForm={props.setShowForm}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default UserAdsWrapper;
