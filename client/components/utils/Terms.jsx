import React from "react";
import Link from "next/link";

const Terms = (props) => {
  return (
    <div className="font-axiforma text-brand-gray text-center text-xs">
      By registering, you acknowledge that you have read and understood our
      <br /> {"  "}
      <Link href="/policies#terms">
        <a className={props.termsLinksStyle}>Terms of Use</a>
      </Link>
      ,{"  "}
      <Link href="/policies#privacy">
        <a className={props.termsLinksStyle}>Privacy Policy</a>
      </Link>{" "}
      and our{"  "}
      <Link href="/policies#cookie">
        <a className={props.termsLinksStyle}>Cookie Policy</a>
      </Link>
      .
    </div>
  );
};

export default Terms;
