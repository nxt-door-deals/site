import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import keys from "../../../utils/keys";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AdImageCarousel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  return (
    <div>
      <div className="carousel-container p-4 w-88 lg:w-128 cursor-pointer relative z-0">
        {props.images.length !== 0 ? (
          <Carousel
            dynamicHeight
            showStatus={false}
            showArrows={false}
            selectedItem={0}
            onClickItem={() => {
              setIsModalOpen(true);
            }}
          >
            {props.images.map((image, index) => (
              <div key={index} onClick={() => setSelectedImage(index)}>
                <Image
                  src={image.image_path}
                  alt={`Ad image-${index}`}
                  quality={100}
                  layout="responsive"
                  height={image.image_height}
                  width={image.image_width}
                  className="rounded-xl"
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
        style={{
          overlay: {
            zIndex: 99999,
            opacity: 1,
            background: "var(--modal-overlay-color)",
          },
        }}
        isOpen={isModalOpen}
        shouldFocusAfterRender={true}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalOpen(false)}
        className="flex flex-col justify-center items-center h-screen bg-gray-500 bg-opacity-50"
      >
        <div className="absolute right-4 top-5 font-bold z-50">
          <FontAwesomeIcon
            icon={faTimes}
            className="lg:text-5xl cursor-pointer text-white bg-red-500 hover:bg-red-800 p-1 h-5 w-5 lg:h-7 lg:w-7 rounded-md"
            size="2x"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <div className="carousel-container mx-5 my-2 lg:p-2 lg:mx-36 flex justify-center items-center md:overflow-y-scroll bg-gray-700">
          <Carousel
            dynamicHeight
            showStatus={false}
            showArrows={true}
            showThumbs={false}
            showIndicators={false}
            infiniteLoop
            selectedItem={selectedImage}
          >
            {props.images.map((image, index) => (
              <div className="" key={index}>
                <Image
                  src={image.image_path}
                  alt={`Ad image-${index}`}
                  quality={100}
                  layout="intrinsic"
                  width={
                    image.image_width < 800
                      ? image.image_width
                      : image.image_width > 1900
                      ? image.image_width / 3
                      : image.image_width / 1.6
                  }
                  height={
                    image.image_height < 800
                      ? image.image_height
                      : image.image_height > 1900
                      ? image.image_height / 3
                      : image.image_height / 1.6
                  }
                />
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
