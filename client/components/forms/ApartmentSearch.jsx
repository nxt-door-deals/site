import { useContext, useState, useRef, Fragment } from "react";
import SiteContext from "../../context/site/siteContext";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMapPin,
  faBuilding,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import BouncingBalls from "../loaders/BouncingBalls";

const apartmentSearchValidationSchema = Yup.object({
  apartment: Yup.string().required("Please select your neighbourhood"),
});

const variants = {
  hoverSearchResults: { color: "#553C9A", fontWeight: 600 },
  buttonTap: {
    backgroundColor: "#8B5CF6",
    y: "2px",
  },
  buttonHover: {
    backgroundColor: "#5B21B6",
  },
};

const ApartmentSearch = () => {
  const [parentDiv, setparentDiv] = useState("visible");
  const [enableFormSubmission, setEnableFormSubmission] = useState(false);
  const apartmentId = useRef(null);
  const router = useRouter();
  const siteContext = useContext(SiteContext);
  const {
    fetchApartments,
    numApartmentsFetched,
    apartmentData,
    clearApartmentSearchResults,
  } = siteContext;

  const searchApartment = (e) => {
    setparentDiv("visible");
    fetchApartments(e.target.value);

    if (e.which === 13) {
      e.preventDefault();
    }
  };

  return (
    <div className="font-axiforma">
      <Formik
        initialValues={{ apartment: "" }}
        validationSchema={apartmentSearchValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          if (enableFormSubmission) {
            clearApartmentSearchResults();
            router.push(`/ads/${values.apartment}/${apartmentId.current}`);
          }
          setTimeout(() => setSubmitting(false), 2000);
        }}
      >
        {(props) => (
          <Form
            onKeyPress={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div
              className={`"flex mt-6 border-2 rounded-xl " ${
                props.errors.apartment && props.touched.apartment
                  ? "mb-1 border-red-900 shadow-none"
                  : "border-purple-900 focus:outline-none"
              }`}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="inline align-middle text-lg fill-current text-gray-400 ml-2 w- "
                alt="Search Apartment"
              />
              <Field
                id="apartment"
                name="apartment"
                type="input"
                placeholder="Find Your Apartment"
                className="textbox-input w-11/12 placeholder-gray-600 placeholder-opacity-50"
                maxLength="100"
                autoComplete="off"
                onKeyUp={searchApartment}
              />
            </div>

            {/* Validation errors */}
            {props.touched.apartment && props.errors.apartment ? (
              <div className=" text-xs text-red-800 p-1 mb-2">
                <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                {props.errors.apartment}
              </div>
            ) : null}

            {/* Menu to display search results */}
            <div className="relative ">
              <div
                className={
                  numApartmentsFetched > 0
                    ? "search-results border-purple-400 w-full overflow-auto" +
                      " " +
                      parentDiv
                    : "invisible"
                }
              >
                {apartmentData.length > 0 &&
                  apartmentData.map((o, index) => {
                    return (
                      <motion.div
                        key={index}
                        className="cursor-pointer"
                        variants={variants}
                        whileHover="hoverSearchResults"
                        onClick={() => {
                          props.setFieldValue(
                            apartment,
                            (props.values.apartment = o.name)
                          );
                          apartmentId.current = o.id;
                          setEnableFormSubmission(true);
                          setparentDiv("invisible");
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className="inline mr-2 text-lg align-middle"
                        />
                        <p
                          className="text-base align-middle inline"
                          key={index}
                          value={o.name}
                        >
                          {o.name}
                        </p>
                        <br />
                        <FontAwesomeIcon
                          icon={faMapPin}
                          className="inline mr-1 align-middle"
                        />
                        <p className="text-xs mt-1 mb-1 inline align-middle">
                          {o.address1}, {o.city} - {o.pincode}
                        </p>

                        <hr className="border-1 border-brand-purple mt-1 mb-3" />
                      </motion.div>
                    );
                  })}
              </div>
            </div>

            {/* Menu to display if neighbourhood does not exist */}
            <div className="relative">
              <div
                className={
                  props.values.apartment === ""
                    ? "hidden"
                    : numApartmentsFetched === 0
                    ? "absolute p-2 pt-5 mt-1 border-2 border-solid border-purple-400 bg-white z-20 rounded-lg  text-brand-gray; w-full h-20 align-middle overflow-auto"
                    : "hidden"
                }
              >
                Not found? Create a neighborhood for{" "}
                <Link href={`/neighbourhood/${props.values.apartment}`}>
                  <a className="text-purple-700 font-bold underline">
                    {props.values.apartment}
                  </a>
                </Link>{" "}
                . It's{" "}
                <span className="font-semibold text-brand-purple">
                  absolutely free!
                </span>
              </div>
            </div>
            <div>
              <motion.button
                type="submit"
                className="mt-8 p-0 w-48 h-12 rounded-xl bg-purple-500 text-white uppercase font-bold text-center tracking-wide cursor-pointer focus:outline-none"
                variants={variants}
                whileHover="buttonHover"
                whileTap="buttonTap"
                aria-label="Browse Advertisements"
              >
                {!props.isSubmitting ? "Browse Ads" : <BouncingBalls />}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApartmentSearch;
