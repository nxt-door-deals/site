import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-regular-svg-icons";

// Component Imports
import UserAds from "./UserAds";

const buttonVariants = {
  hover: {
    backgroundColor: "#550052",
    color: "#EDE9FE",
  },
  tap: {
    y: "2px",
    backgroundColor: "#902393",
    color: "#EDE9FE",
  },
};

const UserAdsWrapper = (props) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(0);

  const userAdIndices = [...Array(props.ads.length).keys()];

  if (props.ads.length === 0) {
    return (
      <div className="py-16 lg:py-20 px-8">
        <p className="font-axiforma text-brand-gray text-xl text-center">
          Hmm... No ads? Remember, you have seven free ads across all
          categories. Start posting today!
        </p>
        <div className="text-center">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => router.push("/postad")}
            className="uppercase text-purple-100 font-semibold bg-ad-purple rounded-full shadow-xl focus:outline-none mt-10 px-10 py-3 text-lg"
          >
            Post Ad
          </motion.button>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" text-brand-gray w-full mb-20 px-10 lg:px-16">
        <h1 className="component-heading mt-10 pb-6">My Ads</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
