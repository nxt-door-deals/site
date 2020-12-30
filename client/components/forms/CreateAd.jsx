import React, { useState, useEffect, useCallback, useContext } from "react";
import SiteContext from "../../context/site/siteContext";
import { useRouter } from "next/router";
import Select from "react-select";
import { Formik, Field, Form } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import BouncingBalls from "../loaders/BouncingBalls";
import { categoryListOptions, conditionOptions } from "../../utils/categories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faBan,
  faCamera,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import PostAdHeader from "../utils/PostAdHeader";
import Terms from "../utils/Terms";

const createAdValidationSchema = Yup.object({
  title: Yup.string()
    .required("Please provide a title for your ad")
    .trim()
    .matches(/^[^=<>'"`]+$/, "Title cannot contain = = \" ' > < or `"),
  description: Yup.string()
    .required("Please provide an elaborate description for your ad. Go nuts!")
    .trim()
    .matches(/^[^=<>'"`]+$/, "Description cannot contain = \" ' > < or `"),
  typeOfSale: Yup.string().required("Is this a sale or a giveaway?"),
  // condition: Yup.string().required("Please select the item condition"),
  price: Yup.string().when("typeOfSale", {
    is: "sale",
    then: Yup.string()
      .required("Please enter the item price")
      .matches(/^[\d]*[\.]?([\d]{1}|[\d]{2})$/, "Not a valid amount"),
  }),
});

// These are passed to the PostAdHeader component
const heading = "Create Ad";
const step = "Form";

// Framer variants
const variants = {
  hover: {
    backgroundColor: "#5B21B6",
  },
  tap: {
    y: "2px",
    backgroundColor: "#8B5CF6",
  },
};

// Terms link style
const termsLinksStyle = "underline text-purple-500";

