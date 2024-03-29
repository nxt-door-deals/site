import React, { useState, useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../../utils/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// Component imports
import PostAdHeader from "./PostAdHeader";
import CreateAd from "../../forms/CreateAd";

const variants = {
  hover: {
    scale: 1.03,
    transition: {
      ease: "easeInOut",
    },
  },
  tap: {
    y: "2px",
    backgroundColor: "#805AD5",
    boxShadow: "none",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  buttonHover: {
    backgroundColor: "#553C9A",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  enterTransition: {
    transition: {
      duration: 0.3,
    },
  },
};

const heading = "Select Category";
const step = "Category";

const Category = () => {
  const [categoryName, setCategoryName] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const userName = user && user.name;

  return (
    <AnimatePresence exitBeforeEnter>
      {showForm ? (
        <motion.div
          key="form"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <PostAdHeader heading={heading} step={step} userName={userName} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 lg:gap-12 px-12 mb-20">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center pt-3 lg:px-1 rounded-xl bg-white text-brand-purple border-2 border-purple-200 hover:shadow-categorycardshadow hover:border-0"
              >
                <div className="items-center py-4 w-40 h-40">
                  <img
                    src={category.icon}
                    alt="category_image"
                    height="150"
                    width="150"
                  />
                </div>
                <div>
                  <p className="pt-4 text-lg font-semibold px-5 text-center">
                    {category.name}
                  </p>
                </div>
                <div className="my-3">
                  <motion.button
                    className="w-24 bg-purple-600 text-white text-xs rounded-full uppercase px-2 py-2 font-axiforma font-semibold tracking-wide cursor-pointer focus:outline-none"
                    variants={variants}
                    whileHover="buttonHover"
                    whileTap="tap"
                    onClick={() => {
                      setCategoryName(category.name);
                      setShowForm(false);
                    }}
                  >
                    Select
                  </motion.button>
                </div>
                <div className="py-3">
                  {category.subCategories.map((subCategory, index) => {
                    return (
                      <p key={index} className="text-sm pb-1">
                        <FontAwesomeIcon icon={faStar} className="mr-1" />
                        {subCategory}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          transition="enterTransition"
        >
          <CreateAd categoryName={categoryName} user={user && user} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Category;
