import React, { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const BrandHeader = () => {
  return (
    <div>
      <div className="w-full z-50">
        <motion.div
          className="absolute top-0 left-0 ml-2 lg:ml-4 lg:pl-4"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
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
              />
            </a>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandHeader;
