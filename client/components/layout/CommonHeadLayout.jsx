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
    </Fragment>
  );
};

export default CommonHeadLayout;
