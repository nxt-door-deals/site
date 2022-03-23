import React, { useState, useContext, useEffect } from "react";
import SiteContext from "../../../context/site/siteContext";
import Image from "next/image";
import { useRouter } from "next/router";
import keys from "../../../utils/keys";
import { motion } from "framer-motion";
import { noAdsFound } from "../../../utils/siteImages";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faCertificate } from "@fortawesome/free-solid-svg-icons";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Framer variants
const buttonVariants = {
  hover: {
    backgroundColor: "#4C1D95",
  },
  tap: {
    y: "2px",
    backgroundColor: "#6D28D9",
  },
};

const NbhAdsCard = (props) => {
  const router = useRouter();
  const [adLimit, setAdLimit] = useState(16);
  const siteContext = useContext(SiteContext);
  const { adsDataNbh, fetchAdsForNbh, loading, setLoading, adsDataNbhFetched } =
    siteContext;

  useEffect(() => {
    setLoading();
    fetchAdsForNbh(props.nbhId);
  }, []);

  useEffect(() => {
    if (adsDataNbhFetched && adsDataNbh && adsDataNbh.length === 0) {
      window.scrollBy({ top: 150, left: 0, behavior: "smooth" });
    }
  }, [adsDataNbh]);

  if (loading) {
    return (
      <div className="py-8 px-8 lg:px-0">
        <div className="text-center">
          <Image
            src={"/images/loader/loader.gif"}
            alt="Loading..."
            height={100}
            width={100}
          />
        </div>
      </div>
    );
  }

  if (!loading && adsDataNbhFetched && adsDataNbh && adsDataNbh.length === 0) {
    return (
      <div className="py-6 px-6 lg:px-0 text-center">
        <Image
          src={noAdsFound}
          alt="No search results"
          height={150}
          width={150}
        />
        <p className="text-brand-gray mt-5 text-xl">
          We looked everywhere, but found nothing...
        </p>
      </div>
    );
  } else
    return (
      <div className="mx-5 lg:mx-16">
        {/* The cards grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
          <Masonry gutter={25}>
            {adsDataNbh.slice(0, adLimit).map((ad, adIndex) => (
              <div
                key={adIndex}
                className="shadow-md rounded-2xl focus-within:outline-none bg-white text-brand-gray  cursor-pointer border-3 border-purple-300 max-h-128 max-w-sm md:max-w-md lg:max-w-lg hover:shadow-adcardshadow transition-shadow ease-in-out relative mb-7 md:mb-0"
                onClick={() => {
                  router.push(`/ads/${ad.id}`);
                  props.setShowForm(true);
                }}
              >
                {ad.date_posted === "today" && (
                  <span className="absolute top-4 right-4 bg-white z-10 text-xs text-brand-purple p-1 rounded-sm border-2 motion-safe:animate-pulse">
                    NEW
                  </span>
                )}

                {ad.images.length > 0 && (
                  <div
                    key={adIndex}
                    className="carousel-container relative flex justify-center mr-0 pb-3 h-[250px]"
                  >
                    {/* <Carousel
                    dynamicHeight
                    interval={3000}
                    autoPlay
                    transitionTime={150}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    showArrows={false}
                  > */}
                    {/* {ad.images.map((image, imgIndex) => ( */}
                    {/* <div className="-z-20"> */}
                    <Image
                      src={ad.images[0].image_path}
                      alt="Preview image"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      placeholder="blur"
                      blurDataURL={ad.images[0].image_path + "/tr:bl-10"}
                      className="rounded-t-xl hover:scale-110 overflow-hidden transition-all duration-300"
                    />
                    {/* </div> */}
                    {/* ))} */}
                    {/* </Carousel> */}
                  </div>
                )}
                {ad.images.length === 0 && (
                  <div className="p-4 flex justify-center mr-0">
                    <Image
                      src={keys.DEFAULT_IMAGE}
                      alt="Carousel default image"
                      quality={100}
                      height={250}
                      width={300}
                    />
                  </div>
                )}

                <div
                  className="outline-none focus:outline-none cursor-pointer pt-2 "
                  onClick={() => {
                    router.push(`/ads/${ad.id}`);
                    props.setShowForm(true);
                  }}
                >
                  {/* Card title */}
                  <div className="text-left px-4 py-2">
                    <p className="font-semibold text-lg">{ad.title}</p>
                  </div>

                  {/* Price and timeframe */}
                  <div className="flex justify-between items-center p-4">
                    {ad.ad_type === "sale" ? (
                      <div className="font-semibold text-lg border-t-3 border-b-3 py-1 border-yellow-500">
                        <FontAwesomeIcon icon={faRupeeSign} /> {ad.price}
                      </div>
                    ) : (
                      <div className="fa-layers fa-fw w-10 p-5">
                        <FontAwesomeIcon
                          icon={faCertificate}
                          size="3x"
                          className="text-brand-purple"
                        />
                        <span className="fa-layers-text fa-inverse mx-1 font-semibold uppercase text-xs">
                          free
                        </span>
                      </div>
                    )}
                    <div
                      className={`text-sm font-semibold border-b-3 ${
                        ad.date_posted === "today"
                          ? "border-pink-600"
                          : "border-purple-400"
                      }`}
                    >
                      Posted {ad.date_posted}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        {adsDataNbh.length <= 16 ? null : (
          <div className="flex justify-center items-center my-16">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="button"
              className=" bg-purple-700 px-7 py-5 uppercase text-xl text-white font-semibold rounded-xl focus-within:outline-none"
              onClick={() => setAdLimit(adLimit + 4)}
            >
              Show More Ads
            </motion.button>
          </div>
        )}
      </div>
    );
};

export default NbhAdsCard;
