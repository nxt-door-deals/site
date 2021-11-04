import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import OurStoryHeadLayout from "../components/layout/head/OurStoryHeadLayout";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import OurStoryDetails from "../components/page_components/our_story/OurStoryDetails";

const OurStory = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <OurStoryHeadLayout>
      <div id="header" className="h-full">
        <Navbar navStyle={navStylePurple} />
        <div className="w-full bg-our-story-background-mobile md:bg-our-story-background-tablet lg:bg-our-story-background bg-cover bg-no-repeat h-100 md:h-128 relative -z-10"></div>
        <OurStoryDetails />
        <Footer
          footerGradientClass={footerGradientClassPurple}
          pathname={pathname}
        />
      </div>
    </OurStoryHeadLayout>
  );
};

export default OurStory;
