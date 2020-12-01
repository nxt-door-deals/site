import BouncingBalls from "../components/loaders/BouncingBalls";
import FlippingSquares from "../components/loaders/FlippingSquares";

const OurStory = () => {
  return (
    <div>
      <h1 className="text-lg text-red-600 mb-28">
        Something awesome will be here soon!
      </h1>
      <BouncingBalls />

      <div className="my-5 mx-5">
        <FlippingSquares />
      </div>
    </div>
  );
};

export default OurStory;
