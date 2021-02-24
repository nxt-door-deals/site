import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons";

const CookieText = () => {
  return (
    <div>
      <p className="pb-5">Here is the list of cookies that we use:</p>
      <ul>
        <li className="pb-2">
          <FontAwesomeIcon icon={faCookie} className="text-brand-purple mr-2" />
          <span className="font-semibold">nddToken</span>: tracks a user's
          logged in state. Retention period - 24 hours or logout
        </li>
        <li className="pb-2">
          <FontAwesomeIcon icon={faCookie} className="text-brand-purple mr-2" />
          <span className="font-semibold">__redirChatCookie</span>: used for
          chat related setup. Retention period - session
        </li>
        <li className="pb-2">
          <FontAwesomeIcon
            icon={faCookie}
            className="text-brand-purple mr-2 "
          />
          <span className="font-semibold">__adCookie</span>: used to report ads.
          Retention period - session
        </li>
      </ul>
    </div>
  );
};

export default CookieText;
