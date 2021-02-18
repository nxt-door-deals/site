import React from "react";

// Component imports
import NbhAdsCard from "./NbhAdsCard";
import SearchNbhAds from "../forms/SearchNbhAds";

const BrowseAds = (props) => {
  return (
    <div className="mt-8 mb-20">
      <SearchNbhAds nbhId={props.nbhId} />
      <NbhAdsCard nbhId={props.nbhId} />
    </div>
  );
};

export default BrowseAds;
