import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { navStyleBlue, footerGradientClassBlue } from "../../../utils/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

// Component imports
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";

const CovidGuidelinesText = () => {
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    setTimeout(() => {
      window.scroll({ top: 1, left: 0, behavior: "smooth" });
    }, 500);
  }, []);

  navStyleBlue["hrStyle"] = "border-blue-800 bg-blue-800 border-dotted";
  navStyleBlue["navBgColor"] = "lg:bg-indigo-100";
  navStyleBlue["navOverlayBgColor"] = "bg-indigo-100";
  navStyleBlue["pathname"] = pathname;
  return (
    <div>
      <div className="bg-covid-background-mobile lg:bg-covid-background h-100 md:h-128 w-full lg:rounded-none lg:h-100  bg-cover bg-no-repeat text-center">
        <Navbar navStyle={navStyleBlue} />
      </div>
      <div className="text-brand-gray px-5 lg:px-40 pt-10 mb-20">
        <h1 className="component-heading">COVID 19 Guidelines</h1>
        <div className="my-10">
          <p className="pb-10">
            We are amid a global pandemic. While life goes on, this is no time
            to let our guard down. We want you to be safe. Follow these simple
            guidelines to stay safe and keep your neighbours and loved ones safe
            as well.
          </p>
          <ul>
            <li className="pb-3">
              😷 <span className="font-semibold">Always wear a mask</span>. We
              cannot stress this enough! For everyone's safety, please wear a
              mask that covers your nose and mouth. Hanging it around your neck
              or below the chin is as bad as not wearing one!
            </li>
            <li className="pb-3">
              🙏🏼 Handshakes can wait a little longer. A warm Namaste will do for
              now!
            </li>
            <li className="pb-3">
              🦠 Be aware of the COVID 19 situation in your apartment. Keep up
              with any notifications sent by your apartment association or
              office bearers about the current scenario in your apartment
              premises.
            </li>
            <li className="pb-3">
              💉 Tread with caution even if all concerned parties have been
              fully vaccinated
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Tips for Buyers:</h2>
          <ul className="pt-5">
            <li className="pb-3">
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-800"
              />{" "}
              Do not meet the seller if you or a family member have any COVID 19
              like symptoms. Explain the situation to the seller and request
              them to hold the item for you or have a friend collect it instead.
            </li>
            <li className="pb-3">
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-800"
              />{" "}
              Keep your mask on when meeting the seller. Maintain social
              distancing.
            </li>
            <li className="pb-3">
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-800"
              />{" "}
              Do not take children along when collecting your purchase.
            </li>
            <li>
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-800"
              />{" "}
              Always carry your gloves/sanitiser/sanitiser spray when collecting
              your purchase. Sanitize your purchases before taking them home
              even if the seller indicates that they have been sanitized
              previously. Being doubly careful does not hurt.
            </li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Tips for Sellers:</h2>
          <ul className="pt-5">
            <li className="pb-3">
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-600"
              />{" "}
              When meeting a buyer in your home or a common area, make sure that
              both of you have your masks on. Maintain social distancing.
            </li>
            <li className="pb-3">
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-600"
              />{" "}
              Do not meet a buyer if you or a family member have any COVID 19
              like symptoms. Keep the item on hold if you have already agreed
              upon the sale. Do not have a family member or a friend deliver it
              on your behalf either.
            </li>
            <li className="pb-3">
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-600"
              />{" "}
              Listing items like PPE kits, sanitisers, COVID 19 related test
              equipment or medication for sale or giveaway is strictly
              prohibited.
            </li>
            <li>
              <FontAwesomeIcon
                icon={faVirus}
                className="text-lg text-blue-600"
              />{" "}
              Try to sanitize the item before handing it over. Using a sanitiser
              spray followed by a simple wipe down should suffice.
            </li>
          </ul>
        </div>
      </div>

      <Footer
        footerGradientClass={footerGradientClassBlue}
        pathname={pathname}
      />
    </div>
  );
};

export default CovidGuidelinesText;
