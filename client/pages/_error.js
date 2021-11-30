import React from "react";
import Image from "next/image";
import { serverError } from "../utils/siteImages";

// Component imports
import ServerErrorHeadLayout from "../components/layout/head/ServerErrorHeadLayout";

const error = () => {
  return (
    <ServerErrorHeadLayout>
      <div className="h-screen flex flex-col justify-center items-center px-10 lg:mt-10 text-brand-gray">
        <p className="text-xl font-semibold pb-2">
          Houston, we have a problem!
        </p>
        <p className="text-lg text-gray-500">
          Please check back in a few minutes...
        </p>

        <Image src={serverError} alt="Server error" width={500} height={500} />
      </div>
    </ServerErrorHeadLayout>
  );
};

export default error;
