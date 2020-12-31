import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const variants = {
  hidden: { opacity: 0 },
  btn1Visible: { opacity: 1, transition: { delay: 0.5, duration: 0.3 } },
  btn2Visible: { opacity: 1, transition: { delay: 1, duration: 0.3 } },
  tap: {
    backgroundColor: "#D6BCFA",
    color: "#550052",
    y: "5px",
  },
};

const UserLoggedIn = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { loadUser, user, logout } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  const homeClick = () => {
    router.push("/");
  };

  // Logout toast
  const logoutToast = () =>
    toast("You are being logged out. Have a nice day :)", {
      draggablePercent: 60,
      position: "top-center",
    });

  return (
    <Fragment>
      <div className="pt-24 md:pt-32 pr-20 pl-20 text-center font-axiforma text-xl text-brand-gray">
        <h1>
          {user && user
            ? "You are seeing this page because you are already logged in. Please logout if you want to register or login as another user."
            : "You are being logged out."}
        </h1>
      </div>

      <div className="flex justify-center p-5 mt-5">
        <motion.button
          variants={variants}
          initial="hidden"
          animate="btn1Visible"
          whileTap="tap"
          className="w-48 h-12 rounded-lg bg-purple-500 text-white uppercase font-bold text-center tracking-wide cursor-pointer mr-4 focus:outline-none border-none"
          onClick={homeClick}
          aria-label="Home button"
        >
          Home
        </motion.button>
        <motion.button
          variants={variants}
          initial="hidden"
          animate="btn2Visible"
          whileTap="tap"
          className="w-48 h-12 rounded-lg bg-pink-500 text-white uppercase font-bold text-center tracking-wide cursor-pointer mr-4 focus:outline-none border-none"
          onClick={() => {
            logout();
            logoutToast();
            setTimeout(() => router.push("/"), 2000);
          }}
          aria-label="Logout button"
        >
          Logout
        </motion.button>
      </div>

      <div className="flex justify-center mt-12">
        <img
          src="/images/logout/detective.svg"
          alt="Exploring the site"
          width="300px"
          height="300px"
        />
      </div>
    </Fragment>
  );
};

export default UserLoggedIn;
