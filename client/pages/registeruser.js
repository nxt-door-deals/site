import { useRouter } from "next/router";

import Cookies from "universal-cookie";
import { navStyleBlue } from "../utils/styles";

// Component import
import UserRegistrationHeadLayout from "../components/layout/UserRegistrationHeadLayout";
import UserRegistration from "../components/forms/UserRegistration";
import Navbar from "../components/layout/Navbar";

var cookie = new Cookies();

const RegisterUser = () => {
  const router = useRouter();
  const pathname = router.pathname;

  navStyleBlue["hrStyle"] = "border-blue-800 bg-blue-800 border-dotted";
  navStyleBlue["navBgColor"] = "lg:bg-indigo-100";
  navStyleBlue["navOverlayBgColor"] = "bg-indigo-100";
  navStyleBlue["pathname"] = pathname;

  if (cookie.get("nddToken")) {
    router.push("/alreadyloggedin", "/registeruser");
  }

  return (
    <UserRegistrationHeadLayout>
      <Navbar navStyle={navStyleBlue} />
      <div className="flex justify-center items-center h-full bg-user-registration-background bg-cover -z-20 pt-32">
        <div className="ml-8 mr-8 mb-16">
          <UserRegistration />
        </div>
      </div>
    </UserRegistrationHeadLayout>
  );
};

export default RegisterUser;
