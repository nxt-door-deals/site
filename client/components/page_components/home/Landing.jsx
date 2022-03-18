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
          className="container mt-7 lg:mt-10 xl:mt-0 ml-4 mr-4 px-3 md:px-4 lg:w-1/2"
        >
          <h1 className="text-brand-gray text-2xl lg:text-3xl xxl:text-sm font-extrabold">
            Buy and sell used Items in your apartment with ease
          </h1>
          <h2 className="text-base mt-3 md:mt-5 text-gray-600 leading-relaxed">
            We make it hassle free to buy and sell used or preloved items within
            your apartment, apartment complex, gated community or co-operative
            housing society.
          </h2>

          <div className="mt-3 lg:hidden text-purple-700">
            <Link href="/#how-it-works">
              <a
                className="uppercase font-semibold text-sm pb-1 styled-link"
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
            height={750}
            blurDataURL={`${landing}?tr=bl-6`}
            placeholder="blur"
            layout="responsive"
            priority={true}
            title="Buy and see used items in your apartment with ease"
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
            height={325}
            title="Buy and see used items in your apartment with ease"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
