import React from "react";

// Component imports
import CovidGuidelinesText from "../components/utils/CovidGuidelinesText";
import CovidGuidelinesHeadLayout from "../components/layout/CovidGuidelinesHeadLayout";
import ScrollToTop from "../components/utils/ScrollToTop";

const CovidGuidelines = () => {
  return (
    <CovidGuidelinesHeadLayout>
      <div className="w-full">
        <ScrollToTop />
      </div>

      <CovidGuidelinesText />
    </CovidGuidelinesHeadLayout>
  );
};

export default CovidGuidelines;
