import React, { useContext, useEffect } from "react";
import Link from "next/link";
import AuthContext from "../../context/auth/authContext";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const variants = {
  initial: {
    scale: 0.8,
  },
  animate: {
    scale: 1,
  },
  tap: {
    y: "2px",
  },
};

const UserChatList = () => {
  const authContext = useContext(AuthContext);
  const {
    sellerChats,
    loadSellerChats,
    buyerChats,
    loadBuyerChats,
    userAds,
    user,
  } = authContext;

  useEffect(() => {
    loadBuyerChats(user.id);
    loadSellerChats(user.id);
  }, []);

  return (
    <div>
      <h1 className="font-axiforma text-brand-gray text-center text-2xl mt-10">
        Your Chats
      </h1>
      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-start px-10 mt-2">
        <div id="seller-chats" className="mb-10 lg:mb-0 lg:mr-10 p-5">
          <div className="lg:mt-0">
            <h2 className="text-center mb-5 text-xl">
              {!sellerChats || sellerChats.length !== 0 ? (
                "...for ads posted by you"
              ) : (
                <span className="p-5 pt-10 lg:pt-20 flex items-center">
                  No chats for ads
                  <br /> posted by you
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1  gap-10">
              {userAds &&
                userAds.map(
                  (ad, index) =>
                    ad.chat_record_count > 0 && (
                      <div
                        key={index}
                        className="px-10 py-5 rounded-2xl shadow-md text-center"
                      >
                        <h2 className="py-2 mb-2">{ad.title}</h2>

                        <div
                          className={`grid grid-cols-1 gap-4 ${
                            ad.chat_record_count === 1
                              ? "md:grid-cols-1"
                              : "md:grid-cols-2"
                          }`}
                        >
                          {sellerChats &&
                            sellerChats
                              .filter((adId) => {
                                return adId.ad_id === ad.id;
                              })
                              .map((chat, index) => {
                                return (
                                  <Link
                                    href={`/chat/${
                                      chat.ad_id +
                                      "-" +
                                      chat.seller_id +
                                      "-" +
                                      chat.buyer_id
                                    }`}
                                  >
                                    <a>
                                      <motion.div
                                        variants={variants}
                                        initial="initial"
                                        animate="animate"
                                        whileTap="tap"
                                        key={index}
                                        className="relative chat-bubble chat-list-seller p-4 bg-gray-50 border-b-4 border-ad-purple shadow-postadshadow rounded-3xl rounded-tr-none text-center"
                                      >
                                        {chat.new_chats ? (
                                          <div className="animate-pulse absolute h-3 w-3 rounded-full bg-ad-purple"></div>
                                        ) : null}
                                        <p className="mb-3">
                                          <FontAwesomeIcon
                                            icon={faComments}
                                            className="text-2xl text-ad-purple"
                                          />
                                        </p>
                                        <p className="mb-3 text-sm text-brand-gray">
                                          Chat with{" "}
                                          <span class="font-semibold text-ad-purple">
                                            {chat.buyer_name}
                                          </span>
                                        </p>
                                      </motion.div>
                                    </a>
                                  </Link>
                                );
                              })}
                        </div>
                      </div>
                    )
                )}
              {/* {sellerChats &&
                sellerChats.map((chat, index) => {
                  return (
                    <Link
                      href={`/chat/${
                        chat.ad_id + "-" + chat.seller_id + "-" + chat.buyer_id
                      }`}
                    >
                      <a>
                        <motion.div
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          whileTap="tap"
                          key={index}
                          className="relative chat-bubble chat-list-seller p-4 bg-gray-50 border-b-4 border-ad-purple shadow-postadshadow rounded-3xl rounded-tr-none text-center"
                        >
                          {chat.new_chats ? (
                            <div className="animate-pulse absolute h-3 w-3 rounded-full bg-ad-purple"></div>
                          ) : null}
                          <p className="mb-3">
                            <FontAwesomeIcon
                              icon={faComments}
                              className="text-2xl text-ad-purple"
                            />
                          </p>
                          <p className="mb-3 text-sm text-brand-gray">
                            Chat with{" "}
                            <span class="font-semibold text-ad-purple">
                              {chat.buyer_name}
                            </span>
                          </p>
                          <p className="text-xs text-brand-gray">
                            {chat.ad_title}
                          </p>
                        </motion.div>
                      </a>
                    </Link>
                  );
                })} */}
            </div>
          </div>
        </div>

        <div
          id="buyer-chats"
          className="lg:ml-10 p-5 border-t-2 lg:border-t-0 border-ad-purple"
        >
          <div className="lg:mt-0">
            <h2 className="text-center mb-5 text-xl">
              {!buyerChats || buyerChats.length !== 0 ? (
                "...for ads posted by others"
              ) : (
                <span className="p-5 lg:pt-20 flex items-center">
                  No chats for ads
                  <br /> you are interested in
                </span>
              )}
            </h2>
            <div
              className={`grid grid-cols-1 ${
                buyerChats && buyerChats.length === 1
                  ? "lg:grid-cols-1"
                  : "lg:grid-cols-2"
              } gap-6`}
            >
              {buyerChats &&
                buyerChats.map((chat, index) => {
                  return (
                    <Link
                      href={`/chat/${
                        chat.ad_id + "-" + chat.seller_id + "-" + chat.buyer_id
                      }`}
                    >
                      <a>
                        <motion.div
                          variants={variants}
                          initial="initial"
                          animate="animate"
                          whileTap="tap"
                          key={index}
                          className="relative chat-bubble chat-list-buyer p-4 bg-gray-50 border-b-4 border-purple-500 shadow-postadshadow rounded-3xl rounded-tl-none text-center"
                        >
                          {chat.new_chats ? (
                            <div className="animate-pulse absolute h-3 w-3 rounded-full bg-purple-500"></div>
                          ) : null}
                          <p className="mb-3">
                            <FontAwesomeIcon
                              icon={faComments}
                              className="text-2sxl text-purple-500"
                            />
                          </p>
                          <p className="mb-3 text-sm text-brand-gray">
                            Chat with{" "}
                            <span class="font-semibold text-purple-500">
                              {chat.seller_name}
                            </span>
                          </p>
                          <p className="text-xs text-brand-gray">
                            {chat.ad_title}
                          </p>
                        </motion.div>
                      </a>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatList;
