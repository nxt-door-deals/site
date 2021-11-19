import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const CovidGuidelinesHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Our COVID 19 Guidelines | Stay Safe!</title>
        <meta
          name="description"
          content="Read our COVID 19 guidelines and tips. Your safety is paramount. Even with a chunk of the population already vaccinated, this is not the time to let your guard down. Follow these simple buying and selling tips and stay safe."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="COVID 19 Guidelines" />
        <meta
          property="og:description"
          content="Read our COVID 19 guidelines and tips. Your safety is paramount. Even with a chunk of the population already vaccinated, this is not the time to let your guard down. Follow these simple buying and selling tips and stay safe."
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
                "url": "https://nxtdoordeals.com/covid",
                "description": "Read our COVID 19 guidelines and tips. Your safety is paramount. Even with a chunk of the population already vaccinated, this is not the time to let your guard down. Follow these simple buying and selling tips and stay safe.",
                "name": "COVID 19 Guidelines",
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
                    "urlTemplate": "https://nxtdoordeals.com/covid"
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

export default CovidGuidelinesHeadLayout;
