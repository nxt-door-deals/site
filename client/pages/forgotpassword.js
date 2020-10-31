import { useRouter } from "next/router"

// Component imports
import EnterEmailForm from "../components/forms/forgot-password/EnterEmailForm";
import Navbar from "../components/layout/Navbar";

const alertTheme = "bg-purple-200 text-brand-purple";

// Custom navbar tailwind styles
const navBgColor = "bg-purple-200"
const navTextColor = "text-brand-purple"
const navOverlayTextColor = "text-brand-purple"
const hrTextColor = "brand-purple"
const navShadow = "shadow-navshadow"
const faIconTextcolor = "text-white"

const ForgotPassword = () => {
  const router = useRouter()
  const pathname = router.pathname;

  return (
    <div className="bg-forgot-password-background bg-cover bg-no-repeat bg-fixed -z-20 font-axiforma">
      <Navbar navBgColor={navBgColor}
              navTextColor={navTextColor}
              navOverlayTextColor={navOverlayTextColor}
              hrTextColor={hrTextColor}
              navShadow={navShadow}
              faIconTextcolor={faIconTextcolor}
              pathname={pathname}
      />
      <div className="flex justify-center items-center min-h-screen">
        <EnterEmailForm alertTheme={alertTheme} />
      </div>
    </div>
  );
};

export default ForgotPassword;
