import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const VerifyEmailHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>NXT Door Deals | Your Email Verification Status</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default VerifyEmailHeadLayout;
