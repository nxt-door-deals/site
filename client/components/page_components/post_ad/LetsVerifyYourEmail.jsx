import React, { useEffect, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import { useRouter } from "next/router";
import keys from "../../../utils/keys";
import { toast } from "react-toastify";

const LetsVerifyYourEmail = (props) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { user, sendEmail, emailSent } = authContext;

  useEffect(() => {
    if (emailSent)
      setTimeout(() => {
        router.push("/");
      }, 5000);
  }, [emailSent]);

  const verificationUrl =
    user &&
    `${keys.SERVER}/verifyemail/${user.email_verification_hash}|${user.id}`;

  const emailVerificationToast = () =>
    toast(`Verification link sent to ${user && user.email}`, {
      draggablePercent: 60,
      position: "top-center",
    });

  return (
    <div className="text-brand-gray bg-gradient-to-b from-purple-50 to-white">
      <div className="flex flex-col justify-center items-center h-screen px-5">
        <h1 className="component-heading">
          Please verify your email to {props.message}.
        </h1>
        {/* <h2 className="flex text-2xl my-5">Redirecting you shortly.</h2>

        <p className="flex text-2xl mb-5">Hang tight</p>

        <Image
          height={300}
          width={300}
          src={"/images/email/verify-email.svg"}
          alt={"Verify Email"}
        /> */}

        <button
          onClick={() => {
            sendEmail(user && user.name, user && user.email, verificationUrl);
            setTimeout(() => emailVerificationToast(), 500);
          }}
          className="my-8 w-72 h-12 bg-purple-700 shadow-buttonShadowPurple text-white font-bold rounded-xl uppercase tracking-wide focus:outline-none"
        >
          Resend Verification Email
        </button>

        <div className="flex items-center mt-8">
          <p className="mr-2">Already verified?</p>
          <button
            onClick={() => {
              router.reload("/");
            }}
            className="w-36 h-12 bg-ad-purple shadow-buttonShadowPurple text-white font-bold rounded-xl uppercase tracking-wide text-sm focus:outline-none"
          >
            Post A Free Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetsVerifyYourEmail;
