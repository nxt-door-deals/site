import "../styles/styles.css";
import { useRef } from "react";
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
  default: "bg-purple-400",
};

export default function MyApp({ Component, pageProps, router }) {
  const pathHistory = useRef(null);

  return (
    <motion.div
      key={router.route}
      variants={pageVariants}
      initial="pageInitial"
      animate="pageAnimate"
    >
      <AuthState>
        <SiteState>
          <Component {...pageProps} pathHistory={pathHistory} />
          <ToastContainer
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnHover
            transition={Flip}
            toastClassName={({ type }) =>
              contextClass[type || "default"] +
              " flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer border-2 border-purple-900"
            }
            bodyClassName={() =>
              "font-axiforma text-base font-white font-semibold block p-3 text-center"
            }
          />
        </SiteState>
      </AuthState>
    </motion.div>
  );
}
