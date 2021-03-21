import React, { useContext, useEffect, useState } from "react";
import SiteContext from "../../context/site/siteContext";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import { extendedCategoryListOptions } from "../../utils/categories";
import sortOptions from "../../utils/sort";
import { motion } from "framer-motion";
import { selectStylePurple } from "../../utils/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const variants = {
  hover: {
    backgroundColor: "#550052",
    color: "#EDE9FE",
  },
  tap: {
    y: "2px",
    backgroundColor: "#902393",
    color: "#EDE9FE",
  },
};

const SearchNbhAds = (props) => {
  const siteContext = useContext(SiteContext);
  const {
    searchAds,
    searchGiveaways,
    sortByPriceAsc,
    sortByPriceDesc,
    sortByDateCreatedAsc,
    sortByDateCreatedDesc,
    sortGiveawayAsc,
    sortGiveawayDesc,
  } = siteContext;

  const sortResults = (value) => {
    switch (value) {
      case "Price ascending":
        sortByPriceAsc(props.nbhId);
        break;
      case "Price descending":
        sortByPriceDesc(props.nbhId);
        break;
      case "Date posted ascending":
        sortByDateCreatedAsc(props.nbhId);
        break;
      case "Date posted descending":
        sortByDateCreatedDesc(props.nbhId);
        break;
      case "Giveaway ascending":
        sortGiveawayAsc(props.nbhId);
        break;
      case "Giveaway descending":
        sortGiveawayDesc(props.nbhId);
        break;
      default:
        null;
    }
  };

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center mb-16 px-10">
      <div>
        <Formik
          initialValues={{
            categoryList: "",
            searchText: "",
          }}
          onSubmit={(values) => {
            if (values.categoryList == "All Categories")
              values.categoryList = "";

            searchAds(props.nbhId, values.categoryList, values.searchText);
          }}
        >
          {(props) => (
            <Form>
              <div className="flex justify-center items-center">
                <div className="flex border-gray-300 border-2 rounded-xl focus-within:border-text-purple">
                  <div className="w-44 lg:w-64 p-0 font-axiforma z-10">
                    <Select
                      id="categoryList"
                      name="categoryList"
                      instanceId="categoryList"
                      options={extendedCategoryListOptions}
                      placeholder="Select Category"
                      styles={selectStylePurple}
                      className="text-xs lg:text-sm p-2"
                      autoFocus
                      onBlur={() => props.setFieldTouched("categoryList", true)}
                      onChange={(o) => {
                        props.setFieldValue(
                          "categoryList",
                          (props.values.categoryList = o.value)
                        );
                      }}
                      isSearchable={false}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          neutral50: "#4B5563", // Placeholder color
                        },
                      })}
                    />
                  </div>
                  <div>
                    <Field
                      name="searchText"
                      id="searchText"
                      type="text"
                      placeholder="Search Ads..."
                      maxLength="250"
                      autoComplete="off"
                      className="textbox-input w-40 lg:w-64 placeholder-gray-600 "
                    />
                  </div>
                  <div className="p-1">
                    <motion.button
                      variants={variants}
                      whileHover="hover"
                      type="submit"
                      className=" p-2.5 bg-ad-purple rounded-lg text-white focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="flex mt-5 lg:mt-0 items-center">
        {/* The giveaway button */}
        <div>
          <motion.button
            variants={variants}
            whileHover="hover"
            whileTap="tap"
            className="lg:ml-5 px-2.5 py-4 lg:py-5 bg-ad-purple text-white text-xs lg:text-sm rounded-lg uppercase font-semibold focus:outline-none shadow-giveawayButtonShadow"
            onClick={() => searchGiveaways(props.nbhId)}
          >
            Show me the Giveaways
          </motion.button>
        </div>

        {/* Sort options */}
        <div className="w-44 lg:w-64 p-0 border-gray-300 border-2 rounded-xl font-axiforma focus-within:border-text-purple ml-5 lg:mt-0 z-10">
          <Select
            id="sort"
            name="sort"
            instanceId="sort"
            options={sortOptions}
            placeholder="Sort results"
            styles={selectStylePurple}
            className="text-xs lg:text-sm p-2"
            onChange={(option) => sortResults(option.value)}
            isSearchable={false}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: "#4B5563", // Placeholder color
              },
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchNbhAds;
