import { Fragment } from "react";

const CommonHeadLayout = () => {
  return (
    <Fragment>
      <meta
        name="viewport"
        content="user-scalable=no,
    initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta property="og:image" content="/images/site/icon.png" />
      <meta property="og:image:width" content="256" />
      <meta property="og:image:height" content="256" />
    </Fragment>
  );
};

export default CommonHeadLayout;
