import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const UserLoginHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Signup | Create your free nxtdoordeals.com account</title>
        <meta
          name="description"
          content="Create your nxtdoordeals.com account and start posting ads for free today"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Signup | Create Your nxtdoordeals.com Account"
        />
        <meta
          property="og:description"
          content="Create your nxtdoordeals.com account and start posting ads for free today"
        />
        <meta
          property="og:url"
          content="https://nxtdoordeals.com/userregistration"
        />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content="/favicon.png" />
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
                "url": "https://nxtdoordeals.com/registeruser",
                "description": "Create your nxtdoordeals.com account and start posting ads for free today",
                "name": "Signup | Create Your nxtdoordeals.com Account",
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
                  "urlTemplate": "https://nxtdoordeals.com/registeruser"
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

export default UserLoginHeadLayout;
