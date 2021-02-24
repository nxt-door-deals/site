import "../styles/styles.css";
import { useRef, useState } from "react";
import SiteState from "../context/site/SiteState";
import AuthState from "../context/auth/AuthState";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, Flip } from "react-toastify";

const pageVariants = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
};

const contextClass = {
  default: "bg-ad-purple",
};

export default function MyApp({ Component, pageProps, router }) {
  const pathHistory = useRef(null);

  // Use this in the Ad component to show either the ad or the edit form
  const [showForm, setShowForm] = useState(true);

  return (
    <motion.div
      key={router.route}
      variants={pageVariants}
      initial="pageInitial"
      animate="pageAnimate"
    >
      <AuthState>
        <SiteState>
          <Component
            {...pageProps}
            pathHistory={pathHistory}
            showForm={showForm}
            setShowForm={setShowForm}
          />
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
              " flex p-1 min-h-10 justify-center overflow-hidden cursor-pointer border-2 border-purple-50"
            }
            bodyClassName={() =>
              "font-axiforma text-base text-white font-semibold tracking-wide block p-3 text-center"
            }
          />
        </SiteState>
      </AuthState>
    </motion.div>
  );
}
