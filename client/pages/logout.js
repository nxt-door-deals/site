import React, { useEffect, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// Component imports
import LogoutHeadLayout from "../components/layout/head/LogoutHeadLayout";

const variants = {
  initial: {
    y: "200vh",
  },

  animate: {
    y: "-5vh",
    transition: {
      duration: 2,
      delay: 2,
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
      props.chatNotification.current = false;
      router.push("/");
    }, 4500);
  }, []);

  return (
    <LogoutHeadLayout>
      <div className="h-screen w-screen flex flex-col justify-center items-center text-3xl px-5 lg:text-5xl bg-purple-50 text-brand-purple uppercase font-bold tracking-wider">
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
