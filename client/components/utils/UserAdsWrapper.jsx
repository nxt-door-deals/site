import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

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
  // const [expanded, setExpanded] = useState(0);
  const [ads, setAds] = useState([]);
  const authContext = useContext(AuthContext);

  const { fetchUserAds, userAds } = authContext;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchUserAds(props.currentUser.id);
    }

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) setAds(userAds);

    return () => (mounted = false);
  }, [userAds]);

  console.log(ads);

  // const userAdIndices = userAds && [...Array(userAds.length).keys()];

  if (ads && ads.length === 0) {
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
            className="uppercase text-white font-semibold bg-ad-purple rounded-full shadow-giveawayButtonShadow focus:outline-none mt-10 px-10 py-3 text-lg "
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
          {ads &&
            // [...Array(ads.length).keys()].map((i) => (
            ads.map((ad, index) => (
              <UserAds
                key={index}
                ads={ads}
                setAds={setAds}
                ad={ad}
                currentUser={props.currentUser}
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
