import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SiteContext from "../../context/site/siteContext";
import AuthContext from "../../context/auth/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

// Component imports
import EditAd from "../forms/EditAd";
import AdImageCarousel from "./AdImageCarousel";
import FullPageAdDetails from "./FullPageAdDetails";
import BouncingBalls from "../loaders/BouncingBalls";

const buttonVariants = {
  editButtonHover: {
    backgroundColor: "#4C1D95",
  },
  deleteButtonHover: {
    backgroundColor: "#991B1B",
  },
  editButtonTap: {
    y: "2px",
    backgroundColor: "#8B5CF6",
  },
  deleteButtonTap: {
    y: "2px",
    backgroundColor: "#EF4444",
  },
};

const linkVariants = {
  hover: {
    x: "-2px",
  },
};

const Ad = (props) => {
  var showChatButton = true;
  var showOtherButtons = false;
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const router = useRouter();

  const siteContext = useContext(SiteContext);
  const {
    getNeighbourhoodFromId,
    apartmentData,
    reportedAd,
    getReportedAdUsers,
    loading,
    setLoading,
  } = siteContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, deleteAd } = authContext;

  // If the authenticated user is same as the one who posted the ad, we do not show the chat button
  if (isAuthenticated) {
    if (props.data.posted_by_id === (user && user.id)) {
      showChatButton = false;
      showOtherButtons = true;
    }
  }

  useEffect(() => {
    let mounted = true;
    window.scrollTo(0, 0);

    if (mounted) {
      setLoading();
      getNeighbourhoodFromId(props.data.apartment_id);
      getReportedAdUsers(props.data.id);
    }

    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-start h-full py-32">
        <Image src={"/images/loader/loader.gif"} height={100} width={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center ml-4 mb-5">
        <Link href={`/neighbourhood/ads/${props.data.apartment_id}`}>
          <motion.a variants={linkVariants} whileHover="hover">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              className="text-4xl text-brand-purple cursor-pointer"
            />
          </motion.a>
        </Link>
        <p className="pl-2">
          Back to marketplace for{" "}
          <strong>{apartmentData && apartmentData.name}</strong>
        </p>
      </div>

      <div className="shadow-boxshadowlogin rounded-3xl p-10 bg-white">
        <AnimatePresence exitBeforeEnter>
          {props.showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start lg:h-full">
                <div className="pr-0 lg:pr-2">
                  <AdImageCarousel images={props.data.images} />
                </div>
                <div className="border-l-0 pl-0 lg:border-l-2 w-full lg:pl-5">
                  <FullPageAdDetails
                    adData={props.data}
                    showChatButton={showChatButton}
                    buyerId={(user && user.id) || ""}
                  />
                </div>
              </div>
              {/* Buttons for the ad owner */}
              {showOtherButtons && (
                <div className="pt-10 flex flex-col items-center lg:flex-row lg:justify-center">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="editButtonHover"
                    whileTap="editButtonTap"
                    className="bg-purple-500 text-white h-12 w-40 font-semibold uppercase lg:mr-5 rounded-xl focus:outline-none"
                    onClick={() => props.setShowForm(false)}
                  >
                    Edit Ad
                  </motion.button>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="deleteButtonHover"
                    whileTap="deleteButtonTap"
                    disabled={deleteButtonClicked}
                    className="bg-red-500 text-white h-12 w-40 font-semibold uppercase mt-3 lg:mt-0 rounded-xl focus:outline-none"
                    onClick={() => {
                      setDeleteButtonClicked(true);
                      deleteAd(0, props.data.posted_by_id, props.data.id);
                      setTimeout(
                        () =>
                          router.push(
                            `/ads/${apartmentData && apartmentData.name}/${
                              props.data.apartment_id
                            }`
                          ),
                        5000
                      );
                    }}
                  >
                    {deleteButtonClicked ? <BouncingBalls /> : "Delete Ad"}
                  </motion.button>
                </div>
              )}

              {user &&
                !showOtherButtons &&
                reportedAd &&
                !reportedAd.users.includes(user.id) && (
                  <div className="text-right pt-5 lg:pt-0">
                    <Link href={`/reportad/${props.data.id}`}>
                      <a className="uppercase styled-link font-semibold text-brand-gray focus-within:outline-none">
                        Report this ad
                      </a>
                    </Link>
                  </div>
                )}
            </motion.div>
          ) : (
            <motion.div
              key="form2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-bold text-3xl text-center text-brand-gray tracking-wide mt-2 mb-5">
                Update Your Ad
              </h1>
              <EditAd
                data={props.data && props.data}
                imgArray={props.imgArray}
                setImgArray={props.setImgArray}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Ad;
