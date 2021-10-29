import ApartmentSearch from "../../forms/ApartmentSearch";
import Link from "next/link";
import Image from "next/image";

const Landing = (props) => {
  return (
    <div className="max-w-screen-xxl">
      <div className="flex flex-wrap items-center justify-center lg:flex-nowrap ">
        <div
          id="text-container"
          className="container mt-10 xl:mt-0 ml-4 mr-4 pl-4 pr-4 lg:w-1/2"
        >
          <h1 className="text-brand-gray text-2xl lg:text-3xl xxl:text-sm font-extrabold">
            Your apartment's marketplace
          </h1>
          <p className="text-base mt-5 text-gray-600 leading-relaxed">
            Buy and sell preloved items within your Apartment, Apartment
            Complex, Gated Community or Co-operative Housing Society.
          </p>

          <ApartmentSearch />

          <div className="mt-6 lg:hidden text-purple-700">
            <Link href="/#how-it-works">
              <a
                className="uppercase font-semibold underline text-sm hover:no-underline styled-link"
                onClick={() => {
                  props.hiwRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                How it works
              </a>
            </Link>
          </div>
        </div>

        {/* For large and xl screens */}
        <div
          id="image-container"
          className="hidden lg:inline lg:order-last lg:-mt-4 xl:mt-0  lg:top-0 flex-auto"
        >
          <img
            src="/images/landing/landing-page-illustration.png"
            alt="Landing page illustration"
            width="100%"
            height="100%"
          />
        </div>

        {/* For medium screens and below */}
        <div id="image-container" className="order-first w-full lg:hidden">
          <img
            src="/images/landing/landing-page-illustration-mobile.png"
            alt="Landing page illustration"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
