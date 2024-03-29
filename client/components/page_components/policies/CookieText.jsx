import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons";

const CookieText = () => {
  return (
    <div>
      <p className="pb-5">
        This website uses cookies to run smoothly. Disabling cookies on your
        browser will lead to unexpected and unpredictable results such as the
        inability to log in to your{" "}
        <span className="text-brand-purple font-semibold">
          nxtdoordeals.com
        </span>{" "}
        account. Below is the list of cookies that we use:
      </p>

      <ul>
        <li className="pb-2">
          <FontAwesomeIcon icon={faCookie} className="text-brand-purple mr-2" />
          <span className="font-semibold">nddToken</span>: this is a unique
          token stored in the browser's local storage to determine who has
          logged in. Token is valid for 15 days.
        </li>
        <li className="pb-2">
          <FontAwesomeIcon icon={faCookie} className="text-brand-purple mr-2" />
          <span className="font-semibold">__redirChatCookie</span>: used for
          chat related setup. Normal retention period - session
        </li>
        <li className="pb-2">
          <FontAwesomeIcon
            icon={faCookie}
            className="text-brand-purple mr-2 "
          />
          <span className="font-semibold">__adCookie</span>: used to report ads.
          Normal retention period - session
        </li>
        <li className="pb-2">
          <FontAwesomeIcon
            icon={faCookie}
            className="text-brand-purple mr-2 "
          />
          <span className="font-semibold">ndd__user__preferences</span>: used to
          save user choices and preferences
        </li>
        <li className="pb-2">
          <FontAwesomeIcon
            icon={faCookie}
            className="text-brand-purple mr-2 "
          />
          <span className="font-semibold">nddUser</span>: store generic data
          about the logged in user
        </li>
      </ul>
    </div>
  );
};

export default CookieText;
