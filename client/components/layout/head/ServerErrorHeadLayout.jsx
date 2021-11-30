import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const ServerErrorHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Internal Server Error</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default ServerErrorHeadLayout;
