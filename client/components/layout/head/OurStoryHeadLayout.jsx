import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const OurStoryHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Our Story | The inspiration behind nxtdoordeals.com</title>
        <meta
          name="description"
          content="Learn about the inspiration behind nxtdoordeals.com. We shed light on what led us to create an online marketplace. We also discuss the specific problems we aim to solve with the website and our aims and objectives."
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Our Story | The Inspiration behind nxtdoordeals.com"
        />
        <meta
          property="og:description"
          content="Learn about the inspiration behind nxtdoordeals.com. We shed light on what led us to create an online marketplace. We also discuss the specific problems we aim to solve with the website and our aims and objectives."
        />
        <meta property="og:url" content="https://nxtdoordeals.com/ourstory" />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Learn about the inspiration behind nxtdoordeals.com. We shed light on what led us to create an online marketplace. We also discuss the specific problems we aim to solve with the website and our aims and objectives."
        />
        <meta
          name="twitter:title"
          content="Our Story | The Inspiration behind nxtdoordeals.com"
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
                "url": "https://nxtdoordeals.com/ourstory",
                "description": "Learn about the inspiration behind nxtdoordeals.com. We shed light on what led us to create an online marketplace. We also discuss the specific problems we aim to solve with the website and our aims and objectives.",
                "name": "Our Story | The Inspiration behind nxtdoordeals.com",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "url": "https://nxtdoordeals.com",
                  "name": "nxtdoordeals.com | Your  Apartment's Marketplace",
                  "inLanguage": "en"},
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://nxtdoordeals.com/ourstory"
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

export default OurStoryHeadLayout;
