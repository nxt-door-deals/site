// Component imports
import EnterEmailForm from "../components/forms/forgot-password/EnterEmailForm";
import BrandHeader from "../components/utils/BrandHeader";

const alertTheme = "bg-purple-200 text-brand-purple";

const ForgotPassword = () => {
  return (
    <div className="bg-forgot-password-background bg-cover bg-no-repeat bg-fixed -z-20 font-axiforma">
      <BrandHeader />
      <div className="flex justify-center items-center min-h-screen">
        <EnterEmailForm alertTheme={alertTheme} />
      </div>
    </div>
  );
};

export default ForgotPassword;
