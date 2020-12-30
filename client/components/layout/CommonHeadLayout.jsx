import Head from "next/head";

const CommonHeadLayout = () => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1,maximum-scale=1, minimum-scale=1, viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta
        property="og:image"
        content="https://nxt-door-deals.s3.ap-south-1.amazonaws.com/site-images/icon.png"
      />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.12.1/css/svg-with-js.css"
        integrity="sha384-XBFwYq8dzGeC/rGkEgveavwuEU0D16mIKfWeCX6deYzhMUaa8GX4CgA5c/YHP2xo"
        crossorigin="anonymous"
      />
    </Head>
  );
};

export default CommonHeadLayout;
