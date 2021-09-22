import React from "react";
import Image from "next/image";
import Link from "next/link";

const NoAdsForNeighbourhood = () => {
  return (
    <div className="py-16 px-8 text-center">
      <Image
        src={"/images/browseads/empty_cart.svg"}
        alt={"empty cart"}
        height={250}
        width={250}
      />
      <p className="pt-5 text-gray-600 text-xl ">
        Looks like there are no ads for this apartment yet.
        <br />
        <br />
        <Link href="/registeruser">
          <a className="text-purple-500">
            <span className="styled-link">Sign Up</span>
          </a>
        </Link>{" "}
        today, be that trailblazer and get the ball rolling. It's{" "}
        <span className="font-semibold">FREE</span>!
      </p>
    </div>
  );
};

export default NoAdsForNeighbourhood;
