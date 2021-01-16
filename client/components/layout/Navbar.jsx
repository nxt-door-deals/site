import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth/authContext";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faEnvelope,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

// Component imports
import Contact from "../forms/Contact";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const { logout, loadUser, user } = authContext;

  useEffect(() => {
    if (cookie.get("nddToken")) {
      loadUser();
    }
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

  // Logout toast
  const logoutToast = () =>
    toast("You are being logged out. Have a nice day :)", {
      draggablePercent: 60,
      position: "top-center",
    });

  return (
    <Fragment>
      {/* ******* Navbar ******* */}
      <nav
        className={
          stickyNav
            ? props.navStyle.navBgColor +
              " fixed basic-nav z-30 opacity-98 transition duration-500 ease-in-out lg:shadow-md " +
              props.navStyle.navShadow
            : "fixed basic-nav bg-none z-30"
        }
      >
        <motion.div
          id="brand"
          className="opacity-0 lg:opacity-100 relative ml-4 lg:pl-4 focus:outline-none outline-none"
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
              <Image
                src="/images/nav/brand.svg"
                alt="Logo for the NXT Door Deals brand"
                width={100}
                height={100}
              ></Image>
            </a>
          </Link>
        </motion.div>

        {/* Menu icons - humburger or close */}
        <div className="lg:hidden mt-2 mr-6 z-50" onClick={toggleNav}>
          {!expanded ? (
            !stickyNav ? (
              <FontAwesomeIcon
                icon={faStream}
                className={
                  "cursor-pointer text-lg mt-4 " +
                  props.navStyle.faIconTextColor
                }
                alt="Open Menu"
              />
            ) : (
              <div className="mt-4 w-12 h-12 rounded-full text-lg bg-purple-100 text-purple-900 p-4 relative shadow-lg opacity-90 cursor-pointer">
                <FontAwesomeIcon
                  icon={faStream}
                  alt="Open Menu"
                  className="absolute top-4 right-4"
                />
              </div>
            )
          ) : (
            <div
              className="cursor-pointer mt-4 text-purple-900 text-lg"
              alt="Close Menu"
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          )}
        </div>

        {/* Nav items for lg and xl screens */}
        <div
          className={
            stickyNav
              ? "hidden lg:mt-10 lg:block uppercase " +
                props.navStyle.navOverlayTextColor
              : "hidden lg:mt-4 lg:block uppercase " +
                props.navStyle.navTextColor
          }
        >
          {/* Navbar on the landing page */}
          {props.navStyle.pathname == "/" && (
            <ul className="flex">
              <li className="nav-item lg:mr-4 hover:scale-110">
                <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl">
                  <Link href="/postad">
                    <a>Post Ad</a>
                  </Link>
                </span>
              </li>
              <li className="nav-item lg:mr-4 hover:scale-110">
                <Link href="/#how-it-works">
                  <a>How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-4 hover:scale-110">
                <Link href="/ourstory">
                  <a>Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-4 hover:scale-110">
                {user === null ? (
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      logoutToast();
                      logout();
                    }}
                  >
                    Logout
                  </div>
                )}
              </li>
              <li className="nav-item lg:mr-3 hover:scale-110">
                <span className="hidden lg:inline lg:bg-opacity-25 lg:bg-purple-400 p-3 rounded-xl">
                  {user === null && (
                    <Link href="/registeruser">
                      <a>Sign Up</a>
                    </Link>
                  )}
                  {user && user && (
                    <Link
                      href={`/ads/${user.apartment_name}/${user.apartment_id}`}
                    >
                      <a>My Neighbourhood</a>
                    </Link>
                  )}
                </span>
              </li>
            </ul>
          )}

          {/* Navbar on the ads page */}
          {props.navStyle.pathname.includes("/ads") && (
            <ul className="flex">
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/#how-it-works">
                  <a>How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/ourstory">
                  <a>Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                {user === null && (
                  <Link href="/registeruser">
                    <a>Sign Up</a>
                  </Link>
                )}
                {user && user && (
                  <Link href="/account">
                    <a>My Account</a>
                  </Link>
                )}
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                {user === null ? (
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      logoutToast();
                      logout();
                      setTimeout(() => router.push("/"), 500);
                    }}
                  >
                    Logout
                  </div>
                )}
              </li>
            </ul>
          )}

          {/* Navbar on the login and user register pages */}
          {(props.navStyle.pathname == "/registeruser" ||
            props.navStyle.pathname == "/login" ||
            props.navStyle.pathname == "/forgotpassword" ||
            props.navStyle.pathname.includes("/neighbourhood")) && (
            <ul className="flex">
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/#how-it-works">
                  <a>How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/ourstory">
                  <a>Our Story</a>
                </Link>
              </li>
            </ul>
          )}

          {/* Navbar on the postad */}
          {props.navStyle.pathname == "/postad" && (
            <ul className="flex">
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/#how-it-works">
                  <a>How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/ourstory">
                  <a>Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/account">
                  <a>
                    <span className="text-brand-purple">My</span> Account
                  </a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    logoutToast();
                    logout();
                    setTimeout(() => router.push("/"), 500);
                  }}
                >
                  Logout
                </div>
              </li>
            </ul>
          )}

          {/* Navbar on the user account page */}
          {props.navStyle.pathname == "/account" && (
            <ul className="flex">
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/#how-it-works">
                  <a>How It Works</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/ourstory">
                  <a>Our Story</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                {user && user && (
                  <Link
                    href={`/ads/${user.apartment_name}/${user.apartment_id}`}
                  >
                    <a>My Neighbourhood</a>
                  </Link>
                )}
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <Link href="/postad">
                  <a>Post Ad</a>
                </Link>
              </li>
              <li className="nav-item lg:mr-6 hover:scale-110">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </div>
              </li>
            </ul>
          )}
        </div>

        {/* ******* Menu overlay for small and medium screens  ******* */}

        {/* Check styles.css for definition of overlay-toggle and overlay-items */}
        <div
          id="menu"
          className={
            expanded
              ? "relative transform w-2/3 md:w-1/2 -translate-x-0 overlay-toggle opacity-98 shadow-lg overflow-hidden lg:hidden z-40 " +
                props.navStyle.navOverlayBgColor
              : "relative transform translate-x-full overlay-toggle overflow-scroll lg:hidden"
          }
        >
          <ul className="flex flex-col items-center mt-12">
            <li className="flex items-center mb-10">
              <Link href="/">
                <a>
                  <Image
                    src={"/images/nav/brand.svg"}
                    alt={"Logo for the NXT Door Deals brand"}
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
                    <a>Post Ad</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="#how-it-works">
                    <span className="">
                      <a onClick={() => setExpanded(false)}>How It Works</a>
                    </span>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/ourstory">
                    <span>
                      <a>Our Story</a>
                    </span>
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
                      <a>Login</a>
                    </Link>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        logoutToast();
                        logout();
                      }}
                    >
                      Logout
                    </div>
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
                      <a>Sign Up</a>
                    </Link>
                  )}
                  {user && user && (
                    <Link
                      href={`/ads/${user.apartment_name}/${user.apartment_id}`}
                    >
                      <a>My Neighbourhood</a>
                    </Link>
                  )}
                </li>
              </Fragment>
            )}

            {/* Overlay items for the browse ads page */}
            {props.navStyle.pathname.includes("/ads") && (
              <Fragment>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/">
                    <span>
                      <a>Home</a>
                    </span>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/ourstory">
                    <span>
                      <a>Our Story</a>
                    </span>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/#how-it-works">
                    <span className="">
                      <a onClick={() => setExpanded(false)}>How It Works</a>
                    </span>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  {user === null ? (
                    <Link href="/registeruser">
                      <a>Sign Up</a>
                    </Link>
                  ) : (
                    <Link href="/account">
                      <a>My Account</a>
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
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        logoutToast();
                        logout();
                        setTimeout(() => router.push("/"), 500);
                      }}
                    >
                      Logout
                    </div>
                  )}
                </li>
              </Fragment>
            )}

            {/* Overlay items for the login and register pages */}
            {(props.navStyle.pathname == "/registeruser" ||
              props.navStyle.pathname == "/login" ||
              props.navStyle.pathname == "/forgotpassword" ||
              props.navStyle.pathname.includes("/neighbourhood")) && (
              <Fragment>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/#how-it-works">
                    <a>How It Works</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/ourstory">
                    <span>
                      <a>Our Story</a>
                    </span>
                  </Link>
                </li>
              </Fragment>
            )}

            {/* Overlay icons for the post ad page */}
            {props.navStyle.pathname == "/postad" && (
              <Fragment>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/#how-it-works">
                    <a>How It Works</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/ourstory">
                    <span>
                      <a>Our Story</a>
                    </span>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/ourstory">
                    <a>
                      <span className="text-brand-purple">My</span> Account
                    </a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      logoutToast();
                      logout();
                      setTimeout(() => router.push("/"), 500);
                    }}
                  >
                    Logout
                  </div>
                </li>
              </Fragment>
            )}

            {/* Overlay icons for the user account page */}
            {props.navStyle.pathname == "/account" && (
              <Fragment>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/#how-it-works">
                    <a>How It Works</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/ourstory">
                    <a>Our Story</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  {user && user && (
                    <Link
                      href={`/ads/${user.apartment_name}/${user.apartment_id}`}
                    >
                      <a>My Neighbourhood</a>
                    </Link>
                  )}
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <Link href="/postad">
                    <a>Post Ad</a>
                  </Link>
                </li>
                <li
                  className={
                    "overlay-items md:text-xl hover:scale-125 " +
                    props.navStyle.navOverlayTextColor
                  }
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </div>
                </li>
              </Fragment>
            )}
          </ul>

          {/* Social icons */}
          <div className="px-4 py-2">
            <hr
              className={`${"border-" + props.navStyle.hrTextColor} ${
                "bg-" + props.navStyle.hrTextColor
              } border-1 border-dotted`}
            ></hr>

            <div className="flex justify-center pt-4 text-3xl">
              <Link href="https://facebook.com" passHref={true}>
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  target="_blank"
                  className="mr-4"
                >
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className={props.navStyle.navOverlayTextColor}
                  />
                </motion.a>
              </Link>{" "}
              <Link href="https://instagram.com" passHref={true}>
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  target="_blank"
                  className="mr-4"
                >
                  <FontAwesomeIcon
                    icon={faInstagramSquare}
                    className={props.navStyle.navOverlayTextColor}
                  />
                </motion.a>
              </Link>{" "}
              <Link href="https://linkedin.com" passHref={true}>
                <motion.a
                  variants={variants}
                  whileHover="hover"
                  target="_blank"
                  className="mr-4"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className={props.navStyle.navOverlayTextColor}
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
          className="absolute right-0 bottom-0 mb-5 mr-3 ml-3 outline-none rounded-md"
        >
          <Contact setIsModalOpen={setIsModalOpen} />
        </Modal>
      </nav>
    </Fragment>
  );
};

export default Navbar;
