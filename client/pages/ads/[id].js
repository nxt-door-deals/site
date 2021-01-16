import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

// Component imports
import AdsHeadLayout from "../../components/layout/AdsHeadLayout";
import Navbar from "../../components/layout/Navbar";
import Ad from "../../components/utils/Ad";
import Footer from "../../components/layout/Footer";

const FullPageAd = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  // Custom navbar tailwind styles
  const navStyle = {
    navBgColor: "lg:bg-purple-200",
    navOverlayBgColor: "bg-purple-200",
    navTextColor: "text-brand-purple",
    navOverlayTextColor: "text-brand-purple",
    hrTextColor: "brand-purple",
    navShadow: "lg:shadow-navshadow",
    faIconTextcolor: "text-white",
    pathname: pathname,
  };

  const footerGradientClass = "from-footer-gradient-from to-footer-gradient-to";

  return (
    <AdsHeadLayout>
      <div className="font-axiforma text-brand-gray bg-fpa-background bg-cover bg-no-repeat">
        <Navbar navStyle={navStyle} />
        <div className="pt-32 px-10 pb-20 lg:px-48">
          <Ad data={props.data} showForm={props.showForm.current} />
        </div>
        <div>
          <Footer footerGradientClass={footerGradientClass} />
        </div>
      </div>
    </AdsHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const res = await axios.get(`${process.env.API_URL}/ads/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default FullPageAd;
