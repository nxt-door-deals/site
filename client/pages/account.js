import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UserAccountHeadLayout from "../components/layout/UserAccountHeadLayout";
import Tab from "../components/utils/Tab";

var cookie = new Cookies();

const Account = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);
  const { loadUser, user, fetchUserAds, userAds } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user) fetchUserAds(user.id);
  }, [user]);

  (navStylePurple["navTextColor"] = "text-brand-purple"),
    (navStylePurple["pathname"] = pathname);

  const userAccountTabs = [
    { label: "My Profile", value: 0 },
    { label: "My Ads", value: 1 },
    { label: "My Chats", value: 2 },
  ];

  if (!cookie.get("nddToken")) {
    // Save the url (/account) for redirect after login
    props.pathHistory.current = props.pathname;
    if (process.browser) {
      router.push("/login");
    }

    return <div></div>;
  }

  return (
    <UserAccountHeadLayout>
      <div className="h-full font-axiforma">
        <Navbar navStyle={navStylePurple} />
        <div className="w-full bg-user-account-mobile-background md:bg-user-account-background bg-cover bg-no-repeat h-80"></div>
        {/* Container */}
        <div className="mt-6 mb-10">
          {user && (
            <Tab
              route={props.pathname}
              tabs={userAccountTabs}
              currentUser={user && user}
              ads={userAds && userAds}
              showForm={props.showForm}
              setShowForm={props.setShowForm}
            />
          )}
        </div>

        <div>
          <Footer footerGradientClass={footerGradientClassPurple} />
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
