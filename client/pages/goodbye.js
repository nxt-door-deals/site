import React, { useContext, useEffect } from "react";
import Image from "next/image";
import AuthContext from "../context/auth/authContext";
import cookie from "../utils/cookieInit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Component imports
import GoodbyeHeadLayout from "../components/layout/head/GoodbyeHeadLayout";

const Goodbye = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("nddToken")) {
        logout();
      }
    }
  }, []);

  return (
    <GoodbyeHeadLayout>
      <div className="font-axiforma text-brand-gray border-4 h-screen bg-purple-50">
        <div className="text-center pt-12 px-8 lg:px-16">
          <Image
            src={"/images/goodbye/sad.svg"}
            alt="Goodbye"
            width={350}
            height={350}
          />
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
    </GoodbyeHeadLayout>
  );
};

export default Goodbye;
