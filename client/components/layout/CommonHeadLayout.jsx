import Head from "next/head";
import keys from "../../utils/keys";

const CommonHeadLayout = () => {
  return (
    <Head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1,maximum-scale=1, minimum-scale=1, viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
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
