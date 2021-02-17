import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// Component imports
import LogoutHeadLayout from "../components/layout/LogoutHeadLayout";

const variants = {
  initial: {
    opacity: 0,
    transition: {
      sale: 0.6,
    },
  },

  animate: {
    opacity: 1,
    transition: {
      scale: 1,
      duration: 3,
      delay: 3,
    },
  },
};

const Logout = (props) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  if (props.pathHistory || props.pathHistory !== undefined)
    props.pathHistory.current = null;

  useEffect(() => {
    setTimeout(() => {
      logout();
      router.push("/");
    }, 7000);
  }, []);

  return (
    <LogoutHeadLayout>
      <div className="h-screen w-screen flex flex-col justify-center items-center text-2xl lg:text-5xl bg-purple-50 text-brand-purple uppercase font-bold tracking-wider">
        <ul className="smoke flex">
          <li className="smoke-item">l</li>
          <li className="smoke-item">o</li>
          <li className="smoke-item">g</li>
          <li className="smoke-item">g</li>
          <li className="smoke-item">i</li>
          <li className="smoke-item">n</li>
          <li className="smoke-item">g</li>
          &nbsp;
          <li className="smoke-item">o</li>
          <li className="smoke-item">u</li>
          <li className="smoke-item">t</li>
        </ul>

        <motion.p
          variants={variants}
          initial="initial"
          animate="animate"
          className="LogoutHeadLayout-message"
        >
          {" "}
          Have a nice day 😊
        </motion.p>
      </div>
    </LogoutHeadLayout>
  );
};

export default Logout;
