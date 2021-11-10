import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import AuthContext from "../../../context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import keys from "../../../utils/keys";
import { welcome } from "../../../utils/siteImages";

import { greeting } from "../../../utils/greeting";

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
  const [emailSentCount, setEmailSentCount] = useState(0);

  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { sendEmail, updateEmailVerificationTimestamp } = authContext;

  var name = user && user ? user.name : "friend";
  var email = user && user ? user.email : "registered email";
  var id = user && user && user.id;
  var email_hash = user && user && user.email_verification_hash;

  const fullVerificationString = email_hash + "|" + id;
  const verificationUrl = `${keys.SERVER}/verifyemail/${fullVerificationString}`;

  // Email sent toast
  const emailSentToast = () =>
    toast("Email has been resent", {
      draggablePercent: 60,
      position: "top-center",
    });

  // Block verification email
  const emailBlockToast = () => {
    let message = `Too many attempts!! 😵
  Please try again after sometime`;

    toast(message, {
      draggablePercent: 60,
      position: "top-center",
    });
  };

  // User logged in message toast
  const userLoggedInToast = () =>
    toast(`${greeting}, ${name}!`, {
      draggablePercent: 60,
      position: "top-center",
    });

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    sendEmail(name, email, verificationUrl);
    userLoggedInToast();
  }, []);

  useEffect(() => {
    if (emailSentCount >= 3) {
      emailBlockToast();
    } else if (emailSentCount > 0 && emailSentCount < 3) {
      updateEmailVerificationTimestamp(currentUser.id);
      sendEmail(
        currentUser && currentUser.name,
        currentUser && currentUser.email,
        verificationUrl
      );
      emailVerificationToast();
    }
  }, [emailSentCount]);

  return (
    <div className="lg:text-center text-brand-gray">
      <h2 className="text-center font-semibold text-3xl tracking-wide mb-4">
        One final step...
      </h2>
      <div className="flex justify-center items-center p-5">
        <Image src={welcome} height={300} width={300} alt="Mailbox" />
      </div>

      <p className="text-lg text-center">
        {greeting}, <span className="font-semibold text-blue-600">{name}</span>.
      </p>
      <br />
      <p>
        Thank you for signing up! You are now logged in as{" "}
        <span className="font-semibold text-blue-600">{email}</span>.
      </p>
      <br />
      <p className="text-base">
        Please verify your email using the link that was just sent to{" "}
        <span className="font-semibold text-blue-600">{email}</span> (remember
        to check your spam folder!). The link is valid for 24 hours only.
      </p>
      <br />

      <p className="text-xs mb-2 text-center">Want to verify later?</p>
      <div className="text-center mb-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="font-semibold text-sm text-white p-3 rounded-md bg-blue-500
        uppercase mb-4 focus:outline-none"
          onClick={() => {
            user !== null &&
              router.push(`/neighbourhood/ads/${user.apartment_id}`);
          }}
        >
          Continue to site
        </motion.button>
      </div>

      <p className="text-xs">
        <FontAwesomeIcon icon={faInfoCircle} /> Please note that you will not be
        able to post ad's or chat with sellers without verifying your email.
      </p>
      <br />

      <p className="text-sm text-center ">
        Didn't receive our email?{" "}
        <span className="text-blue-600">
          <Link href="">
            <a
              className="styled-link "
              onClick={(e) => {
                e.preventDefault();
                setEmailSentCount(emailSentCount + 1);
              }}
            >
              Resend email
            </a>
          </Link>
        </span>
      </p>
    </div>
  );
};

export default VerifyEmail;
