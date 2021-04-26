import React from "react";
import keys from "../../utils/keys";

const AdQuotaIndicator = (props) => {
  return (
    <div className="mb-5 text-center text-lg">
      <span className="bg-ad-purple p-3 text-white rounded-tl-md rounded-bl-md">
        Remaining ads
      </span>{" "}
      <span className="font-extrabold p-3 rounded-tr-md rounded-br-md bg-gray-300 text-ad-purple">
        {keys.AD_QUOTA - parseInt(props.userAds.length)}
      </span>
      {keys.AD_QUOTA - parseInt(props.userAds.length) === 0 && (
        <p className="text-sm mt-7 font-medium">
          To post more ads, you can delete ads or mark them as sold.
        </p>
      )}
    </div>
  );
};

export default AdQuotaIndicator;
