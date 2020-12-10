import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const PostAdHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>NXT Door Deals | Post a Free Ad</title>
        <meta
          name="description"
          content="Post an ad for free. NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NXT Door Deals | Post a Free Ad" />
        <meta
          property="og:description"
          content="Post an ad for free. NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society"
        />
        <meta property="og:url" content="https://nxtdoordeals.com/postad" />
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
                    "@value": "NXT Door Deals is your one-stop shop to find amazing deals within your apartment complex, gated community or housing society."
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
                "@id": "https://nxtdoordeals.com/login/#webpage",
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
                    "@value": "Post an ad for free. NXT Door Deals is your one-stop shop to find amazing deals for preloved items in your neighbourhood."
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
                        "@value": "https://nxtdoordeals.com/postad"
                      }
                    ]
                  }
                ],
                "http://schema.org/url": [
                  {
                    "@id": "https://nxtdoordeals.com/postad"
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

export default PostAdHeadLayout;
