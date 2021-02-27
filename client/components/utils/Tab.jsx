import React, { useState } from "react";

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
  const [activeTab, setActiveTab] = useState(0);

  const pathname = props.route;
  const tabs = props.tabs;
  return (
    <div>
      <TabManager
        tabs={tabs}
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
        {pathname === "/" && <div>{activeTab === 0 ? <Sell /> : <Buy />}</div>}
      </div>

      {/* Tabs on the account page */}
      <div>
        {pathname === "/account" && (
          <div>
            {activeTab === 0 ? (
              <UserAccount currentUser={props.currentUser} />
            ) : activeTab === 1 ? (
              <UserAdsWrapper
                currentUser={props.currentUser}
                ads={props.ads}
                showForm={props.showForm}
                setShowForm={props.setShowForm}
              />
            ) : (
              <UserChatList chatNotification={props.chatNotification} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
