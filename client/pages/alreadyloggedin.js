import React, { Fragment } from "react";

// Component imports
import UserLoginHeadLayout from "../components/layout/UserLoginHeadLayout";
import UserLoggedIn from "../components/utils/UserLoggedIn";

const AlreadyLoggedIn = () => {
  return (
    <UserLoginHeadLayout>
      <UserLoggedIn />
    </UserLoginHeadLayout>
  );
};

export default AlreadyLoggedIn;
