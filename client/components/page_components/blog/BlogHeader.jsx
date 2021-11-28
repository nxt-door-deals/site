import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const linkVariants = {
  hover: {
    x: "-2px",
  },
};

const PostHeader = (props) => {
  var d = new Date(props.createdOn);

  let formattedDate = `${d.getDate()}/${parseInt(
    d.getMonth() + 1
  )}/${d.getFullYear()}`;

  return (
    <div>
      <div className="flex items-center ml-4 my-5">
        <Link href="/blog">
          <motion.a variants={linkVariants} whileHover="hover">
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              className="text-brand-purple cursor-pointer"
              size="2x"
            />
          </motion.a>
        </Link>
        <p className="pl-2">Back to the compendium</p>
      </div>
      <div className="text-center px-5">
        <Image
          src={`https:${props.heroImage}`}
          alt={props.heroImageDescription}
          width={750}
          height={450}
        />

        <h2 className="pt-10 pb-5 text-2xl font-semibold lg:text-4xl">
          {props.title}
        </h2>
        <p className="text-sm">Posted on {formattedDate}</p>
      </div>
    </div>
  );
};

export default PostHeader;
