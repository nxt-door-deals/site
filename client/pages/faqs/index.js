import React from "react";
import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import FAQHeadLayout from "../../components/layout/head/FAQHeadLayout";
import FAQGuidelineList from "../../components/page_components/policies/FAQGuidelineList";

const FAQIndex = () => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <FAQHeadLayout>
      <Navbar navStyle={navStylePurple} />
      <FAQGuidelineList />
      <Footer
        footerGradientClass={footerGradientClassPurple}
        pathname={pathname}
      />
    </FAQHeadLayout>
  );
};

export default FAQIndex;
