import React, { useContext, useState, useEffect, useRef } from "react";
import SiteContext from "../../context/site/siteContext";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import useChat from "../../hooks/useChat";
import keys from "../../utils/keys";

const validationSchema = Yup.object({
  message: Yup.string().required().trim(),
});

const variants = {
  hover: {
    backgroundColor: "#5B21B6",
  },
  tap: {
    y: "1px",
  },
};

const ActiveChat = (props) => {
  const siteContext = useContext(SiteContext);
  const { chatHistory, getChatHistory, markChatsAsRead } = siteContext;

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
    getChatHistory(chatId);
    markChatsAsRead(chatId);
    scrollToBottom();
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

  useEffect(() => scrollToBottom, [messages]);

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="border-2 border-purple-200 rounded-tl-2xl rounded-tr-2xl bg-purple-200">
      <div className="m-2 p-3 flex items-center">
        <p>
          <FontAwesomeIcon
            icon={faUserCircle}
            className="rounded-full text-5xl text-ad-purple"
          />
        </p>
        <p className="ml-2 font-semibold tracking-wide text-brand-gray">
          {props.altUser && props.altUser.name}
        </p>
      </div>

      <div
        id="chat-window"
        ref={chatRef}
        className="relative h-96 p-6 overflow-auto overscroll-y-auto bg-white"
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
                  className={`chat-bubble px-4 py-2 break-word rounded-xl ${
                    message.ownedBySender
                      ? "bg-purple-500 font-semibold from-chat"
                      : "bg-ad-purple font-semibold to-chat"
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
                className={`chat-bubble px-4 py-2 break-word rounded-xl ${
                  message.ownedBySender
                    ? "bg-purple-500 font-semibold from-chat"
                    : "bg-ad-purple font-semibold to-chat"
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
            handleSendMessage();
            values.message = "";
          }}
        >
          {(props) => (
            <Form>
              <Field
                name="message"
                type="text"
                className="w-full  rounded-md mb-2 bg-white overflow-auto p-2 text-sm focus-within:outline-none"
                placeholder="Your Message"
                spellCheck={true}
                value={props.values.message}
                onKeyUp={handleNewMessageChange}
              />

              <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="w-full h-10 p-2 bg-purple-500 text-white  uppercase rounded-md text-center font-bold focus:outline-none"
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
