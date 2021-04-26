import React from "react";
import { useRouter } from "next/router";

import { navStyleBlue } from "../../../utils/styles";

// Component imports
import CreateNeighbourhoodHeadLayout from "../../../components/layout/CreateNeighbourhoodHeadLayout";
import Navbar from "../../../components/layout/Navbar";
import CreateNeighbourhood from "../../../components/forms/CreateNeighbourhood";
import Footer from "../../../components/layout/Footer";
import ScrollToTop from "../../../components/utils/ScrollToTop";

const Neighbourhood = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  navStyleBlue["hrStyle"] = "border-blue-800 bg-blue-800 border-dotted";
  navStyleBlue["navBgColor"] = "lg:bg-indigo-100";
  navStyleBlue["navOverlayBgColor"] = "bg-indigo-100";
  navStyleBlue["pathname"] = pathname;

  const footerGradientClassBlue =
    "from-alt-footer-gradient-from to-alt-footer-gradient-to";

  return (
    <CreateNeighbourhoodHeadLayout>
      <ScrollToTop />

      <div id="header">
        <Navbar navStyle={navStyleBlue} />
        <CreateNeighbourhood
          aptNameFromUrl={props.value ? props.value[0] : null}
        />
      </div>

      <div>
        <Footer
          footerGradientClass={footerGradientClassBlue}
          pathname={pathname}
        />
      </div>
    </CreateNeighbourhoodHeadLayout>
  );
};

export const getServerSideProps = (context) => {
  const { name } = context.query;

  return {
    props: {
      value: name || null,
    },
  };
};

export default Neighbourhood;
