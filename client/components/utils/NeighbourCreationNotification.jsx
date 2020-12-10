import React from "react";

const NeighbourCreationNotification = (props) => {
  return (
    <div className="h-full font-axiforma pt-16">
      <div className="flex flex-col items-center px-8 lg:px-16 mb-16">
        <div className="mb-10">
          <img
            src="/images/neighbourhood/neighbourhood.svg"
            alt="neighbourhood"
            height="350px"
            width="350px"
          />
        </div>
        <div className="text-center">
          <p className="mb-4">
            Welcome to{" "}
            <span className="text-brand-purple font-semibold">
              nxt-doordeals
            </span>
            ! Thank you for choosing to register your neigbourhood with us. You
            will receive an e-mail notification on{" "}
            <span className="text-blue-600 font-semibold">{props.email}</span>{" "}
            once your neighbourhood has been verified.
          </p>
          <p>
            You are just one step away from creating your user account and
            posting ads in your neighbourhood! Yay!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NeighbourCreationNotification;
