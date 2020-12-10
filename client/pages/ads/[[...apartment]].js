import React, { useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

// Component imports
import AdsHeadLayout from "../../components/layout/AdsHeadLayout";
import Navbar from "../../components/layout/Navbar";
import Tab from "../../components/utils/Tab";
import Footer from "../../components/layout/Footer";

const variants = {
  hover: {
    backgroundColor: "#550052",
    color: "#EDE9FE",
  },
  tap: {
    y: "2px",
    backgroundColor: "#902393",
    color: "#EDE9FE",
  },
};

const footerGradientClass = "from-footer-gradient-from to-footer-gradient-to";

const Ads = (props) => {
  const siteContext = useContext(SiteContext);
  const { apartmentData, getNeighbourhoodFromId } = siteContext;

  const router = useRouter();

  useEffect(() => {
    getNeighbourhoodFromId(props.apartmentId);
  }, []);

  useEffect(() => {
    if (apartmentData === null) {
      router.push("/404");
    }

    if (apartmentData) {
      if (apartmentData.name !== props.apartmentName) {
        router.push("/404");
      }
    }
  }, [apartmentData]);

  // Custom navbar tailwind styles
  const navStyle = {
    navBgColor: "lg:bg-purple-200",
    navOverlayBgColor: "bg-purple-200",
    navTextColor: "text-purple-100",
    navOverlayTextColor: "text-brand-purple",
    hrTextColor: "brand-purple",
    navShadow: "lg:shadow-navshadow",
    faIconTextcolor: "text-white",
    pathname: props.route,
  };

  return (
    <AdsHeadLayout>
      <div>
        <div className="bg-ads-mobile-background md:bg-ads-tablet-background lg:bg-ads-background h-100 md:h-128 font-axiforma w-full lg:rounded-none lg:h-100  bg-cover bg-no-repeat text-center">
          <Navbar navStyle={navStyle} />
          <div className="flex flex-col items-center pt-14 md:pt-24">
            <h1 className="text-2xl md:text-3xl text-white font-semibold px-5 py-7 text-center">
              Personal Marketplace for&nbsp;
              <span className="text-white">{props.apartmentName}</span>
            </h1>
            <div>
              <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => router.push("/postad")}
                className="uppercase text-purple-100 font-semibold bg-ad-purple rounded-full shadow-xl focus:outline-none px-10 py-3 text-lg"
              >
                Post Ad
              </motion.button>
            </div>
          </div>
        </div>
        <div>
          <Tab nbhId={props.apartmentId} variants={variants} />
        </div>
        <div className="mt-10">
          <Footer footerGradientClass={footerGradientClass} />
        </div>
      </div>
    </AdsHeadLayout>
  );
};

Ads.getInitialProps = ({ query, pathname }) => {
  const { apartment } = query;
  return {
    route: pathname,
    apartmentName: apartment[0],
    apartmentId: apartment[1],
  };
};

export default Ads;
