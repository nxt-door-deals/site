import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";

import { sellerFaqs, buyerFaqs, genericFaqs } from "../../utils/faq";

// Component imports
import ScrollToTop from "./ScrollToTop";

const FrequentlyAskedQuestions = (props) => {
  const [faqIndex, setFaqIndex] = useState(null);
  const [scrollToTop, setScrollToTop] = useState(false);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  var faqType = "";

  if (props.type.toLowerCase() === "buyer") {
    faqType = "Buyer";
  } else if (props.type.toLowerCase() === "seller") {
    faqType = "Seller";
  } else if (props.type.toLowerCase() === "generic") {
    faqType = "Generic";
  } else {
    faqType = null;
  }

  return (
    <div className="text-brand-gray px-1">
      <div className="w-full">
        <ScrollToTop
          scrollToTop={scrollToTop}
          setScrollToTop={setScrollToTop}
        />
      </div>
      <h1 className="font-bold text-3xl text-center tracking-wide mb-10">
        {faqType} FAQs
      </h1>

      {/* Seller */}
      {props.type.toLowerCase() === "seller" && (
        <div id="faq-container">
          {sellerFaqs.map((faq, index) => {
            return (
              <div
                key={index}
                className={`relative w-96 lg:w-128 rounded-lg shadow-lg p-5 mb-5 ${
                  faqIndex === index
                    ? "bg-faq-background bg-cover bg-no-repeat"
                    : "bg-gray-50"
                }`}
              >
                <h2
                  className="font-bold my-2"
                  dangerouslySetInnerHTML={{ __html: faq.question }}
                ></h2>
                <p
                  className={`text-sm mt-5 font-medium ${
                    faqIndex === index ? "block" : "hidden"
                  }`}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                >
                  {/* {faq.answer} */}
                </p>

                <div
                  className={`flex justify-center items-center absolute right-2 top-6 ${
                    faqIndex === index ? "bg-red-200 p-1" : null
                  }`}
                >
                  {faqIndex !== index ? (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="cursor-pointer"
                      onClick={() => setFaqIndex(index)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="cursor-pointer"
                      onClick={() => setFaqIndex(null)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Buyer */}
      {props.type.toLowerCase() === "buyer" && (
        <div id="faq-container">
          {buyerFaqs.map((faq, index) => {
            return (
              <div
                key={index}
                className={`relative w-96 lg:w-128 rounded-lg shadow-lg p-5 mb-5 ${
                  faqIndex === index
                    ? "bg-faq-background bg-cover bg-no-repeat"
                    : "bg-gray-50"
                }`}
              >
                <h2
                  className="font-bold my-2"
                  dangerouslySetInnerHTML={{ __html: faq.question }}
                ></h2>
                <p
                  className={`text-sm mt-5 font-medium ${
                    faqIndex === index ? "block" : "hidden"
                  }`}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                ></p>

                <div
                  className={`flex justify-center items-center absolute right-2 top-6 ${
                    faqIndex === index ? "bg-red-200 p-1" : null
                  }`}
                >
                  {faqIndex !== index ? (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="cursor-pointer"
                      onClick={() => setFaqIndex(index)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="cursor-pointer"
                      onClick={() => setFaqIndex(null)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Generic */}
      {props.type.toLowerCase() === "generic" && (
        <div id="faq-container">
          {genericFaqs.map((faq, index) => {
            return (
              <div
                key={index}
                className={`relative w-96 lg:w-128 rounded-lg shadow-lg p-5 mb-5 ${
                  faqIndex === index
                    ? "bg-faq-background bg-cover bg-no-repeat"
                    : "bg-gray-50"
                }`}
              >
                <h2
                  className="font-bold my-2"
                  dangerouslySetInnerHTML={{ __html: faq.question }}
                ></h2>
                <p
                  className={`text-sm mt-5 font-medium ${
                    faqIndex === index ? "block" : "hidden"
                  }`}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                ></p>

                <div
                  className={`flex justify-center items-center absolute right-2 top-6 ${
                    faqIndex === index ? "bg-red-200 p-1" : null
                  }`}
                >
                  {faqIndex !== index ? (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="cursor-pointer"
                      onClick={() => setFaqIndex(index)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="cursor-pointer"
                      onClick={() => setFaqIndex(null)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FrequentlyAskedQuestions;
