import React, { useContext, useEffect, useRef } from "react";
import SiteContext from "../../../context/site/siteContext";
import AuthContext from "../../../context/auth/authContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";
import "../../../utils/keys";
import {
  navStylePurple,
  footerGradientClassPurple,
} from "../../../utils/styles";
import Cookies from "universal-cookie";

// Component imports
import MarketplaceHeadLayout from "../../../components/layout/head/MarketplaceHeadLayout";
import Navbar from "../../../components/layout/Navbar";
// import Tab from "../../components/utils/Tab";
import BrowseAds from "../../../components/page_components/browse_ads/BrowseAds";
import NoAdsForNeighbourhood from "../../../components/page_components/browse_ads/NoAdsForNeighbourhood";
import Footer from "../../../components/layout/Footer";

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
  const headerRef = useRef(null);

  const siteContext = useContext(SiteContext);
  const { adError, authError } = siteContext;

  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  const router = useRouter();
  const pathname = router.pathname;

  const apartmentName = props.aptName;
  const apartmentId = parseInt(props.aptId);

  const numOfAds = props.adsList.length;

  useEffect(() => {
    if (
      (adError && adError === "Session Expired") ||
      (authError && authError === "Session Expired")
    ) {
      sessionExpiredToast();
      logout();
      router.push("/login");
    }
  }, [adError]);

  // useEffect(() => {
  //   let mounted = true;

  //   if (mounted) {
  //     // Reset the global showForm prop so that the edit ad page is not displayed
  //     props.setShowForm(true);

  //     getNeighbourhoodFromId(apartmentId);
  //     fetchAdsForNbh(apartmentId);
  //   }

  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  // useEffect(() => {
  //   if (apartmentData === null) {
  //     router.push("/404");
  //   }

  //   if (apartmentData) {
  //     if (apartmentData.name !== apartmentName) {
  //       router.push("/404");
  //     }
  //   }
  // }, [apartmentData]);

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <MarketplaceHeadLayout aptId={apartmentId} aptName={apartmentName}>
      <div id="header" ref={headerRef}>
        <div className="bg-ads-mobile-background md:bg-ads-tablet-background lg:bg-ads-background h-88 md:h-128 w-full lg:rounded-none lg:h-100  bg-cover bg-no-repeat text-center">
          <Navbar
            navStyle={navStylePurple}
            chatNotification={props.chatNotification}
          />
          <div className="flex flex-col items-center pt-14 md:pt-32 lg:pt-24">
            <h1 className="text-2xl md:text-3xl leading-9 text-brand-purple font-semibold px-5 py-7 text-center">
              Personal Marketplace for&nbsp;
              <span className="text-brand-purple">{apartmentName}</span>
            </h1>
            <div>
              <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => router.push("/postad")}
                className="uppercase text-purple-100 font-semibold bg-ad-purple rounded-full shadow-giveawayButtonShadow focus:outline-none px-10 py-3 text-lg"
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
            <BrowseAds
              nbhId={apartmentId}
              chatNotification={props.chatNotification}
              notificationDisplayed={props.notificationDisplayed}
            />
          )}
        </div>
        <div className="mt-10">
          <Footer
            footerGradientClass={footerGradientClassPurple}
            pathname={pathname}
          />
        </div>
      </div>
    </MarketplaceHeadLayout>
  );
};

// export const getStaticPaths = async () => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/apartments/all`);

//   const apartments = res.data;

//   const paths = apartments.map((apt) => {
//     return {
//       params: { id: apt.id.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const apartmentId = id;

  const nbhAds = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/nbhads/get/${apartmentId}`
  );

  const aptName = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/apartments/${apartmentId}`
  );

  if (!nbhAds.data || !aptName.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      aptName: aptName && aptName.data.name,
      aptId: apartmentId,
      adsList: (nbhAds && nbhAds.data) || [],
    },
  };
};

export default Ads;
