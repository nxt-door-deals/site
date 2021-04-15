import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const NotFoundHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>404 - Not Found</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default NotFoundHeadLayout;
