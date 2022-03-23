import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const MarketplaceHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>
          {props.aptName || "Browse Ads"} | See what's for Sale or available for
          FREE
        </title>
        <meta
          name="description"
          content="Browse ads from your or other registered neighbourhoods to find out what's for sale or giveaway."
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Browse Ads | See what's for Sale or available for FREE"
        />
        <meta
          property="og:description"
          content="Browse ads from your or other registered apartments to find second hand/preloved items for sale or giveaway."
        />
        <meta
          property="og:url"
          content={`https://nxtdoordeals.com/neighbourhood/ads/${props.aptId}`}
        />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Browse ads from your or other registered apartments to find second hand/preloved items for sale or giveaway."
        />
        <meta
          name="twitter:title"
          content="Browse Ads | See what's on sale or available for free"
        />
        <meta name="twitter:image" content={keys.ICON} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `[
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "dateCreated": "18-11-2021",
                "url": "https://nxtdoordeals.com",
                "description": "Your one-stop shop to find amazing deals within your apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!",
                "genre": "Website for an online marketplace",
                "keywords": "marketplace, apartment, post free ad, neighbourhood, buy, sell, preloved, giveaway, second hand"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "datePublished": "18-11-2021",
                "dateModified": "18-11-2021",
                "url": "https://nxtdoordeals.com/neighbourhood/ads/${props.aptId}",
                "description": "Browse ads from your or other registered neighbourhoods to find out what's for sale or giveaway.",
                "name": "Browse Ads | See what's on sale or available for free",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "url": "https://nxtdoordeals.com",
                  "name": "nxtdoordeals.com | Your Apartment's Marketplace",
                  "inLanguage": "en"},
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://nxtdoordeals.com/neighbourhood/ads/${props.aptId}"
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

export default MarketplaceHeadLayout;
