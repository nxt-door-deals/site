import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PoliciesHeadLayout from "../components/layout/PoliciesHeadLayout";
import TermsAndConditionsText from "../components/utils/TermsAndConditionsText";
import PrivacyText from "../components/utils/PrivacyText";
import CookieText from "../components/utils/CookieText";

const Policies = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = router.pathname;
  return (
    <PoliciesHeadLayout>
      <div className="text-brand-gray bg-purple-50">
        <Navbar navStyle={navStylePurple} />
        <div className="flex flex-col items-center h-full pt-28 lg:pt-36 px-5 lg:px-20 mb-20">
          <section id="terms">
            <div className="rounded-2xl p-10 shadow-md bg-white my-10">
              <h1 className="component-heading">Terms of Use</h1>
              <TermsAndConditionsText />
            </div>
          </section>

          <section id="privacy">
            <div className="rounded-2xl p-10 shadow-md bg-white my-10">
              <h1 className="component-heading">Privacy Policy</h1>
              <PrivacyText />
            </div>
          </section>

          <section id="cookie">
            <div className="rounded-2xl p-10 shadow-md bg-white my-10">
              <h1 className="component-heading">Cookie Policy</h1>
              <CookieText />
            </div>
          </section>
        </div>
        <Footer footerGradientClass={footerGradientClassPurple} />
      </div>
    </PoliciesHeadLayout>
  );
};

export default Policies;
