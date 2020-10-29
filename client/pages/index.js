import { useRouter } from "next/router"

// Component imports
import HomeHeadLayout from "../components/layout/HomeHeadLayout";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/Landing";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/layout/Footer";

// Cusom navbar tailwind styles
const navBgColor = "bg-purple-200"
const navTextColor = "text-purple-300"
const navOverlayTextColor = "text-brand-purple"
const hrTextColor = "brand-purple"
const navShadow = "shadow-navshadow"
const faIconTextcolor = "text-white"

const Home = () => {
  const router = useRouter()
  const pathname = router.pathname;

  return (
    <HomeHeadLayout>
      <Navbar navBgColor={navBgColor} 
              navTextColor={navTextColor} 
              hrTextColor={hrTextColor} 
              navShadow={navShadow}
              faIconTextcolor={faIconTextcolor}
              navOverlayTextColor={navOverlayTextColor}
              pathname={pathname}/>
      <section id="landing">
        <Landing />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </HomeHeadLayout>
  );
};

export default Home;
