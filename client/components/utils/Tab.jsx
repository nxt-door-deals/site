import React, { useState, useEffect } from "react";

// Component imports
import TabManager from "./TabManager";
import UserAccount from "../forms/UserAccount";
import BrowseAds from "./BrowseAds";
import BrowseRequests from "./BrowseRequests";
import NoAdsForNeighbourhood from "../utils/NoAdsForNeighbourhood";
import UserAdsWrapper from "../utils/UserAdsWrapper";
import UserChatList from "./UserChatList";
import Buy from "./Buy";
import Sell from "./Sell";

const Tab = (props) => {
  const [activeTab, setActiveTab] = useState(null);

  const pathname = props.route;
  const tabs = props.tabs;

  useEffect(() => {
    if (props.route === "/") {
      setActiveTab("sell");
    }

    if (props.route === "/account") {
      props.tab === null ? setActiveTab("profile") : setActiveTab(props.tab);
    }
  }, []);

  useEffect(() => {
    () => window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <TabManager
        tabs={tabs}
        selectedTab={props.tab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabStyle={props.tabStyle}
      />
      {/* <div>
        {pathname.includes("/ads") && (
          <div>
            {activeTab === 0 ? (
              props.numOfAds === 0 ? (
                <NoAdsForNeighbourhood />
              ) : (
                <BrowseAds nbhId={props.nbhId} />
              )
            ) : (
              <BrowseRequests />
            )}
          </div>
        )}
      </div> */}

      {/* Tabs on the home page */}
      <div>
        {pathname === "/" && (
          <div>{activeTab === "sell" ? <Sell /> : <Buy />}</div>
        )}
      </div>

      {/* Tabs on the account page */}
      <div>
        {pathname === "/account" && (
          <div>
            {activeTab === "profile" && (
              <UserAccount currentUser={props.currentUser} />
            )}
            {activeTab === "ads" && (
              <UserAdsWrapper
                currentUser={props.currentUser}
                showForm={props.showForm}
                setShowForm={props.setShowForm}
              />
            )}

            {activeTab === "chats" && (
              <UserChatList
                currentUser={props.currentUser}
                chatNotification={props.chatNotification}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
