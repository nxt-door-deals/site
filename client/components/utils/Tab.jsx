import React, { useState } from "react";

// Component imports
import TabManager from "./TabManager";
import UserAccount from "../forms/UserAccount";
import BrowseAds from "./BrowseAds";
import BrowseRequests from "./BrowseRequests";
import NoAdsForNeighbourhood from "../utils/NoAdsForNeighbourhood";
import UserAdsWrapper from "../utils/UserAdsWrapper";
import UserChatList from "./UserChatList";

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
      />
      <div>
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
      </div>

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
              <UserChatList />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
