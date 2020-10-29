import dynamic from "next/dynamic";
import { useRouter } from "next/router"

import Cookies from "universal-cookie";

// Component import
import UserRegistrationHeadLayout from "../components/layout/UserRegistrationHeadLayout";
import UserRegistration from "../components/forms/UserRegistration";
import Navbar from "../components/layout/Navbar"

const AlreadyLoggedIn = dynamic(() =>
  import("../components/utils/AlreadyLoggedIn")
);

var cookie = new Cookies();

// Cusom navbar tailwind styles
const navBgColor = "bg-indigo-100"
const navTextColor = "text-blue-800"
const navOverlayTextColor = "text-blue-800"
const hrTextColor = "blue-800"
const navShadow = "altNavShadow"
const faIconTextcolor = "text-white"

const RegisterUser = () => {
  const router = useRouter()
  const pathname = router.pathname;

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
          <Navbar navBgColor={navBgColor} 
                  navTextColor={navTextColor}
                  navOverlayTextColor={navOverlayTextColor}
                  hrTextColor={hrTextColor} 
                  navShadow={navShadow}
                  faIconTextcolor={faIconTextcolor}
                  pathname={pathname}
                  />
          <div className="flex justify-center items-center h-full bg-user-registration-background bg-cover -z-20 pt-32">
            <div className="ml-8 mr-8 mb-16">
              <UserRegistration />
            </div>
          </div>
      </UserRegistrationHeadLayout>
    );
  }
};

export default RegisterUser;
