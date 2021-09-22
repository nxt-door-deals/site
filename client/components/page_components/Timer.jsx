import React, { useState, useEffect } from "react";
import cookie from "../../utils/cookieInit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

const Timer = (props) => {
  var endTs = cookie.get("__resetCookie")._endTs;

  useEffect(() => {
    var timer = setTimeout(() => {
      let utcMs = new Date().getTime();

      var timeRemaining = endTs - utcMs;

      if (timeRemaining > 0) {
        props.setMinutes(
          Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
        );

        props.setSeconds(Math.floor((timeRemaining % (1000 * 60)) / 1000));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [props.seconds]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-brand-purple my-2">
        {props.minutes === 0 && props.seconds === 0 ? (
          <p>
            <FontAwesomeIcon icon={faHourglassEnd} /> Time's up! Please
            regenerate the OTP
          </p>
        ) : (
          <p>
            {props.minutes < 1 && <FontAwesomeIcon icon={faHourglassHalf} />}
            {props.minutes < 1 &&
              ` Time remaining: ${
                props.minutes +
                (props.seconds < 10 ? ":0" + props.seconds : props.seconds)
              }`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Timer;
