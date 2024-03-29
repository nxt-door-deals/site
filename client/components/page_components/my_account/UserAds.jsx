import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../context/auth/authContext";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import keys from "../../../utils/keys";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faEdit,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import BouncingBalls from "../../loaders/BouncingBalls";

const buttonVariants = {
  editButtonHover: {
    backgroundColor: "#4C1D95",
  },
  editButtonTap: {
    y: "2px",
    backgroundColor: "#6D28D9",
  },
  deleteButtonHover: {
    backgroundColor: "#991B1B",
  },
  deleteButtonTap: {
    y: "2px",
    backgroundColor: "#F87171",
  },
};

Modal.setAppElement("#__next");

const UserAds = (props) => {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { deleteAd, fetchUserAds } = authContext;
  // const isOpen = props.i === props.expanded;

  // useEffect(() => {
  //   fetchUserAds(props.currentUser.id);
  // }, [props.userAds]);

  useEffect(() => {
    if (editButtonClicked) {
      setTimeout(() => {
        props.setShowForm(false);
        router.push(`/ads/${props.ad.id}`);
      }, 1000);
    }
  }, [editButtonClicked]);

  return (
    <div className="rounded-2xl border-3 hover:shadow-chatListShadow hover:border-0 transition-all duration-75 ease-in-out bg-white lg:mb-0 lg:self-start">
      <div className="mb-2 flex justify-center relative h-[300px]">
        {props.ad.images.length > 0 && (
          <Image
            src={props.ad.images[0].image_path}
            alt={props.ad.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL={props.ad.images[0].image_path + "/tr:bl-10"}
            className="rounded-t-xl"
          />
        )}
        {props.ad.images.length === 0 && (
          <Image
            src={keys.DEFAULT_IMAGE}
            alt="Default image"
            width={325}
            height={300}
          />
        )}
      </div>

      <div className="w-full text-center p-2">
        <div>
          <div className="mb-2 text-center">
            <p className="text-base font-semibold">{props.ad.title}</p>
          </div>

          <div className="text-sm text-left p-2 cursor-default">
            <p className="mb-2">
              Category:{" "}
              <span className="font-semibold">{props.ad.ad_category}</span>
            </p>
            {props.ad.ad_type === "sale" ? (
              <p className="mb-2">
                Price:{" "}
                <FontAwesomeIcon icon={faRupeeSign} className="text-xs mr-1" />
                <span className="font-semibold">{props.ad.price}</span>
              </p>
            ) : (
              <p className="mb-2">
                Type of sale: <span className="font-semibold">Giveaway</span>
              </p>
            )}
            <p className="mb-2">
              Condition:{" "}
              <span className="font-semibold">{props.ad.condition}</span>
            </p>
            <p className="mb-6">
              Posted{" "}
              <span className="font-semibold">{props.ad.date_posted}</span>
            </p>
            <div className="flex justify-around">
              <motion.button
                type="button"
                variants={buttonVariants}
                whileHover="editButtonHover"
                whileTap="editButtonTap"
                className="p-3 rounded-lg bg-purple-700 shadow-buttonShadowPurple focus:outline-none"
                onClick={() => {
                  setEditButtonClicked(true);
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
                className="p-3 rounded-lg bg-red-400 shadow-cancelButtonShadow focus:outline-none"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-lg text-white"
                />
              </motion.button>
            </div>
          </div>
        </div>

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
          <div className="bg-white border-2 border-red-400 px-4 py-5 lg:p-10 lg:text-lg text-center tracking-wide rounded-2xl">
            <p className="flex justify-center">
              Deleting an ad will permanently remove it from your marketplace.
              Ok to proceed?
            </p>

            <div className="mt-8">
              <motion.button
                variants={buttonVariants}
                whileHover="deleteButtonHover"
                whileTap="deleteButtonTap"
                className="h-12 w-40 bg-red-400 p-3 rounded-xl uppercase text-base text-white focus-within:outline-none font-semibold"
                onClick={() => {
                  setDeleteButtonClicked(true);

                  deleteAd(props.currentUser.id, props.ad.id);

                  setTimeout(() => {
                    fetchUserAds(props.currentUser.id);
                    setDeleteButtonClicked(false);
                    setModalOpen(false);
                    window.scroll({ top: 0, left: 0, behavior: "smooth" });
                  }, 5000);
                  {
                    /* setTimeout(() => {
                    setDeleteButtonClicked(false);
                    setModalOpen(false);
                    window.scroll({ top: 0, left: 0, behavior: "smooth" });
                  }, 1000); */
                  }
                }}
              >
                {deleteButtonClicked ? <BouncingBalls /> : "Yes, Continue"}
              </motion.button>
            </div>

            <div className="pt-5 lg:pt-3 text-center lg:text-right text-sm  text-purple-700">
              <Link href="/account">
                <a
                  className="hover:no-underline styled-link pb-1"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="border-b-2 border-purple-700">
                    No, I changed my mind.
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserAds;
