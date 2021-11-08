import Head from "next/head";
import keys from "../../../utils/keys";

const CommonHeadLayout = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1, viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/apple-touch-icon-167x167.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href="/favicon-48x48.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="64x64"
        href="/favicon-64x64.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="128x128"
        href="/favicon-128x128.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="144x144"
        href="/favicon-144x144.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#DDD6FE" />

      <meta property="og:image" content={keys.ICON} />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />

      <meta name="twitter:card" content={keys.ICON} />
      <meta
        name="twitter:description"
        content="Your one-stop shop to find amazing deals within your apartment, apartment complex, gated community or housing society. Browse ads from your apartment or post up to five free ads today!"
      />
      <meta
        name="twitter:title"
        content="Welcome To Your Apartment's Marketplace"
      />
      <meta name="twitter:image" content={keys.ICON} />

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.12.1/css/svg-with-js.css"
        integrity="sha384-XBFwYq8dzGeC/rGkEgveavwuEU0D16mIKfWeCX6deYzhMUaa8GX4CgA5c/YHP2xo"
        crossOrigin="anonymous"
      />
    </Head>
  );
};

export default CommonHeadLayout;
