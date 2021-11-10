import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const AdsHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Browse Ads | See what's on sale or available for free</title>
        <meta
          name="description"
          content="Browse ads from across registered apartments. Choose from items that are on sale or for giving away"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Browse Ads | See what's on sale or available for free"
        />
        <meta
          property="og:description"
          content="Browse ads from across registered apartments. Choose from items that are on sale or for giving away"
        />
        <meta
          property="og:url"
          content={`https://nxtdoordeals.com/ads/${props.adId}`}
        />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `[
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "dateCreated": "22-03-2021",
                "url": "https://nxtdoordeals.com",
                "description": "Your one-stop shop to find amazing deals within your apartment complex, gated community or co-operative housing society. Browse ads from your apartment or post up to five free ads today!",
                "genre": "Website for an online marketplace",
                "keywords": "marketplace, apartment, post free ad, neighbourhood, buy, sell, preloved, giveaway, second hand"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "datePublished": "22-03-2021",
                "dateModified": "22-03-2021",
                "url": "https://nxtdoordeals.com/ads/${props.adId}",
                "description": "Browse ads from across registered apartments. Choose from items that are on sale or for giving away",
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
                    "urlTemplate": "https://nxtdoordeals.com/ads/${props.adId}"
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

export default AdsHeadLayout;
