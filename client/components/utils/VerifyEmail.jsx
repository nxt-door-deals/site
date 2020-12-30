import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import keys from "../../utils/keys";

const VerifyEmail = ({ user }) => {
  const authContext = useContext(AuthContext);

  const { sendEmail, updateEmailVerificationTimestamp } = authContext;

  var name = user.name !== null ? user.name : "friend";
  var email = user.email !== null ? user.email : "registered email";
  var id = user.id !== null && user.id;
  var email_hash =
    user.email_verification_hash !== null && user.email_verification_hash;

  const fullVerificationString = email_hash + "|" + id;
  const verificationUrl = `http://${keys.SERVER}/verifyemail/${fullVerificationString}`;

  useEffect(() => {
    sendEmail(name, email, verificationUrl);
  }, []);

  // Email sent toast
  const emailSentToast = () =>
    toast("Email has been resent", {
      draggablePercent: 60,
      position: "top-center",
    });

  return (
    <div className="font-axiforma text-center text-brand-gray">
      <h2 className="font-bold text-3xl tracking-wide mb-4">
        One final step...
      </h2>
      <div className="flex justify-center items-center p-5">
        <img
          src="/images/user_registration/email.svg"
          height="200px"
          width="200px"
          alt="Mailbox"
        />
      </div>

      <p className="text-base">
        Hello, <span className="font-bold text-blue-600">{name}</span>. Thank
        you for signing up!
      </p>
      <br />
      <p className="text-base">
        Please verify your email using the link that was just sent to{" "}
        <span className="font-bold text-blue-600">{email}</span>. The link is
        valid for 24 hours only.
      </p>
      <br />

      <p className="text-xs mb-2">Want to verify later?</p>
      <motion.button
        whileTap={{
          backgroundColor: "#4C51BF",
          y: "2px",
          boxShadow: "0px 8px 15px rgba(144, 181, 218, 0.15)",
        }}
        className="font-semibold text-sm text-white p-3 rounded-md bg-blue-500
        uppercase mb-4 focus:outline-none"
        onClick={() => {
          user !== null &&
            Router.push(`/ads/${user.apartment_name}/${user.apartment_id}`);
        }}
      >
        Continue to site
      </motion.button>

      <p className="text-xs">
        <FontAwesomeIcon icon={faInfoCircle} /> Please note that you will not be
        able to post ad's without verifying your email.
      </p>
      <br />

      <p className="text-sm text-center ">
        Didn't receive our email?{" "}
        <Link href="">
          <a
            className="text-blue-600"
            onClick={(e) => {
              e.preventDefault();
              updateEmailVerificationTimestamp(user.id);
              sendEmail(name, email, verificationUrl);
              emailSentToast();
            }}
          >
            Resend email
          </a>
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmail;
