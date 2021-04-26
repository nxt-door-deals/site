import React, { useContext, useEffect } from "react";
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
  resetHover: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
  },
  resetTap: {
    y: "2px",
    backgroundColor: "#292d34",
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
    fetchAdsForNbh,
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

  // useEffect(() => {
  //   window.scroll({ top: 0, left: 0, behavior: "smooth" });
  // }, []);

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center mb-12 lg:mb-16">
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
                  <div className="w-44 lg:w-64 p-0 z-20">
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
                      aria-label="Drop down list to select ad category"
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
                      aria-label="Enter search text"
                    />
                  </div>
                  <div className="p-1">
                    <motion.button
                      variants={variants}
                      whileHover="hover"
                      type="submit"
                      className=" p-2.5 bg-ad-purple rounded-lg text-white focus:outline-none"
                      aria-label="Search button"
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

      <div className="flex mt-5 lg:mt-0 justify-between items-center">
        {/* The giveaway button */}
        <div>
          <motion.button
            variants={variants}
            whileHover="hover"
            whileTap="tap"
            className="px-3 py-3 lg:ml-3 lg:px-4 lg:py-2.5 bg-ad-purple text-white text-xs lg:text-sm rounded-xl uppercase font-semibold focus:outline-none shadow-giveawayButtonShadow"
            onClick={() => searchGiveaways(props.nbhId)}
            aria-label="Giveaway sort button"
          >
            Show Me The <br />
            Giveaways
          </motion.button>
        </div>

        {/* Sort options */}
        <div className="w-60 lg:w-64 p-0 border-gray-300 border-2 rounded-xl font-axiforma focus-within:border-text-purple ml-3 lg:mt-0 z-10">
          <Select
            id="sort"
            name="sort"
            instanceId="sort"
            options={sortOptions}
            placeholder="Sort results"
            styles={selectStylePurple}
            className="text-xs lg:text-sm p-1.5 lg:p-2"
            onChange={(option) => sortResults(option.value)}
            isSearchable={false}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: "#4B5563", // Placeholder color
              },
            })}
            aria-label="Drop down list to select sort option"
          />
        </div>
      </div>

      <motion.button
        variants={variants}
        whileHover="resetHover"
        whileTap="resetTap"
        className="mt-5 lg:mt-0 px-10 lg:px-2.5 py-4 lg:ml-3 bg-banner-color text-white text-xs lg:text-sm rounded-xl uppercase font-semibold focus:outline-none shadow-lg tracking-wide"
        onClick={() => fetchAdsForNbh(props.nbhId)}
      >
        Clear
      </motion.button>
    </div>
  );
};

export default SearchNbhAds;
