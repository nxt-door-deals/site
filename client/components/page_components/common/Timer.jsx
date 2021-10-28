import React, { useState, useEffect } from "react";
import cookie from "../../../utils/cookieInit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

const Timer = (props) => {
  // var endTs = cookie.get("__resetCookie")._endTs;
  var endTs = localStorage.getItem("timer");

  // useEffect(() => {
  //   var timer = setTimeout(() => {
  //     let utcMs = new Date().getTime();

  //     var timeRemaining = endTs - utcMs;

  //     if (timeRemaining > 0) {
  //       props.setMinutes(
  //         Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
  //       );

  //       props.setSeconds(Math.floor((timeRemaining % (1000 * 60)) / 1000));
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [props.seconds]);

  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("10");
  const [counter, setCounter] = useState(600);

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      const secondCounter = counter % 60;
      const minuteCounter = Math.floor(counter / 60);

      let computedSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : secondCounter;
      let computedMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : minuteCounter;

      setSecond(computedSecond);
      setMinute(computedMinute);

      setCounter((counter) => counter - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

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
            <FontAwesomeIcon icon={faHourglassHalf} />
            {` Time remaining: ${minute}:${second}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Timer;
