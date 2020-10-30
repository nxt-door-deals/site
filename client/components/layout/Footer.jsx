import React, { useState } from "react";
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
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

// Component import
import Contact from "../forms/Contact";

Modal.setAppElement("#__next");

var currentYear = new Date().getFullYear();

const variants = {
  hover: {
    scale: 1.04,
    transition: {
      duration: 0.5,
    },
    color: "#D6BCFA",
    cursor: "pointer",
  },
};

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-footer-gradient-from to-footer-gradient-to p-5 text-white  font-axiforma">
      <div className="flex justify-center items-center flex-col md:flex-row pb-4 text-sm">
        <ul className="md:flex">
          <li className="pl-3 pb-1">
            <Link href="/">
              <motion.a
                variants={variants}
                whileHover="hover"
                
              >
                <FontAwesomeIcon icon={faBook} className="mr-1" />
                Our Story
              </motion.a>
            </Link>{" "}
          </li>
        
          <li className="pl-3 pb-1">
            <Link href="/">
              <motion.a
                variants={variants}
                whileHover="hover"
              >
                <FontAwesomeIcon icon={faUserSecret} className="mr-1" /> Privacy
                Policy
              </motion.a>
            </Link>{" "}
          </li>
        
          <li className="pl-3 pb-1">
            <Link href="/">
              <motion.a
                variants={variants}
                whileHover="hover"
              >
                <FontAwesomeIcon icon={faCookie} className="mr-1" /> Cookie Policy
              </motion.a>
            </Link>{" "}
          </li>
        
          <li className="pl-3 pb-1">
            <Link href="/">
              <motion.a 
                variants={variants} 
                whileHover="hover" 
              >
                <FontAwesomeIcon icon={faClipboardList} className="mr-1" /> Terms of
                Use
              </motion.a>
            </Link>{" "}
          </li>
        
          <li className="pl-3 pb-1">
            <Link href="/">
              <motion.a 
                variants={variants} 
                whileHover="hover" 
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" /> FAQs
              </motion.a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex justify-center pb-4 text-lg">
        <Link href="#landing">
          <motion.a
            variants={variants}
            whileHover="hover"
            className="pl-2 pr-2"
          >
            <FontAwesomeIcon icon={faBinoculars} className="mr-1" />
            Browse Ads
          </motion.a>
        </Link>{" "}
        
        <Link href="/">
          <motion.a variants={variants} whileHover="hover" className="pl-2">
            <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
            Post Ad
          </motion.a>
        </Link>{" "}
      </div>

      {/* Social icons */}
      <div className="flex justify-center pb-4 text-3xl">
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
        <span className="font-semibold pr-1 pl-1 text-brand-purple">
          nxt-door deals
        </span>{" "}
        - {currentYear}
      </div>

      <div className="flex justify-center pb-2 text-sm">
        Made with{" "}
        <span className="text-red-600 pl-1 pr-1">
          <FontAwesomeIcon icon={faHeart} />
        </span>{" "}
        in Bangalore
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnEsc={true}
        shouldFocusAfterRender={true}
        className="absolute right-0 bottom-0 mb-5 mr-5 ml-4 outline-none rounded-md"
      >
        <Contact setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default Footer;
