import "../styles/styles.css";
import SiteState from "../context/site/SiteState";
import { motion } from "framer-motion";

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
      <SiteState>
        <Component {...pageProps} />
      </SiteState>
    </motion.div>
  );
}
