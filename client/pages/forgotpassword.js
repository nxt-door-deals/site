import { useRouter } from "next/router";

import { navStylePurple } from "../utils/styles";

// Component imports
import ForgotPasswordHeadLayout from "../components/layout/ForgotPasswordHeadLayout";
import EnterEmailForm from "../components/forms/forgot-password/EnterEmailForm";
import Navbar from "../components/layout/Navbar";

const alertTheme = "bg-purple-200 text-brand-purple";

const ForgotPassword = () => {
  const router = useRouter();
  const pathname = router.pathname;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  return (
    <ForgotPasswordHeadLayout>
      <div className="bg-forgot-password-background bg-cover bg-no-repeat bg-fixed -z-20 font-axiforma">
        <Navbar navStyle={navStylePurple} />
        <div className="flex justify-center items-center min-h-screen">
          <EnterEmailForm alertTheme={alertTheme} />
        </div>
      </div>
    </ForgotPasswordHeadLayout>
  );
};

export default ForgotPassword;
