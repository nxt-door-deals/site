import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const UserLoginHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Log in to your nxtdoordeals.com Account</title>
        <meta
          name="description"
          content="Log in to your nxtdoordeals.com account to post free ads and chat with potential sellers. You can also manage your user dashboard to edit or delete ads and chats."
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Log in to your nxtdoordeals.com Account"
        />
        <meta
          property="og:description"
          content="Log in to your nxtdoordeals.com account to post free ads and chat with potential sellers. You can also manage your user dashboard to edit or delete ads and chats."
        />
        <meta property="og:url" content="https://nxtdoordeals.com/login" />
        <meta property="og:site_name" content="nxtdoordeals.com" />{" "}
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Log in to your nxtdoordeals.com account to post free ads and chat with potential sellers. You can also manage your user dashboard to edit or delete ads and chats."
        />
        <meta
          name="twitter:title"
          content="Log in to your nxtdoordeals.com account"
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
                "url": "https://nxtdoordeals.com/login",
                "description": "Log in to your nxtdoordeals.com account to post free ads and chat with potential sellers. You can also manage your user dashboard to edit or delete ads and chats.",
                "name": "Login | Log in to your nxtdoordeals.com account",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "url": "https://nxtdoordeals.com",
                  "name": "nxtdoordeals.com | Your  Apartment's Marketplace",
                  "inLanguage": "en"},
                "potentialAction": {
                  "@type": "ControlAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://nxtdoordeals.com/login"
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
