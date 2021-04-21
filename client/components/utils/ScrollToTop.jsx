import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTop = (props) => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollOn = window.scrollY > 0;

    if (scrollOn) {
      props.setScrollToTop(true);
    } else {
      props.setScrollToTop(false);
    }
  };

  if (props.scrollToTop)
    return (
      <div className="fixed right-4 bottom-3">
        <button
          className={`text-center tracking-wide cursor-pointer focus:outline-none rounded-xl text-white bg-brand-gray shadow-scrollToTopShadow p-2 uppercase text-sm`}
          onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
          aria-label="Scroll to top of the page"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      </div>
    );
  else {
    return null;
  }
};

export default ScrollToTop;
