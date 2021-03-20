import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import FAQHeadLayout from "../../components/layout/FAQHeadLayout";
import FrequentlyAskedQuestions from "../../components/utils/FrequentlyAskedQuestions";

const FAQType = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <FAQHeadLayout>
      <Navbar navStyle={navStylePurple} />
      <div
        id="header"
        className="flex justify-center items-center h-full w-full pt-28 lg:pt-36 bg-purple-50
      bg-opacity-25 mb-20"
      >
        <div className="rounded-2xl bg-white py-8 px-6 lg:p-10 shadow-categorycardshadow">
          <FrequentlyAskedQuestions type={props.type} />
        </div>
      </div>
      <Footer footerGradientClass={footerGradientClassPurple} />
    </FAQHeadLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { type } = context.query;

  return {
    props: {
      type: type,
    },
  };
};

// export const getStaticPaths = async () => {
//   const faqTypes = ["seller", "buyer", "generic"];

//   const paths = faqTypes.map((faqType) => {
//     return {
//       params: { type: faqType },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default FAQType;
