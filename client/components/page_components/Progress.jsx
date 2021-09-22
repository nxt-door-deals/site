import React, { useState, useEffect } from "react";

const Progress = (props) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    var done =
      props.minutes >= 1
        ? props.minutes * 10
        : props.minutes < 1 && props.seconds !== 0
        ? 5
        : 0;

    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
        transition: "1s ease 0.3s",
      };

      setStyle(newStyle);
    }, 1000);
  }, [props.seconds]);

  return (
    <div className="mt-3">
      <div className="w-48 h-6 bg-gray-300 rounded-full p-1">
        <div
          className="h-full shadow-categorycardshadow bg-gradient-to-r from-footer-gradient-from to-footer-gradient-to rounded-full animate-pulse"
          style={style}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
