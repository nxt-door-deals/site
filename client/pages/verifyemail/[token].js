import { Fragment } from "react";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import AuthContext from "../../context/auth/authContext";

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const authContext = useContext(AuthContext);
  const { verifyEmail, emailVerified, verificationStatus } = authContext;

  useEffect(() => {
    if (token !== undefined) {
      verifyEmail(token);
    }
  }, [token]);

  return (
    <Fragment>
      <div className="flex justify-center items-center rounded-md shadow-boxshadowemail border-blue-600 border-b-8 m-12 lg:ml-64 lg:mr-64 mt-28 pt-16 pb-16 z-50">
        <div className="flex flex-col items-center m-5">
          {emailVerified !== null && emailVerified ? (
            <img
              src="/images/email/check.gif"
              height="150px"
              width="150px"
              alt="email verified"
            />
          ) : (
            emailVerified !== null &&
            !emailVerified && (
              <img
                src="/images/email/error.gif"
                height="150px"
                width="150px"
                alt="email unverified"
              />
            )
          )}
          <p className="font-axiforma text-gray-600 mt-10 text-center">
            {verificationStatus !== null && verificationStatus}
          </p>
          <motion.button
            whileTap={{
              backgroundColor: "#7F9CF5",
              y: "5px",
              boxShadow: "0px 8px 15px rgba(151, 201, 251, 0.2)",
            }}
            className="mt-10 w-64 md:w-100 h-12 bg-blue-600 text-white font-axiforma font-bold rounded-md uppercase tracking-wide focus:outline-none"
            onClick={() => {
              router.push("/");
            }}
            arira-aria-label="Continue to site button"
          >
            Continue to site
          </motion.button>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyEmail;
