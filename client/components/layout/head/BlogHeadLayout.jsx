import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const BlogHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Preloved and More! | The nxtdoordeals.com Blog</title>
        <meta
          name="description"
          content="The nxtdoordeals.com blog is a catalogue of articles on buying, selling, DIY ideas and a whole lot more. The collection contains a buffet of posts from the nxtdoordeals.com team and a host of guest bloggers."
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Preloved and More! | The nxtdoordeals.com Blog"
        />
        <meta
          property="og:description"
          content="The nxtdoordeals.com blog is a catalogue of articles on buying, selling, DIY ideas and a whole lot more. The collection contains a buffet of posts from the nxtdoordeals.com team and a host of guest bloggers."
        />
        <meta property="og:url" content="https://nxtdoordeals.com/blog" />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="The nxtdoordeals.com blog is a catalogue of articles on buying, selling, DIY ideas and a whole lot more. The collection contains a buffet of posts from the nxtdoordeals.com team and a host of guest bloggers."
        />
        <meta
          name="twitter:title"
          content="Preloved and More! | The nxtdoordeals.com Blog"
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
                "keywords": "blog, marketplace, apartment, post free ad, neighbourhood, buy, sell, preloved, giveaway, second hand"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "datePublished": "18-11-2021",
                "dateModified": "18-11-2021",
                "url": "https://nxtdoordeals.com/blog",
                "description": "The nxtdoordeals.com blog is a catalogue of articles on buying, selling, DIY ideas and a whole lot more. The collection contains a buffet of posts from the nxtdoordeals.com team and a host of guest bloggers.",
                "name": "Preloved and More! | The nxtdoordeals.com Blog",
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
                    "urlTemplate": "https://nxtdoordeals.com/blog"
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

export default BlogHeadLayout;
