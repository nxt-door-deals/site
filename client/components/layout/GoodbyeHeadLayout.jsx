import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const GoodbyeHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Thanks and adieu | We wish you good health & happiness</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default GoodbyeHeadLayout;
