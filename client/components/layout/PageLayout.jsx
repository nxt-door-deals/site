import React, { useState, useEffect } from "react";

// Component imports
import ScrollToTop from "../page_components/common/ScrollToTop";

const PageLayout = (props) => {
  const [DOMLoaded, setDOMLoaded] = useState(false);

  useEffect(() => {
    if (props.children && window !== "undefined") setDOMLoaded(true);
  });

  return (
    <div>
      <ScrollToTop />
      {DOMLoaded && <main>{props.children}</main>}
    </div>
  );
};

export default PageLayout;
