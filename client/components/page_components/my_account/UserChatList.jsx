import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../context/auth/authContext";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

const buttonVariants = {
  chatButtonHover: {
    backgroundColor: "#4C1D95",
  },
  chatButtonTap: {
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

const UserChatList = (props) => {
  const [deleteIndex, setDeleteIndex] = useState(null);
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const {
    sellerChats,
    loadSellerChats,
    buyerChats,
    loadBuyerChats,
    userAds,
    fetchUserAds,
    user,
    markSellerChatForDeletion,
    markBuyerChatForDeletion,
  } = authContext;

  useEffect(() => {
    props.chatNotification.current = null;
    fetchUserAds(props.currentUser.id);
    loadBuyerChats(user.id);
    loadSellerChats(user.id);
  }, []);

  return (
    <div className="mb-20">
      <h1 className="component-heading mt-10">My Chats</h1>
      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start px-10 mt-2">
        <div
          id="seller-chats"
          className="mb-10 lg:mb-0 lg:mr-10 p-5 lg:px-10 lg:border-r-2 lg:w-1/2"
        >
          <div className="lg:mt-0">
            <h2 className="text-center mb-5 text-xl">
              {!sellerChats || sellerChats.length !== 0 ? (
                "...for ads posted by me"
              ) : (
                <span className="p-5 pt-10 lg:pt-20 flex justify-center items-center text-gray-600">
                  No chats for ads
                  <br /> posted by me
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 gap-10">
              {!sellerChats ||
                (sellerChats.length !== 0 &&
                  userAds &&
                  userAds.map(
                    (ad) =>
                      ad.chat_record_count > 0 &&
                      sellerChats &&
                      // If all chats are marked for deletion, do not show the ad title
                      sellerChats.filter((adId) => {
                        return (
                          adId.ad_id === ad.id &&
                          adId.marked_for_deletion === false
                        );
                      }).length !== 0 && (
                        <div
                          key={ad.id}
                          className="px-10 py-5 rounded-2xl border-2 border-brand-purple border-dashed lg:w-11/12 border-opacity-20 text-center"
                        >
                          <h2 className="py-2 mb-2">{ad.title}</h2>

                          <div
                            className={`grid grid-cols-1 gap-10  ${
                              ad.chat_record_count === 1
                                ? "md:grid-cols-1 w-52"
                                : "md:grid-cols-2"
                            }`}
                          >
                            {sellerChats &&
                              sellerChats
                                .filter((adId) => {
                                  return (
                                    adId.ad_id === ad.id &&
                                    adId.marked_for_deletion === false
                                  );
                                })
                                .map((chat, idx) => {
                                  return (
                                    <div
                                      key={idx}
                                      className="relative chat-bubble chat-list-seller p-4 bg-gray-50 border-b-4 border-ad-purple shadow-chatListShadow rounded-3xl rounded-tr-none text-center focus-within:outline-none"
                                    >
                                      {chat.new_chats &&
                                      chat.last_sender !== user.id ? (
                                        <div className="animate-pulse absolute h-3 w-3 rounded-full bg-notification-red"></div>
                                      ) : null}
                                      <p className="mb-3">
                                        <FontAwesomeIcon
                                          icon={faComments}
                                          className="text-lg text-ad-purple"
                                        />
                                      </p>
                                      <p className="mb-3 text-sm text-brand-gray">
                                        Chat with{" "}
                                        <span className="font-semibold text-ad-purple">
                                          {chat.buyer_name}
                                        </span>
                                      </p>

                                      <p className="text-xs text-brand-gray">
                                        {chat.ad_title}
                                      </p>

                                      <div className="flex justify-center items-center px-10 pt-3">
                                        <motion.button
                                          variants={buttonVariants}
                                          whileHover="chatButtonHover"
                                          whileTap="chatButtonTap"
                                          className="h-10 w-10 bg-purple-700 shadow-buttonShadowPurple rounded-lg focus-within:outline-none"
                                          onClick={() =>
                                            router.push(
                                              `/chat/${
                                                chat.ad_id +
                                                "+" +
                                                chat.seller_id +
                                                "+" +
                                                chat.buyer_id
                                              }`
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon icon={faComment} />
                                        </motion.button>
                                        <motion.button
                                          variants={buttonVariants}
                                          whileHover="deleteButtonHover"
                                          whileTap="deleteButtonTap"
                                          className="h-10 w-10 bg-red-400 shadow-cancelButtonShadow rounded-lg ml-3 focus-within:outline-none"
                                          onClick={() => {
                                            setDeleteIndex(chat.chat_id);

                                            markSellerChatForDeletion(
                                              user.id,
                                              chat.chat_id
                                            );

                                            setTimeout(() => {
                                              loadSellerChats(user.id);
                                              setDeleteIndex(null);
                                            }, 2500);
                                          }}
                                        >
                                          {deleteIndex === chat.chat_id ? (
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
                                  );
                                })}
                          </div>
                        </div>
                      )
                  ))}
            </div>
          </div>
        </div>

        <div
          id="buyer-chats"
          className="lg:ml-10 p-5 border-t-2 lg:border-t-0 border-ad-purple lg:mt-0"
        >
          <div className="mt-10 lg:mt-0">
            <h2 className="text-center mb-5 text-xl">
              {!buyerChats || buyerChats.length !== 0 ? (
                "...for ads posted by others"
              ) : (
                <span className="pt-20 flex justify-center items-center text-gray-600">
                  No chats for ads
                  <br /> I am interested in
                </span>
              )}
            </h2>
            <div
              className={`grid grid-cols-1 ${
                buyerChats && buyerChats.length === 1
                  ? "md:grid-cols-1 w-52"
                  : "md:grid-cols-2 mx-12 lg:w-128"
              } gap-10`}
            >
              {!buyerChats ||
                (buyerChats.length !== 0 &&
                  buyerChats &&
                  buyerChats.map((chat, index) => {
                    return (
                      <div
                        key={index}
                        className="relative chat-bubble chat-list-buyer p-4 bg-gray-50 border-b-4 border-purple-500 hover:shadow-userAccountShadow rounded-3xl rounded-tl-none text-center focus-within:outline-none"
                      >
                        {chat.new_chats && chat.last_sender !== user.id ? (
                          <div className="animate-pulse absolute h-3 w-3 rounded-full bg-notification-red"></div>
                        ) : null}
                        <p className="mb-3">
                          <FontAwesomeIcon
                            icon={faComments}
                            className="text-lg text-purple-500"
                          />
                        </p>
                        <p className="mb-3 text-sm text-brand-gray">
                          Chat with{" "}
                          <span className="font-semibold text-purple-500">
                            {chat.seller_name}
                          </span>
                        </p>
                        <p className="text-xs text-brand-gray">
                          {chat.ad_title}
                        </p>

                        <div className="flex justify-between items-center px-10 pt-3">
                          <motion.button
                            variants={buttonVariants}
                            whileHover="chatButtonHover"
                            whileTap="chatButtonTap"
                            className="h-10 w-10 bg-purple-700 shadow-buttonShadowPurple rounded-lg focus-within:outline-none"
                            onClick={() =>
                              router.push(
                                `/chat/${
                                  chat.ad_id +
                                  "+" +
                                  chat.seller_id +
                                  "+" +
                                  chat.buyer_id
                                }`
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faComment} />
                          </motion.button>
                          <motion.button
                            variants={buttonVariants}
                            whileHover="deleteButtonHover"
                            whileTap="deleteButtonTap"
                            className="h-10 w-10 bg-red-400 shadow-cancelButtonShadow rounded-lg ml-2 focus-within:outline-none"
                            onClick={() => {
                              setDeleteIndex(chat.chat_id);

                              markBuyerChatForDeletion(user.id, chat.chat_id);

                              setTimeout(() => {
                                loadBuyerChats(user.id);
                                setDeleteIndex(null);
                              }, 2500);
                            }}
                          >
                            {deleteIndex === chat.chat_id ? (
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
                    );
                  }))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatList;
