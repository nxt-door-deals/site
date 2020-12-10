import React from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

// Component imports
import PostAdHeadLayout from "../components/layout/PostAdHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Categories from "../components/utils/Categories";

var cookie = new Cookies();

const postad = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

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
        <Navbar navStyle={navStyle} />
        <div className="w-full bg-post-ad-mobile-background md:bg-post-ad-background bg-cover bg-no-repeat h-100"></div>
        <Categories />
      </div>
      <div>
        <Footer footerGradientClass={footerGradientClass} />
      </div>
    </PostAdHeadLayout>
  );
};

export default postad;
