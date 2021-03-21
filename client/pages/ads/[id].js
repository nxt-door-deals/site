import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import AdsHeadLayout from "../../components/layout/AdsHeadLayout";
import Navbar from "../../components/layout/Navbar";
import Ad from "../../components/utils/Ad";
import Footer from "../../components/layout/Footer";
import ScrollToTop from "../../components/utils/ScrollToTop";

const FullPageAd = (props) => {
  // imgArray will be used in the EditAd component to reset the state when an image is deleted
  const [imgArray, setImgArray] = useState(props.data.images);
  const [scrollToTop, setScrollToTop] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <AdsHeadLayout>
      <div className="w-full">
        <ScrollToTop
          scrollToTop={scrollToTop}
          setScrollToTop={setScrollToTop}
        />
      </div>

      <div className="text-brand-gray bg-fpa-background bg-cover bg-no-repeat">
        <Navbar
          navStyle={navStylePurple}
          chatNotification={props.chatNotification}
        />
        <div className="pt-32 px-5 pb-20 lg:px-24">
          <Ad
            data={props.data}
            imgArray={imgArray}
            setImgArray={setImgArray}
            showForm={props.showForm}
            setShowForm={props.setShowForm}
          />
        </div>
        <div>
          <Footer footerGradientClass={footerGradientClassPurple} />
        </div>
      </div>
    </AdsHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const adId = parseInt(id);

  if (!Number.isInteger(adId)) {
    return {
      notFound: true,
    };
  }

  const res = await axios.get(`${process.env.API_URL}/ads/${adId}`);

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

// export const getStaticPaths = async () => {
//   const res = await axios.get(`${process.env.API_URL}/ads/all`);

//   const ads = res.data;

//   const paths = ads.map((ad) => {
//     return {
//       params: { id: ad.id.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default FullPageAd;
