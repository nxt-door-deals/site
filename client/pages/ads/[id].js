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
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  useEffect(() => {
    window.scroll({
      top: 1,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <AdsHeadLayout adId={props.data.id}>
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
          <Footer
            footerGradientClass={footerGradientClassPurple}
            pathname={pathname}
          />
        </div>
      </div>
      <div className="w-full">
        <ScrollToTop />
      </div>
    </AdsHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const adId = id;

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
