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
import { selectStylePurple } from "../../utils/styles";

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
import PostAdHeader from "../page_components/post_ad/PostAdHeader";
import FraudAlert from "../page_components/post_ad/FraudAlert";
import Terms from "../page_components/common/Terms";

const createAdValidationSchema = Yup.object({
  title: Yup.string()
    .required("Please provide a title for your ad")
    .trim()
    .matches(/^[^=<>`]+$/, "Title cannot contain ^ = < > or `"),
  description: Yup.string()
    .required("Please provide an elaborate description for your ad. Go nuts!")
    .trim()
    .matches(/^[^=<>`]+$/, "Description cannot contain ^ = < > or `"),
  typeOfSale: Yup.string().required("Is this a sale or a giveaway?"),
  // condition: Yup.string().required("Please select the item condition"),
  price: Yup.string().when("typeOfSale", {
    is: "sale",
    then: Yup.string()
      .required("Please enter the item's price")
      .matches(/^[\d]*[\.]?([\d]{1}|[\d]{2})$/, "Not a valid amount"),
  }),
  condition: Yup.string().required("Please specify the condition"),
});

// These are passed to the PostAdHeader component
const heading = "Post Free Ad";
const step = "Form";

// Framer variants
const variants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
};

// Terms link style
const termsLinksStyle = "underline text-purple-500";

const CreateAd = ({ categoryName, user }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState([]);
  const router = useRouter();

  const siteContext = useContext(SiteContext);
  const { createAd, adCreated } = siteContext;

  // Make sure that we remain at the top of the page once component renders
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (adCreated) router.push(`/neighbourhood/ads/${user.apartment_id}`);
  }, [adCreated]);

  // Giveaway toast
  const giveawayToast = () => {
    formatApartmentName();
    toast("Yay! You're awesome for giving this away for free!", {
      draggablePercent: 60,
      position: "top-center",
    });
  };

  // Pluralize the apartment name correctly
  const formatApartmentName = () => {
    let apartmentLength = user.apartment_name.split(" ").length;

    let wrd = user.apartment_name.split(" ")[apartmentLength - 1];

    return wrd.split("")[wrd.length - 1] === "s"
      ? user.apartment_name + "'"
      : user.apartment_name + "'s";
  };

  const confirmationToast = () => {
    let apartmentName = formatApartmentName();
    toast(`Your ad will be posted in ${apartmentName} marketplace.`, {
      draggablePercent: 60,
      position: "top-center",
    });
  };

  // Dropzone
  // Copy the state to a new array and use that to update the changed state
  var newFiles = [...files];

  newFiles = newFiles.slice(0, 10);

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

  const images = newFiles.map((file, index) => {
    return (
      <div key={index}>
        <div>
          <img src={file.preview} width="90px" alt="" />
          <p
            onClick={() => {
              newFiles.splice(newFiles.indexOf(file), 1);
              setFiles(newFiles);
            }}
            className="text-xs text-center pt-1 cursor-pointer text-brand-gray"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1" />
            Remove
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col mx-2 md:mx-28 lg:mx-44">
      <FraudAlert />
      <PostAdHeader heading={heading} step={step} />

      <div className="rounded-3xl shadow-postadshadow text-brand-gray py-10 px-2 lg:px-10 mb-20">
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

            let formattedDate =
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
            confirmationToast();
          }}
        >
          {(props) => (
            <Form>
              <div>
                {/* The category dropdown */}
                <div className="flex flex-col items-center mb-10">
                  <div className="w-64 border-b-2 border-gray-300  focus-within:border-text-purple">
                    <Select
                      id="categoryList"
                      name="categoryList"
                      instanceId="categoryList"
                      defaultValue={{
                        label: categoryName,
                        value: categoryName,
                      }}
                      options={categoryListOptions}
                      styles={selectStylePurple}
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
                          neutral50: "#4B5563", // Placeholder color
                        },
                      })}
                      aria-label="Drop down list to select ad category"
                    />
                  </div>
                  {props.values.categoryList === "Pets" && (
                    <p className="text-sm pt-3 error-text">
                      <FontAwesomeIcon
                        icon={faBan}
                        className="mr-1 error-text"
                      />
                      <strong>No</strong> ads for pet sales or pet adoptions
                      please.
                    </p>
                  )}
                </div>

                {/* Rest of the form */}
                <div className="lg:flex lg:justify-center">
                  <div className="lg:pr-10 px-2">
                    {/* Title */}
                    <div
                      className={`"flex items-center justify-center px-2 border-2 rounded-xl  " ${
                        props.touched.title && props.errors.title
                          ? "mb-1 error-border shadow-none"
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
                        aria-required="true"
                        aria-invalid={
                          props.touched.title && props.errors.title
                            ? "true"
                            : null
                        }
                        aria-describedby={
                          props.touched.title && props.errors.title
                            ? "title-error"
                            : null
                        }
                        className="textbox-input w-11/12 placeholder-gray-600 "
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.title && props.errors.title ? (
                      <div
                        className="text-xs error-text p-1 mb-2"
                        id="title-error"
                      >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.title}
                      </div>
                    ) : null}

                    {/* Description */}
                    <div
                      className={`"flex items-center justify-center border-2 px-2 rounded-xl  " ${
                        props.touched.description && props.errors.description
                          ? "mb-1 error-border shadow-none"
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
                        aria-required="true"
                        aria-invalid={
                          props.touched.description && props.errors.description
                            ? "true"
                            : null
                        }
                        aria-describedby={
                          props.touched.description && props.errors.description
                            ? "description-error"
                            : null
                        }
                        className="text-sm p-2 leading-6 outline-none w-full placeholder-gray-600 whitespace-pre-wrap"
                      />
                    </div>

                    {/* Validation errors */}
                    {props.touched.description && props.errors.description ? (
                      <div
                        className="text-xs error-text p-1 mb-2"
                        id="description-error"
                      >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {props.errors.description}
                      </div>
                    ) : null}

                    {/* Type of ad and price. y margin is different due to the negotiable checkbox */}
                    <div className="lg:flex lg:justify-between mb-6">
                      <div
                        className={`"flex-col mr-10 " ${
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
                              aria-required="true"
                              aria-invalid={
                                props.touched.typeOfSale &&
                                props.errors.typeOfSale
                                  ? "true"
                                  : null
                              }
                              aria-describedby={
                                props.touched.typeOfSale &&
                                props.errors.typeOfSale
                                  ? "typeOfSale-error"
                                  : null
                              }
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
                              aria-required="true"
                              aria-invalid={
                                props.touched.typeOfSale &&
                                props.errors.typeOfSale
                                  ? "true"
                                  : null
                              }
                              aria-describedby={
                                props.touched.typeOfSale &&
                                props.errors.typeOfSale
                                  ? "typeofsale-error"
                                  : null
                              }
                              className="mx-1 focus:outline-none"
                              onClick={() => giveawayToast()}
                            />
                            Giveaway
                          </label>
                        </div>

                        {/* Validation errors */}
                        {props.touched.typeOfSale && props.errors.typeOfSale ? (
                          <div
                            className="text-xs error-text p-1 mb-2"
                            id="typeofsale-error"
                          >
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
                              ? "mb-1 error-border shadow-none"
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
                            aria-required="true"
                            aria-invalid={
                              props.touched.price && props.errors.price
                                ? "true"
                                : null
                            }
                            aria-describedby={
                              props.touched.price && props.errors.price
                                ? "price-error"
                                : null
                            }
                            className={
                              "textbox-input w-full bg-transparent placeholder-gray-600  focus:outline-none"
                            }
                          />
                        </div>

                        {/* Validation errors */}
                        {props.touched.price && props.errors.price ? (
                          <div
                            className="text-xs error-text p-1 mb-2"
                            id="price-error"
                          >
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
                      <div className="w-full lg:w-48">
                        <div
                          className={`${
                            props.touched.condition && props.errors.condition
                              ? "mb-1  border-2 error-border rounded-xl shadow-none"
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
                            styles={selectStylePurple}
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
                                neutral50: "#4B5563", // Placeholder color
                              },
                            })}
                            aria-label="Drop down list to select the condition of the item"
                          />
                        </div>
                        {props.touched.condition && props.errors.condition ? (
                          <div className="text-xs error-text py-1 mb-2">
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {props.errors.condition}
                          </div>
                        ) : null}
                      </div>

                      <div className="lg:pl-6 lg:mt-3 pb-3 lg:pb-0">
                        <label
                          htmlFor="availableFrom"
                          className="text-sm  text-gray-600"
                          id="date-picker"
                        >
                          Available from:
                        </label>

                        <DatePicker
                          name="availableFrom"
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="w-28 border-b-2 border-gray-300 text-purple-700 text-center text-base cursor-pointer font-semibold focus:outline-none"
                          aria-label="Pick the date from when the item will be available"
                          aria-labelledby="date-picker"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload photos */}
                  <div className="flex flex-col items-center border-t-2 lg:border-t-0 pt-4 lg:pt-0 lg:pl-10 lg:border-l-2 border-gray-300">
                    <h1 className="my-4 text-gray-600 text-sm text-center">
                      {newFiles.length === 0
                        ? "Upload up to 10 photos"
                        : `Uploaded ${newFiles.length} of 10 photos`}
                    </h1>

                    <p className="text-xs text-gray-600 mb-2">
                      Accepted image formats -{" "}
                      <span className="text-purple-700">jpeg</span>,{" "}
                      <span className="text-purple-700">webp</span> and{" "}
                      <span className="text-purple-700">png</span>.
                    </p>

                    <Dropzone
                      accept="image/jpg, image/jpeg, image/png, image/webp"
                      onDrop={onDrop}
                      maxFiles={10}
                      aria-label="Drop zone for images"
                    >
                      {({ getRootProps, getInputProps, isDragReject }) => (
                        <section>
                          {newFiles.length < 10 ? (
                            <div className="">
                              <div
                                {...getRootProps()}
                                className="text-center px-36 md:px-40 py-8 bg-gray-200 border-dashed border-purple-700 rounded-xl border-2 cursor-pointer focus:outline-none"
                              >
                                <input
                                  {...getInputProps()}
                                  aria-label="Drop zone for images"
                                />
                                <FontAwesomeIcon icon={faCamera} size="2x" />
                              </div>
                            </div>
                          ) : (
                            <div className=" flex flex-col items-center p-8 bg-gray-200 border-dashed rounded-xl error-border border-2 cursor-not-allowed focus:outline-none">
                              <FontAwesomeIcon
                                icon={faBan}
                                className="text-3xl error-text"
                              />
                              <p className="text-xs error-text pt-2">
                                You have added 10 photos.
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-5 gap-3 mt-4 pt-2">
                            {images.slice(0, 10)}
                          </div>

                          {isDragReject && (
                            <div className="text-xs error-text p-1 mb-2">
                              <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                              Accepted image formats - jpeg, webp and png
                            </div>
                          )}
                        </section>
                      )}
                    </Dropzone>
                  </div>
                </div>

                {/* Publish flat number */}
                <div className="mt-4 text-center">
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
                    className={`mt-4 mb-8 w-64 md:w-100 h-12 bg-purple-700 shadow-buttonShadowPurple text-white text-center font-bold rounded-xl uppercase tracking-wide focus:outline-none ${
                      props.isSubmitting && "cursor-not-allowed"
                    }`}
                  >
                    {!props.isSubmitting ? "Post Ad" : <BouncingBalls />}
                  </motion.button>
                </div>

                {/* T&C */}
                <Terms
                  termsLinksStyle={termsLinksStyle}
                  termsReason="creating an ad"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAd;
