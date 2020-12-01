import React from "react";
import Link from "next/link";

const Terms = (props) => {
  return (
    <div className="font-axiforma text-brand-gray text-center text-xs">
      By registering, you acknowledge that you have read and understood our
      <br /> {"  "}
      <Link href="/">
        <a className={props.termsLinksStyle}>Cookie Policy</a>
      </Link>
      ,{"  "}
      <Link href="/">
        <a className={props.termsLinksStyle}>Privacy Policy</a>
      </Link>{" "}
      and our{"  "}
      <Link href="/">
        <a className={props.termsLinksStyle}>Terms of Use</a>
      </Link>
      .
    </div>
  );
};

export default Terms;
