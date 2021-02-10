import React from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const OurStoryDetails = () => {
  return (
    <div className="h-full w-full text-brand-gray mt-2">
      <div className="text-center px-10 mb-20">
        <h1 className="text-4xl font-bold">Our Story</h1>
        <p className="pt-5 text-lg">
          At{" "}
          <span className="text-brand-purple font-semibold">nxtdoordeals</span>,
          we believe in the power of second chances, community and the
          importance of protecting our environment.
        </p>
      </div>

      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center px-20 mb-20 lg:mb-10">
        <div className="lg:flex-4 lg:px-16">
          <h2 className="text-2xl font-semibold">
            <FontAwesomeIcon icon={faHeart} className="text-red-800" /> your
            preloved's
          </h2>
          <p className="pt-5">
            Today, everything, no matter how big or small, is delivered to our
            doorstep. But how many times do we find ourselves boxing up the “old
            stuff” and shipping it to its permanent home in a loft somewhere to
            make way for the new and shiny replacement? If unlucky, we toss it
            in the trash.
          </p>
          <p className="pt-2">
            With a huge chunk of India’s urban population living in large
            apartment communities, there are potentially hundreds of neighbours
            who might be interested in the things we box up or toss away. With
            the average resident being part of a small subset of the hundred or
            so online groups in each community, posting an ad on these platforms
            is more miss than hit in finding that potential buyer. We aim to
            make this buy/sell process simpler by providing a dedicated
            marketplace for your community where you have all the power!
          </p>
        </div>
        <div className="lg:flex-2 pb-5 lg:pb-0">
          <Image
            src="/images/our-story/marketplace.svg"
            height={300}
            width={300}
            alt="marketplace"
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center px-20 mb-20 lg:mb-0">
        <div className="lg:flex- pb-5 lg:pb-0">
          <Image
            src="/images/our-story/meet.svg"
            height={300}
            width={300}
            alt="meet"
          />
        </div>
        <div className="lg:flex-4 lg:px-16">
          <h2 className="text-2xl font-semibold">Meet thy neighbour</h2>
          <p className="pt-5">
            The easier it becomes to communicate with people, the lesser we do
            it in person! While we provide a platform for residents to shop
            within their community, the transaction is complete only once the
            two parties meet face to face (socially distant, of course!). We
            would like to believe that if all the stars align, you’ve made a
            friend for life!
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center px-20 mb-10">
        <div className="lg:flex-4 lg:px-16">
          <h2 className="text-2xl font-semibold">Save the environment</h2>
          <p className="pt-5">
            One of our core missions is to reduce recyclable waste that might
            end up in a landfill. Whether you are buying or selling a preloved
            item, not only are you helping us in this mission, but you are also
            doing your bit to save mother nature.
          </p>
        </div>
        <div className="lg:flex-2 pb-5 lg:pb-0">
          <Image
            src="/images/our-story/nature.svg"
            height={350}
            width={350}
            alt="nature"
          />
        </div>
      </div>
    </div>
  );
};

export default OurStoryDetails;
