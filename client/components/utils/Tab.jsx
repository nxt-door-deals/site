import React, { useState } from "react";

// Component imports
import TabManager from "./TabManager";
import BrowseAds from "./BrowseAds";
import BrowseRequests from "./BrowseRequests";

const Tab = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Browse Ads", value: 0 },
    { label: "AYN", value: 1 },
  ];

  return (
    <div>
      <TabManager
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div>
        <div>
          {activeTab === 0 ? (
            <BrowseAds nbhId={props.nbhId} variants={props.variants} />
          ) : (
            <BrowseRequests />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tab;
