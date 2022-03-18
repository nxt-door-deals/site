import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const HomeHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Buy and sell used Items in your apartment</title>
        <meta
          name="description"
          content="Buy and sell used/preloved items within your apartment, apartment complex, gated community or co-operative housing society with ease. Browse ads from your apartment or post a free ad today!"
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Buy and sell used Items in your apartment"
        />
        <meta
          property="og:description"
          content="Buy and sell used/preloved items within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post a free ad today!"
        />
        <meta property="og:url" content="https://nxtdoordeals.com/" />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Buy and sell second hand/preloved items within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!"
        />
        <meta
          name="twitter:title"
          content="Welcome To Your Apartment's Marketplace"
        />
        <meta name="twitter:image" content={keys.ICON} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `[
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "dateCreated": "22-03-2021",
                "url": "https://nxtdoordeals.com",
                "description":
                  "Buy and sell second hand/preloved items within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!",
                "genre": "Website for an online marketplace",
                "keywords":
                  "marketplace, apartment, post free ad, neighbourhood, buy, sell, preloved, giveaway, second hand"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "datePublished": "22-03-2021",
                "dateModified": "22-03-2021",
                "url": "https://nxtdoordeals.com/",
                "description":
                  "Buy and sell second hand/preloved items within your apartment, apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!",
                "name": "Welcome To Your Apartment's Marketplace",
                "inLanguage": "en",
                "isPartOf": "https://nxtdoordeals.com",
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://nxtdoordeals.com"
                  }
                }
              }
            ]`,
          }}
        />
      </Head>
      {props.children}
    </Fragment>
  );
};

export default HomeHeadLayout;
