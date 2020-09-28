import { Fragment } from "react";

// Component import
import UserRegistrationHeadLayout from "../components/layout/UserRegistrationHeadLayout";
import BrandHeader from "../components/utils/BrandHeader";
import UserRegistration from "../components/forms/UserRegistration";

const RegisterUser = () => {
  return (
    <UserRegistrationHeadLayout>
      <Fragment>
        <BrandHeader />
        <div className="flex justify-center items-center h-screen bg-user-registration-background bg-cover bg-no-repeat overflow-auto -z-20 pt-32">
          <div className="ml-16 mr-16 mb-16 pt-20 lg:pt-0">
            <UserRegistration />
          </div>
        </div>
      </Fragment>
    </UserRegistrationHeadLayout>
  );
};

export default RegisterUser;
