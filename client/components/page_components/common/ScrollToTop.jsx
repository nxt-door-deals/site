import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTop = (props) => {
  const [scrollToTop, setScrollToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollOn = window.scrollY > 100;

    if (scrollOn) {
      setScrollToTop(true);
    } else {
      setScrollToTop(false);
    }
  };

  if (scrollToTop)
    return (
      <div className="fixed right-4 bottom-2 z-50">
        <div
          className={`h-10 w-10 text-center tracking-wide cursor-pointer focus:outline-none rounded-full text-white bg-brand-gray shadow-scrollToTopShadow p-2 uppercase text-sm`}
          onClick={() => {
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
          }}
          aria-label="Scroll to top of the page"
        >
          <FontAwesomeIcon icon={faChevronUp} className="text-2xl" />
        </div>
      </div>
    );
  else {
    return null;
  }
};

export default ScrollToTop;
