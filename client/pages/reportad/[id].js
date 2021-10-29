import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "../../utils/cookieInit";
import keys from "../../utils/keys";
import { sessionExpiredToast } from "../../utils/toasts";

import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import ReportAdHeadLayout from "../../components/layout/head/ReportAdHeadLayout";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import ReportAds from "../../components/forms/ReportAds";

const ReportAd = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);
  const { authError, logout } = authContext;

  const siteContext = useContext(SiteContext);
  const { adError } = siteContext;

  useEffect(() => {
    if (adError && adError === "Session Expired") {
      sessionExpiredToast();
      logout();
      router.push("/login");
    }
  }, [authError]);

  if (!cookie.get("__adCookie")) {
    cookie.set(
      "__adCookie",
      { _id: props.id },
      {
        domain: keys.DOMAIN,
        path: "/",
        sameSite: keys.SAME_SITE_COOKIE_SETTING,
        secure: keys.SECURE_COOKIE,
      }
    );
  }

  if (typeof window !== "undefined" && !localStorage.getItem("nddToken")) {
    // Save the url (/postad) for redirect after login
    props.pathHistory.current = pathname;
    if (process.browser) {
      router.push("/login");
    }

    return <div></div>;
  }

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <ReportAdHeadLayout adId={props.id}>
      <Navbar navStyle={navStylePurple} />
      <div id="header">
        <div className="h-full pt-28 lg:pt-36 pb-20 flex flex-col items-center justify-center bg-reported-ad-background bg-cover bg-no-repeat">
          <ReportAds
            adId={props.id}
            modifiedId={props.modifiedId}
            apartmentName={props.apartmentName}
            apartmentId={props.apartmentId}
            title={props.title}
            adOwnerEmail={props.adOwnerEmail}
          />
        </div>
      </div>

      <div>
        <Footer
          footerGradientClass={footerGradientClassPurple}
          pathname={pathname}
        />
      </div>
    </ReportAdHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ads/${id}`);

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      modifiedId: res.data.modified_id,
      apartmentName: res.data.apartment_name,
      apartmentId: res.data.apartment_id,
      id: id,
      title: res.data.title,
      adOwnerEmail: res.data.posted_by_email,
    },
  };
};

export default ReportAd;
