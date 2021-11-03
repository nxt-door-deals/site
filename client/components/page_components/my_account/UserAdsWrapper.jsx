import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import AuthContext from "../../../context/auth/authContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// Component Imports
import UserAds from "./UserAds";
import AdQuotaIndicator from "./AdQuotaIndicator";

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

  const { fetchUserAds, userAds, loading, setLoading } = authContext;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);
      fetchUserAds(props.currentUser.id);
    }

    return () => (mounted = false);
  }, []);

  // useEffect(() => {
  //   let mounted = true;

  //   if (mounted) setAds(userAds);

  //   return () => (mounted = false);
  // }, [userAds]);

  // const userAdIndices = userAds && [...Array(userAds.length).keys()];

  if (loading) {
    return (
      <div className="flex justify-center items-start h-full py-32">
        <Image src={"/images/loader/loader.gif"} height={100} width={100} />
      </div>
    );
  }

  if (!loading && userAds && userAds.length === 0) {
    return (
      <div className="py-16 lg:py-20 px-8">
        <p className="text-brand-gray text-lg leading-8 lg:text-center">
          Hmm... No ads? Remember, you have{" "}
          <span className="font-semibold border-b-4 border-ad-purple pb-1">
            five
          </span>{" "}
          free ads across all categories. Start posting today!
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
        <h1 className="component-heading mt-10 pb-3">My Ads</h1>
        {!loading && (
          <AdQuotaIndicator
            userAds={userAds && userAds}
            currentUsername={props.currentUser.name}
          />
        )}
        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {userAds &&
            // [...Array(ads.length).keys()].map((i) => (
            userAds.map((ad, index) => (
              <UserAds
                key={index}
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
