import { useRouter } from "next/router"

import Cookies from "universal-cookie";

// Component import
import Navbar from "../components/layout/Navbar"
import UserLogin from "../components/forms/UserLogin";
import UserLoginHeadLayout from "../components/layout/UserLoginHeadLayout";

var cookie = new Cookies();

// Custom navbar tailwind styles
const navBgColor = "bg-purple-200"
const navTextColor = "text-brand-purple"
const navOverlayTextColor = "text-brand-purple"
const hrTextColor = "brand-purple"
const navShadow = "shadow-navshadow"
const faIconTextcolor = "text-white"

const Login = () => {
  const router = useRouter()
  const pathname = router.pathname;

  if (cookie.get("nddToken")) {
    router.push("/alreadyloggedin", "/login")
  }

  return (
    <UserLoginHeadLayout>
      <Navbar navBgColor={navBgColor}
                navTextColor={navTextColor}
                navOverlayTextColor={navOverlayTextColor}
                hrTextColor={hrTextColor}
                navShadow={navShadow}
                faIconTextcolor={faIconTextcolor}
                pathname={pathname}
                />

      <div className="flex justify-center items-center h-screen bg-login-background bg-cover bg-no-repeat overflow-hidden -z-20">
        {/* The padding below helps mainly for phones in landscape mode */}
        <div className="ml-12 mr-12">
          <UserLogin />
        </div>
      </div>
    </UserLoginHeadLayout>
  );
};

export default Login;
