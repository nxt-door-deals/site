import React, { useEffect } from "react";
import Image from "next/image";

const NeighbourCreationNotification = (props) => {
  useEffect(() => window.scroll({ top: 0, left: 0, behavior: "smooth" }), []);

  return (
    <div className="h-full pt-20 lg:pt-32">
      <div className="flex flex-col items-center px-8 lg:px-16 mb-16">
        <div className="mb-10">
          <Image
            src={"/images/neighbourhood/neighbourhood.svg"}
            alt={"neighbourhood"}
            height={350}
            width={350}
          />
        </div>
        <div className="text-center px-5 lg:px-32">
          <p className="mb-4">
            Welcome to{" "}
            <span className="text-brand-purple font-semibold">
              nxtdoordeals.com
            </span>
            !
          </p>
          <p className="mb-4">
            Thank you for choosing to register your neigbourhood with us. We
            will send you an email on{" "}
            <span className="text-blue-600 font-semibold">{props.email}</span>{" "}
            once your neighbourhood has been verified.
          </p>
          <p className="mb-4">
            You are just one step away from creating your user account and
            posting ads in your neighbourhood.
          </p>
          <p>YAAY!!!</p>
        </div>
      </div>
    </div>
  );
};

export default NeighbourCreationNotification;
