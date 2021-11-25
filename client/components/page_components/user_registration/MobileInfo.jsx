import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

const MobileInfo = (props) => {
  return (
    <div className="flex justify-center ">
      <div className="relative lg:w-2/3 bg-white p-5 border-2 border-blue-600 rounded-2xl">
        <div
          className="absolute text-lg top-2 right-3 text-brand-gray cursor-pointer"
          onClick={() => props.setMobileModal(false)}
          alt="Close Menu"
        >
          <FontAwesomeIcon icon={faTimes} className="close-button-animation" />
        </div>
        <h3 className="text-center text-2xl font-bold py-5">
          Your mobile number is safe with us!
        </h3>
        <p className="pb-5">
          Providing your mobile number is <span>not mandatory</span> but we{" "}
          <span className="text-blue-800 underline font-semibold">
            highly recommend
          </span>{" "}
          it (especially if you plan to post ads).
        </p>

        <div className="pb-5">
          <p className="pb-1">Mobile numbers will be used only -</p>
          <p className="pl-2">
            <FontAwesomeIcon
              icon={faMobileAlt}
              className="text-blue-600 mr-2"
            />{" "}
            To send password rest tokens/OTP's
          </p>
          <p className="pl-2">
            <FontAwesomeIcon
              icon={faMobileAlt}
              className="text-blue-600 mr-2"
            />{" "}
            Notify sellers when someone expresses an interest in their ad
          </p>
        </div>

        <p className="pb-5">
          Please note that by providing your mobile number, you are consenting
          and opting in to receive the notifications specified above.
        </p>

        <p className="pb-5">
          If you wish to receive all notifications only on your registered email
          address, you need not enter your mobile number during registration.
          You can always update your mobile number in future from your user
          account page.
        </p>

        <p className="text-xs">
          Read our{" "}
          <Link href="/policies#terms">
            <a className="text-blue-800">
              <span className="styled-link pb-1">Terms of Use</span>
            </a>
          </Link>{" "}
          and{" "}
          <Link href="/policies#privacy">
            <a className="text-blue-800">
              <span className="styled-link pb-1">Privacy Policy</span>
            </a>
          </Link>{" "}
          for more details.
        </p>
      </div>
    </div>
  );
};

export default MobileInfo;
