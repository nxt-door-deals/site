import React from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBan } from "@fortawesome/free-solid-svg-icons";

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

const Guidelines = () => {
  const router = useRouter();

  navStylePurple["pathname"] = router.pathname;

  return (
    <GuidelinesHeadLayout>
      <div className="text-brand-gray bg-purple-50">
        <Navbar navStyle={navStylePurple} />
        <div className="flex flex-col items-center h-full pt-28 lg:pt-36 px-5 lg:px-20">
          <section id="buyer">
            <div className="rounded-2xl p-10 shadow-md bg-white mt-10 mb-20">
              <h1 className="font-bold text-3xl text-center tracking-wide mb-10">
                Buyer Guidelines & Responsibilities
              </h1>
              {buyerGuidelines.map((guideline) => {
                return (
                  <div>
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

          <section id="seller">
            <div className="rounded-2xl p-10 shadow-md bg-white mb-20">
              <h1 className="font-bold text-3xl text-center tracking-wide mb-10">
                Seller Guidelines & Responsibilities
              </h1>
              {sellerGuidelines.map((guideline) => {
                return (
                  <div>
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
              <h1 className="font-bold text-3xl text-center tracking-wide mb-10">
                Chat Guidelines
              </h1>
              {chatGuidelines.map((guideline) => {
                return (
                  <div>
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

          <section id="banned">
            <div className="rounded-2xl p-10 shadow-md bg-white mb-20">
              <h1 className="font-bold text-3xl text-center tracking-wide mb-5">
                Items not allowed on{" "}
                <span className="text-brand-purple">nxtdoordeals.com</span>
              </h1>
              <p className="text-sm mb-5">
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
