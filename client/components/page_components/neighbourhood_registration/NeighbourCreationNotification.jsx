import React, { useEffect } from "react";
import Image from "next/image";
import { neighbourhoodWelcome } from "../../../utils/siteImages";

const NeighbourCreationNotification = (props) => {
  useEffect(() => window.scroll({ top: 0, left: 0, behavior: "smooth" }), []);

  return (
    <div className="h-full pt-20 lg:pt-24">
      <div className="flex flex-col items-center px-8 lg:px-16 mb-16">
        <div className="mb-10">
          <Image
            src={neighbourhoodWelcome}
            alt="Neighbourhood"
            height={350}
            width={350}
          />
        </div>
        <div className="lg:text-center px-5 lg:px-32">
          <p className="text-center mb-4 text-lg">
            Welcome to{" "}
            <span className="text-brand-purple font-semibold">
              nxtdoordeals.com
            </span>
            !
          </p>
          <p className="mb-4">
            Thank you for choosing to register your apartment with us. We will
            send you an email on{" "}
            <span className="text-blue-600 font-semibold">{props.email}</span>{" "}
            once your apartment has been verified.
          </p>
          <p className="mb-4">
            You are just one step away from creating your user account and
            posting ads in your apartment.
          </p>
          <p className="text-center text-lg font-semibold">YAAY!!!</p>
        </div>
      </div>
    </div>
  );
};

export default NeighbourCreationNotification;
