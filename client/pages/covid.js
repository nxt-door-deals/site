import React, { useState } from "react";

// Component imports
import CovidGuidelinesText from "../components/utils/CovidGuidelinesText";
import CovidGuidelinesHeadLayout from "../components/layout/CovidGuidelinesHeadLayout";
import ScrollToTop from "../components/utils/ScrollToTop";

const CovidGuidelines = () => {
  const [scrollToTop, setScrollToTop] = useState(false);
  return (
    <CovidGuidelinesHeadLayout>
      <div className="w-full">
        <ScrollToTop
          scrollToTop={scrollToTop}
          setScrollToTop={setScrollToTop}
        />
      </div>

      <CovidGuidelinesText />
    </CovidGuidelinesHeadLayout>
  );
};

export default CovidGuidelines;
