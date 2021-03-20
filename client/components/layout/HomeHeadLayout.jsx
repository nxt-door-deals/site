import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const HomeHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>NXT Door Deals | Your Neighbourhood Marketplace</title>
        <meta
          name="description"
          content="Your one-stop shop to find amazing deals within your apartment complex, gated community or housing society. Browse ads from your neighbourhood or post up to seven free ads today!"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NXT Door Deals | Your neighbourhood marketplace"
        />
        <meta
          property="og:description"
          content="Your one-stop shop to find amazing deals within your apartment complex, gated community or housing society. Browse ads from your neighbourhood or post up to seven free ads today!"
        />
        <meta property="og:url" content="https://nxtdoordeals.com/" />
        <meta property="og:site_name" content="NXT Door Deals" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `[
              {
                "@id": "https://nxtdoordeals.com/#website",
                "@type": [
                  "http://schema.org/WebSite"
                ],
                "http://schema.org/description": [
                  {
                    "@value": ""
                  }
                ],
                "http://schema.org/inLanguage": [
                  {
                    "@value": "en"
                  }
                ],
                "http://schema.org/url": [
                  {
                    "@id": "https://nxtdoordeals.com/"
                  }
                ]
              },
              {
                "@id": "https://nxtdoordeals.com/#webpage",
                "@type": [
                  "http://schema.org/WebPage"
                ],
                "http://schema.org/datePublished": [
                  {
                    "@type": "http://schema.org/Date",
                    "@value": "2020-10-15T00:00:00+00:00"
                  }
                ],
                "http://schema.org/description": [
                  {
                    "@value": "Your one-stop shop to find amazing deals within your apartment complex, gated community or housing society. Browse ads from your neighbourhood or post up to seven free ads today!"
                  }
                ],
                "http://schema.org/inLanguage": [
                  {
                    "@value": "en"
                  }
                ],
                "http://schema.org/isPartOf": [
                  {
                    "@id": "https://nxtdoordeals.com/#website"
                  }
                ],
                "http://schema.org/potentialAction": [
                  {
                    "@type": [
                      "http://schema.org/ReadAction"
                    ],
                    "http://schema.org/target": [
                      {
                        "@value": "https://nxtdoordeals.com/"
                      }
                    ]
                  }
                ],
                "http://schema.org/url": [
                  {
                    "@id": "https://nxtdoordeals.com/"
                  }
                ]
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
