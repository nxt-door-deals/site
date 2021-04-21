import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faUserSecret,
  faCookieBite,
  faClipboardList,
  faEnvelope,
  faHeart,
  faBinoculars,
  faPlusCircle,
  faQuestionCircle,
  faBookOpen,
  faUserNinja,
  faBuilding,
  faBlog,
  faRss,
  faShieldVirus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// Component import
import Contact from "../forms/Contact";

Modal.setAppElement("#__next");

var currentYear = new Date().getFullYear();

const variants = {
  hover: {
    scale: 1.04,
    cursor: "pointer",
  },
  transition: {
    duration: 0.5,
  },
};

const Footer = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  return (
    <div
      role="contentinfo"
      aria-label="Footer"
      className={`${props.footerGradientClass} + " bg-gradient-to-r p-5 shadow-footerShadow text-purple-50 "`}
    >
      <div className="mt-14 text-center">
        <Image
          src={"/images/site/icon.png"}
          width={150}
          height={80}
          alt={"Logo for the nxtdoordeals.com brand"}
        />
      </div>

      <div className="text-center">
        <p className="tracking-wide">
          &copy; {currentYear} nxtdoordeals.com. All rights reserved.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 pt-16">
        <div className="flex items-center flex-col text-sm tracking-wide">
          <h2 className="pb-5 text-xl">nxtdoordeals.com</h2>

          <ul className="grid grid-cols-2 gap-1">
            <li className="pb-3 px-2">
              <Link href="/ourstory">
                <a aria-label="Link to the our story page">
                  <FontAwesomeIcon icon={faBook} className="mr-1" />{" "}
                  <span className="pb-1 styled-link">Our Story</span>
                </a>
              </Link>
            </li>

            <li className="pb-3 px-2">
              <Link href="/blog">
                <a aria-label="Link to our blog">
                  <FontAwesomeIcon icon={faBlog} className="mr-1" />{" "}
                  <span className="pb-1 styled-link">Blog</span>
                </a>
              </Link>
            </li>

            <li className="pb-3 px-2">
              <Link href="/rss/feed.xml">
                <a aria-label="Link to our rss feed">
                  <FontAwesomeIcon icon={faRss} className="mr-1" />{" "}
                  <span className="pb-1 styled-link">RSS</span>
                </a>
              </Link>
            </li>

            <li className="pb-3 px-2">
              <Link href="/policies/#privacy">
                <a aria-label="Link to the privacy policy page">
                  <FontAwesomeIcon icon={faUserSecret} className="mr-1" />
                  <span className="pb-1 styled-link">Privacy Policy</span>
                </a>
              </Link>{" "}
            </li>

            <li className="pb-3 px-2">
              <Link href="/policies/#cookie">
                <a aria-label="Link to the cookie policy page">
                  <FontAwesomeIcon icon={faCookieBite} className="mr-1" />{" "}
                  <span className="pb-1 styled-link">Cookie Policy</span>
                </a>
              </Link>{" "}
            </li>

            <li className="pb-3 px-2">
              <Link href="/policies/#terms">
                <a aria-label="Link to the terms of use page">
                  <FontAwesomeIcon icon={faClipboardList} className="mr-1" />{" "}
                  <span className="pb-1 styled-link">Terms of Use</span>
                </a>
              </Link>{" "}
            </li>

            <li className="pb-3 px-2">
              <Link href="/faqs#grid">
                <a aria-label="Link to the faqs page">
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" />{" "}
                  <span className="pb-1 styled-link">FAQs</span>
                </a>
              </Link>
            </li>

            <li className="pb-3 px-2">
              <Link href="/guidelines">
                <a aria-label="Link to the guidelines page">
                  <FontAwesomeIcon icon={faBookOpen} className="mr-1" />{" "}
                  <span className="pb-1 styled-link">Guidelines</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="pt-16 md:pt-0 flex items-center flex-col tracking-wide">
          <h2 className="pb-5 text-xl">COVID 19</h2>
          <Link href="/covid">
            <a aria-label="Link to the COVID 19 guidelines page text-lg">
              <FontAwesomeIcon icon={faShieldVirus} className="mr-1" />
              <span className="pb-1 styled-link">Safety Guidelines</span>
            </a>
          </Link>
        </div>

        <div className="py-16 md:pt-0">
          <h2 className="text-center text-xl pb-5 tracking-wide">
            Feeling Social?
          </h2>
          {/* Social icons */}
          <div className="flex justify-center text-3xl">
            <Link
              href="https://www.facebook.com/Nxtdoordeals-113561124163177"
              passHref={true}
            >
              <motion.a
                rel="noopener"
                variants={variants}
                whileHover="hover"
                target="_blank"
                className="mr-4"
                aria-label="Link to our facebook page"
              >
                <FontAwesomeIcon icon={faFacebookSquare} />
              </motion.a>
            </Link>{" "}
            <Link
              href="https://www.instagram.com/nxtdoordeals/"
              passHref={true}
            >
              <motion.a
                rel="noopener"
                variants={variants}
                whileHover="hover"
                target="_blank"
                className="mr-4"
                aria-label="Link to our instagram page"
              >
                <FontAwesomeIcon icon={faInstagramSquare} />
              </motion.a>
            </Link>{" "}
            <Link
              href="https://www.linkedin.com/company/nxtdoordeals/"
              passHref={true}
            >
              <motion.a
                rel="noopener"
                variants={variants}
                whileHover="hover"
                target="_blank"
                className="mr-4"
                aria-label="Link to our linkedin page"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </motion.a>
            </Link>{" "}
            <Link
              href="https://www.youtube.com/channel/UCSivOzzPcsER8DZbByEniBw"
              passHref={true}
            >
              <motion.a
                rel="noopener"
                variants={variants}
                whileHover="hover"
                target="_blank"
                className="mr-4"
                aria-label="Link to our youtube channel"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </motion.a>
            </Link>{" "}
            <motion.div
              variants={variants}
              whileHover="hover"
              onClick={() => setIsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl pb-5 tracking-wide">Get Started Today!</h2>
          <div className="flex flex-col items-start justify-center pb-16 tracking-wide">
            <Link href="/#header">
              <a
                className="px-2 pb-3"
                aria-label="Link redirects focus to the browse ads text box"
              >
                <FontAwesomeIcon icon={faBinoculars} className="mr-1" />
                <span className="pb-1 styled-link">Browse Ads</span>
              </a>
            </Link>{" "}
            {props.pathname !== "/postad" && (
              <Link href="/postad">
                <a
                  className="px-2 pb-3"
                  aria-label="Link to the post a free ad page"
                >
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
                  <span className="pb-1 styled-link">Post Free Ad</span>
                </a>
              </Link>
            )}{" "}
            {props.pathname !== "/account" && (
              <Link href="/account">
                <a
                  className="px-2 pb-3"
                  aria-label="Link to the user account page"
                >
                  <FontAwesomeIcon icon={faUserNinja} className="mr-1" />
                  <span className="pb-1 styled-link">My Account</span>
                </a>
              </Link>
            )}{" "}
            {!props.pathname.startsWith("/neighbourhood/ads") && user && user && (
              <Link href={`/neighbourhood/ads/${user && user.apartment_id}`}>
                <a
                  className="px-2 pb-3"
                  aria-label="Link to the my apartment page"
                >
                  <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                  <span className="pb-1 styled-link">My Apartment</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center lg:pt-8 pb-2 text-sm tracking-wide">
        Made with{" "}
        <span className="pl-1 pr-1">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-red-600 animate-pulse"
          />
        </span>{" "}
        in Bangalore for
        <span className="pl-1.5 align-middle pt-1.75">
          <Image
            src={"/images/misc/flag.svg"}
            alt="Indian flag"
            width={16}
            height={16}
          />
        </span>
      </div>

      <Modal
        style={{
          overlay: {
            zIndex: 99999,
          },
        }}
        aria={{
          label: "Contact us form",
        }}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnEsc={true}
        shouldFocusAfterRender={true}
        className="absolute right-0 bottom-0 mb-5 mr-3 ml-3 outline-none rounded-md"
      >
        <Contact setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Footer;
