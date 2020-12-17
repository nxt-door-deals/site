import { useRouter } from "next/router";

// Component imports
import UserLoginHeadLayout from "../components/layout/UserLoginHeadLayout";
import EnterEmailForm from "../components/forms/forgot-password/EnterEmailForm";
import Navbar from "../components/layout/Navbar";

const alertTheme = "bg-purple-200 text-brand-purple";

const ForgotPassword = () => {
  const router = useRouter();
  const pathname = router.pathname;

  // Custom navbar tailwind styles
  const navStyle = {
    navBgColor: "lg:bg-purple-200",
    navOverlayBgColor: "bg-purple-200",
    navTextColor: "text-brand-purple",
    navOverlayTextColor: "text-brand-purple",
    hrTextColor: "brand-purple",
    navShadow: "lg:shadow-navshadow",
    faIconTextcolor: "text-white",
    pathname: pathname,
  };

  return (
    <UserLoginHeadLayout>
      <div className="bg-forgot-password-background bg-cover bg-no-repeat bg-fixed -z-20 font-axiforma">
        <Navbar navStyle={navStyle} />
        <div className="flex justify-center items-center min-h-screen">
          <EnterEmailForm alertTheme={alertTheme} />
        </div>
      </div>
    </UserLoginHeadLayout>
  );
};

export default ForgotPassword;
