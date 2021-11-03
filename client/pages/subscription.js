import React from "react";
import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component Imports
import SubscriptionHeadLayout from "../components/layout/head/SubscriptionHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SubscriptionStatus from "../components/forms/SubscriptionStatus";

const Subscription = () => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <SubscriptionHeadLayout>
      <Navbar navStyle={navStylePurple} />
      <div
        id="header"
        className="h-full w-full pt-36 lg:pt-36 pb-20 flex justify-center items-center bg-gradient-to-b from-purple-200 via-white to-white"
      >
        <SubscriptionStatus />
      </div>

      <div>
        <Footer
          footerGradientClass={footerGradientClassPurple}
          pathname={pathname}
        />
      </div>
    </SubscriptionHeadLayout>
  );
};

export default Subscription;
