import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const cardVariants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: 1.05,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BlogPreviewCard = (props) => {
  return (
    <Fragment>
      {props.blogs.length === 0 && (
        <p className="mt-10 text-lg text-gray-600 -mb-10">
          Something awe-inspiring will be here soon!
        </p>
      )}

      <div className="px-5 mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {props.blogs.map((blog, index) => {
          return (
            <Link key={index} href={`/blog/${blog.fields.slug}`}>
              <a>
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  whileHover="animate"
                  key={blog.sys.id}
                  className="rounded-2xl shadow-2xl px-5 py-7 mb-5 lg:mb-0 bg-white"
                >
                  <Image
                    src={`https:${blog.fields.thumbnail.fields.file.url}`}
                    alt={blog.fields.thumbnail.fields.description}
                    height={200}
                    width={250}
                  />

                  <h2 className="font-semibold pt-3 px-0 text-lg">
                    {blog.fields.title}
                  </h2>
                  <p className="text-xs md:text-sm pt-3 text-center">
                    {blog.fields.shortDescription}
                  </p>
                </motion.div>
              </a>
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};

export default BlogPreviewCard;
