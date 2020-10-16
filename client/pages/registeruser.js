import { Fragment } from "react";
import dynamic from "next/dynamic";

import Cookies from "universal-cookie";

// Component import
import UserRegistrationHeadLayout from "../components/layout/UserRegistrationHeadLayout";
import BrandHeader from "../components/utils/BrandHeader";
import UserRegistration from "../components/forms/UserRegistration";

const AlreadyLoggedIn = dynamic(() =>
  import("../components/utils/AlreadyLoggedIn")
);

var cookie = new Cookies();
const RegisterUser = () => {
  if (cookie.get("nddToken")) {
    return (
      <div>
        <div className="h-full bg-cover bg-no-repeat">
          <AlreadyLoggedIn />
        </div>
      </div>
    );
  } else {
    return (
      <UserRegistrationHeadLayout>
        <Fragment>
          <BrandHeader />
          <div className="flex justify-center items-center h-screen bg-user-registration-background bg-cover bg-no-repeat overflow-auto -z-20 pt-32">
            <div className="ml-8 mr-8 mb-16 pt-20 lg:pt-0">
              <UserRegistration />
            </div>
          </div>
        </Fragment>
      </UserRegistrationHeadLayout>
    );
  }
};

export default RegisterUser;
