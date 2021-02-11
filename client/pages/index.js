import { useRouter } from "next/router";

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
    <HomeHeadLayout>
      <Navbar navStyle={navStyle} />
      <section id="landing">
        <Landing />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="footer">
        <Footer footerGradientClass={footerGradientClass} />
      </section>
    </HomeHeadLayout>
  );
};

export default Home;
