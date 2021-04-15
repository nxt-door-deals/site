import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
// import UserAccountHeadLayout from "../components/layout/UserAccountHeadLayout";
import Tab from "../components/utils/Tab";
import ScrollToTop from "../components/utils/ScrollToTop";

const UserAccountHeadLayout = dynamic(() =>
  import("../components/layout/UserAccountHeadLayout")
);

const Account = (props) => {
  const [scrollToTop, setScrollToTop] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  useEffect(() => {
    loadUser();
  }, []);

  const userAccountTabs = [
    { label: "Profile", value: 0 },
    { label: "Ads", value: 1 },
    { label: "Chats", value: 2 },
  ];

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("nddToken")) {
      // Save the url (/account) for redirect after login
      props.pathHistory.current = props.pathname;
      if (process.browser) {
        router.push("/login");
      }

      return <div></div>;
    }
  }

  const tabStyle = {
    textColor: "text-ad-purple",
    backgroundColor: "bg-ad-purple",
    borderColor: "border-ad-purple",
  };

  return (
    <UserAccountHeadLayout user={user && user}>
      <div className="w-full">
        <ScrollToTop
          scrollToTop={scrollToTop}
          setScrollToTop={setScrollToTop}
        />
      </div>

      <div id="header" className="h-full">
        <Navbar navStyle={navStylePurple} />
        <div className="w-full bg-user-account-mobile-background md:bg-user-account-background bg-cover bg-no-repeat h-80"></div>
        {/* Container */}
        <div className="mt-6">
          {user && (
            <Tab
              route={props.pathname}
              tabs={userAccountTabs}
              currentUser={user && user}
              showForm={props.showForm}
              setShowForm={props.setShowForm}
              chatNotification={props.chatNotification}
              tabStyle={tabStyle}
            />
          )}
        </div>

        <div>
          <Footer
            footerGradientClass={footerGradientClassPurple}
            pathname={pathname}
          />
        </div>
      </div>
    </UserAccountHeadLayout>
  );
};

export const getServerSideProps = (context) => {
  return {
    props: {
      pathname: context.resolvedUrl,
    },
  };
};

export default Account;
