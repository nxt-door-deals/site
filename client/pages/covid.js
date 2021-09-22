import React from "react";

// Component imports
import CovidGuidelinesText from "../components/page_components/policies/CovidGuidelinesText";
import CovidGuidelinesHeadLayout from "../components/layout/head/CovidGuidelinesHeadLayout";

const CovidGuidelines = () => {
  return (
    <CovidGuidelinesHeadLayout>
      <CovidGuidelinesText />
    </CovidGuidelinesHeadLayout>
  );
};

export default CovidGuidelines;
