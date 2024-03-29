import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const PostAdHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Post a Free Ad | Start selling or giving away today</title>
        <meta
          name="description"
          content="Post free ad for your second hand/preloved item. Choose from a wide range of categories and start selling today. Post up to five free ads at any given time."
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Post Free Ad | Start Selling your Preloved's Today"
        />
        <meta
          property="og:description"
          content="Post free ad for your second hand/preloved item. Choose from a wide range of categories and start selling today. Post up to five free ads at any given time."
        />
        <meta property="og:url" content="https://nxtdoordeals.com/postad" />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Post free ad for your second hand/preloved item. Choose from a wide range of categories and start selling today. Post up to five free ads at any given time."
        />
        <meta
          name="twitter:title"
          content="Post Free Ad | Start Selling your Preloved's Today"
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
                "url": "https://nxtdoordeals.com/postad",
                "description": "Post free ad for your second hand/preloved item. Choose from a wide range of categories and start selling today. Post up to five free ads at any given time.",
                "name": "Post a Free Ad | Start Selling your Preloved's Today",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "url": "https://nxtdoordeals.com",
                  "name": "nxtdoordeals.com | Your  Apartment's Marketplace",
                  "inLanguage": "en"},
                "potentialAction": {
                  "@type": "CreateAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://nxtdoordeals.com/postad"
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

export default PostAdHeadLayout;
