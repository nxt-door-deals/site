import React from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import PostAdHeadLayout from "../components/layout/PostAdHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Categories from "../components/utils/Categories";

var cookie = new Cookies();

const PostAd = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

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
