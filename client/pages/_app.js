import "../styles/styles.css";
import { useRef, useState, useEffect } from "react";
import SiteState from "../context/site/SiteState";
import AuthState from "../context/auth/AuthState";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer, Flip } from "react-toastify";
import smoothscroll from "smoothscroll-polyfill";
import EventSource from "eventsource";

// Component imports
import PageLayout from "../components/layout/PageLayout";

const pageVariants = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
};

const contextClass = {
  default: "bg-banner-color",
};

const chatNotificationToast = () =>
  toast("💬 You have a new chat message! Visit your account page.", {
    draggablePercent: 60,
    position: "top-center",
  });

export default function MyApp({ Component, pageProps, router }) {
  const pathHistory = useRef(null);
  const chatNotification = useRef(null);
  const hiwRef = useRef(null);
  const notificationDisplayed = useRef(false);
  const [scrollToTop, setScrollToTop] = useState(false);

  // Use this in the Ad component to show either the ad or the edit form
  const [showForm, setShowForm] = useState(true);

  // Show or hide banner
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothscroll.polyfill();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("nddToken") && localStorage.getItem("nddUser")) {
        console.log("chat");
        var source = new EventSource(
          `${
            process.env.NEXT_PUBLIC_SSE_URL +
            "?user_id=" +
            localStorage.getItem("nddUser")
          }`
        );
        source.onmessage = (e) => {
          chatNotification.current = true;
          chatNotificationToast();
        };
      }
    }
  }, []);

  return (
    <motion.div
      key={router.route}
      variants={pageVariants}
      initial="pageInitial"
      animate="pageAnimate"
    >
      <AuthState>
        <SiteState>
          <PageLayout>
            <Component
              {...pageProps}
              pathHistory={pathHistory}
              chatNotification={chatNotification}
              showForm={showForm}
              setShowForm={setShowForm}
              notificationDisplayed={notificationDisplayed}
              showBanner={showBanner}
              setShowBanner={setShowBanner}
              scrollToTop={scrollToTop}
              setScrollToTop={setScrollToTop}
              hiwRef={hiwRef}
            />
          </PageLayout>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            closeButton={false}
            rtl={false}
            pauseOnHover
            transition={Flip}
            toastClassName={({ type }) =>
              contextClass[type || "default"] +
              " flex p-1 min-h-10 justify-center overflow-hidden cursor-pointer"
            }
            bodyClassName={() =>
              "text-base text-white tracking-wide block p-3 text-center"
            }
          />
        </SiteState>
      </AuthState>
    </motion.div>
  );
}
