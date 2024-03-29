import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SiteContext from "../../../context/site/siteContext";
import AuthContext from "../../../context/auth/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { saleFireworks } from "../../../utils/siteImages";
import { toast } from "react-toastify";

// Component imports
import EditAd from "../../forms/EditAd";
import AdImageCarousel from "./AdImageCarousel";
import FullPageAdDetails from "./FullPageAdDetails";
import BouncingBalls from "../../loaders/BouncingBalls";

const buttonVariants = {
  editButtonHover: {
    backgroundColor: "#4C1D95",
  },
  deleteButtonHover: {
    backgroundColor: "#991B1B",
  },
  copyButtonHover: {
    backgroundColor: "#701A75",
  },
  editButtonTap: {
    y: "2px",
    backgroundColor: "#6D28D9",
  },
  deleteButtonTap: {
    y: "2px",
    backgroundColor: "#EF4444",
  },
  copyButtonTap: {
    y: "2px",
    backgroundColor: "#902393",
  },
};

const linkVariants = {
  hover: {
    x: "-2px",
  },
};

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#__next");

const copyToClipboardToast = () =>
  toast("Copied", {
    draggablePercent: 60,
    position: "top-center",
  });

const Ad = (props) => {
  var showChatButton = true;
  var showOtherButtons = false;
  const [modalOpen, setModalOpen] = useState(false);
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
  const { isAuthenticated, user, deleteAd, updateNumberSold } = authContext;

  // If the authenticated user is same as the one who posted the ad, we do not show the chat button
  if (isAuthenticated) {
    if (props.data.posted_by_id === (user && user.id)) {
      showChatButton = false;
      showOtherButtons = true;
    }
  }

  // useEffect(() => {
  //   props.setShowForm(true);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading();
      getNeighbourhoodFromId(props.data.apartment_id);
      getReportedAdUsers(props.data.id);
    }

    return () => (mounted = false);
  }, []);

  const handleLinkCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => copyToClipboardToast());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-start h-full py-32">
        <Image
          src={"/images/loader/loader.gif"}
          alt="Loading..."
          height={100}
          width={100}
        />
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
              className="text-brand-purple cursor-pointer"
              size="2x"
            />
          </motion.a>
        </Link>
        <p className="pl-2">
          Back to marketplace for{" "}
          <strong>{apartmentData && apartmentData.name}</strong>
        </p>
      </div>

      <div className="shadow-postadshadow rounded-3xl px-3 pb-10 md:pt-5 lg:p-10 overflow-x-hidden bg-white">
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
              {!showOtherButtons && (
                <div className="flex justify-center mt-10">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="copyButtonHover"
                    whileTap="copyButtonTap"
                    className="h-12 w-56 font-semibold uppercase mb-7 text-white
                    bg-ad-purple shadow-adcardshadow lg:mb-0 lg:mr-5 rounded-xl focus:outline-none"
                    onClick={() => handleLinkCopy()}
                  >
                    Copy Ad Link
                  </motion.button>
                </div>
              )}

              {/* Buttons for the ad owner */}
              {showOtherButtons && (
                <div className="pt-10 flex flex-col items-center lg:flex-row lg:justify-center">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="editButtonHover"
                    whileTap="editButtonTap"
                    className="h-12 w-40 font-semibold uppercase mb-7 text-white
                    bg-purple-700 shadow-buttonShadowPurple lg:mb-0 lg:mr-5 rounded-xl focus:outline-none"
                    onClick={() => props.setShowForm(false)}
                  >
                    Edit Ad
                  </motion.button>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="deleteButtonHover"
                    whileTap="deleteButtonTap"
                    disabled={deleteButtonClicked}
                    className="bg-red-500 shadow-cancelButtonShadow text-white h-12 w-40 font-semibold uppercase lg:mt-0 rounded-xl focus:outline-none"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Mark As Sold
                  </motion.button>
                </div>
              )}

              {user &&
                !showOtherButtons &&
                reportedAd &&
                !reportedAd.users.includes(user.id) && (
                  <div className="text-right pt-5 lg:pt-0">
                    <Link href={`/reportad/${props.data.id}`}>
                      <a className="uppercase styled-link pb-1 font-semibold text-brand-gray focus-within:outline-none">
                        Report this ad
                      </a>
                    </Link>
                  </div>
                )}
            </motion.div>
          ) : (
            props.data.posted_by_id === (user && user.id) && (
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
                  setShowForm={props.setShowForm}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>

        <Modal
          style={{
            overlay: {
              zIndex: 99999,
              opacity: 1,
              background: "var(--modal-overlay-color)",
            },
          }}
          isOpen={modalOpen}
          shouldFocusAfterRender={true}
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setModalOpen(false)}
          className="flex justify-center items-center h-screen px-10"
        >
          <div className="bg-white border-2 border-purple-700 rounded-2xl p-5 lg:p-10 lg:text-lg text-center tracking-wide">
            <Image
              src={saleFireworks}
              alt="Fireworks"
              height={175}
              width={175}
            />
            <p className="mt-5">Congratulations on the sale!</p>
            <p className="flex mt-3 justify-center">
              Once you mark your ad as sold, it will no longer be visible in
              your marketplace. Sounds good?
            </p>

            <div className="mt-8">
              <motion.button
                variants={buttonVariants}
                whileHover="editButtonHover"
                whileTap="editButtonTap"
                className="h-12 w-40 bg-purple-700 p-3 rounded-xl uppercase text-base text-white focus-within:outline-none font-semibold"
                onClick={() => {
                  setDeleteButtonClicked(true);
                  updateNumberSold(user && user.id);
                  deleteAd(props.data.posted_by_id, props.data.id);
                  setTimeout(
                    () =>
                      router.push(
                        `/neighbourhood/ads/${props.data.apartment_id}`
                      ),
                    5000
                  );
                }}
              >
                {deleteButtonClicked ? <BouncingBalls /> : "Yes, Continue"}
              </motion.button>
            </div>
            <div className="mt-5 lg:mt-3 text-center lg:text-right text-sm underline text-purple-700">
              <Link href={`/ads/${props.data.id}`}>
                <a
                  className="hover:no-underline styled-link"
                  onClick={() => setModalOpen(false)}
                >
                  No, I changed my mind.
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Ad;
