import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const VerifyNeighbourhoodHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Verify Neighbourhood</title>
      </Head>
      {props.children}
    </Fragment>
  );
};

export default VerifyNeighbourhoodHeadLayout;
