import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const GoodbyeHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Thanks & Adieu | We Wish You Good Health & Happiness</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default GoodbyeHeadLayout;
