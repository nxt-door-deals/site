import React, { useContext, useEffect } from "react";
import SiteContext from "../../context/site/siteContext";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faCertificate } from "@fortawesome/free-solid-svg-icons";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const NbhAdsCard = (props) => {
  const siteContext = useContext(SiteContext);
  const { adsDataNbh, fetchAdsForNbh } = siteContext;

  useEffect(() => {
    fetchAdsForNbh(props.nbhId);
  }, []);

  if (adsDataNbh.length === 0) {
    return (
      <div className="py-8 px-8 lg:px-0">
        <p className="text-brand-gray text-xl text-center font-semibold">
          Sorry! No results...
        </p>
      </div>
    );
  } else
    return (
      <div>
        {/* The cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 font-axiforma mx-20 lg:mx-10">
          {adsDataNbh.map((ad, adIndex) => (
            <div
              key={adIndex}
              className="pt-3 lg:px-1 rounded-2xl bg-white text-brand-purple shadow-adcardshadow"
            >
              {/* Card carousel */}
              <div
                key={adIndex}
                className="carousel-container p-4 flex justify-center mr-0"
              >
                <Carousel
                  dynamicHeight
                  infiniteLoop={true}
                  showStatus={false}
                  showThumbs={false}
                >
                  {ad.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="-z-20">
                      <Image
                        src={image}
                        alt={`Carousel image-${imgIndex}`}
                        height={300}
                        width={300}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              {/* Card title */}
              <div className="text-left px-4 py-2">
                <p className="font-semibold">{ad.title}</p>
              </div>

              {/* Price and timeframe */}
              <div className="flex justify-between items-center p-4">
                {ad.ad_type === "sale" ? (
                  <div className="font-semibold text-lg">
                    <FontAwesomeIcon icon={faRupeeSign} /> {ad.price}
                  </div>
                ) : (
                  <div className="animate-pulse fa-layers fa-fw w-10 p-5">
                    <FontAwesomeIcon icon={faCertificate} size="3x" />
                    <span className="fa-layers-text fa-inverse mx-1 font-semibold uppercase text-xs">
                      free
                    </span>
                  </div>
                )}
                <div className="text-sm">Posted {ad.date_posted}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default NbhAdsCard;
