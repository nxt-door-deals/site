import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "../../../context/auth/authContext";
import { noAdsPosted } from "../../../utils/siteImages";

const NoAdsForNeighbourhood = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div className="px-8 lg:text-center">
      <div className="text-center">
        <Image src={noAdsPosted} alt={"empty cart"} height={250} width={250} />
      </div>

      <p className="pt-5 text-gray-600 text-xl ">
        Looks like there are no ads for this apartment yet.
        <br />
        <br />
        {!user ? (
          <span>
            <Link href="/registeruser">
              <a className="text-purple-500">
                <span className="styled-link">Sign Up</span>
              </a>
            </Link>{" "}
            today, b
          </span>
        ) : (
          "B"
        )}
        e that trailblazer and get the ball rolling. It's{" "}
        <span className="font-semibold">FREE</span>!
      </p>
    </div>
  );
};

export default NoAdsForNeighbourhood;
