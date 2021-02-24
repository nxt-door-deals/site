import React, { useState, useContext, useRef, useEffect } from "react";
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
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

// Component import
import ImageUploader from "../utils/ImageUploader";
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
  condition: Yup.string().required("Please select the item condition"),
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
    backgroundColor: "#8B5CF6",
  },
  deleteButtonTap: {
    y: "2px",
    backgroundColor: "#EF4444",
  },
};

const EditAd = (props) => {
  const [files, setFiles] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [fieldTouched, setFieldTouched] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const originalConditionValue = useRef(props.data.condition);
  const previousDate = useRef(startDate);

  const router = useRouter();
  const siteContext = useContext(SiteContext);

  const { deleteAdImage, updateAd } = siteContext;

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

  return (
    <div className="font-axiforma text-brand-gray w-full h-full">
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
              availableFrom: props.data.available_from_date,
              publishFlatNo: props.data.flat_no ? true : false,
              files: "",
            }}
            validationSchema={editAdValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);

              let formattedDate =
                startDate.getFullYear() +
                "-" +
                (startDate.getMonth() + 1) +
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

              setTimeout(() => {
                router.reload("/");
                setSubmitting(false);
              }, 7000);
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
                        value={values.title}
                        onBlur={() => setFieldTouched(true)}
                        className="textbox-input w-full placeholder-gray-600 "
                      />
                    </div>

                    {/* Validation errors */}
                    {touched.title && errors.title ? (
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {errors.title}
                      </div>
                    ) : null}

                    {/* Description */}
                    <div
                      className={`"flex items-center justify-center border-2 px-2 rounded-xl  " ${
                        touched.description && errors.description
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
                        value={values.description}
                        rows="7"
                        onBlur={() => setFieldTouched(true)}
                        className="font-axiforma text-sm p-2 leading-6 outline-none w-full placeholder-gray-600 "
                      />
                    </div>

                    {/* Validation errors */}
                    {touched.description && errors.description ? (
                      <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {errors.description}
                      </div>
                    ) : null}

                    {/* Type of ad and price. y margin is different due to the negotiable checkbox */}
                    <div className="lg:flex lg:justify-between mb-6">
                      <div
                        className={`"flex-col font-axiforma mr-10 " ${
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
                          <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
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
                            disabled={values.typeOfSale === "giveaway" && true}
                            onBlur={() => setFieldTouched(true)}
                            className={
                              "textbox-input w-full bg-transparent placeholder-gray-600  focus:outline-none"
                            }
                          />
                        </div>

                        {/* Validation errors */}
                        {touched.price && errors.price ? (
                          <div className="font-axiforma text-xs text-red-800 p-1 mb-2">
                            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                            {errors.price}
                          </div>
                        ) : null}

                        {/* Negotiable checkbox */}
                        <div className="mt-1 font-axiforma">
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
                              ? "mb-1  border-2 border-red-800 rounded-xl shadow-none"
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
                          />
                        </div>
                      </div>

                      <div className="font-axiforma lg:pl-6">
                        <label
                          htmlFor="availableFrom"
                          className="text-sm  text-gray-600"
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
                          className="w-28 border-b-2 border-gray-300 text-purple-700 text-center font-axiforma text-base cursor-pointer font-semibold focus:outline-none"
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
                        <p className="mt-2 mb-4 text-sm text-center">
                          You can upload{" "}
                          {props.imgArray.length !== 0
                            ? props.imgArray.length === 10
                              ? "no"
                              : 10 - props.imgArray.length
                            : 10}{" "}
                          more photos.
                        </p>
                        <div className="grid grid-cols-5 gap-5 mb-4">
                          {props.imgArray.map((image, index) => {
                            let imagesWithExt = image.split("/");
                            let imageFilenameWithExt =
                              imagesWithExt[imagesWithExt.length - 1];
                            let imageFilename = imageFilenameWithExt.split(".");

                            return (
                              <div key={index}>
                                <Image src={image} width={75} height={75} />

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
                    className={`h-12 w-40 font-semibold uppercase mb-3 lg:mb-0 lg:mr-5 rounded-xl focus:outline-none ${
                      fieldTouched
                        ? "text-white bg-purple-500"
                        : "text-purple-300 bg-white border-2 border-purple-300 cursor-not-allowed"
                    }`}
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
                        ? "text-white bg-red-500"
                        : "bg-white text-red-300 border-2 border-red-300 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCancelClicked(true);
                      handleReset();
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
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
