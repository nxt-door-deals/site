import { Fragment } from "react";
import dynamic from "next/dynamic";

import Cookies from "universal-cookie";

// Component import
import UserLogin from "../components/forms/UserLogin";
import UserLoginHeadLayout from "../components/layout/UserLoginHeadLayout";
import BrandHeader from "../components/utils/BrandHeader";

const AlreadyLoggedIn = dynamic(() =>
  import("../components/utils/AlreadyLoggedIn")
);

var cookie = new Cookies();

const Login = () => {
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
      <UserLoginHeadLayout>
        <Fragment>
          <BrandHeader />
          <div className="flex justify-center items-center h-screen bg-login-background bg-cover bg-no-repeat overflow-hidden -z-20">
            {/* The padding below helps mainly for phones in landscape mode */}
            <div className="ml-12 mr-12 pt-16 lg:pt-0">
              <UserLogin />
            </div>
          </div>
        </Fragment>
      </UserLoginHeadLayout>
    );
  }
};

export default Login;
