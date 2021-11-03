import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { useRouter } from "next/router";
import keys from "../utils/keys";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import PostAdHeadLayout from "../components/layout/head/PostAdHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Categories from "../components/page_components/post_ad/Categories";
import LetsVerifyYourEmail from "../components/page_components/post_ad/LetsVerifyYourEmail";
import AdQuotaReached from "../components/page_components/post_ad/AdQuotaReached";

const PostAd = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);

  const { loadUser, isAuthenticated, user, authError, logout } = authContext;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  useEffect(() => {
    if (authError && authError === "Session Expired") {
      sessionExpiredToast();
      setTimeout(() => {
        logout();
      }, 2000);
    }
  }, [authError]);

  if (typeof window !== "undefined" && !localStorage.getItem("nddToken")) {
    // Save the url (/postad) for redirect after login
    props.pathHistory.current = pathname;
    if (process.browser) {
      router.push("/login");
    }

    return <div></div>;
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated]);

  if (user && !user.email_verified) {
    return (
      <PostAdHeadLayout>
        <LetsVerifyYourEmail message="post an ad" />;
      </PostAdHeadLayout>
    );
  } else if (user && user.ad_count === keys.AD_QUOTA) {
    setTimeout(() => router.push("/account/ads"), 5000);
    return (
      <PostAdHeadLayout>
        <AdQuotaReached />;
      </PostAdHeadLayout>
    );
  } else {
    return (
      <PostAdHeadLayout>
        <div id="header">
          <Navbar
            navStyle={navStylePurple}
            chatNotification={props.chatNotification}
          />
          <div className="w-full bg-post-ad-mobile-background lg:bg-post-ad-background bg-cover bg-no-repeat h-100 px-5 text-center">
            {user && (
              <span className="flex justify-center items-center h-80 text-2xl md:text-3xl text-brand-purple font-semibold leading-10">
                Post your ad in {user.apartment_name}
              </span>
            )}
          </div>
          <Categories />
        </div>
        <div>
          <Footer
            footerGradientClass={footerGradientClassPurple}
            pathname={pathname}
          />
        </div>
      </PostAdHeadLayout>
    );
  }
};

export default PostAd;
