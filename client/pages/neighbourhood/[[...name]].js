import React from "react";
import { useRouter } from "next/router";

import { navStyleBlue, footerGradientClassBlue } from "../../utils/styles";

// Component imports
import CreateNeighbourhoodHeadLayout from "../../components/layout/CreateNeighbourhoodHeadLayout";
import Navbar from "../../components/layout/Navbar";
import CreateNeighbourhood from "../../components/forms/CreateNeighbourhood";
import Footer from "../../components/layout/Footer";

const Neighbourhood = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  navStyleBlue["pathname"] = pathname;

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
