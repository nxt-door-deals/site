import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { useRouter } from "next/router";
import cookie from "../utils/cookieInit";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import PostAdHeadLayout from "../components/layout/PostAdHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Categories from "../components/utils/Categories";
import LetsVerifyYourEmail from "../components/utils/LetsVerifyYourEmail";

const PostAd = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);

  const { loadUser, isAuthenticated, user } = authContext;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  if (!cookie.get("nddToken")) {
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
  }, []);

  if (user && !user.email_verified) {
    setTimeout(() => router.push("/account"), 3000);
    return (
      <PostAdHeadLayout>
        <LetsVerifyYourEmail message="post an ad" />;
      </PostAdHeadLayout>
    );
  }

  return (
    <PostAdHeadLayout>
      <div className="h-full font-axiforma">
        <Navbar navStyle={navStylePurple} />
        <div className="w-full bg-post-ad-mobile-background md:bg-post-ad-background bg-cover bg-no-repeat h-100"></div>
        <Categories />
      </div>
      <div>
        <Footer footerGradientClass={footerGradientClassPurple} />
      </div>
    </PostAdHeadLayout>
  );
};

export default PostAd;
