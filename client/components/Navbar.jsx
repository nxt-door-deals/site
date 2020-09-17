import { Fragment } from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);

  const toggleNav = (e) => {
    setExpanded(!expanded);
  };

  const handleScroll = () => {
    const scrollOn = window.scrollY > 0;

    if (scrollOn) {
      setStickyNav(true);
    } else {
      setStickyNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  return (
    <Fragment>
      {/* ******* Navbar ******* */}
      <nav
        className={
          stickyNav
            ? "fixed basic-nav bg-purple-200 opacity-93 z-30 text-brand-purple transition duration-500 ease-in-out shadow-navshadow"
            : "absolute basic-nav bg-none"
        }
      >
        <motion.div
          id="brand"
          className="relative ml-2 lg:ml-4 lg:pl-4"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            type: "tween",
          }}
        >
          <Link href="/">
            <a>
              <img
                src="/brand.svg"
                alt="Logo for the NXT Door Deals brand"
                className="w-24 h-24 xl:w-28 xl:h-28 z-40"
              ></img>
            </a>
          </Link>
        </motion.div>

        {/* Menu icons - humburger or close */}
        <div className="lg:hidden mt-2 mr-4 z-20" onClick={toggleNav}>
          {!expanded ? (
            <img
              src="/menu.svg"
              className={`cursor-pointer fill-current mt-4 ${
                stickyNav ? "text-purple-900" : "text-white"
              }`}
              alt="Menu"
            />
          ) : (
            <img
              src="/close.svg"
              className="cursor-pointer fill-current mt-4 text-purple-900"
              alt="Close menu"
            />
          )}
        </div>

        {/* Nav items for lg and xl screens */}
        <div
          className={
            stickyNav
              ? "hidden lg:mt-10 xl:mt-12 lg:block uppercase text-brand-purple"
              : "hidden lg:mt-4 lg:block uppercase text-purple-200"
          }
        >
          <ul className="flex">
            <li className="nav-item lg:mr-12 hover:scale-110">
              <Link href="/process">
                <a>How It Works</a>
              </Link>
            </li>
            <li className="nav-item lg:mr-10 xl:mr-12 hover:scale-110">
              <Link href="/ourstory">
                <a>Our Story</a>
              </Link>
            </li>
            <li className="nav-item lg:mr-10 xl:mr-12 hover:scale-110">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
            <li className="nav-item lg:mr-10 xl:mr-12 hover:scale-110">
              <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3">
                <Link href="/register">
                  <a>Sign Up</a>
                </Link>
              </span>
            </li>
          </ul>
        </div>

        {/* ******* Menu overlay for small and medium screens  ******* */}

        {/* Check styes.css for definition of overlay-toggle and overlay-items */}
        <div
          id="menu"
          className={
            expanded
              ? "transform translate-x-0 overlay-toggle lg:hidden"
              : "transform translate-x-full overlay-toggle lg:hidden"
          }
        >
          <ul className="flex flex-col items-center justify-center mt-20">
            <li className="flex items-center mb-10">
              <img
                src="/brand.svg"
                alt="Logo for the NXT Door Deals brand"
                height="168px"
                width="168px"
              ></img>
            </li>
            <li className="overlay-items md:text-2xl hover:scale-125 hover:text-brand-purple">
              <Link href="/process">
                <span className="">
                  <a>How It Works</a>
                </span>
              </Link>
            </li>
            <li className="overlay-items md:text-2xl hover:scale-125 hover:text-brand-purple">
              <Link href="/ourstory">
                <span>
                  <a>Our Story</a>
                </span>
              </Link>
            </li>
            <li className="overlay-items md:text-2xl hover:scale-125 hover:text-brand-purple">
              <Link href="/login">
                <span>
                  <a>Login</a>
                </span>
              </Link>
            </li>
            <li className="overlay-items md:text-2xl hover:scale-125 hover:text-brand-purple">
              <Link href="/register">
                <span>
                  <a>Sign Up</a>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