const CreateAd = ({ categoryName, user }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState([]);
  const router = useRouter();

  const siteContext = useContext(SiteContext);
  const { createAd } = siteContext;

  // Make sure that we remain at the top of the page once component renders
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  // Copy the state to a new array and use that to update the changed state
  var newFiles = [...files];

  newFiles = newFiles.slice(0, 10);

  // Photo delete toast
  const giveawayToast = () =>
    toast("Yay! You're awesome for giving this away for free!", {
      draggablePercent: 60,
      position: "top-center",
    });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted #1E3A8A",
      color: state.isSelected ? "#F5F3FF" : "#6D28D9",
      padding: 10,
      fontSize: 12,
    }),
    control: (provided) => ({
      ...provided,
      boxShadow: "none",
      border: "none",
      backgroundColor: "transparent",
      color: "#6D28D9",
    }),
  };

  const images = newFiles.map((file, index) => {
    return (
      <div key={index}>
        <div>
          <img src={file.preview} width="90px" alt={file.name} />
          <p
            onClick={() => {
              newFiles.splice(newFiles.indexOf(file), 1);
              setFiles(newFiles);
            }}
            className="text-xs text-center pt-1 cursor-pointer font-axiforma text-brand-gray"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1" />
            Remove
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center h-full w-full font-axiforma">
      <PostAdHeader heading={heading} step={step} />
      <div className="rounded-3xl shadow-postadshadow text-brand-gray py-10 px-10 mb-20">
        <Formik
          initialValues={{
            categoryList: categoryName,
            title: "",
            description: "",
            typeOfSale: "",
            price: "",
            negotiable: false,
            condition: "",
            availableFrom: "",
            publishFlatNo: false,
            files: "",
          }}
          validationSchema={createAdValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            setTimeout(() => {
              var formattedDate =
                startDate.getFullYear() +
                "-" +
                (startDate.getMonth() + 1) +
                "-" +
                startDate.getDate() +
                " 00:00:00";

              if (values.typeOfSale === "giveaway") values.price = 0.0;

              createAd(
                values.categoryList,
                values.title,
                values.description,
                values.typeOfSale,
                values.price,
                values.negotiable,
                values.condition,
                formattedDate,
                values.publishFlatNo,
                user.id,
                user.apartment_id,
                files
              );
              setSubmitting(false);
              router.push(`/ads/${user.apartment_name}/${user.apartment_id}`);
            }, 5000);
          }}
        >
          {(props) => (
            <Form>
              <div>
                {/* The category dropdown */}
                <div className="flex justify-center mb-10">
                  <div className="w-64 font-axiforma border-b-2 border-gray-300  focus-within:border-text-blue">
                    <Select
                      id="categoryList"
                      name="categoryList"
                      instanceId="categoryList"
                      defaultValue={{
                        label: categoryName,
                        value: categoryName,
                      }}
                      options={categoryListOptions}
                      styles={customStyles}
                      className="text-sm p-1.5"
                      autoFocus
                      onBlur={() => props.setFieldTouched("categoryList", true)}
                      onChange={(o) => {
                        props.setFieldValue(
                          "categoryList",
                          (props.values.categoryList = o.value)
                        );
                      }}
                      isSearchable
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          neutral50: "#9CA3AF", // Placeholder color
                        },
                      })}
                    />
                  </div>
                </div>

                {/* Rest of the form */}
                <div className="lg:flex">
                  <div className="lg:pr-10 px-2">
                    {/* Title */}
                    <div
                      className={`"flex items-center justify-center px-2 border-2 rounded-xl  " ${
                        props.touched.title && props.errors.title
                          ? "mb-1 border-red-800 shadow-none"
                          : "mb-6 border-gray-300 focus:outline-none focus-within:border-text-purple"
                      }`}
                    >
                      <Field
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Ad Title*"
                        maxLength="100"
                        autoComplete="off"
                        className="textbox-input w-11/12 placeholder-gray-600 placeholder-opacity-50"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.title && props.errors.title ? (
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.title}
                      </div>
                    ) : null}

                    {/* Description */}
                    <div
                      className={`"flex items-center justify-center border-2 px-2 rounded-xl  " ${
                        props.touched.description && props.errors.description
                          ? "mb-1 border-red-800 shadow-none"
                          : "mb-6 border-gray-300 focus-within:border-text-purple"
                      }`}
                    >
                      <Field
                        id="description"
                        as="textarea"
                        name="description"
                        type="text"
                        placeholder="Ad Description*"
                        maxLength="10000"
                        autoComplete="off"
                        spellCheck={true}
                        rows="7"
                        className="font-axiforma text-sm p-2 leading-6 outline-none w-full placeholder-gray-600 placeholder-opacity-50"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.description && props.errors.description ? (
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.description}
                      </div>
                    ) : null}

                    {/* Type of ad and price. y margin is different due to the negotiable checkbox */}
                    <div className="lg:flex lg:justify-between mb-6">
                      <div
                        className={`"flex-col font-axiforma mr-10 " ${
                          props.touched.typeOfSale && props.errors.typeOfSale
                            ? "mb-1"
                            : "my-4"
                        }`}
                      >
                        <label
                          htmlFor="typeOfSale"
                          className="text-sm pb-2 text-gray-600"
                        >
                          Type of ad:
                        </label>
                        <div
                          id="typeOfSale"
                          role="group"
                          aria-label="Type of sale"
                          className="mt-2"
                        >
                          <label className="pr-1">
                            <Field
                              type="radio"
                              name="typeOfSale"
                              id="sale"
                              value="sale"
                              className="mx-1 focus:outline-none"
                            />
                            Sale
                          </label>
                          <label className="pr-1">
                            <Field
                              type="radio"
                              name="typeOfSale"
                              id="giveaway"
                              value="giveaway"
                              className="mx-1 focus:outline-none"
                              onClick={() => giveawayToast()}
                            />
                            Giveaway
                          </label>
                        </div>

                        {/* Validation errors */}
                        {props.touched.typeOfSale && props.errors.typeOfSale ? (
                          <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {props.errors.typeOfSale}
                          </div>
                        ) : null}
                      </div>

                      {/* Price */}
                      <div className="flex flex-col mt-5 lg:mt-0">
                        <div
                          className={`"mt-1 border-2 px-2 rounded-xl  " ${
                            props.touched.price &&
                            props.errors.price &&
                            props.values.typeOfSale === "sale"
                              ? "mb-1 border-red-800 shadow-none"
                              : "mb-2 border-gray-300 focus-within:border-text-purple"
                          }`}
                        >
                          <Field
                            name="price"
                            id="price"
                            type="text"
                            placeholder="Price (₹)*"
                            maxLength="10"
                            autoComplete="off"
                            disabled={
                              props.values.typeOfSale === "giveaway" && true
                            }
                            className={
                              "textbox-input w-full bg-transparent placeholder-gray-600 placeholder-opacity-50 focus:outline-none"
                            }
                          />
                        </div>

                        {/* Validation errors */}
                        {props.touched.price && props.errors.price ? (
                          <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {props.errors.price}
                          </div>
                        ) : null}

                        {/* Negotiable checkbox */}
                        <div className="mt-1 font-axiforma">
                          <label
                            htmlFor="negotiable"
                            className={`${
                              props.values.typeOfSale === "giveaway"
                                ? "text-gray-500"
                                : null
                            }`}
                          >
                            <Field
                              type="checkbox"
                              name="negotiable"
                              id="negotiable"
                              className={`${
                                props.values.typeOfSale === "giveaway"
                                  ? "mr-2 text-gray-500"
                                  : "mr-2 focus:outline-none"
                              }`}
                              disabled={
                                props.values.typeOfSale === "giveaway"
                                  ? true
                                  : false
                              }
                            />
                            Negotiable
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Condition and Date */}
                    <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
                      {/* <div className="font-axiforma mr-10">
                        <label
                          htmlFor="condition"
                          className="text-xs md:text-sm mr-1  text-gray-600"
                        >
                          Condition:
                        </label>
                        <Field
                          id="condition"
                          name="condition"
                          component="select"
                          className="font-axiforma border-b-2 text-sm outline-none mb-10 text-purple-700 font-semibold text-center focus:outline-none"
                        >
                          <option
                            value="new"
                            className="font-sans font-semibold"
                          >
                            New
                          </option>
                          <option
                            value="almost new"
                            className="font-sans font-semibold"
                          >
                            Almost New
                          </option>
                          <option
                            value="gently used"
                            className="font-sans font-semibold"
                          >
                            Gently Used
                          </option>
                          <option
                            value="heavily used"
                            className="font-sans font-semibold"
                          >
                            Heavily Used
                          </option>
                        </Field>
                      </div> */}
                      <div className="w-full lg:w-48">
                        <div
                          className={`${
                            props.touched.condition && props.errors.condition
                              ? "mb-1  border-2 border-red-800 rounded-xl shadow-none"
                              : "mb-8 border-2 border-gray-300 rounded-xl   focus-within:border-text-blue"
                          }`}
                        >
                          <Select
                            id="condition"
                            name="condition"
                            instanceId="condition"
                            options={conditionOptions}
                            placeholder="Select Condition"
                            defaultValue="New"
                            styles={customStyles}
                            className="text-sm p-1.5"
                            onBlur={() =>
                              props.setFieldTouched("condition", true)
                            }
                            onChange={(o) => {
                              props.setFieldValue(
                                "condition",
                                (props.values.condition = o.value)
                              );
                            }}
                            isSearchable
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                neutral50: "#9CA3AF", // Placeholder color
                              },
                            })}
                          />
                        </div>
                        {/* {props.touched.condition && props.errors.condition ? (
                          <div className="font-axiforma text-xs text-red-800 py-1 mb-2">
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {props.errors.condition}
                          </div>
                        ) : null} */}
                      </div>

                      <div className="font-axiforma lg:pl-6 lg:mt-3">
                        <label
                          htmlFor="availableFrom"
                          className="text-sm  text-gray-600"
                        >
                          Available from:
                        </label>

                        <DatePicker
                          name="availableFrom"
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="w-28 border-b-2 border-gray-300 text-purple-700 text-center font-axiforma text-base cursor-pointer font-semibold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload photos */}
                  <div className="flex flex-col items-center lg:pl-10 lg:border-l-2 border-gray-300 font-axiforma">
                    <h1 className="mt-4 text-gray-600 text-sm">
                      {newFiles.length === 0
                        ? "Upload photos"
                        : `Uploaded ${newFiles.length} of 10 photos`}
                    </h1>
                    {newFiles.length === 0 && (
                      <p className="text-xs text-gray-600 mt-2">
                        Accepted image formats -{" "}
                        <span className="text-purple-700">jpeg</span>,{" "}
                        <span className="text-purple-700">bmp</span>,{" "}
                        <span className="text-purple-700">tiff</span>,{" "}
                        <span className="text-purple-700">webp</span>,{" "}
                        <span className="text-purple-700">png</span> and{" "}
                        <span className="text-purple-700">gif</span>.
                      </p>
                    )}
                    <Dropzone
                      accept="image/jpg, image/jpeg, image/bmp, image/tiff, image/png, image/gif, image/webp"
                      onDrop={onDrop}
                      maxFiles={10}
                    >
                      {({ getRootProps, getInputProps, isDragReject }) => (
                        <section>
                          {newFiles.length < 10 ? (
                            <div className="mt-6">
                              <div
                                {...getRootProps()}
                                className="text-center px-40 py-8 bg-gray-200 border-dashed border-purple-700 rounded-xl border-2 cursor-pointer focus:outline-none"
                              >
                                <input {...getInputProps()} />
                                <FontAwesomeIcon
                                  icon={faCamera}
                                  className="text-3xl"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className=" flex flex-col items-center p-8 bg-gray-200 border-dashed rounded-xl border-red-800 border-2 cursor-not-allowed focus:outline-none">
                              <FontAwesomeIcon
                                icon={faBan}
                                className="text-3xl text-red-800"
                              />
                              <p className="text-xs text-red-800 pt-2">
                                Sorry! Ten is the limit.
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-5 gap-3 mt-4 pt-2">
                            {images.slice(0, 10)}
                          </div>

                          {isDragReject && (
                            <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                              <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                              Accepted image formats - jpeg, bmp, tiff, png and
                              gif
                            </div>
                          )}
                        </section>
                      )}
                    </Dropzone>
                  </div>
                </div>

                {/* Publish flat number */}
                <div className="mt-4 font-axiforma text-center">
                  <label htmlFor="publishFlatNo" className="text-sm">
                    <Field
                      type="checkbox"
                      name="publishFlatNo"
                      id="publishFlatNo"
                      className="mr-2 text-gray-500 focus:outline-none"
                    />
                    Publish my flat number
                  </label>
                </div>

                {/* Button to post ad */}
                <div className="text-center">
                  <motion.button
                    type="submit"
                    variants={variants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={props.isSubmitting}
                    className="mt-4 mb-8 w-64 md:w-100 h-12 bg-purple-500 text-white text-center font-axiforma font-bold rounded-xl uppercase tracking-wide focus:outline-none"
                  >
                    {!props.isSubmitting ? "Post Ad" : <BouncingBalls />}
                  </motion.button>
                </div>

                {/* T&C */}
                <Terms termsLinksStyle={termsLinksStyle} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAd;
