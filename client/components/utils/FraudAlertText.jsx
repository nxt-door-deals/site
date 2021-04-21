import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faTimes, faMask } from "@fortawesome/free-solid-svg-icons";

const FraudAlertText = (props) => {
  return (
    <div className="text-sm p-10 relative">
      <FontAwesomeIcon
        icon={faTimes}
        className="absolute top-3 right-6 text-lg cursor-pointer"
        onClick={() => props.setIsModalOpen(false)}
      />
      <span className="invisible lg:visible absolute text-xs top-8 right-4 text-gray-500">
        ESC
      </span>
      <h2 className="component-heading">
        Beware of fraudsters{" "}
        <FontAwesomeIcon icon={faMask} className="align-middle" />
      </h2>
      <p>
        While our platform aims at facilitating buying and selling between
        residents of your apartment, there are many fraudsters out there looking
        to break in and make big bucks at your expense. Here are a few red flags
        to watch out for...
      </p>
      <ul className="mt-7">
        <li className="pb-3">
          <FontAwesomeIcon icon={faFlag} className="text-red-800 mr-1" />
          If someone contacts you saying that they are willing to purchase an{" "}
          <span className="underline">expensive</span> item without even seeing
          it physically, that's a big red flag.
        </li>
        <li className="pb-3">
          <FontAwesomeIcon icon={faFlag} className="text-red-800 mr-1" /> If a
          buyer is willing to pay you a substantial token amount by sending you
          a payment link or QR code, that's a bigger red flag.
        </li>
        <li className="pb-3">
          <FontAwesomeIcon icon={faFlag} className="text-red-800 mr-1" /> As a
          rule of thumb <span className="font-semibold underline">never</span>{" "}
          enter your UPI PIN or scan any QR code to receive a payment. Scammers
          share payment links or QR codes to debit money from your account.
          Never share an OTP with anyone either.
        </li>
        <li className="pb-3">
          <FontAwesomeIcon icon={faFlag} className="text-red-800 mr-1" />{" "}
          Fraudsters try very hard to portray themselves as trustworthy by
          claiming to be a part of an honourable profession like a doctor or
          retired military personnel. Do not fall for it.
        </li>
        <li className="pb-3">
          <FontAwesomeIcon icon={faFlag} className="text-red-800 mr-1" />{" "}
          Fraudsters work in teams. Usually, you will get contacted by more than
          one of them to make you feel that your item is in demand. More often,
          one of them will be willing to pay you more than the price of your
          item.
        </li>
        <li>
          <FontAwesomeIcon icon={faFlag} className="text-red-800 mr-1" /> Even
          if someone quotes a correct flat number from one of the blocks in your
          apartment complex, do not accept any payment unless you meet the buyer
          in person.
        </li>
      </ul>
      <p className="mt-10 text-center text-blue-800">
        <span className="text-brand-gray">
          For more information, please read our
        </span>{" "}
        <Link href="/guidelines/#seller">
          <a className="underline styled-link cursor-pointer">
            seller guidelines
          </a>
        </Link>
        .
      </p>
    </div>
  );
};

export default FraudAlertText;
