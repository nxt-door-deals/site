import { useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import AuthContext from "../../context/auth/authContext";
import { navStylePurple, footerGradientClassPurple } from "../../utils/styles";

// Component imports
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import VerifyEmailHeadLayout from "../../components/layout/VerifyEmailHeadLayout";

const variants = {
  hover: {
    backgroundColor: "#5B21B6",
  },
  tap: {
    backgroundColor: "#7C3AED",
    y: "2px",
  },
};

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const pathname = router.pathname;
  const authContext = useContext(AuthContext);
  const { verifyEmail, emailVerified, verificationStatus } = authContext;

  useEffect(() => {
    if (token !== undefined) {
      verifyEmail(token);
    }
  }, [token]);

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <VerifyEmailHeadLayout>
      <Navbar navStyle={navStylePurple} />
      <div
        id="header"
        className="flex justify-center items-center rounded-xl bg-white pt-32 px-5 pb-20 z-50 text-brand-gray"
      >
        <div className="flex flex-col items-center m-5">
          {emailVerified !== null && emailVerified ? (
            <Image
              src={"/images/email/check.gif"}
              height={150}
              width={150}
              alt={"email verified"}
            />
          ) : (
            emailVerified !== null &&
            !emailVerified && (
              <Image
                src={"/images/email/error.gif"}
                height={150}
                width={150}
                alt={"email not verified"}
              />
            )
          )}
          <p
            className="mt-10 text-center"
            dangerouslySetInnerHTML={{
              __html: verificationStatus && verificationStatus,
            }}
          ></p>
          <motion.button
            variants={variants}
            whileHover="hover"
            whileTap="tap"
            className="mt-10 w-64 md:w-100 h-12 bg-purple-600 text-white font-bold rounded-xl uppercase tracking-wide focus:outline-none"
            onClick={() => {
              router.push("/");
            }}
            arira-aria-label="Continue to site button"
          >
            Continue to site
          </motion.button>
        </div>
      </div>
      <Footer footerGradientClass={footerGradientClassPurple} />
    </VerifyEmailHeadLayout>
  );
};

export default VerifyEmail;
