import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

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
          <title>{pluralizeName()} Account</title>
        ) : (
          <title>My Account</title>
        )}

        <meta
          name="description"
          content="Make changes to your NXT Door Deals account and manage your ads and chats"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="My Account | Manage User Profile, Ads and Chats"
        />
        <meta
          property="og:description"
          content="Make changes to your NXT Door Deals account and manage your ads and chats"
        />
        <meta property="og:url" content="https://nxtdoordeals.com/account" />
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
                "url": "https://nxtdoordeals.com/account",
                "description": "Make changes to your NXT Door Deals account and manage your ads and chats",
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
