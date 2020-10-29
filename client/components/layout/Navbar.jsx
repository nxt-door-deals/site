import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import AuthContext from "../../context/auth/authContext";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import Modal from "react-modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

// Component imports
import Contact from "../forms/Contact"

const cookie = new Cookies();

const variants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5,
    },
    cursor: "pointer",
  },
};

const Navbar = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const [cookiePresent, setCookiePresent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  useEffect(() => {
    if (cookie.get("nddToken")) {
      setCookiePresent(true);
    }

    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

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

  return (
    <Fragment>
      {/* ******* Navbar ******* */}
      <nav
        className={
          stickyNav
            ? props.navBgColor + " fixed basic-nav opacity-93 z-30 transition duration-500 ease-in-out shadow-md " + props.navShadow
            : "fixed basic-nav bg-none"
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
        <div className="lg:hidden mt-2 mr-6 z-50" onClick={toggleNav}>
          {!expanded ? (
            <FontAwesomeIcon
              icon={faBars}
              className={`cursor-pointer fill-current text-lg mt-4 ${
                stickyNav ? "text-purple-900" : props.faIconTextColor
              }`}
              alt="Open Menu"
            />
          ) : (
            <motion.div
              whileHover={{rotate: 180, style: {origin: 0}, transition: {duration: 0.5}}}
              className="cursor-pointer mt-4 text-purple-900 text-lg"
              alt="Close Menu"
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </motion.div>
          )}
        </div>

        {/* Nav items for lg and xl screens */}
        <div
          className={
            stickyNav
              ? "hidden lg:mt-10 lg:block uppercase " + props.navOverlayTextColor
              : "hidden lg:mt-4 lg:block uppercase " + props.navTextColor 
          }
        >

        {/* Navbar on the landing page */}
        {props.pathname == "/" && <ul className="flex">
          <li className="nav-item lg:mr-10 hover:scale-110">
            <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 ">
              <Link href="/post-ad">
                <a>Post Ad</a>
              </Link>
              </span>
            </li>
            <li className="nav-item lg:mr-10 hover:scale-110">
              <Link href="#how-it-works">
                <a>How It Works</a>
              </Link>
            </li>
            <li className="nav-item lg:mr-10 hover:scale-110">
              <Link href="/ourstory">
                <a>Our Story</a>
              </Link>
            </li>
            <li className="nav-item lg:mr-10 hover:scale-110">
              {!cookiePresent ? (
                <Link href="/login">
                  <a>Login</a>
                </Link>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    logout();
                    Router.reload("/")
                  }}
                >
                  Logout
                </div>
              )}
            </li>
            <li className="nav-item lg:mr-12 hover:scale-110">
              <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3">
                {!cookiePresent ? (
                  <Link href="/registeruser">
                    <a>Sign Up</a>
                  </Link>
                ) : (
                  <Link href="/register">
                    <a>
                      <span className="text-brand-purple">My</span>{" "}
                      Neighbourhood
                    </a>
                  </Link>
                )}
              </span>
            </li>
          </ul>}

          {/* Navbar on the login and user register pages */}
          {(props.pathname == "/registeruser" || props.pathname == "/login") && <ul className="flex">
            <li className="nav-item lg:mr-12 hover:scale-110">
              <Link href="/#how-it-works">
                <a>How It Works</a>
              </Link>
            </li>
            <li className="nav-item lg:mr-12 hover:scale-110">
              <Link href="/ourstory">
                <a>Our Story</a>
              </Link>
            </li>
          </ul>}
        </div>

        {/* ******* Menu overlay for small and medium screens  ******* */}

        {/* Check styes.css for definition of overlay-toggle and overlay-items */}
        <div
          id="menu"
          className={
            expanded
              ? "transform translate-x-0 overlay-toggle overflow-scroll lg:hidden " + props.navBgColor
              : "transform translate-x-full overlay-toggle overflow-scroll lg:hidden"
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

            {/* Overlay items for landing page */}
            {props.pathname === "/" && <Fragment><li className={"overlay-items md:text-2xl hover:scale-125 " + props.navOverlayTextColor}>
              <Link href="#how-it-works">
                <span className="">
                  <a onClick={() => setExpanded(false)}>How It Works</a>
                </span>
              </Link>
            </li>
            <li className={"overlay-items md:text-2xl hover:scale-125 " + props.navOverlayTextColor}>
              <Link href="/ourstory">
                <span>
                  <a>Our Story</a>
                </span>
              </Link>
            </li>
            <li className={"overlay-items md:text-2xl hover:scale-125 " + props.navOverlayTextColor}>
              {!cookiePresent ? (
                <Link href="/login">
                  <a>Login</a>
                </Link>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    logout();
                    Router.reload("/");
                  }}
                >
                  Logout
                </div>
              )}
            </li>
            <li className={"overlay-items md:text-2xl hover:scale-125 " + props.navOverlayTextColor}>
              {!cookiePresent ? (
                <Link href="/registeruser">
                  <a>Sign Up</a>
                </Link>
              ) : (
                <Link href="/register">
                  <a>My Neighbourhood</a>
                </Link>
              )}
            </li></Fragment>}
            
            {/* Overlay icons for the login and register pages */}
            {(props.pathname == "/registeruser" || props.pathname == "/login") && <Fragment><li className={"overlay-items md:text-2xl hover:scale-125 " + props.navOverlayTextColor}>
              <Link href="/#how-it-works">          
                  <a>How It Works</a>
              </Link>
            </li>
            <li className={"overlay-items md:text-2xl hover:scale-125 " + props.navOverlayTextColor}>
              <Link href="/ourstory">
                <span>
                  <a>Our Story</a>
                </span>
              </Link>
            </li></Fragment>}
          </ul>
          
          {/* Social icons */}
          <div className="p-4">
            <hr className={`${"border-" + props.hrTextColor} ${"bg-" + props.hrTextColor} border-1 border-dotted`}></hr>

            <div className="flex justify-center pt-4 text-3xl">
              <Link href="https://facebook.com" passHref={true}>
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  target="_blank"
                  className="mr-4"
                >
                  <FontAwesomeIcon icon={faFacebookSquare} className={props.navOverlayTextColor}/>
                </motion.a>
              </Link>{" "}
              <Link href="https://instagram.com" passHref={true}>
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  target="_blank"
                  className="mr-4"
                >
                  <FontAwesomeIcon icon={faInstagramSquare} className={props.navOverlayTextColor}/>
                </motion.a>
              </Link>{" "}
              <motion.div
                variants={variants}
                whileHover="hover"
                onClick={() => {
                    setIsModalOpen(true)
                    setExpanded(false)
                }}
                className={props.navOverlayTextColor}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </motion.div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnEsc={true}
          shouldFocusAfterRender={true}
          className="absolute bottom-0 m-4 outline-none rounded-md"
        >
          <Contact setIsModalOpen={setIsModalOpen} />
        </Modal>
      </nav>
    </Fragment>
  );
};

export default Navbar;
