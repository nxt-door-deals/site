import Head from "next/head";
import keys from "../../utils/keys";

const CommonHeadLayout = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1,maximum-scale=5, minimum-scale=1, viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
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
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:image" content={keys.ICON} />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
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
