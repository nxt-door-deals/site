import React, { Fragment } from "react";

// Component imports
import UserLoginHeadLayout from "../components/layout/head/UserLoginHeadLayout";
import UserLoggedIn from "../components/page_components/common/UserLoggedIn";

const AlreadyLoggedIn = () => {
  return (
    <UserLoginHeadLayout>
      <UserLoggedIn />
    </UserLoginHeadLayout>
  );
};

export default AlreadyLoggedIn;
