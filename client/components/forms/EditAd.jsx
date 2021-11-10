import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import SiteContext from "../../context/site/siteContext";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { conditionOptions } from "../../utils/categories";
import { motion } from "framer-motion";
import { selectStylePurple } from "../../utils/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faInfoCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

// Component import
import ImageUploader from "../page_components/create_ad/ImageUploader";
import BouncingBalls from "../loaders/BouncingBalls";

const editAdValidationSchema = Yup.object({
  title: Yup.string()
    .required("Please provide a title for your ad")
    .trim()
    .matches(/^[^=<>`]+$/, "Title cannot contain ^ = < > or `"),
  description: Yup.string()
    .required("Please provide an elaborate description for your ad. Go nuts!")
    .trim()
    .matches(/^[^=<>`]+$/, "Title cannot contain ^ = < > or `"),
  typeOfSale: Yup.string().required("Is this a sale or a giveaway?"),
  condition: Yup.string().required("Please specify the condition"),
  price: Yup.string().when("typeOfSale", {
    is: "sale",
    then: Yup.string()
      .required("Please enter the item price")
      .matches(/^[\d]*[\.]?([\d]{1}|[\d]{2})$/, "Not a valid amount"),
  }),
});

const editAdVariants = {
  hoverSave: {
    backgroundColor: "#4C1D95",
  },
  hoverCancel: {
    backgroundColor: "#991B1B",
  },
  editButtonTap: {
    y: "2px",
    backgroundColor: "#6D28D9",
  },
  deleteButtonTap: {
    y: "2px",
    backgroundColor: "#EF4444",
  },
};

const EditAd = (props) => {
  const [files, setFiles] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(props.data.available_from_date)
  );
  const [fieldTouched, setFieldTouched] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const originalConditionValue = useRef(props.data.condition);
  const previousDate = useRef(startDate);

  const router = useRouter();
  const siteContext = useContext(SiteContext);

  const { deleteAdImage, updateAd, adUpdated } = siteContext;

  // Price is formatted in the Formik component
  let price = props.data.price;

  // Giveaway toast
  const giveawayToast = () =>
    toast("Yay! You're awesome for giving this away for free!", {
      draggablePercent: 60,
      position: "top-center",
    });

  // Image delete toast
  const imageDeleteToast = () =>
    toast("Photo removed permanently", {
      draggablePercent: 60,
      position: "top-center",
    });

  useEffect(() => {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  useEffect(() => {
    if (adUpdated) {
      setTimeout(() => router.reload("/"), 5000);
    }
  }, [adUpdated]);

  return (
    <div className="text-brand-gray w-full h-full">
      <div>
        <div id="form" className="p-1 lg:p-5 w-full">
          <Formik
            initialValues={{
              title: props.data.title,
              description: props.data.description,
              typeOfSale: props.data.ad_type,
              price: price.includes(",") ? price.replace(",", "") : price,
              negotiable: props.data.negotiable,
              condition: props.data.condition,
              availableFrom: startDate,
              publishFlatNo: props.data.flat_no ? true : false,
              files: "",
            }}
            validationSchema={editAdValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

              let formattedDate =
                startDate.getFullYear() +
                "-" +
                parseInt(startDate.getMonth() + 1) +
                "-" +
                startDate.getDate() +
                " 00:00:00";

              if (values.typeOfSale === "giveaway") {
                values.price = 0.0;
                values.negotiable = false;
              }

              updateAd(
                props.data.id,
                props.data.posted_by_id,
                values.title,
                values.description,
                values.typeOfSale,
                values.price,
                values.negotiable,
                values.condition,
                formattedDate,
                values.publishFlatNo,
                files
              );
            }}
          >
            {({
              isSubmitting,
              handleReset,
              touched,
              errors,
              values,
              setFieldValue,
            }) => (
              <Form>
                <div
                  id="container"
                  className="flex flex-col lg:flex-row lg:justify-center items-start"
                >
                  <div id="form" className="lg:border-r-2 p-1 lg:p-5 w-full">
                    {/* Title */}
                    <div
                      className={`"flex items-center justify-center px-2 border-2 rounded-xl  " ${
                        touched.title && errors.title
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
                        value={values.title}
                        onBlur={() => setFieldTouched(true)}
                        aria-required="true"
                        aria-invalid={
                          touched.title && errors.title ? "true" : null
                        }
                        aria-describedby={
                          touched.title && errors.title ? "title-error" : null
                        }
                        className="textbox-input w-full placeholder-gray-600 "
                      />
                    </div>

                    {/* Validation errors */}
                    {touched.title && errors.title ? (
                      <div
                        className="text-xs error-text p-1 mb-2"
                        id="title-error"
                      >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {errors.title}
                      </div>
                    ) : null}

                    {/* Description */}
                    <div
                      className={`"flex items-center justify-center border-2 px-2 rounded-xl  " ${
                        touched.description && errors.description
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
                        value={values.description}
                        rows="7"
                        onBlur={() => setFieldTouched(true)}
                        aria-required="true"
                        aria-invalid={
                          touched.description && errors.description
                            ? "true"
                            : null
                        }
                        aria-describedby={
                          touched.description && errors.description
                            ? "description-error"
                            : null
                        }
                        className="text-sm p-2 leading-6 outline-none w-full placeholder-gray-600 "
                      />
                    </div>

                    {/* Validation errors */}
                    {touched.description && errors.description ? (
                      <div
                        className="text-xs error-text p-1 mb-2"
                        id="description-error"
                      >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {errors.description}
                      </div>
                    ) : null}

                    {/* Type of ad and price. y margin is different due to the negotiable checkbox */}
                    <div className="lg:flex lg:justify-between mb-6">
                      <div
                        className={`"flex-col mr-10 " ${
                          touched.typeOfSale && errors.typeOfSale
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
                              aria-required="true"
                              aria-invalid={
                                touched.typeOfSale && errors.typeOfSale
                                  ? "true"
                                  : null
                              }
                              aria-describedby={
                                touched.typeOfSale && errors.typeOfSale
                                  ? "typeOfSale-error"
                                  : null
                              }
                              onClick={() => setFieldTouched(true)}
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
                              aria-required="true"
                              aria-invalid={
                                touched.typeOfSale && errors.typeOfSale
                                  ? "true"
                                  : null
                              }
                              aria-describedby={
                                touched.typeOfSale && errors.typeOfSale
                                  ? "typeOfSale-error"
                                  : null
                              }
                              onClick={() => {
                                giveawayToast();
                                setFieldTouched(true);
                              }}
                            />
                            Giveaway
                          </label>
                        </div>

                        {/* Validation errors */}
                        {touched.typeOfSale && errors.typeOfSale ? (
                          <div
                            className="text-xs error-text p-1 mb-2"
                            id="typeOfSale-error"
                          >
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {errors.typeOfSale}
                          </div>
                        ) : null}
                      </div>

                      {/* Price */}
                      <div className="flex flex-col mt-5 lg:mt-0">
                        <div
                          className={`"mt-1 border-2 px-2 rounded-xl  " ${
                            touched.price &&
                            errors.price &&
                            values.typeOfSale === "sale"
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
                            disabled={values.typeOfSale === "giveaway" && true}
                            onBlur={() => setFieldTouched(true)}
                            aria-required="true"
                            aria-invalid={
                              touched.price && errors.price ? "true" : null
                            }
                            aria-describedby={
                              touched.price && errors.price
                                ? "price-error"
                                : null
                            }
                            className={
                              "textbox-input w-full bg-transparent placeholder-gray-600  focus:outline-none"
                            }
                          />
                        </div>

                        {/* Validation errors */}
                        {touched.price && errors.price ? (
                          <div
                            className="text-xs error-text p-1 mb-2"
                            id="price-error"
                          >
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {errors.price}
                          </div>
                        ) : null}

                        {/* Negotiable checkbox */}
                        <div className="mt-1">
                          <label
                            htmlFor="negotiable"
                            className={`${
                              values.typeOfSale === "giveaway"
                                ? "text-gray-500"
                                : null
                            }`}
                          >
                            <Field
                              type="checkbox"
                              name="negotiable"
                              id="negotiable"
                              className={`${
                                values.typeOfSale === "giveaway"
                                  ? "mr-2 text-gray-500"
                                  : "mr-2 focus:outline-none"
                              }`}
                              disabled={
                                values.typeOfSale === "giveaway" ? true : false
                              }
                              onMouseDown={() => setFieldTouched(true)}
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
                            touched.condition && errors.condition
                              ? "mb-1  border-2 error-border rounded-xl shadow-none"
                              : "mb-6 border-2 border-gray-300 rounded-xl   focus-within:border-text-blue"
                          }`}
                        >
                          <Select
                            id="condition"
                            name="condition"
                            instanceId="condition"
                            options={conditionOptions}
                            placeholder="Select Condition"
                            styles={selectStylePurple}
                            className="text-sm p-1.5"
                            value={
                              cancelClicked
                                ? {
                                    value: originalConditionValue.current,
                                    label: originalConditionValue.current,
                                  }
                                : {
                                    value: values.condition,
                                    label: values.condition,
                                  }
                            }
                            onChange={(o) => {
                              setFieldValue(
                                "condition",
                                (values.condition = o.value)
                              );
                              setFieldTouched(true);
                              setCancelClicked(false);
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
                        {touched.condition && errors.condition ? (
                          <div className="text-xs error-text py-1 mb-2">
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {errors.condition}
                          </div>
                        ) : null}
                      </div>

                      <div className="lg:pl-6">
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
                          selected={
                            cancelClicked ? previousDate.current : startDate
                          }
                          onChange={(date) => {
                            setStartDate(date);
                            setFieldTouched(true);
                            setCancelClicked(false);
                          }}
                          aria-label="Pick the date from when the item will be available"
                          aria-labelledBy="date-picker"
                          className="w-28 border-b-2 border-gray-300 text-purple-700 text-center text-base cursor-pointer font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Publish flat number */}
                    <div>
                      <label htmlFor="publishFlatNo" className="text-sm">
                        <Field
                          type="checkbox"
                          name="publishFlatNo"
                          id="publishFlatNo"
                          onMouseDown={() => setFieldTouched(true)}
                          className="mr-2 text-gray-500 focus:outline-none"
                        />
                        Publish my flat number
                      </label>
                    </div>
                  </div>

                  {/* Image uploader */}
                  <div
                    id="image uploader"
                    className="p-1 lg:p-5 mt-6 lg:mt-0 w-full"
                  >
                    {props.imgArray.length !== 0 ? (
                      <div>
                        <div className="flex justify-center items-center mt-2 mb-2">
                          <p className="text-sm pr-1">
                            You can upload{" "}
                            {props.imgArray.length !== 0
                              ? props.imgArray.length === 10
                                ? "no"
                                : 10 - props.imgArray.length
                              : 10}{" "}
                            more photos
                          </p>
                          <div
                            className="tooltip cursor-pointer"
                            role="tooltip"
                            aria-hidden="true"
                            aria-label="Tooltip to explain image deletion"
                          >
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              className="text-brand-gray"
                            />
                            <span className="tooltiptext-delete">
                              Deleting a photo will remove it from your ad
                              permanently. The action cannot be undone.
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-5 mb-4">
                          {props.imgArray.map((image, index) => {
                            let imagesWithExt = image.split("/");
                            let imageFilenameWithExt =
                              imagesWithExt[imagesWithExt.length - 1];
                            let imageFilename = imageFilenameWithExt.split(".");

                            return (
                              <div key={index}>
                                <Image
                                  src={image}
                                  alt="Image small"
                                  width={75}
                                  height={75}
                                />

                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="ml-2 text-sm cursor-pointer"
                                  onClick={() => {
                                    props.setImgArray(
                                      props.imgArray.filter(
                                        (img) => img !== image
                                      )
                                    );
                                    deleteAdImage(
                                      props.data.posted_by_id,
                                      props.data.id,
                                      imageFilename[imageFilename.length - 2]
                                    );
                                    imageDeleteToast();
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                    <ImageUploader
                      files={files}
                      setFiles={setFiles}
                      uploadedImages={props.imgArray.length}
                      fieldTouched={fieldTouched}
                      setFieldTouched={setFieldTouched}
                    />
                  </div>
                  {/* flex container end */}
                </div>

                <div
                  id="buttons"
                  className="flex flex-col items-center lg:flex-row lg:justify-center pt-10"
                >
                  <motion.button
                    type="submit"
                    variants={editAdVariants}
                    whileHover={fieldTouched && "hoverSave"}
                    whileTap={fieldTouched && "editButtonTap"}
                    className={`h-12 w-40 font-semibold uppercase mb-7  lg:mb-0 lg:mr-5 rounded-xl focus:outline-none ${
                      fieldTouched
                        ? "text-white bg-purple-700 shadow-buttonShadowPurple cursor-pointer"
                        : "bg-gray-300 text-gray-50 text-opacity-95 shadow-lg cursor-not-allowed"
                    } ${isSubmitting && "cursor-not-allowed"}`}
                    disabled={!fieldTouched || isSubmitting}
                  >
                    {isSubmitting ? <BouncingBalls /> : "Save Changes"}
                  </motion.button>
                  <motion.button
                    type="button"
                    variants={editAdVariants}
                    whileHover={fieldTouched && "hoverCancel"}
                    whileTap={fieldTouched && "deleteButtonTap"}
                    className={` h-12 w-40 font-semibold uppercase lg:mt-0 rounded-xl focus:outline-none ${
                      fieldTouched
                        ? "text-white bg-red-400 shadow-cancelButtonShadow cursor-pointer"
                        : "bg-gray-300 text-gray-50 text-opacity-95 shadow-lg cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCancelClicked(true);
                      handleReset();
                    }}
                    disabled={isSubmitting}
                  >
                    Undo Changes
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditAd;
