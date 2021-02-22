import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth/authContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import keys from "../../utils/keys";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faRupeeSign,
  faEdit,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const buttonVariants = {
  editButtonHover: {
    backgroundColor: "#4C1D95",
  },
  editButtonTap: {
    y: "2px",
    backgroundColor: "#8B5CF6",
  },
  deleteButtonHover: {
    backgroundColor: "#991B1B",
  },
  deleteButtonTap: {
    y: "2px",
    backgroundColor: "#F87171",
  },
};

const UserAds = (props) => {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { deleteAd, fetchUserAds } = authContext;
  const isOpen = props.i === props.expanded;

  return (
    <div className="rounded-3xl shadow-chatListShadow bg-white p-4 lg:mb-0 lg:self-start">
      <div className="mb-2">
        {props.ads[props.i].images.length > 0 && (
          <Image
            src={props.ads[props.i].images[0]}
            alt={props.ads[props.i].title}
            width={325}
            height={300}
          />
        )}
        {props.ads[props.i].images.length === 0 && (
          <Image
            src={keys.DEFAULT_IMAGE}
            alt={"Default image"}
            width={325}
            height={300}
          />
        )}
      </div>

      <div className={`mb-2 text-center ${isOpen ? "hidden" : null}`}>
        <p className="text-lg font-semibold truncate">
          {props.ads[props.i].title}
        </p>
      </div>

      <div className="w-full text-center">
        {!isOpen ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={() => props.setExpanded(isOpen ? false : props.i)}
            className="text-xl text-brand-purple cursor-pointer mb-2"
          />
        ) : (
          <FontAwesomeIcon
            icon={faChevronUp}
            className="text-xl text-brand-purple cursor-pointer mb-2"
            onClick={() => props.setExpanded(isOpen ? false : props.i)}
          />
        )}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2 text-center">
                  <p className="text-base font-semibold">
                    {props.ads[props.i].title}
                  </p>
                </div>

                <div className="text-sm text-left p-2 cursor-default">
                  <p className="mb-2">
                    Category:{" "}
                    <span className="font-semibold">
                      {props.ads[props.i].ad_category}
                    </span>
                  </p>
                  {props.ads[props.i].ad_type === "sale" ? (
                    <p className="mb-2">
                      Price:{" "}
                      <FontAwesomeIcon
                        icon={faRupeeSign}
                        className="text-xs mr-1"
                      />
                      <span className="font-semibold">
                        {props.ads[props.i].price}
                      </span>
                    </p>
                  ) : (
                    <p className="mb-2">
                      Type of sale:{" "}
                      <span className="font-semibold">Giveaway</span>
                    </p>
                  )}
                  <p className="mb-2">
                    Condition:{" "}
                    <span className="font-semibold">
                      {props.ads[props.i].condition}
                    </span>
                  </p>
                  <p className="mb-6">
                    Posted{" "}
                    <span className="font-semibold">
                      {props.ads[props.i].date_posted}
                    </span>
                  </p>
                  <div className="flex justify-around">
                    <motion.button
                      type="button"
                      variants={buttonVariants}
                      whileHover="editButtonHover"
                      whileTap="editButtonTap"
                      className="p-3 rounded-lg bg-purple-500 focus:outline-none"
                      onClick={() => {
                        setEditButtonClicked(true);
                        props.setShowForm(false);
                        router.push(`/ads/${props.ads[props.i].id}`);
                      }}
                    >
                      {editButtonClicked ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="text-lg text-white animate-spin"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-lg text-white"
                        />
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      variants={buttonVariants}
                      whileHover="deleteButtonHover"
                      whileTap="deleteButtonTap"
                      className="p-3 rounded-lg bg-red-400 focus:outline-none"
                      onClick={() => {
                        setDeleteButtonClicked(true);
                        deleteAd(
                          props.i,
                          props.currentUser.id,
                          props.ads[props.i].id
                        );
                        setTimeout(
                          () => fetchUserAds(props.currentUser.id),
                          3000
                        );
                      }}
                    >
                      {deleteButtonClicked ? (
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="text-lg text-white animate-spin"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-lg text-white"
                        />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserAds;
