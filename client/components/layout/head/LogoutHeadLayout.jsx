import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const LogoutHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>NXT Door Deals | Adios, for now...</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default LogoutHeadLayout;
