import { useEffect, useContext } from "react";
import Router from "next/router";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import AuthContext from "../../context/auth/authContext";
import { toast } from "react-toastify";

const cookie = new Cookies();

const PageNotFound = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user, logout } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  // Logout toast
  const logoutToast = () =>
    toast("You are being logged out. Have a nice day :)", {
      draggablePercent: 60,
      position: "top-center",
    });

  return (
    <div>
      <div className="flex justify-center pt-8 -z-20">
        <img
          src="/images/error/404.svg"
          alt="404 not found"
          height="600px"
          width="600px"
        />
      </div>
      <div className="font-axiforma text-brand-gray text-center ml-2 mr-2">
        <h1 className="text-2xl font-bold pb-2">
          This page does not exist yet!
        </h1>
        <p className="text-base">
          Sorry! The page you were looking for could not be found at this time.
          However, here are some pages you might be interested in.
        </p>
      </div>
      <div className="flex justify-center items-center mt-6">
        {cookie.get("nddToken") ? (
          <div className="flex-col">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="btn-style bg-purple-500 mb-4 md:mr-6 md:mb-0 focus:outline-none"
              onClick={() => {
                Router.push("/");
              }}
            >
              Home
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="btn-style bg-brand-purple mb-4 md:mr-6 md:mb-0 focus:outline-none"
              onClick={() => {
                user !== null && Router.push(`/ads/${user.apartment_name}`);
              }}
            >
              My Neighbourhood
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="btn-style bg-gray-500 mb-4 md:mr-6 md:mb-0 focus:outline-none"
              onClick={() => {
                logout();
                logoutToast();
                setTimeout(() => Router.reload("/"), 2000);
              }}
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="btn-style bg-purple-500 mb-4 md:mr-6 md:mb-0 focus:outline-none"
              onClick={() => {
                Router.push("/");
              }}
            >
              Home
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="btn-style bg-brand-purple mb-4 md:mr-6 md:mb-0 focus:outline-none"
              onClick={() => {
                Router.push("/registeruser");
              }}
            >
              Register
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="btn-style bg-gray-500 mb-4 md:mr-6 md:mb-0 focus:outline-none"
              onClick={() => {
                Router.push("/login");
              }}
            >
              Login
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageNotFound;
