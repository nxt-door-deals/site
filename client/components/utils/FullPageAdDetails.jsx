import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import cookie from "../../utils/cookieInit";
import keys from "../../utils/keys";

const variants = {
  chatButtonHover: {
    backgroundColor: "#4C1D95",
  },
  buttonTap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
};

const FullPageAdDetails = (props) => {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (cookie.get("__redirChatCookie")) {
        cookie.remove("__redirChatCookie");
      }
    }

    return () => (mounted = false);
  }, []);

  if (props.adData.available_from !== "immediately") {
    var d = new Date(props.adData.available_from);
    var availableFromDate =
      d.getDate() + "-" + (parseInt(d.getMonth()) + 1) + "-" + d.getFullYear();
  }

  return (
    <div>
      <h1 className="text-lg lg:text-2xl">
        <span className="text-purple-700 uppercase">
          {props.adData.condition}
        </span>
        : {props.adData.title}
      </h1>
      <p className="py-3 text-xs lg:text-sm text-gray-500">
        Ad id: {props.adData.modified_id} &nbsp;
        <span className="text-brand-gray">|</span>&nbsp;{" "}
        {props.adData.available_from === "immediately"
          ? "Available immediately"
          : `Available from ${availableFromDate}`}
      </p>
      <hr></hr>
      <p className="pt-5 text-sm">
        Posted by <strong>{props.adData.posted_by_name}</strong>&nbsp;
        {props.adData.flat_no !== null &&
          "(apartment number: " + props.adData.flat_no + ")"}
      </p>
      <div className="pt-5 text-2xl">
        {props.adData.ad_type === "sale" ? (
          <p className="text-purple-700 font-bold">
            <FontAwesomeIcon icon={faRupeeSign} /> {props.adData.price}
          </p>
        ) : (
          <p className="text-purple-700 font-bold animate-pulse text-2xl">
            FREE
          </p>
        )}
      </div>

      {/* Chat button */}
      {props.showChatButton && (
        <div className="pt-5 pb-2">
          <motion.button
            type="button"
            variants={variants}
            whileHover="chatButtonHover"
            whileTap="buttonTap"
            aria-label="Chat with seller"
            className="p-3 bg-purple-700 shadow-buttonShadowPurple text-white rounded-xl font-semibold uppercase focus:outline-none"
            onClick={() => {
              if (cookie.get("__redirChatCookie")) {
                cookie.remove("__redirChatCookie");
              }

              cookie.set(
                "__redirChatCookie",
                {
                  _adId: props.adData.id,
                  _slrId: props.adData.posted_by_id,
                  _byrId: props.buyerId && props.buyerId,
                },
                {
                  domain: keys.DOMAIN,
                  path: "/",
                  sameSite: keys.SAME_SITE_COOKIE_SETTING,
                  secure: keys.SECURE_COOKIE,
                }
              );

              router.push(
                `/chat/${
                  props.adData.id +
                  "-" +
                  props.adData.posted_by_id +
                  "-" +
                  props.buyerId
                }`
              );
            }}
          >
            Chat with seller
          </motion.button>
        </div>
      )}

      <div className="pt-5">
        <p className="pb-3 font-semibold">Item Details:</p>
        <p className="bg-purple-100 p-3 text-sm">
          Condition:{" "}
          <span className="font-semibold">{props.adData.condition}</span>
        </p>
        {props.adData.ad_type === "sale" && (
          <p className="bg-purple-200 p-3 text-sm">
            Negotiable:{" "}
            {props.adData.negotiable ? (
              <FontAwesomeIcon
                icon={faCheck}
                className="text-lg text-green-700"
              />
            ) : (
              <FontAwesomeIcon
                icon={faTimes}
                className="text-lg text-red-900 align-middle"
              />
            )}
          </p>
        )}
      </div>

      <div className="pt-7">
        <p className="pb-3 font-semibold">Description:</p>
        <p className="text-sm md:text-base tracking-wide whitespace-pre-wrap">
          {props.adData.description}
        </p>
      </div>
    </div>
  );
};

export default FullPageAdDetails;
