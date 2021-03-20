import React, { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
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
  iconHover: {
    y: -12,
  },
  transition: {
    duration: 1,
  },
};

const Footer = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`${props.footerGradientClass} + " bg-gradient-to-r p-5 text-purple-50 "`}
    >
      {/* <div className="flex justify-center mt-5">
        <Link href="#header">
          <a className="w-10 focus-within:outline-none">
            <FontAwesomeIcon
              icon={faChevronUp}
              className="text-7xl cursor-pointer transform hover:-translate-y-8 duration-500"
            />
          </a>
        </Link>
      </div> */}

      <div className="pt-5 text-center">
        <Image src={"/images/site/icon.png"} width={150} height={80} />
      </div>

      <div className="text-center">
        <p className="tracking-wide">
          &copy; {currentYear} nxtdoordeals.com. All rights reserved.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 pt-16">
        <div className="flex justify-center items-center flex-col text-sm tracking-wide">
          <h2 className="pb-5 text-xl">nxtdoordeals.com</h2>

          <ul>
            <div className="grid grid-cols-2 md:grid-cols-1">
              <li className="pb-3 px-2">
                <Link href="/ourstory">
                  <motion.a variants={variants} whileHover="hover">
                    <FontAwesomeIcon icon={faBook} className="mr-1" />{" "}
                    <span className="pb-1 styled-link">Our Story</span>
                  </motion.a>
                </Link>
              </li>

              <li className="pb-3 px-2">
                <Link href="/policies/#privacy">
                  <motion.a variants={variants} whileHover="hover">
                    <FontAwesomeIcon icon={faUserSecret} className="mr-1" />
                    <span className="pb-1 styled-link">Privacy Policy</span>
                  </motion.a>
                </Link>{" "}
              </li>

              <li className="pb-3 px-2">
                <Link href="/policies/#cookie">
                  <motion.a variants={variants} whileHover="hover">
                    <FontAwesomeIcon icon={faCookieBite} className="mr-1" />{" "}
                    <span className="pb-1 styled-link">Cookie Policy</span>
                  </motion.a>
                </Link>{" "}
              </li>

              <li className="pb-3 px-2">
                <Link href="/policies/#terms">
                  <motion.a variants={variants} whileHover="hover">
                    <FontAwesomeIcon icon={faClipboardList} className="mr-1" />{" "}
                    <span className="pb-1 styled-link">Terms of Use</span>
                  </motion.a>
                </Link>{" "}
              </li>

              <li className="pb-3 px-2">
                <Link href="/faqs">
                  <motion.a variants={variants} whileHover="hover">
                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" />{" "}
                    <span className="pb-1 styled-link">FAQs</span>
                  </motion.a>
                </Link>
              </li>

              <li className="pb-3 px-2">
                <Link href="/guidelines">
                  <motion.a variants={variants} whileHover="hover">
                    <FontAwesomeIcon icon={faBookOpen} className="mr-1" />{" "}
                    <span className="pb-1 styled-link">Guidelines</span>
                  </motion.a>
                </Link>
              </li>
            </div>
          </ul>
        </div>

        <div className="pt-16 md:pt-0 pb-16">
          <h2 className="text-center text-xl pb-5 tracking-wide">
            Feeling Social?
          </h2>
          {/* Social icons */}
          <div className="flex justify-center pb-7 text-3xl">
            <Link href="https://facebook.com" passHref={true}>
              <motion.a
                variants={variants}
                whileHover="hover"
                target="_blank"
                className="mr-4"
              >
                <FontAwesomeIcon icon={faFacebookSquare} />
              </motion.a>
            </Link>{" "}
            <Link href="https://instagram.com" passHref={true}>
              <motion.a
                variants={variants}
                whileHover="hover"
                target="_blank"
                className="mr-4"
              >
                <FontAwesomeIcon icon={faInstagramSquare} />
              </motion.a>
            </Link>{" "}
            <Link href="https://linkedin.com" passHref={true}>
              <motion.a
                variants={variants}
                whileHover="hover"
                target="_blank"
                className="mr-4"
              >
                <FontAwesomeIcon icon={faLinkedin} />
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

        <div>
          <h2 className="text-center text-xl pb-5 tracking-wide">
            Get Started Today!
          </h2>
          <div className="flex flex-col items-center justify-center pb-16 tracking-wide">
            <Link href="/#header">
              <motion.a
                variants={variants}
                whileHover="hover"
                className="px-2 pb-3"
              >
                <FontAwesomeIcon icon={faBinoculars} className="mr-1" />
                <span className="pb-1 styled-link">Browse Ads</span>
              </motion.a>
            </Link>{" "}
            <Link href="/postad">
              <motion.a variants={variants} whileHover="hover" className="pl-2">
                <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
                <span className="pb-1 styled-link">Post Free Ad</span>
              </motion.a>
            </Link>{" "}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center pt-16 lg:pt-8 pb-2 text-sm tracking-wide">
        Made with{" "}
        <span className="text-red-600 pl-1 pr-1">
          <FontAwesomeIcon icon={faHeart} />
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
