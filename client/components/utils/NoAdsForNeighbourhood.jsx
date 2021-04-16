import React from "react";
import Image from "next/image";

const NoAdsForNeighbourhood = () => {
  return (
    <div className="py-16 px-8 text-center">
      <Image
        src={"/images/browseads/trailblazer.svg"}
        alt={"trailblazer"}
        height={250}
        width={250}
      />
      <p className="pt-5 text-gray-600 text-xl ">
        Looks like there are no ads for this apartment yet. Be that trailblazer
        and get the ball rolling. It's{" "}
        <span className="font-semibold">FREE</span>!
      </p>
    </div>
  );
};

export default NoAdsForNeighbourhood;
