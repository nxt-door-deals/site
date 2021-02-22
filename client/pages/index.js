import { useRouter } from "next/router";

import { navStylePurple, footerGradientClassPurple } from "../utils/styles";

// Component imports
import HomeHeadLayout from "../components/layout/HomeHeadLayout";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/Landing";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/layout/Footer";

const Home = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  props.pathHistory.current = null;

  navStylePurple["navBgColor"] = "lg:bg-purple-50";
  navStylePurple["navTextColor"] = "text-purple-50";
  navStylePurple["pathname"] = pathname;

  return (
    <HomeHeadLayout>
      <Navbar navStyle={navStylePurple} />
      <section id="landing">
        <Landing />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="footer">
        <Footer footerGradientClass={footerGradientClassPurple} />
      </section>
    </HomeHeadLayout>
  );
};

export default Home;
