import { Fragment, useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "../../context/auth/authContext";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStream, faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  brand,
  facebook,
  instagram,
  youtube,
  linkedin,
  email,
} from "../../utils/siteImages";

// Component imports
import Contact from "../forms/Contact";

const variants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5,
    },
    cursor: "pointer",
  },
};

const overlayModalVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Navbar = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState();

  const modalButtonTheme = useRef("");

  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;

  props.navStyle.pathname === "/registeruser" ||
  props.navStyle.pathname.includes("/register/neighbourhood")
    ? (modalButtonTheme.current = "blue")
    : (modalButtonTheme.current = "purple");

  const updateCurrentWindowWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCurrentWindowWidth);
    return () => window.removeEventListener("resize", updateCurrentWindowWidth);
  }, []);

  useEffect(() => {
    if (width > 1023) {
      setExpanded(false);
    }
  }, [width]);

  useEffect(() => {
    let mounted = true;
    // if (cookie.get("nddToken") && mounted) {
    //   loadUser();
    // }

    if (
      typeof window !== "undefined" &&
      localStorage.getItem("nddToken") &&
      mounted
    ) {
      loadUser();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
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
        role="navigation"
        aria-label="navigation bar"
        className={
          stickyNav
            ? props.navStyle.navBgColor +
              " fixed basic-nav z-20 lg:shadow-lg opacity-100 transition duration-500 ease-in-out " +
              props.navStyle.navShadow
            : "fixed basic-nav bg-none"
        }
      >
        <motion.div
          id="brand"
          className="hidden lg:inline relative ml-4 lg:pl-4 "
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
            type: "spring",
          }}
        >
          <Link href="/">
            <a className="focus-within:outline-none">
              <Image
                src={brand}
                alt="Logo for the nxtdoordeals.com brand"
                width={100}
                height={100}
              />
            </a>
          </Link>
        </motion.div>

        {/* Menu icons - humburger or close */}
        <div
          className="lg:hidden absolute right-2 mt-2 mr-6"
          onClick={toggleNav}
        >
          {!stickyNav ? (
            <FontAwesomeIcon
              icon={faStream}
              className={
                "cursor-pointer text-brand-gray text-xl mt-4 " +
                props.navStyle.faIconTextColor
              }
              alt="Open Menu"
            />
          ) : (
            <div className="mt-4 w-12 h-12 rounded-full text-lg bg-purple-100 text-brand-gray p-4 relative cursor-pointer shadow-scrollToTopShadow">
              <FontAwesomeIcon
                icon={faStream}
                alt="Open Menu"
                className="absolute top-4 right-4"
              />
            </div>
          )}
        </div>

        {/* Nav items for lg and xl screens */}
        <motion.div
          initial={{ x: "1000vw" }}
          animate={{ x: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            type: "tween",
          }}
          className={
            stickyNav
              ? "hidden lg:mt-10 lg:block uppercase " +
                props.navStyle.navOverlayTextColor
              : "hidden lg:mt-4 lg:block uppercase " +
                props.navStyle.navTextColor
          }
        >
          {/* Navbar on the landing page */}
          {props.navStyle.pathname === "/" && (
            <ul className="flex">
              <li className="nav-item lg:mx-3 hover:scale-110">
                <span
                  className={`hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl ${
                    stickyNav ? "border-3 border-brand-purple" : ""
                  }`}
                >
                  <Link href="/postad">
                    <a className="pb-1 styled-link">Post Free Ad</a>
                  </Link>
                </span>
              </li>
              {/* <li className="nav-item lg:mx-3 hover:scale-110">
                <Link href="/blog">
                  <a className="pb-1 styled-link">Blog</a>
                </Link>
              </li> */}

              <li className="nav-item lg:mx-3 hover:scale-110">
                <Link href="#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-3 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
              {user && user && (
                <li className="nav-item lg:mx-3 hover:scale-110">
                  <Link href="/account">
                    <a className="relative pb-1 styled-link">
                      {props.chatNotification.current && (
                        <span className="absolute -right-2.5 -top-2.5 animate-pulse">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="text-xxs text-notification-red"
                          />
                        </span>
                      )}
                      My Account
                    </a>
                  </Link>
                </li>
              )}
              <li className="nav-item lg:mx-3 hover:scale-110">
                {!user ? (
                  <Link href="/login">
                    <a className="pb-1 styled-link">Login</a>
                  </Link>
                ) : (
                  <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl">
                    <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                      <a className="pb-1 styled-link">My Apartment</a>
                    </Link>
                  </span>
                )}
              </li>
              <li className="nav-item lg:mx-3 hover:scale-110">
                {!user ? (
                  <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl">
                    <Link href="/registeruser">
                      <a className="pb-1 styled-link">Sign Up</a>
                    </Link>
                  </span>
                ) : (
                  <Link href="/logout" as="/">
                    <a className="pb-1 styled-link">Logout</a>
                  </Link>
                )}
              </li>
            </ul>
          )}

          {/* Navbar on the our story page */}
          {props.navStyle.pathname === "/ourstory" && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/blog">
                  <a className="pb-1 styled-link">Blog</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                {user === null ? (
                  <Link href="/login">
                    <a className="pb-1 styled-link">Login</a>
                  </Link>
                ) : (
                  <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl">
                    <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                      <a className="pb-1 styled-link">My Apartment</a>
                    </Link>
                  </span>
                )}
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                {user === null ? (
                  <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl">
                    <Link href="/registeruser">
                      <a className="pb-1 styled-link">Sign Up</a>
                    </Link>
                  </span>
                ) : (
                  <Link href="/logout" as="/">
                    <a className="pb-1 styled-link">Logout</a>
                  </Link>
                )}
              </li>
            </ul>
          )}

          {/* Navbar on the ads page */}
          {(props.navStyle.pathname.startsWith("/ads") ||
            props.navStyle.pathname.startsWith("/neighbourhood/ads")) && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                {user === null ? (
                  <Link href="/login">
                    <a className="pb-1 styled-link">Login</a>
                  </Link>
                ) : (
                  <Link href="/account">
                    <a className="relative pb-1 styled-link">
                      {props.chatNotification.current && (
                        <span className="absolute -right-2.5 -top-2.5 animate-pulse">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="text-xxs text-notification-red"
                          />
                        </span>
                      )}
                      My Account
                    </a>
                  </Link>
                )}
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                {user === null ? (
                  <Link href="/registeruser">
                    <a className="pb-1 styled-link">Sign Up</a>
                  </Link>
                ) : (
                  <Link href="/logout" as="/">
                    <a className="pb-1 styled-link">Logout</a>
                  </Link>
                )}
              </li>
            </ul>
          )}

          {/* Navbar on the subscription page */}
          {props.navStyle.pathname === "/subscription" && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
            </ul>
          )}

          {/* Navbar on the login and user register pages */}
          {(props.navStyle.pathname === "/registeruser" ||
            props.navStyle.pathname === "/login" ||
            props.navStyle.pathname === "/forgotpassword" ||
            props.navStyle.pathname.startsWith("/register/neighbourhood") ||
            props.navStyle.pathname.includes("/verifyemail")) && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
            </ul>
          )}

          {/* Navbar on the blog page */}
          {props.navStyle.pathname.includes("/blog") && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
            </ul>
          )}

          {/* Navbar on the postad and chat */}
          {(props.navStyle.pathname === "/postad" ||
            props.navStyle.pathname.includes("/chat")) && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href={`/neighbourhood/ads/${user && user.apartment_id}`}>
                  <a className="pb-1 styled-link">My Apartment</a>
                </Link>
              </li>

              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/account">
                  <a className="relative pb-1 styled-link">
                    {props.chatNotification.current && (
                      <span className="absolute -right-2.5 -top-2.5 animate-pulse">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-xxs text-notification-red"
                        />
                      </span>
                    )}
                    My Account
                  </a>
                </Link>
              </li>

              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/logout" as="/">
                  <a className="pb-1 styled-link">Logout</a>
                </Link>
              </li>
            </ul>
          )}

          {/* Navbar on the report ads page */}
          {(props.navStyle.pathname.includes("/reportad") ||
            props.navStyle.pathname.includes("/faqs") ||
            props.navStyle.pathname === "/guidelines" ||
            props.navStyle.pathname === "/policies" ||
            props.navStyle.pathname === "/covid") && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                {user === null ? (
                  <Link href="/login">
                    <a className="pb-1 styled-link">Login</a>
                  </Link>
                ) : (
                  <Link href="/logout" as="/">
                    <a className="pb-1 styled-link">Logout</a>
                  </Link>
                )}
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl">
                  {user === null && (
                    <Link href="/registeruser">
                      <a className="pb-1 styled-link">Sign Up</a>
                    </Link>
                  )}
                  {user && user && (
                    <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                      <a className="pb-1 styled-link">My Apartment</a>
                    </Link>
                  )}
                </span>
              </li>
            </ul>
          )}

          {/* Navbar on the user account page */}
          {props.navStyle.pathname.includes("/account") && (
            <ul className="flex">
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/">
                  <a className="pb-1 styled-link">Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a className="pb-1 styled-link">How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/ourstory">
                  <a className="pb-1 styled-link">Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mx-4 hover:scale-110">
                {user && user && (
                  <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                    <a className="pb-1 styled-link">My Apartment</a>
                  </Link>
                )}
              </li>

              <li className="nav-item lg:mx-4 hover:scale-110">
                <Link href="/logout" as="/">
                  <a className="pb-1 styled-link">Logout</a>
                </Link>
              </li>
            </ul>
          )}
        </motion.div>

        {/* ******* Menu overlay for small and medium screens  ******* */}

        {/* Check styles.css for definition of overlay-toggle and overlay-items */}
        <div id="menu" className="lg:hidden focus-within:outline-none">
          <Modal
            style={{
              overlay: {
                background: "var(--modal-overlay-color)",
                zIndex: 99999,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              content: {
                top: "50%",
                left: "50%",
                height: width < 767 ? "80vh" : "70vh",
                width: width < 767 ? "80vw" : "70vw",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                overflowY: "scroll",
              },
            }}
            isOpen={expanded}
            onRequestClose={() => setIsModalOpen(false)}
            shouldCloseOnEsc={true}
            shouldFocusAfterRender={true}
          >
            <motion.div
              variants={overlayModalVariant}
              initial="initial"
              animate="animate"
              className="lg:hidden opacity-100 bg-white focus-within:outline-none "
            >
              <div
                className="cursor-pointer text-brand-gray text-lg mt-4 absolute right-4 top-2"
                alt="Close Menu"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="close-button-animation"
                  onClick={() => toggleNav()}
                />
              </div>
              <ul className="flex flex-col items-center mt-6">
                <li className="flex items-center mb-10">
                  <Link href="/">
                    <a className="focus-within:outline-none">
                      <Image
                        src={brand}
                        alt="Logo for the NXT Door Deals brand"
                        height={120}
                        width={120}
                      />
                    </a>
                  </Link>
                </li>

                {/* Overlay items for landing page */}
                {props.navStyle.pathname === "/" && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/postad">
                        <a className="pb-1 styled-link">Post Free Ad</a>
                      </Link>
                    </li>
                    {/* <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/blog">
                        <a className="pb-1 styled-link">Blog</a>
                      </Link>
                    </li> */}
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="#how-it-works">
                        <a
                          className="pb-1 styled-link"
                          onClick={() => setExpanded(false)}
                        >
                          How It Works
                        </a>
                      </Link>
                    </li>

                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/ourstory">
                        <a className="pb-1 styled-link">Our Story</a>
                      </Link>
                    </li>
                    {user && user && (
                      <li
                        className={
                          "overlay-items md:text-xl hover:scale-125 " +
                          props.navStyle.navOverlayTextColor
                        }
                      >
                        <Link href="/account">
                          <a className="pb-1 styled-link">
                            {props.chatNotification.current && (
                              <span className="absolute -right-2.5 -top-2.5 animate-pulse">
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  className="text-xxs text-notification-red"
                                />
                              </span>
                            )}
                            My Account
                          </a>
                        </Link>
                      </li>
                    )}
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null ? (
                        <Link href="/login">
                          <a className="pb-1 styled-link">Login</a>
                        </Link>
                      ) : (
                        <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                          <a className="pb-1 styled-link">My Apartment</a>
                        </Link>
                      )}
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null ? (
                        <Link href="/registeruser">
                          <a className="pb-1 styled-link">Sign Up</a>
                        </Link>
                      ) : (
                        <Link href="/logout" as="/">
                          <a className="pb-1 styled-link">Logout</a>
                        </Link>
                      )}
                    </li>
                  </Fragment>
                )}

                {/* Overlay items for the our story page */}
                {props.navStyle.pathname === "/ourstory" && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/blog">
                        <a
                          className="pb-1 styled-link"
                          onClick={() => setExpanded(false)}
                        >
                          Blog
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/#how-it-works">
                        <a
                          className="pb-1 styled-link"
                          onClick={() => setExpanded(false)}
                        >
                          How It Works
                        </a>
                      </Link>
                    </li>

                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null ? (
                        <Link href="/login">
                          <a className="pb-1 styled-link">Login</a>
                        </Link>
                      ) : (
                        <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                          <a className="pb-1 styled-link">My Apartment</a>
                        </Link>
                      )}
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null ? (
                        <Link href="/registeruser">
                          <a className="pb-1 styled-link">Sign Up</a>
                        </Link>
                      ) : (
                        <Link href="/logout" as="/">
                          <a className="pb-1 styled-link">Logout</a>
                        </Link>
                      )}
                    </li>
                  </Fragment>
                )}

                {/* Overlay items for the browse ads page */}
                {(props.navStyle.pathname.startsWith("/ads") ||
                  props.navStyle.pathname.startsWith("/neighbourhood/ads")) && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/#how-it-works">
                        <a
                          className="pb-1 styled-link"
                          onClick={() => setExpanded(false)}
                        >
                          How It Works
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/ourstory">
                        <a className="pb-1 styled-link">Our Story</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null ? (
                        <Link href="/login">
                          <a className="pb-1 styled-link">Login</a>
                        </Link>
                      ) : (
                        <Link href="/account">
                          <a className="pb-1 styled-link">
                            {props.chatNotification.current && (
                              <span className="absolute -right-2.5 -top-2.5 animate-pulse">
                                <FontAwesomeIcon
                                  icon={faCircle}
                                  className="text-xxs text-notification-red"
                                />
                              </span>
                            )}
                            My Account
                          </a>
                        </Link>
                      )}
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null ? (
                        <Link href="/registeruser">
                          <a className="pb-1 styled-link">Sign Up</a>
                        </Link>
                      ) : (
                        <Link href="/logout" as="/">
                          <a className="pb-1 styled-link">Logout</a>
                        </Link>
                      )}
                    </li>
                  </Fragment>
                )}

                {/* Overlay items for the subscriptions page */}
                {props.navStyle.pathname.includes("/subscription") && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/ourstory">
                        <a className="pb-1 styled-link">Our Story</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/#how-it-works">
                        <a
                          className="pb-1 styled-link"
                          onClick={() => setExpanded(false)}
                        >
                          How It Works
                        </a>
                      </Link>
                    </li>
                  </Fragment>
                )}

                {/* Overlay items for the login and register pages */}
                {(props.navStyle.pathname === "/registeruser" ||
                  props.navStyle.pathname === "/login" ||
                  props.navStyle.pathname === "/forgotpassword" ||
                  props.navStyle.pathname.startsWith(
                    "/register/neighbourhood"
                  ) ||
                  props.navStyle.pathname.includes("/verifyemail")) && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/#how-it-works">
                        <a className="pb-1 styled-link">How It Works</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/ourstory">
                        <a className="pb-1 styled-link">Our Story</a>
                      </Link>
                    </li>
                  </Fragment>
                )}

                {/* Overlay items for the blog pge */}
                {props.navStyle.pathname.includes("/blog") && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/ourstory">
                        <a className="pb-1 styled-link">Our Story</a>
                      </Link>
                    </li>
                  </Fragment>
                )}

                {/* Overlay icons for the post ad and chat pages */}
                {(props.navStyle.pathname === "/postad" ||
                  props.navStyle.pathname.includes("/chat")) && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/#how-it-works">
                        <a className="pb-1 styled-link">How It Works</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/ourstory">
                        <a className="pb-1 styled-link">Our Story</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link
                        href={`/neighbourhood/ads/${user && user.apartment_id}`}
                      >
                        <a className="pb-1 styled-link">My Apartment</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/account">
                        <a className="pb-1 styled-link">
                          {props.chatNotification.current && (
                            <span className="absolute -right-2.5 -top-2.5 animate-pulse">
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="text-xxs text-notification-red"
                              />
                            </span>
                          )}
                          My Account
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/logout" as="/">
                        <a className="pb-1 styled-link">Logout</a>
                      </Link>
                    </li>
                  </Fragment>
                )}

                {/* Overlay icons for the user account page */}
                {props.navStyle.pathname.includes("/account") && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/#how-it-works">
                        <a className="pb-1 styled-link">How It Works</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/ourstory">
                        <a className="pb-1 styled-link">Our Story</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user && user && (
                        <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                          <a className="pb-1 styled-link">My Apartment</a>
                        </Link>
                      )}
                    </li>

                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/logout" as="/">
                        <a className="pb-1 styled-link">Logout</a>
                      </Link>
                    </li>
                  </Fragment>
                )}

                {/* Overlay items for the report ads page */}
                {(props.navStyle.pathname.includes("/reportad") ||
                  props.navStyle.pathname.includes("/faqs") ||
                  props.navStyle.pathname === "/guidelines" ||
                  props.navStyle.pathname === "/policies" ||
                  props.navStyle.pathname === "/covid") && (
                  <Fragment>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/">
                        <a className="pb-1 styled-link">Home</a>
                      </Link>
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      <Link href="/#how-it-works">
                        <a
                          className="pb-1 styled-link"
                          onClick={() => setExpanded(false)}
                        >
                          How It Works
                        </a>
                      </Link>
                    </li>

                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null ? (
                        <Link href="/login">
                          <a className="pb-1 styled-link">Login</a>
                        </Link>
                      ) : (
                        <Link href="/logout" as="/">
                          <a className="pb-1 styled-link">Logout</a>
                        </Link>
                      )}
                    </li>
                    <li
                      className={
                        "overlay-items md:text-xl hover:scale-125 " +
                        props.navStyle.navOverlayTextColor
                      }
                    >
                      {user === null && (
                        <Link href="/registeruser">
                          <a className="pb-1 styled-link">Sign Up</a>
                        </Link>
                      )}
                      {user && user && (
                        <Link href={`/neighbourhood/ads/${user.apartment_id}`}>
                          <a className="pb-1 styled-link">My Apartment</a>
                        </Link>
                      )}
                    </li>
                  </Fragment>
                )}
              </ul>
              {/* Social icons */}
              <div className="px-4 py-2">
                <hr className={`${props.navStyle.hrStyle}`}></hr>

                <div className="flex justify-center pt-4 text-3xl">
                  <Link
                    href="https://www.facebook.com/Nxtdoordeals-113561124163177"
                    passHref={true}
                  >
                    <motion.a
                      variants={variants}
                      whileHover="hover"
                      target="_blank"
                      className="mr-4"
                      aria-label="Link to our facebook page"
                    >
                      {/* <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className={props.navStyle.navOverlayTextColor}
                  /> */}
                      <Image
                        src={facebook}
                        alt="Facebook icon"
                        height={30}
                        width={30}
                      />
                    </motion.a>
                  </Link>{" "}
                  <Link
                    href="https://www.instagram.com/nxtdoordeals/"
                    passHref={true}
                  >
                    <motion.a
                      variants={variants}
                      whileHover="hover"
                      target="_blank"
                      className="mr-4"
                      aria-label="Link to our instagram page"
                    >
                      {/* <FontAwesomeIcon
                    icon={faInstagramSquare}
                    className={props.navStyle.navOverlayTextColor}
                  /> */}
                      <Image
                        src={instagram}
                        alt="Instagram icon"
                        height={30}
                        width={30}
                      />
                    </motion.a>
                  </Link>{" "}
                  {/* <Link
                    href="https://www.linkedin.com/company/nxtdoordeals/"
                    passHref={true}
                  >
                    <motion.a
                      variants={variants}
                      whileHover="hover"
                      target="_blank"
                      className="mr-4"
                      aria-label="Link to our linkedin page"
                    >
                      <Image
                        src={linkedin}
                        alt="Linkedin icon"
                        height={30}
                        width={30}
                      />
                    </motion.a>
                  </Link> */}
                  <Link
                    href="https://www.youtube.com/channel/UCSivOzzPcsER8DZbByEniBw"
                    passHref={true}
                  >
                    <motion.a
                      variants={variants}
                      whileHover="hover"
                      target="_blank"
                      className="mr-4"
                      aria-label="Link to our youtube channel"
                    >
                      {/* <FontAwesomeIcon
                    icon={faYoutube}
                    className={props.navStyle.navOverlayTextColor}
                  /> */}
                      <Image
                        src={youtube}
                        alt="Youtube icon"
                        height={30}
                        width={30}
                      />
                    </motion.a>
                  </Link>{" "}
                  <motion.div
                    variants={variants}
                    whileHover="hover"
                    onClick={() => {
                      setIsModalOpen(true);
                      setExpanded(false);
                    }}
                    className={props.navStyle.navOverlayTextColor}
                  >
                    {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                    <Image
                      src={email}
                      alt="Email icon"
                      height={30}
                      width={30}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Modal>
        </div>

        <Modal
          style={{
            overlay: {
              zIndex: 99999,
              opacity: 1,
              background: "var(--modal-overlay-color)",
            },
          }}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          shouldCloseOnEsc={true}
          shouldFocusAfterRender={true}
          className="absolute right-0 bottom-0 mb-5 mr-3 ml-3 outline-none"
        >
          <Contact
            setIsModalOpen={setIsModalOpen}
            modalButtonTheme={modalButtonTheme.current}
          />
        </Modal>
      </nav>
    </Fragment>
  );
};

export default Navbar;
