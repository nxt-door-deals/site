import ApartmentSearch from "./forms/ApartmentSearch";

const Landing = () => {
  return (
    <div className="max-w-screen-xxl">
      <div className="flex flex-wrap items-center justify-center lg:flex-nowrap ">
        <div
          id="text-container"
          className="container mt-10 xl:mt-0 ml-4 mr-4 pl-4 pr-4 lg:w-1/2"
        >
          <h1 className="text-2xl lg:text-2xl xl:text-3xl text-brand-gray xxl:text-sm font-axiforma font-bold">
            Your neighbourhood marketplace
          </h1>
          <p className="font-axiforma text-base mt-5 text-gray-600 tracking-wide">
            Buy and sell preloved items within your Apartment Complex, Gated
            Community or Co-operative Housing Society.
          </p>

          <ApartmentSearch />
        </div>

        {/* For large and xl screens */}
        <div
          id="image-container"
          className="hidden lg:inline lg:order-last lg:-mt-4 xl:mt-0  lg:top-0"
        >
          <img
            src="/landing-page-illustration.svg"
            alt="Landing page illustration"
          />
        </div>

        {/* For medium screens and below */}
        <div id="image-container" className="order-first w-full lg:hidden">
          <img
            src="/landing-page-illustration-mobile.svg"
            alt="Landing page illustration"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
