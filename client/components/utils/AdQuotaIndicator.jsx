import React from "react";
import keys from "../../utils/keys";

const AdQuotaIndicator = (props) => {
  const remainingAds = keys.AD_QUOTA - parseInt(props.userAds.length);

  return (
    <div className="mb-5 text-center text-lg">
      {/* <span className="bg-ad-purple p-3 text-white rounded-tl-md rounded-bl-md">
        Remaining ads
      </span>{" "}
      <span className="font-extrabold p-3 rounded-tr-md rounded-br-md bg-gray-300 text-ad-purple">
        {keys.AD_QUOTA - parseInt(props.userAds.length)}
      </span> */}
      {remainingAds !== 0 && (
        <p className="font-semibold text-base lg:text-xl">
          <span className="text-ad-purple font-extrabold">
            {props.userAds.length}
          </span>{" "}
          {props.userAds.length === 1 ? "ad" : "ads"} down,{" "}
          <span className="text-ad-purple font-extrabold">{remainingAds}</span>{" "}
          more to go. Get in there, {props.currentUsername}!
        </p>
      )}

      {remainingAds === 0 && (
        <div>
          <p className="font-semibold text-base lg:text-xl">
            Oops! Looks like we are fresh out of ads :(
          </p>
          <p className="text-sm font-medium mt-2">
            To post more ads, you can delete ads or mark them as sold.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdQuotaIndicator;
