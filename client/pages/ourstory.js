import { useRouter } from "next/router";
// Component imports
import OurStoryHeadLayout from "../components/layout/OurStoryHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import OurStoryDetails from "../components/utils/OurStoryDetails";

const OurStory = () => {
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
    <OurStoryHeadLayout>
      <div className="h-full">
        <Navbar navStyle={navStyle} />
        <div className="w-full bg-our-story-background-mobile md:bg-our-story-background-tablet lg:bg-our-story-background bg-cover bg-no-repeat h-100 md:h-128 relative">
          <div className="absolute -bottom-1 bg-transparent w-full">
            <img src="/images/our-story/wave.svg" />
          </div>
        </div>
        <OurStoryDetails />
        <Footer footerGradientClass={footerGradientClass} />
      </div>
    </OurStoryHeadLayout>
  );
};

export default OurStory;
