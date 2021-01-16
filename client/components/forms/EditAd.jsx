import React from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const EditAd = (props) => {
  return (
    <div className="font-axiforma text-brand-gray">
      <p className="mt-2 mb-4 text-sm">
        You can upload {10 - props.data.images.length} more photos.
      </p>
      <div className="grid grid-cols-5 gap-0">
        {props.data.images.map((image, index) => {
          return (
            <div>
              <Image key={index} src={image} width={75} height={75} />
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="ml-2 text-sm cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditAd;
