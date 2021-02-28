import React from "react";
import Link from "next/link";

const PrivacyText = () => {
  return (
    <div>
      <div className="mb-10">
        <p>
          We are committed to taking your privacy very seriously. This
          commitment begins with a least-privilege philosophy: at the time of
          registration, we only require you to provide your name, email address,
          apartment/property name and flat/house number as those are needed to
          operate the marketplace. Your email remains invisible to other
          registered users or site visitors at all times. Your apartment/house
          number is visible on your ad only if you consent to display it.
          Providing your mobile number is optional. We collect it for features
          we plan to roll out in future.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="component-sub-heading">Information Sharing</h2>
        <p>
          Your information is safe and private with us. It will never be shared
          (or sold) with anyone unless required by law.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="component-sub-heading">Marketing Communications</h2>
        <p>
          You are not required to take part in marketing communications to use
          our platform. You can disable marketing-related emails by
          unsubscribing using the link at the bottom of any email you receive.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="component-sub-heading">Erasure</h2>
        <p>
          We make it simple to permanently delete your account and all the ad
          and chat related data associated with it. On{" "}
          <Link href="/account">
            <a className="text-purple-500 underline">
              nxtdoordeals.com/account
            </a>
          </Link>
          , you'll find a 'Profile' tab with an option to delete your account.
        </p>
      </div>

      <div>
        <h2 className="component-sub-heading">Data Retention</h2>
        <p>
          We retain your account information, ad and chat related data unless
          you explicitly delete your account as described above.
        </p>
      </div>
    </div>
  );
};

export default PrivacyText;
