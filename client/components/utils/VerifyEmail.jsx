import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import keys from "../../utils/keys";

import { greeting } from "../../utils/greeting";

const buttonVariants = {
  hover: {
    backgroundColor: "#1E40AF",
  },
  tap: {
    backgroundColor: "#3B82F6",
    y: "2px",
  },
};

const VerifyEmail = ({ user }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { sendEmail, updateEmailVerificationTimestamp } = authContext;

  var name = user.name !== null ? user.name : "friend";
  var email = user.email !== null ? user.email : "registered email";
  var id = user.id !== null && user.id;
  var email_hash =
    user.email_verification_hash !== null && user.email_verification_hash;

  const fullVerificationString = email_hash + "|" + id;
  const verificationUrl = `${keys.SERVER}/verifyemail/${fullVerificationString}`;

  // Email sent toast
  const emailSentToast = () =>
    toast("Email has been resent", {
      draggablePercent: 60,
      position: "top-center",
    });

  // User logged in message toast
  const userLoggedInToast = () =>
    toast(`${greeting}, ${name}! You are logged in as ${email}`, {
      draggablePercent: 60,
      position: "top-center",
    });

  useEffect(() => {
    sendEmail(name, email, verificationUrl);
    userLoggedInToast();
  }, []);

  return (
    <div className="font-axiforma text-center text-brand-gray">
      <h2 className="font-semibold text-3xl tracking-wide mb-4">
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
        {greeting}, <span className="font-semibold text-blue-600">{name}</span>.
        Thank you for signing up! You are now logged in as{" "}
        <span className="font-semibold text-blue-600">{email}</span>.
      </p>
      <br />
      <p className="text-base">
        Please verify your email using the link that was just sent to{" "}
        <span className="font-semibold text-blue-600">{email}</span>. The link
        is valid for 24 hours only.
      </p>
      <br />

      <p className="text-xs mb-2">Want to verify later?</p>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="font-semibold text-sm text-white p-3 rounded-md bg-blue-500
        uppercase mb-4 focus:outline-none"
        onClick={() => {
          user !== null &&
            router.push(`/ads/${user.apartment_name}/${user.apartment_id}`);
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
