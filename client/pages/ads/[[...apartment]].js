import React, { useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";
import "../../utils/keys";
import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import AdsHeadLayout from "../../components/layout/AdsHeadLayout";
import Navbar from "../../components/layout/Navbar";
// import Tab from "../../components/utils/Tab";
import BrowseAds from "../../components/utils/BrowseAds";
import NoAdsForNeighbourhood from "../../components/utils/NoAdsForNeighbourhood";
import Footer from "../../components/layout/Footer";

// const adTabs = [
//   { label: "Browse Ads", value: 0 },
//   { label: "AYN", value: 1 },
// ];

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

const Ads = (props) => {
  const siteContext = useContext(SiteContext);
  const {
    apartmentData,
    getNeighbourhoodFromId,
    fetchAdsForNbh,
    adsDataNbh,
  } = siteContext;

  const router = useRouter();
  const pathname = router.pathname;

  const apartmentName = props.data[0];
  const apartmentId = props.data[1];

  const numOfAds = props.adsList.length;

  useEffect(() => {
    // Reset the global showForm prop so that the edit ad page is not displayed
    props.setShowForm(true);

    getNeighbourhoodFromId(apartmentId);
    fetchAdsForNbh(apartmentId);
  }, []);

  useEffect(() => {
    if (apartmentData === null) {
      router.push("/404");
    }

    if (apartmentData) {
      if (apartmentData.name !== apartmentName) {
        router.push("/404");
      }
    }
  }, [apartmentData]);

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <AdsHeadLayout>
      <div>
        <div className="bg-ads-mobile-background md:bg-ads-tablet-background lg:bg-ads-background h-100 md:h-128 font-axiforma w-full lg:rounded-none lg:h-100  bg-cover bg-no-repeat text-center">
          <Navbar navStyle={navStylePurple} />
          <div className="flex flex-col items-center pt-14 md:pt-24">
            <h1 className="text-2xl md:text-3xl text-brand-purple font-semibold px-5 py-7 text-center">
              Personal Marketplace for&nbsp;
              <span className="text-brand-purple">{apartmentName}</span>
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
          {/* <Tab
            route={pathname}
            tabs={adTabs}
            nbhId={apartmentId}
            numOfAds={numOfAds}
          /> */}

          {numOfAds === 0 ? (
            <NoAdsForNeighbourhood />
          ) : (
            <BrowseAds nbhId={apartmentId} />
          )}
        </div>
        <div className="mt-10">
          <Footer footerGradientClass={footerGradientClassPurple} />
        </div>
      </div>
    </AdsHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { apartment } = context.query;
  const res = await axios.get(
    `${process.env.API_URL}/nbhads/get/${apartment[1]}`
  );

  return {
    props: {
      data: apartment && apartment,
      adsList: res && res.data,
    },
  };
};

export default Ads;
