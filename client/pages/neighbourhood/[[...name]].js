import React from "react";
import { useRouter } from "next/router";

// Component imports
import CreateNeighbourhoodHeadLayout from "../../components/layout/CreateNeighbourhoodHeadLayout";
import Navbar from "../../components/layout/Navbar";
import CreateNeighbourhood from "../../components/forms/CreateNeighbourhood";
import Footer from "../../components/layout/Footer";

const Neighbourhood = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  // Custom navbar tailwind styles
  const navStyle = {
    navBgColor: "lg:bg-indigo-100",
    navOverlayBgColor: "bg-indigo-100",
    navTextColor: "text-blue-800",
    navOverlayTextColor: "text-blue-800",
    hrTextColor: "blue-800",
    navShadow: "lg:altNavShadow",
    faIconTextcolor: "text-white",
    pathname: pathname,
  };

  const footerGradientClass =
    "from-alt-footer-gradient-from to-alt-footer-gradient-to";

  return (
    <CreateNeighbourhoodHeadLayout>
      <div className="w-full font-axiforma">
        <Navbar navStyle={navStyle} />
        <div className="h-80 lg:h-96 bg-cover bg-create-neighbourhood-background-mobile md:bg-create-neighbourhood-background-tablet lg:bg-create-neighbourhood-background"></div>
        <CreateNeighbourhood aptNameFromUrl={props.value} />
      </div>
      <div>
        <Footer footerGradientClass={footerGradientClass} />
      </div>
    </CreateNeighbourhoodHeadLayout>
  );
};

Neighbourhood.getInitialProps = ({ query }) => {
  const { name } = query;
  return {
    value: name,
  };
};

export default Neighbourhood;
