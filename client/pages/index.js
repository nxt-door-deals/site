import { useEffect } from "react";
import { useRouter } from "next/router";
import { navStylePurple, footerGradientClassPurple } from "../utils/styles";
import Script from "next/script";
import axios from "axios";
import fs from "fs";

// Component imports
import HomeHeadLayout from "../components/layout/head/HomeHeadLayout";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/page_components/home/Landing";
import HowItWorks from "../components/page_components/home/HowItWorks";
import Footer from "../components/layout/Footer";
import CookieBanner from "../components/page_components/home/CookieBanner";

const Home = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    window.scroll({ top: 1, left: 0, behavior: "smooth" });
  }, []);

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("ndd__user__preferences")) {
      localStorage.setItem(
        "ndd__user__preferences",
        JSON.stringify({ showBanner: "true" })
      );
    }
  }

  props.pathHistory.current = null;

  navStylePurple["navBgColor"] = "lg:bg-white";
  navStylePurple["navTextColor"] = "text-purple-50";
  navStylePurple["pathname"] = pathname;

  return (
    <HomeHeadLayout>
      <Navbar
        navStyle={navStylePurple}
        chatNotification={props.chatNotification}
        hiwRef={props.hiwRef}
      />
      <main>
        <section id="header">
          <Landing hiwRef={props.hiwRef} />
        </section>

        <section id="how-it-works" ref={props.hiwRef}>
          <HowItWorks pathname={pathname} />
        </section>
      </main>

      <CookieBanner />

      <section id="footer">
        <Footer
          footerGradientClass={footerGradientClassPurple}
          pathname={pathname}
        />
      </section>
    </HomeHeadLayout>
  );
};

// Generate the rss feed
// export const getStaticProps = async () => {
//   const rss = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rss`);

//   fs.mkdirSync("./public/rss", { recursive: true });
//   fs.writeFileSync("./public/rss/feed.xml", rss.data);

//   return {
//     props: {
//       rss: rss.data,
//     },
//   };
// };

export default Home;
