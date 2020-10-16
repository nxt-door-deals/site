import "../styles/styles.css";
import SiteState from "../context/site/SiteState";
import AuthState from "../context/auth/AuthState";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";

const pageVariants = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
};

export default function MyApp({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      variants={pageVariants}
      initial="pageInitial"
      animate="pageAnimate"
    >
      <AuthState>
        <SiteState>
          <Component {...pageProps} />
        </SiteState>
      </AuthState>
    </motion.div>
  );
}
