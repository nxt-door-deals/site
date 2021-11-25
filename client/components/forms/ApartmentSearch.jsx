import { useContext, useState, useRef, useMemo, useEffect } from "react";
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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

// Component imports
import BouncingBalls from "../loaders/BouncingBalls";

const apartmentSearchValidationSchema = Yup.object({
  apartment: Yup.string().required("Please select your apartment"),
});

const variants = {
  hoverSearchResults: { color: "#553C9A", fontWeight: 600 },
  buttonTap: {
    backgroundColor: "#6D28D9",
    y: "2px",
  },
  buttonHover: {
    backgroundColor: "#4C1D95",
  },
  secondaryButtonTap: {
    backgroundColor: "#5B21B6",
    color: "#FFFFFF",
    y: "2px",
  },
  secondaryButtonHover: {
    backgroundColor: "#5B21B6",
    color: "#FFFFFF",
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

  const debouncedApartmentSearch = useMemo(
    () => debounce(searchApartment, 300),
    []
  );

  useEffect(() => {
    debouncedApartmentSearch.cancel();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{ apartment: "" }}
        validationSchema={apartmentSearchValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          if (enableFormSubmission) {
            clearApartmentSearchResults();
            setTimeout(() => {
              router.push(`/neighbourhood/ads/${apartmentId.current}`);
            }, 2000);
          }
          {
            /* setTimeout(() => setSubmitting(false), 500); */
          }
        }}
      >
        {(props) => (
          <Form
            onKeyPress={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div
              className={`"flex justify-around mt-6 border-2 rounded-xl " ${
                props.touched.apartment && props.errors.apartment
                  ? "error-border shadow-none"
                  : "border-purple-900"
              }`}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 text-lg ml-2 align-middle"
              />
              <Field
                role="textbox"
                id="apartment"
                name="apartment"
                type="text"
                placeholder="Your apartment"
                maxLength="50"
                autoComplete="off"
                autoFocus=""
                aria-required="true"
                aria-invalid={
                  props.touched.apartment && props.errors.apartment
                    ? "true"
                    : null
                }
                aria-describedby={
                  props.touched.apartment && props.errors.apartment
                    ? "apartment-error"
                    : null
                }
                className="textbox-input w-10/12 md:w-11/12 placeholder-gray-600 rounded-xl"
                onKeyUp={debouncedApartmentSearch}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className="close-button-animation lg:hidden align-middle text-gray-400 cursor-pointer lg:mr-1"
                onClick={() => {
                  props.setFieldValue(apartment, (props.values.apartment = ""));
                  setparentDiv("invisible");
                }}
              />
            </div>

            {/* Validation errors */}
            <div className="relative" id="apartment-error">
              {props.touched.apartment && props.errors.apartment ? (
                <div className="text-xs error-text p-1 absolute">
                  <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                  {props.errors.apartment}
                </div>
              ) : null}
            </div>

            {/* Menu to display search results */}
            <div className="relative z-10 h-auto">
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
                    ? "absolute p-2 pt-5 mt-1 border-2 border-solid border-purple-400 bg-white  rounded-lg  text-brand-gray; w-full h-20 align-middle overflow-auto"
                    : "hidden"
                }
              >
                Not found? Create a marketplace for{" "}
                <Link
                  href={`/register/neighbourhood/${props.values.apartment}`}
                >
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
            <div className="mt-7 lg:mt-8">
              <motion.button
                type="submit"
                className={`p-0 w-48 h-12 md:mr-5 rounded-xl bg-purple-700 shadow-buttonShadowPurple text-white uppercase font-bold text-center tracking-wide cursor-pointer focus:outline-none ${
                  props.isSubmitting && "cursor-not-allowed"
                }`}
                variants={variants}
                whileHover="buttonHover"
                whileTap="buttonTap"
                aria-label="Browse Advertisements"
                disabled={props.isSubmitting}
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
