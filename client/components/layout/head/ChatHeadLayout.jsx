import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const ChatHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>
          {props.altUser
            ? `Chat With ${props.altUser} and Seal the Deal`
            : "Chat with your neighbours and seal the deal"}
        </title>
        <meta
          name="description"
          content="Chat directly with members of your apartment and close deals faster"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Get Chatty | Chat with your neighbours and seal the deal"
        />
        <meta
          property="og:description"
          content="Chat directly with members of your apartment and close deals faster"
        />
        <meta property="og:url" content="https://nxtdoordeals.com/" />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Chat directly with members of your apartment and close deals faster"
        />
        <meta
          name="twitter:title"
          content={
            props.altUser
              ? `Chat With ${props.altUser} and Seal the Deal`
              : "Chat with your neighbours and seal the deal"
          }
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
                "keywords": "marketplace, apartment post free ad, neighbourhood, buy, sell, preloved, giveaway, second hand"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "datePublished": "18-11-2021",
                "dateModified": "18-11-2021",
                "url": "https://nxtdoordeals.com/chat/(chat_id)",
                "description": "Chat directly with members of your apartment and close deals faster",
                "name": "Apartment Chat | Chat with your neighbours and seal the deal",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "url": "https://nxtdoordeals.com",
                  "name": "nxtdoordeals.com | Your Apartment's Marketplace",
                  "inLanguage": "en"},
                "potentialAction": {
                  "@type": "InteractAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://nxtdoordeals.com/chat/(chat_id)"
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

export default ChatHeadLayout;
