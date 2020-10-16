import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Link from "next/link";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Popup from "reactjs-popup";

const VerifyEmail = ({ user }) => {
  const authContext = useContext(AuthContext);

  const { sendEmail, updateEmailVerificationTimestamp } = authContext;
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  var name = user.name !== null ? user.name : "friend";
  var email = user.email !== null ? user.email : "registered email";
  var id = user.id !== null && user.id;
  var email_hash =
    user.email_verification_hash !== null && user.email_verification_hash;

  const fullVerificationString = email_hash + "|" + id;
  const verificationUrl = `http://localhost:3000/verifyemail/${fullVerificationString}`;

  useEffect(() => {
    sendEmail(name, email, verificationUrl);
  }, []);

  return (
    <div
      className={`"font-axiforma text-center " ${open ? "opacity-25" : null} `}
    >
      <h2 className="font-bold text-3xl text-brand-gray tracking-wide mb-4">
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

      <p className="text-base text-gray-600">
        Hello, <span className="font-bold text-blue-600">{name}</span>. Thank
        you for signing up!
      </p>
      <br />
      <p className="text-base text-gray-600">
        Please verify your email using the link that was just sent to{" "}
        <span className="font-bold text-blue-600">{email}</span>. The link is
        valid for 24 hours only.
      </p>
      <br />

      <p className="text-xs text-gray-600 mb-2">Want to verify later?</p>
      <motion.button
        whileTap={{
          backgroundColor: "#4C51BF",
          y: "2px",
          boxShadow: "0px 8px 15px rgba(144, 181, 218, 0.15)",
        }}
        className="font-semibold text-sm text-white p-3 rounded-md bg-blue-500 
        uppercase mb-4 focus:outline-none"
        onClick={() => {
          user !== null && Router.push(`/ads/${user.apartment_name}`);
        }}
      >
        Continue to site
      </motion.button>

      <p className="text-xs text-gray-600">
        <FontAwesomeIcon icon={faInfoCircle} /> Please note that you will not be
        able to post ad's without verifying your email.
      </p>
      <br />

      <p className="text-sm text-center  text-gray-600">
        Didn't receive our email?{" "}
        <span className="text-blue-600">
          <Link href="">
            <a
              onClick={(e) => {
                e.preventDefault();
                updateEmailVerificationTimestamp(user.id);
                sendEmail(name, email, verificationUrl);
                setOpen((o) => !o);
              }}
            >
              Resend email
            </a>
          </Link>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="font-axiforma text-brand-gray text-sm bg-gray-300 opacity-90 flex justify-center items-center p-6 tracking-wide rounded-md">
              The email has been resent to&nbsp;
              <span className="font-semibold text-blue-500"> {email}</span>
              <div class="inline absolute top-0 right-0 mr-2 mt-1">
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faWindowClose}
                  onClick={() => {
                    closeModal();
                  }}
                />
              </div>
            </div>
          </Popup>
        </span>
      </p>
    </div>
  );
};

export default VerifyEmail;
