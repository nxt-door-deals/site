import React, { useContext, useEffect } from "react";
import Image from "next/image";
import AuthContext from "../context/auth/authContext";
import Cookies from "universal-cookie";

// Component imports
import GoodbyeHeadLayout from "../components/layout/GoodbyeHeadLayout";

var cookie = new Cookies();

const Goodbye = () => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  useEffect(() => {
    if (cookie.get("nddToken")) {
      logout();
    }
  }, []);

  return (
    <GoodbyeHeadLayout>
      <div className="font-axiforma text-brand-gray border-4 border-purple-500 h-screen">
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
        </div>
      </div>
    </GoodbyeHeadLayout>
  );
};

export default Goodbye;