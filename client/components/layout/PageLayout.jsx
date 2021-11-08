import React from "react";

// Component imports
import ScrollToTop from "../page_components/common/ScrollToTop";

const PageLayout = (props) => {
  return (
    <div>
      <ScrollToTop />
      <main>{props.children}</main>
    </div>
  );
};

export default PageLayout;
