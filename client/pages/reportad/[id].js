import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import Cookies from "universal-cookie";

// Component imports
import ReportAdHeadLayout from "../../components/layout/ReportAdHeadLayout";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import ReportAds from "../../components/forms/ReportAds";

var cookie = new Cookies();

const ReportAd = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  if (!cookie.get("__adCookie")) {
    cookie.set(
      "__adCookie",
      { _id: props.id },
      {
        path: "/",
      }
    );
  }

  if (!cookie.get("nddToken")) {
    // Save the url (/postad) for redirect after login
    props.pathHistory.current = pathname;
    if (process.browser) {
      router.push("/login");
    }

    return <div></div>;
  }

  // Custom navbar tailwind styles
  const navStyle = {
    navBgColor: "lg:bg-purple-200",
    navOverlayBgColor: "bg-purple-200",
    navTextColor: "text-brand-purple",
    navOverlayTextColor: "text-brand-purple",
    hrTextColor: "brand-purple",
    navShadow: "lg:shadow-navshadow",
    faIconTextcolor: "text-white",
    pathname: pathname,
  };

  const footerGradientClass = "from-footer-gradient-from to-footer-gradient-to";

  return (
    <ReportAdHeadLayout>
      <Navbar navStyle={navStyle} />
      <div>
        <div className="h-full w-full pt-36 lg:pt-36 pb-20 flex flex-col items-center justify-center bg-reported-ad-background bg-cover bg-no-repeat">
          <ReportAds adId={props.id} modifiedId={props.data} />
        </div>
      </div>

      <div>
        <Footer footerGradientClass={footerGradientClass} />
      </div>
    </ReportAdHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await axios.get(`${process.env.API_URL}/ads/${id}`);

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: res.data.modified_id,
      id: id,
    },
  };
};

export default ReportAd;
