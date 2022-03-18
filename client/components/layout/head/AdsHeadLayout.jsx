import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const AdsHeadLayout = (props) => {
  console.log(props.ad);
  const title = `${props.ad.title} | ${props.ad.apartment_name}`;
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>{title}</title>
        <meta name="description" content={props.ad.description} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={props.ad.description} />
        <meta
          property="og:url"
          content={`https://nxtdoordeals.com/ads/${props.ad.id}`}
        />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={props.ad.images[0].image_path} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={props.ad.description} />
        <meta name="twitter:title" content={props.ad.title} />
        <meta name="twitter:image" content={props.ad.images[0].image_path} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `[
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "category": ${'"' + props.ad.category + '"'},
                "itemCondition": ${
                  props.ad.condition === "New"
                    ? '"' + "https://schema.org/NewCondition" + '"'
                    : '"' + "https://schema.org/UsedCondition" + '"'
                },
                "name": ${'"' + props.ad.title + '"'},
                "description": ${'"' + props.ad.description + '"'},
                "image": ${'"' + props.ad.images[0].image_path + '"'},
                "url":  "https://nxtdoordeals.com/ads/${props.ad.id + '"'},
                "offers": {
                  "@type": "Offer",
                  "availabilityStarts": ${
                    '"' + props.ad.available_from_date + '"'
                  },
                  "price": ${'"' + props.ad.price + '"'},
                  "priceCurrency": "INR",
                  "seller": {
                    "@type": "Person",
                    "givenName": ${'"' + props.ad.posted_by_name + '"'}
                  }
                }
              },
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
                "url": "https://nxtdoordeals.com/ads/${props.adId}",
                "description": "Browse ads and buy second hand/preloved items on sale from across registered apartments. Choose from items that are on sale or for giving away.",
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
