import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PoliciesHeadLayout from "../components/layout/head/PoliciesHeadLayout";
import TermsAndConditionsText from "../components/page_components/policies/TermsAndConditionsText";
import PrivacyText from "../components/page_components/policies/PrivacyText";
import CookieText from "../components/page_components/policies/CookieText";

const Policies = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;
  return (
    <PoliciesHeadLayout>
      <div
        id="header"
        className="text-brand-gray bg-gradient-to-b from-purple-50 to-white"
      >
        <Navbar navStyle={navStylePurple} />
        <div className="flex flex-col items-center h-full pt-16 lg:pt-28 px-2 lg:px-20 mb-20">
          <section id="terms" className="pt-10">
            <div className="rounded-2xl p-5 lg:p-10 shadow-md bg-white my-10">
              <h1 className="component-heading">Terms of Use</h1>
              <TermsAndConditionsText />
            </div>
          </section>

          <section id="privacy" className="pt-10">
            <div className="rounded-2xl p-5 lg:p-10 shadow-md bg-white my-10">
              <h2 className="component-heading">Privacy Policy</h2>
              <PrivacyText />
            </div>
          </section>

          <section id="cookie" className="pt-10">
            <div className="rounded-2xl p-5 lg:p-10 shadow-md bg-white my-10">
              <h2 className="component-heading">Cookie Policy</h2>
              <CookieText />
            </div>
          </section>
        </div>
        <Footer
          footerGradientClass={footerGradientClassPurple}
          pathname={pathname}
        />
      </div>
    </PoliciesHeadLayout>
  );
};

export default Policies;
