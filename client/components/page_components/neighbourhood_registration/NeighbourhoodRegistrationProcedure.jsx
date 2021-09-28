import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

const NeighbourhoodRegistrationProcedure = () => {
  return (
    <div id="information" className="pb-8 lg:pr-4 lg:pb-0 text-brand-gray pt-6">
      <h2 className="text-xl text-center font-semibold mb-6">
        How does it work?
      </h2>
      <ul>
        <li className="flex items-center pb-3">
          <FontAwesomeIcon
            icon={faHandPointRight}
            className="text-blue-900 text-3xl lg:text-3xl"
          />
          <p className="pl-2 text-sm cursor-default">
            An apartment needs to be registered only once. Anyone can register
            an apartment. It does not matter whether you are an owner or a
            tenant.
          </p>
        </li>
        <li className="flex items-center pb-3">
          <FontAwesomeIcon
            icon={faHandPointRight}
            className="text-blue-800 text-3xl lg:text-3xl"
          />
          <p className="pl-2 text-sm cursor-default">
            Provide an email address that you have access to.{" "}
            <span className="font-semibold text-notification-red">
              The email address provided will ONLY be used to notify you about
              the status of the registration
            </span>
            .
          </p>
        </li>
        <li className="flex items-center pb-3">
          <FontAwesomeIcon
            icon={faHandPointRight}
            className="text-blue-700 text-3xl lg:text-3xl"
          />
          <p className="pl-2 text-sm cursor-default">
            After you register an apartment (for{" "}
            <span className="text-blue-800 font-bold">FREE!</span>), our review
            process kicks off. The review ensures that the apartment is genuine,
            trustworthy and not duplicated.
          </p>
        </li>
        <li className="flex items-center pb-3">
          <FontAwesomeIcon
            icon={faHandPointRight}
            className="text-blue-500 text-3xl lg:text-3xl"
          />
          <p className="pl-2 text-sm cursor-default">
            In case additional details are required to complete verification, we
            will hit you up via email.
          </p>
        </li>
        <li className="flex items-center pb-3">
          <FontAwesomeIcon
            icon={faHandPointRight}
            className="text-blue-400 text-3xl lg:text-3xl"
          />
          <p className="pl-2 text-sm cursor-default">
            You will receive an email once the apartment is successfully
            verified.
          </p>
        </li>
        <li>
          <div className="flex items-center pb-3">
            <FontAwesomeIcon
              icon={faHandPointRight}
              className="text-blue-300 text-3xl lg:text-3xl"
            />
            <p className="pl-2 text-sm cursor-default">
              You and other residents of your apartment can then sign up for a{" "}
              <Link href="/registeruser">
                <a className="hover:underline">
                  <span className="text-blue-800 font-bold">FREE</span> account
                </a>
              </Link>{" "}
              and enjoy all the{" "}
              <Link href="/">
                <a className="text-brand-purple font-semibold hover:underline">
                  nxtdoordeals.com
                </a>
              </Link>{" "}
              awesomeness!
            </p>
          </div>
          <p className="mt-6 cursor-default">
            <span className="font-semibold pr-1 text-blue-800">
              Anonymity guarantee:
            </span>
            Your registration request will forever remain a secret between you
            and us 😇. Other registered members of your apartment will never
            find out who put their apartment on the map (unless you tell them
            over a cup of chai ☕)!
          </p>
        </li>
      </ul>
    </div>
  );
};

export default NeighbourhoodRegistrationProcedure;
