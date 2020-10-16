import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Router from "next/router";
import { motion } from "framer-motion";

const AlreadyLoggedIn = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, user, logout } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  const homeClick = () => {
    Router.push("/");
  };


  return (
    <Fragment>
      <div className="pt-28 pr-20 pb-10 pl-20 text-center font-axiforma text-xl text-gray-600">
        <h1>
          Hello,{" "}
          <span className="text-brand-purple font-semibold">
            {user !== null ? user.name : "friend"}
          </span>
          ! You are seeing this page because you are already logged in. Please logout if you want to register or login as another user.
        </h1>
      </div>

      <div className="flex justify-center p-5 pt-3">
        <motion.button
          className="w-48 h-12 rounded-lg bg-purple-500 text-white uppercase font-bold text-center tracking-wide cursor-pointer mr-4 focus:outline-none border-none"
          whileTap={{
            backgroundColor: "#D6BCFA",
            color: "#550052",
            y: "5px",
          }}
          onClick={homeClick}
          aria-label="Home button"
        >
          Home
        </motion.button>
        <motion.button
          type="button"
          className="w-48 h-12 rounded-lg bg-pink-500 text-white uppercase font-bold text-center tracking-wide cursor-pointer mr-4 focus:outline-none border-none"
          whileTap={{
            backgroundColor: "#FED7E2",
            color: "#550052",
            y: "5px",
          }}
          onClick={() => {
            logout();
            Router.push("/login")
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

export default AlreadyLoggedIn;
