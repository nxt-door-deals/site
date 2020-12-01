import React from "react";

const BouncingBalls = () => {
  return (
    <div className="flex justify-center tems-end">
      <div className="mr-2 w-4 h-4 bg-white rounded-full animate-bouncingBalls1"></div>
      <div className="mr-2 w-4 h-4 bg-white rounded-full animate-bouncingBalls2"></div>
      <div className="mr-2 w-4 h-4 bg-white rounded-full animate-bouncingBalls3"></div>
      <div className="mr-2 w-4 h-4 bg-white rounded-full animate-bouncingBalls4"></div>
    </div>
  );
};

export default BouncingBalls;
