import { useContext, useState, Fragment } from "react";
import SiteContext from "../../context/site/siteContext";
import { Formik, Field, Form } from "formik";
import Router from "next/router";
import Link from "next/link";
import * as Yup from "yup";
import { motion } from "framer-motion";

const apartmentSearchValidationSchema = Yup.object({
  apartment: Yup.string().required("Please select your neighbourhood"),
});

const ApartmentSearch = () => {
  const [parentDiv, setparentDiv] = useState("visible");
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
    <Fragment>
      <Formik
        initialValues={{ apartment: "" }}
        validationSchema={apartmentSearchValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          clearApartmentSearchResults();
          Router.push(`/ads/${values.apartment}`);
          setSubmitting(false);
        }}
      >
        {(props) => (
          <Form
            onKeyPress={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            <div className="flex items-center mt-6 border-2 rounded-lg border-brand-purple">
              {/* Search icon on the text box */}
              <img
                src="/search.svg"
                alt="Search Apartment"
                className=" fill-current text-gray-600 opacity-75 ml-2"
              />
              <Field
                id="apartment"
                name="apartment"
                type="input"
                placeholder="Search Apartment"
                className="font-gotham border-opacity-0 p-3 w-11/12 lg:w-9/12 xl:w-11/12 placeholder-purple-900"
                maxLength="100"
                onKeyUp={searchApartment}
              />
            </div>

            {/* Validation errors */}
            {props.touched.apartment && props.errors.apartment ? (
              <div className="font-gotham absolute text-xs text-red-800 p-1">
                {props.errors.apartment}
              </div>
            ) : null}

            {/* Menu to display search results */}
            <div className="relative ">
              <div
                className={
                  numApartmentsFetched > 0
                    ? "apartment-search-results w-full overflow-auto" +
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
                        whileHover={{ color: "#553C9A", fontWeight: "bold" }}
                        onClick={() => {
                          props.setFieldValue(
                            apartment,
                            (props.values.apartment = o.name)
                          );
                          setparentDiv("invisible");
                        }}
                      >
                        <img
                          src="/apartment.svg"
                          className="inline mr-2 align-middle"
                          height="20px"
                          width="20px"
                        />
                        <p
                          className="text-base align-middle inline"
                          key={index}
                          value={o.name}
                        >
                          {o.name}
                        </p>
                        <br />
                        <img
                          src="/location.svg"
                          className="inline mr-1 align-middle"
                          height="16px"
                          width="16px"
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
                <Link href="/register">
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
              <button
                type="submit"
                disabled={props.isSubmitting}
                className="mt-8 p-0 w-48 h-12 rounded-lg bg-purple-500 text-white uppercase font-bold text-center tracking-wide shadow-buttonshadow cursor-pointer transition hover:text-brand-purple hover:bg-purple-300 duration-300 ease-in-out transform hover:translate-y-2"
                aria-label="Browse Advertisements"
              >
                {!props.isSubmitting ? "Browse Ads" : "Searching..."}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default ApartmentSearch;
