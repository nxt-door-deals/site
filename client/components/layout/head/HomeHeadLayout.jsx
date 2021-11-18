import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const HomeHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Welcome to Your Apartment's Marketplace</title>
        <meta
          name="description"
          content="Your one-stop shop to find amazing deals within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Welcome To Your Apartment's Marketplace"
        />
        <meta
          property="og:description"
          content="Your one-stop shop to find amazing deals within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!"
        />
        <meta property="og:url" content="https://nxtdoordeals.com/" />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `[
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                dateCreated: "18-11-2021",
                url: "https://nxtdoordeals.com",
                description:
                  "Your one-stop shop to find amazing deals within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!",
                genre: "Website for an online marketplace",
                keywords:
                  "marketplace, apartment, post free ad, neighbourhood, buy, sell, preloved, giveaway, second hand",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                datePublished: "18-11-2021",
                dateModified: "18-11-2021",
                url: "https://nxtdoordeals.com/",
                description:
                  "Your one-stop shop to find amazing deals within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!",
                name: "Welcome To Your Apartment's Marketplace",
                inLanguage: "en",
                isPartOf: "https://nxtdoordeals.com",
                potentialAction: {
                  "@type": "ReadAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://nxtdoordeals.com",
                  },
                },
              },
            ]`,
          }}
        />
      </Head>
      {props.children}
    </Fragment>
  );
};

export default HomeHeadLayout;
