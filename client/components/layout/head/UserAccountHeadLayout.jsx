import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";
import keys from "../../../utils/keys";

const UserAccountHeadLayout = (props) => {
  // Pluraize the user name correctly
  const pluralizeName = () => {
    let nameLength = props.user.name.split(" ").length;

    let wrd = props.user.name.split(" ")[nameLength - 1];

    return wrd.split("")[wrd.length - 1] === "s"
      ? props.user.name + "'"
      : props.user.name + "'s";
  };
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        {props.user ? (
          <title>{pluralizeName()} nxtdoordeals.com Dashboard</title>
        ) : (
          <title>My Account</title>
        )}

        <meta
          name="description"
          content="Manage your nxtdoordeals.com user dashboard. Update your user profile and edit or delete your ads and chats."
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="My Account | Manage User Profile, Ads and Chats"
        />
        <meta
          property="og:description"
          content="Manage your nxtdoordeals.com user dashboard. Update your user profile and edit or delete your ads and chats."
        />
        <meta property="og:url" content="https://nxtdoordeals.com/account" />
        <meta property="og:site_name" content="nxtdoordeals.com" />
        <meta property="og:image" content={keys.ICON} />
        <meta property="og:image:width" content="256" />
        <meta property="og:image:height" content="256" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Manage your nxtdoordeals.com user dashboard. Update your user profile and edit or delete your ads and chats."
        />
        <meta
          name="twitter:title"
          content="My Account | Manage User Profile, Ads and Chats"
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
                "url": "https://nxtdoordeals.com/account",
                "description": "Manage your nxtdoordeals.com user dashboard. Update your user profile and edit or delete your ads and chats.",
                "name": "My Account | Manage User Profile, Ads and Chats",
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
                    "urlTemplate": "https://nxtdoordeals.com/account"
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

export default UserAccountHeadLayout;
