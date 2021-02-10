import { useRouter } from "next/router";

import Cookies from "universal-cookie";

// Component import
import UserRegistrationHeadLayout from "../components/layout/UserRegistrationHeadLayout";
import UserRegistration from "../components/forms/UserRegistration";
import Navbar from "../components/layout/Navbar";

var cookie = new Cookies();

const RegisterUser = () => {
  const router = useRouter();
  const pathname = router.pathname;

  // Custom navbar tailwind styles
  const navStyle = {
    navBgColor: "lg:bg-indigo-100",
    navOverlayBgColor: "bg-indigo-100",
    navTextColor: "text-blue-800",
    navOverlayTextColor: "text-blue-800",
    hrTextColor: "blue-800",
    navShadow: "lg:altNavShadow",
    faIconTextcolor: "text-white",
    pathname: pathname,
  };

  if (cookie.get("nddToken")) {
    router.push("/alreadyloggedin", "/registeruser");
  }

  return (
    <UserRegistrationHeadLayout>
      <Navbar navStyle={navStyle} />
      <div className="flex justify-center items-center h-full bg-user-registration-background bg-cover -z-20 pt-32">
        <div className="ml-8 mr-8 mb-16">
          <UserRegistration />
        </div>
      </div>
    </UserRegistrationHeadLayout>
  );
};

export default RegisterUser;
