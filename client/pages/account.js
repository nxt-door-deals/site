import React from "react";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

// Component imports
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserAccount from "../components/forms/UserAccount";

var cookie = new Cookies();

const Account = (props) => {
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
    <div>
      <div className="h-full w-full bg-user-account-mobile-background md:bg-user-account-background bg-no-repeat bg-cover">
        <Navbar navStyle={navStyle} />
        {/* Container */}
        <div className="pt-48 pb-20">
          <div className="flex justify-center items-center">
            <div>
              <UserAccount />
            </div>
          </div>
        </div>
        <Footer footerGradientClass={footerGradientClass} />
      </div>
    </div>
  );
};

export default Account;
