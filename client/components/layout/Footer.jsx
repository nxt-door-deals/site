import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faUserSecret,
  faCookie,
  faClipboardList,
  faEnvelope,
  faHeart,
  faBinoculars,
  faPlusCircle,
  faQuestionCircle,
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
};

const Footer = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`${props.footerGradientClass} + " bg-gradient-to-r p-5 text-white font-axiforma"`}
    >
      <div className="flex justify-center items-center flex-col md:flex-row pb-7 text-sm">
        <ul className="md:flex md:divide-x-2 md:divide-white">
          <li className="pb-1 px-2">
            <Link href="/ourstory">
              <motion.a variants={variants} whileHover="hover">
                <FontAwesomeIcon icon={faBook} className="mr-1" />{" "}
                <span className="pb-1 styled-link">Our Story</span>
              </motion.a>
            </Link>
          </li>

          <li className="pb-1 px-2">
            <Link href="/policies/#privacy">
              <motion.a variants={variants} whileHover="hover">
                <FontAwesomeIcon icon={faUserSecret} className="mr-1" />
                <span className="pb-1 styled-link">Privacy Policy</span>
              </motion.a>
            </Link>{" "}
          </li>

          <li className="pb-1 px-2">
            <Link href="/policies/#cookie">
              <motion.a variants={variants} whileHover="hover">
                <FontAwesomeIcon icon={faCookie} className="mr-1" />{" "}
                <span className="pb-1 styled-link">Cookie Policy</span>
              </motion.a>
            </Link>{" "}
          </li>

          <li className="pb-1 px-2">
            <Link href="/policies/#terms">
              <motion.a variants={variants} whileHover="hover">
                <FontAwesomeIcon icon={faClipboardList} className="mr-1" />{" "}
                <span className="pb-1 styled-link">Terms of Use</span>
              </motion.a>
            </Link>{" "}
          </li>

          <li className="pb-1 px-2">
            <Link href="/faqs">
              <motion.a variants={variants} whileHover="hover">
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" />{" "}
                <span className="pb-1 styled-link">FAQs</span>
              </motion.a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex justify-center pb-7 text-lg">
        <Link href="/#landing">
          <motion.a
            variants={variants}
            whileHover="hover"
            className="pl-2 pr-2"
          >
            <FontAwesomeIcon icon={faBinoculars} className="mr-1" />
            <span className="pb-1 styled-link">Browse Ads</span>
          </motion.a>
        </Link>{" "}
        <Link href="/postad">
          <motion.a variants={variants} whileHover="hover" className="pl-2">
            <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
            <span className="pb-1 styled-link">Post Ad</span>
          </motion.a>
        </Link>{" "}
      </div>

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

      <div className="flex justify-center pb-4 text-base">
        Copyright &copy;{" "}
        {/* <span className="font-semibold pr-1 pl-1 text-brand-purple"> */}
        nxtdoordeals.com
        {/* </span>{" "} */} - {currentYear}
      </div>

      <div className="flex justify-center items-center pb-2 text-sm tracking-wide">
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
