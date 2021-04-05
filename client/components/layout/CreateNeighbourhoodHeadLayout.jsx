import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const CreateNeighbourhoodHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Register your Apartment for Free</title>
        <meta
          name="description"
          content="Register your Apartment Complex, Gated Community or Co-operative Housing Society for free. All registrations are subject to verification and approval. NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Register your Apartment for FREE and Start Posting Ads"
        />
        <meta
          property="og:description"
          content="Register your Apartment Complex, Gated Community or Co-operative Housing Society for free. All registrations are subject to verification and approval. NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society"
        />
        <meta
          property="og:url"
          content="https://nxtdoordeals.com/register/neighbourhood"
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
                "description": "Your one-stop shop to find amazing deals within your apartment complex, gated community or housing society. Browse ads from your apartment or post up to seven free ads today!",
                "genre": "Website for an online marketplace",
                "keywords": "marketplace, apartment, post free ad, neighbourhood, buy, sell, preloved, giveaway, second hand"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "datePublished": "22-03-2021",
                "dateModified": "22-03-2021",
                "url": "https://nxtdoordeals.com/register/neighbourhood",
                "description": "Register your Apartment Complex, Gated Community or Co-operative Housing Society for free. All registrations are subject to verification and approval",
                "name": "Register your Apartment for FREE and Start Posting Ads",
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
                    "urlTemplate": "https://nxtdoordeals.com/register/neighbourhood"
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

export default CreateNeighbourhoodHeadLayout;
