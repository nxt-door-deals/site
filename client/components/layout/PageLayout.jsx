import React, { useEffect } from "react";

// Component imports
import ScrollToTop from "../page_components/common/ScrollToTop";

const PageLayout = (props) => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <ScrollToTop />
      <main>{props.children}</main>
    </div>
  );
};

export default PageLayout;
