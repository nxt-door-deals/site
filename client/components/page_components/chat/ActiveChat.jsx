import React, { useContext, useState, useEffect, useRef } from "react";
import SiteContext from "../../../context/site/siteContext";
import AuthContext from "../../../context/auth/authContext";
import { useRouter } from "next/router";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { sessionExpiredToast } from "../../../utils/toasts";

import useChat from "../../../hooks/useChat";
import keys from "../../../utils/keys";

const validationSchema = Yup.object({
  message: Yup.string().required().trim(),
});

const variants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    backgroundColor: "#6D28D9",
    y: "1px",
  },
};

const ActiveChat = (props) => {
  const siteContext = useContext(SiteContext);
  const { chatHistory, getChatHistory, markChatsAsRead } = siteContext;

  const authContext = useContext(AuthContext);
  const {
    verifyTokenStatus,
    authError,
    logout,
    notifySellerAboutChatMessage,
    user,
    smsSellerAboutChatMessage,
    altUser,
  } = authContext;

  const router = useRouter();

  const chatId = props.chatId;
  const senderId = props.senderId;

  const [newMessage, setNewMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const WS_URL = `${keys.WS_PROXY}/ws/?chat_id=${chatId}&client_id=${senderId}`;
  const { messages, sendMessage } = useChat(senderId, chatId, WS_URL);

  const chatRef = useRef(null);

  // Scroll to bottom of chat window
  const scrollToBottom = () => {
    const scroll = chatRef.current.scrollHeight - chatRef.current.clientHeight;
    chatRef.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }, []);

  useEffect(() => {
    if (authError && authError === "Session Expired") {
      sessionExpiredToast();
      logout();
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [authError]);

  useEffect(() => {
    if (typeof window !== "undefined")
      chatRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    getChatHistory(chatId);
    markChatsAsRead(chatId);
  }, []);

  useEffect(() => {
    if (chatHistory) {
      chatHistory.map((message) => {
        const historicalMessage = {
          data: message,
          ownedBySender: message.sender === senderId,
        };
        setMessageHistory((messageHistory) => [
          ...messageHistory,
          historicalMessage,
        ]);
      });
    }
  }, [chatHistory]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    if (messageHistory.length === 0) {
      notifySellerAboutChatMessage(
        props.sellerId,
        props.sellerName,
        props.sellerEmail,
        props.buyerId,
        props.buyerName,
        props.adId,
        props.ad.title
      );

      if (altUser && altUser.mobile) {
        smsSellerAboutChatMessage(
          props.sellerId,
          props.sellerName,
          props.buyerId,
          props.buyerName,
          props.adId,
          props.ad.title,
          altUser.mobile
        );
      }
    }

    setNewMessage("");
  };

  return (
    <div className="border-2 border-purple-300 rounded-tl-xl rounded-tr-xl bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 shadow-xl">
      <div className="flex justify-between">
        <div className="m-2 p-3 flex items-center">
          <p>
            <FontAwesomeIcon
              icon={faUserCircle}
              className="rounded-full text-5xl text-ad-purple"
              size="2x"
            />
          </p>
          <p className="ml-2 font-semibold tracking-wide text-brand-gray">
            {props.altUser && props.altUser.name}
          </p>
        </div>

        {/* Tooltip */}
        {/* <div className="p-4 mt-4 mr-4">
          <div
            className="tooltip"
            role="tooltip"
            aria-hidden="true"
            aria-label="Tooltip with ad summary for quick reference"
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-2xl text-ad-purple"
            />
            <span className="tooltiptext">
              <div className="py-1">Available {props.ad.available_from}</div>
              <div className="py-1">
                Price:{" "}
                {props.ad.ad_type === "giveaway" ? (
                  <span className="animate-pulse">FREE</span>
                ) : (
                  <span className="align-middle">
                    <FontAwesomeIcon icon={faRupeeSign} /> {props.ad.price}
                  </span>
                )}
              </div>
              <div className="py-1">Condition: {props.ad.condition}</div>
              {props.ad.ad_type === "sale" && (
                <div className="py-1">
                  Negotiable:{" "}
                  {props.ad.negotiable ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-lg text-green-700 align-middle"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-lg error-text align-middle"
                    />
                  )}
                </div>
              )}
            </span>
          </div>
        </div> */}
      </div>
      <div
        id="chat-window"
        ref={chatRef}
        className={`relative h-96 p-6 overflow-auto overscroll-y-auto bg-gradient-to-br from-white to-pink-50`}
      >
        {/* Display historical messages */}
        <div>
          {messageHistory &&
            messageHistory.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col mb-5 ${
                  message.ownedBySender
                    ? "ml-20 items-end"
                    : "mr-20 items-start"
                }`}
              >
                <p
                  className={`chat-bubble text-sm md:text-base px-4 py-2 break-word rounded-xl ${
                    message.ownedBySender
                      ? "bg-purple-700 from-chat"
                      : "bg-ad-purple to-chat"
                  }`}
                >
                  {message.data.data}
                </p>
                {message.ownedBySender ? (
                  <p className="text-xs text-gray-600 p-1">You</p>
                ) : null}
              </div>
            ))}
        </div>

        {/* Display real-time messages */}
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col mb-5 ${
                message.ownedBySender ? "ml-20 items-end" : "mr-20 items-start"
              }`}
            >
              <p
                className={`chat-bubble text-sm md:text-base px-4 py-2 break-word rounded-xl ${
                  message.ownedBySender
                    ? "bg-purple-700 from-chat"
                    : "bg-ad-purple to-chat"
                }`}
              >
                {message.data.data}
              </p>
              {message.ownedBySender ? (
                <p className="text-xs text-gray-400 p-1">You</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-2 bg-purple-200">
        <Formik
          initialValues={{
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            verifyTokenStatus();
            handleSendMessage();
            values.message = "";
          }}
        >
          {(props) => (
            <Form autoComplete="off">
              <Field
                name="message"
                type="text"
                className="w-full rounded-md mb-2 bg-white overflow-auto p-2 text-sm placeholder-gray-600 focus-within:outline-none"
                placeholder="Your Message"
                autoComplete="off"
                spellCheck={true}
                value={props.values.message}
                onKeyUp={handleNewMessageChange}
              />

              <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="w-full h-10 p-2 bg-purple-700 text-white  uppercase rounded-md text-center font-bold focus:outline-none"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ActiveChat;
