// Component imports
import HomeHeadLayout from "../components/layout/HomeHeadLayout";
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <HomeHeadLayout>
      <Navbar />
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
