import React from "react";
import { useRouter } from "next/router";

// Component Imports
import SubscriptionHeadLayout from "../components/layout/SubscriptionHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SubscriptionStatus from "../components/forms/SubscriptionStatus";

const Subscription = () => {
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

  return (
    <SubscriptionHeadLayout>
      <Navbar navStyle={navStyle} />
      <div className="h-full w-full pt-36 lg:pt-36 pb-20 flex justify-center items-center bg-reported-ad-background bg-cover bg-no-repeat">
        <SubscriptionStatus />
      </div>

      <div>
        <Footer footerGradientClass={footerGradientClass} />
      </div>
    </SubscriptionHeadLayout>
  );
};

export default Subscription;
