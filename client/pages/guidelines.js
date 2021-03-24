import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShoppingCart,
  faCommentDots,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";
import {
  buyerGuidelines,
  sellerGuidelines,
  chatGuidelines,
  bannedItems,
} from "../utils/guidelines";

// Component imports
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GuidelinesHeadLayout from "../components/layout/GuidelinesHeadLayout";
import ScrollToTop from "../components/utils/ScrollToTop";

const Guidelines = () => {
  const [scrollToTop, setScrollToTop] = useState(false);
  const router = useRouter();

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = router.pathname;

  return (
    <GuidelinesHeadLayout>
      <div className="w-full">
        <ScrollToTop
          scrollToTop={scrollToTop}
          setScrollToTop={setScrollToTop}
        />
      </div>

      <div id="header" className="text-brand-gray bg-purple-50">
        <Navbar navStyle={navStylePurple} />
        <div className="flex flex-col items-center h-full pt-28 lg:pt-36 px-5 lg:px-20">
          <section id="buyer">
            <div className="rounded-2xl p-10 shadow-md bg-white mt-10 mb-20">
              <h1 className="component-heading">
                Buyer Guidelines & Responsibilities
              </h1>
              {buyerGuidelines.map((guideline, index) => {
                return (
                  <div key={index}>
                    <p className="pb-2">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="mr-1 text-brand-purple"
                      />{" "}
                      {guideline}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="seller">
            <div className="rounded-2xl p-10 shadow-md bg-white mb-20">
              <h1 className="component-heading">
                Seller Guidelines & Responsibilities
              </h1>
              {sellerGuidelines.map((guideline, index) => {
                return (
                  <div key={index}>
                    <p className="pb-2">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="mr-1 text-brand-purple"
                      />{" "}
                      {guideline}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="chat">
            <div className="rounded-2xl p-10 shadow-md bg-white mb-20">
              <h1 className="component-heading">Chat Guidelines</h1>
              {chatGuidelines.map((guideline, index) => {
                return (
                  <div key={index}>
                    <p className="pb-2">
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        className="mr-1 text-brand-purple"
                      />{" "}
                      {guideline}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="banned">
            <div className="rounded-2xl p-10 shadow-md bg-white mb-20">
              <h1 className="component-heading">
                Ads not allowed on{" "}
                <span className="text-brand-purple">nxtdoordeals.com</span>
              </h1>
              <p className="text-sm mb-6">
                While this list is exhaustive, prohibited ads are not limited to
                just these items. Any ads violating our Terms of Use will be
                removed from the marketplace.
              </p>
              {bannedItems.map((guideline) => {
                return (
                  <div>
                    <p className="pb-2">
                      <FontAwesomeIcon
                        icon={faBan}
                        className="mr-1 text-red-800"
                      />{" "}
                      {guideline}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <Footer footerGradientClass={footerGradientClassPurple} />
      </div>
    </GuidelinesHeadLayout>
  );
};

export default Guidelines;
