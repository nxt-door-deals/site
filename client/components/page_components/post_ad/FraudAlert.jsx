import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

// Component imports
import FraudAlertText from "./FraudAlertText";

Modal.setAppElement("#__next");

const FraudAlert = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mt-2 lg:mt-0">
      <div className="error-text flex">
        <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
        <p
          className="cursor-pointer border-b-4 pb-0 border-pink-500"
          onClick={() => setIsModalOpen(true)}
        >
          Sellers beware!
        </p>
      </div>

      <Modal
        style={{
          overlay: {
            zIndex: 99999,
          },
          content: {
            height: "100vh",
            overflow: "scroll",
          },
        }}
        aria={{
          label: "Fraud alert notification",
        }}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnEsc={true}
        shouldFocusAfterRender={true}
        scrollable={true}
        className="h-full pt-20 pb-10 lg:flex lg:items-center lg:justify-center lg:overflow-hidden lg:pt-0 px-10"
      >
        <div className="border-2 rounded-2xl bg-white">
          <FraudAlertText setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </div>
  );
};

export default FraudAlert;
