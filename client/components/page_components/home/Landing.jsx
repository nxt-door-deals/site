import ApartmentSearch from "../../forms/ApartmentSearch";
import Image from "next/image";
import Link from "next/link";
import { landing, landingMobile } from "../../../utils/siteImages";

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

          <div className="mt-5 lg:hidden text-purple-700">
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

          <ApartmentSearch />
        </div>

        {/* For large and xl screens */}
        <div
          id="image-container"
          className="hidden relative lg:inline lg:order-last lg:-mt-4 xl:mt-0 lg:-z-10 lg:top-0 flex-auto lg:w-2/3"
        >
          <Image
            src={landing}
            alt="Landing page illustration"
            width={900}
            height={720}
            blurDataURL={`${landing}?tr=bl-6`}
            placeholder="blur"
            layout="responsive"
            priority={true}
          />
        </div>

        {/* For medium screens and below */}
        <div
          id="image-container"
          className="order-first w-full lg:hidden -z-10"
        >
          <Image
            src={landingMobile}
            alt="Landing page illustration"
            blurDataURL={`${landingMobile}?tr=bl-6`}
            placeholder="blur"
            layout="responsive"
            priority={true}
            width={500}
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
