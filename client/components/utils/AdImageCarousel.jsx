import React, { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdImageCarousel = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-axiforma">
      <div className="carousel-container p-4 w-88 lg:w-128 cursor-pointer">
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
            <div key={index} className="-z-20">
              <img
                src={image}
                alt={`Ad image-${index}`}
                height={500}
                width={600}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <Modal
        isOpen={isModalOpen}
        shouldFocusAfterRender={true}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsModalOpen(false)}
        className="flex flex-col justify-center items-center w-screen h-screen bg-gray-500 bg-opacity-50"
      >
        <div className="carousel-container mt-10 mx-5 flex justify-center items-center">
          <Carousel
            showStatus={false}
            selectedItem={0}
            showArrows={true}
            axis="vertical"
          >
            {props.images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`Ad image-${index}`}
                  width={800}
                  height={600}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <button
          className="bg-black p-2 rounded-xl text-white uppercase -mt-7 focus:outline-none"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default AdImageCarousel;
