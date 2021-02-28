import React, { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import keys from "../../utils/keys";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AdImageCarousel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="carousel-container p-4 w-88 lg:w-128 cursor-pointer relative z-0">
        {props.images.length !== 0 ? (
          <Carousel
            dynamicHeight
            showStatus={false}
            showArrows={false}
            infiniteLoop
            autoPlay
            interval={3000}
            selectedItem={0}
            onClickItem={() => setIsModalOpen(true)}
          >
            {props.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Ad image-${index}`}
                  height={600}
                  width={650}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Carousel
            dynamicHeight
            showStatus={false}
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
          >
            <div>
              <img
                src={keys.DEFAULT_IMAGE}
                alt="Default image"
                height={600}
                width={650}
              />
            </div>
          </Carousel>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        shouldFocusAfterRender={true}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalOpen(false)}
        className="flex flex-col justify-center items-center h-full pb-20 bg-gray-500 bg-opacity-50"
      >
        <div className="carousel-container lg:mt-56 mx-5 flex justify-center items-center">
          <Carousel
            showStatus={false}
            selectedItem={0}
            showArrows={true}
            axis="vertical"
          >
            {props.images.map((image, index) => (
              <div className="relative" key={index}>
                <Image
                  loader={`/images/loader/loager.gif/?w=${64}`}
                  src={image}
                  alt={`Ad image-${index}`}
                  quality={100}
                  layout="intrinsic"
                  width={700}
                  height={600}
                />
                <div className="absolute top-2 lg:top-5 right-8 lg:right-10 text-2xl font-bold z-50 ">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-3xl cursor-pointer text-white bg-red-500 p-1 h-5 w-5 rounded-md"
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        {/* <button
          className="absolute bg-black right-20 top-10 p-2 rounded-xl text-white uppercase focus:outline-none"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button> */}
      </Modal>
    </div>
  );
};

export default AdImageCarousel;
