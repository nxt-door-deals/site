import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { sessionExpiredToast } from "../../utils/toasts";

import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
// import UserAccountHeadLayout from "../components/layout/UserAccountHeadLayout";
import Tab from "../../components/page_components/common/Tab";

const UserAccountHeadLayout = dynamic(() =>
  import("../../components/layout/head/UserAccountHeadLayout")
);

const Account = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  const authContext = useContext(AuthContext);
  const { loadUser, user, authError, logout } = authContext;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (authError && authError === "Session Expired") {
      sessionExpiredToast();
      logout();
      router.push("/login");
    }
  }, [authError]);

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
      <div id="header" className="h-full">
        <Navbar
          navStyle={navStylePurple}
          chatNotification={props.chatNotification}
        />
        <div className="w-full bg-user-account-mobile-background md:bg-user-account-background bg-cover bg-no-repeat h-80"></div>
        {/* Container */}
        <div className="mt-6">
          {user && (
            <Tab
              route={props.pathname}
              tab={props.tab}
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
  const { tab } = context.params;

  const path = context.resolvedUrl.split("/");

  if (tab !== undefined && tab.length > 1)
    return {
      notFound: true,
    };

  if (
    tab !== undefined &&
    tab[0] !== "profile" &&
    tab[0] !== "ads" &&
    tab[0] !== "chats"
  )
    return {
      notFound: true,
    };

  return {
    props: {
      pathname: "/" + path[1],
      tab: tab !== undefined ? tab[0] : null,
    },
  };
};

export default Account;
