import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// Component imports
import AdsHeadLayout from "../../components/layout/AdsHeadLayout";
import Navbar from "../../components/layout/Navbar";
import Ad from "../../components/utils/Ad";
import Footer from "../../components/layout/Footer";

const FullPageAd = (props) => {
  // imgArray will be used in the EditAd component to reset the state when an image is deleted
  const [imgArray, setImgArray] = useState(props.data.images);

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <div className="pt-32 px-5 pb-20 lg:px-48">
          <Ad
            data={props.data}
            imgArray={imgArray}
            setImgArray={setImgArray}
            showForm={props.showForm}
            setShowForm={props.setShowForm}
          />
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

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: res.data,
    },
  };
};

export default FullPageAd;
