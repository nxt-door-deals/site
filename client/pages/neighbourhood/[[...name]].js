import React from "react";
import { useRouter } from "next/router";

import { navStyleBlue } from "../../utils/styles";

// Component imports
import CreateNeighbourhoodHeadLayout from "../../components/layout/CreateNeighbourhoodHeadLayout";
import Navbar from "../../components/layout/Navbar";
import CreateNeighbourhood from "../../components/forms/CreateNeighbourhood";
import Footer from "../../components/layout/Footer";

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
      <div className="w-full font-axiforma">
        <Navbar navStyle={navStyleBlue} />
        <div className="h-80 lg:h-96 bg-cover bg-create-neighbourhood-background-mobile md:bg-create-neighbourhood-background-tablet lg:bg-create-neighbourhood-background"></div>
        <CreateNeighbourhood aptNameFromUrl={props.value} />
      </div>
      <div>
        <Footer footerGradientClass={footerGradientClassBlue} />
      </div>
    </CreateNeighbourhoodHeadLayout>
  );
};

export const getServerSideProps = (context) => {
  const { name } = context.query;
  return {
    props: {
      value: name,
    },
  };
};

export default Neighbourhood;
