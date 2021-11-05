import React from "react";
import Link from "next/link";

const Terms = (props) => {
  return (
    <div className="text-brand-gray lg:text-center text-xs">
      By registering, you acknowledge that you have read and understood our{" "}
      <a href="/policies#terms" className={props.termsLinksStyle}>
        Terms of Use
      </a>
      ,{"  "}
      <a href="/policies#privacy" className={props.termsLinksStyle}>
        Privacy Policy
      </a>{" "}
      and our{"  "}
      <a href="/policies#cookie" className={props.termsLinksStyle}>
        Cookie Policy
      </a>
      .
    </div>
  );
};

export default Terms;
