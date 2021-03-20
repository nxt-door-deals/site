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
      <div className="fixed right-3 bottom-3">
        <button
          className={`text-center tracking-wide cursor-pointer focus:outline-none rounded-xl text-white bg-brand-gray shadow-sctollToTopShadow p-2 uppercase text-sm`}
          onClick={() => window.scrollTo(0, 0)}
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
