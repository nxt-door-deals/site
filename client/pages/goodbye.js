import React, { useContext, useEffect } from "react";
import Image from "next/image";
import AuthContext from "../context/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { footerGradientClassPurple } from "../utils/styles";
import { accountDeletion } from "../utils/siteImages";

// Component imports
import GoodbyeHeadLayout from "../components/layout/head/GoodbyeHeadLayout";
import Footer from "../components/layout/Footer";

const Goodbye = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("nddToken")) {
        logout();
      }
    }
  }, []);

  return (
    <GoodbyeHeadLayout>
      <div className="text-brand-gray bg-gradient-to-b from-purple-50 to-white mb-14">
        <div className="text-center pt-12 px-8 lg:px-16">
          <Image src={accountDeletion} alt="Goodbye" width={350} height={350} />
          <h1 className="text-2xl lg:text-3xl pt-12">
            We're sorry to see you go
          </h1>
          <p className="pt-4">
            Today is a sad day for us. But we respect your decision. If there is
            anything we could have done to keep you on board, please email us on{" "}
            <span className="text-purple-500 font-bold">
              contact@nxtdoordeals.com
            </span>
            .
          </p>
          <p className="pt-4">Thanks again for sharing this journey with us!</p>
          <p className="pt-4">
            We{" "}
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-700 align-middle"
            />{" "}
            you and miss you already 😢.
          </p>
        </div>
      </div>
      <Footer footerGradientClass={footerGradientClassPurple} pathname="/" />
    </GoodbyeHeadLayout>
  );
};

export default Goodbye;
