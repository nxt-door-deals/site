import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

// Component imports
import Progress from "./Progress";

// props passed down from the otp form

var cookie = new Cookies();

// const calculateTimeLeft = () => {
//   let now = new Date();

//   let endTs = now.setMinutes(now.getMinutes() + 10);

//   let utcMs = new Date().getTime();

//   let timeRemaining = endTs - utcMs;
//   console.log(timeRemaining);
//   let timeLeft = {};

//   timeLeft = {
//     minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
//     seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
//   };

//   return timeLeft;
// };

const Timer = (props) => {
  //   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setTimeLeft(calculateTimeLeft());
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }, [timeLeft]);

  //   console.log(timeLeft);

  //   useEffect(() => {
  //     var timer = setTimeout(() => {
  //       if (props.seconds > 0) {
  //         props.setSeconds(props.seconds - 1);
  //       }

  //       if (props.seconds === 0) {
  //         if (props.minutes === 0) {
  //           clearInterval(timer);
  //         } else {
  //           props.setMinutes(props.minutes - 1);
  //           props.setSeconds(59);
  //         }
  //       }
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }, [props.seconds]);

  //   var startTs = cookie.get("__resetCookie")._startTs;
  var endTs = cookie.get("__resetCookie")._endTs;

  useEffect(() => {
    var timer = setTimeout(() => {
      //   var now = new Date();
      //   var utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

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
