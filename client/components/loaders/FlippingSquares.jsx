import React from "react";

const FlippingSquares = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-10 h-10 relative z-10">
        <div className="absolute top-0 h-10 w-10 bg-purple-600 animate-flippingSquares1 origin-bottom-right"></div>
        <div className="absolute top-0 h-10 w-10 bg-purple-300 animate-flippingSquares2 origin-bottom-right"></div>
      </div>
    </div>
  );
};

export default FlippingSquares;
