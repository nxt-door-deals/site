import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navStylePurple, footerGradientClassPurple } from "../utils/styles";
import axios from "axios";
import fs from "fs";

// Component imports
import HomeHeadLayout from "../components/layout/head/HomeHeadLayout";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/page_components/home/Landing";
import HowItWorks from "../components/page_components/home/HowItWorks";
import Footer from "../components/layout/Footer";

const bannerVariants = {
  initial: {
    y: "100vh",
  },
  animate: {
    y: 0,
  },
  transition: {
    delay: 2,
    duration: 2,
    type: "tween",
  },
  exit: {
    y: "100vh",
    transition: { duration: 1 },
  },
};

const buttonVariants = {
  hover: {
    backgroundColor: "#92400E",
    color: "#FFFFFF",
  },
  tap: {
    color: "#333333",
    backgroundColor: "#F59E0B",
    y: "2px",
  },
};

const Home = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

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

      <AnimatePresence exitBeforeEnter>
        {props.showBanner && (
          <motion.div
            variants={bannerVariants}
            initial="initial"
            animate="animate"
            transition="transition"
            exit="exit"
            className="flex justify-center items-center fixed left-0 right-0 bottom-0 h-auto w-full px-1 bg-banner-color text-white z-40 shadow-banner-shadow"
          >
            <div className="py-5 px-5 lg-px-0 text-sm lg:text-base">
              <p className="font-semibold pb-1">
                &#127850; About cookies on this site &#127850;
              </p>
              <p className="font-extralight">
                This site uses cookies to provide you the best possible
                experience. Disabling cookies will lead to unexpected behaviour.
                Read our{" "}
                <span className="text-yellow-500">
                  <Link href="/policies#cookie">
                    <a className="styled-link">cookie policy</a>
                  </Link>{" "}
                </span>
                for more details.
              </p>
            </div>
            <div className="w-10 h-10 mx-3">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-2 rounded-md bg-yellow-500 text-banner-color focus-within:outline-none"
                onClick={() => props.setShowBanner(false)}
              >
                OK
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
export const getStaticProps = async () => {
  const rss = await axios.get(`${process.env.API_URL}/rss`);

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", rss.data);

  return {
    props: {
      rss: rss.data,
    },
  };
};

export default Home;
