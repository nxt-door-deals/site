import { useRouter } from "next/router";
import { navStyleBlue } from "../utils/styles";

// Component import
import UserRegistrationHeadLayout from "../components/layout/head/UserRegistrationHeadLayout";
import UserRegistration from "../components/forms/UserRegistration";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const RegisterUser = () => {
  const router = useRouter();
  const pathname = router.pathname;

  navStyleBlue["hrStyle"] = "border-blue-800 bg-blue-800 border-dotted";
  navStyleBlue["navBgColor"] = "lg:bg-indigo-100";
  navStyleBlue["navOverlayBgColor"] = "bg-indigo-100";
  navStyleBlue["pathname"] = pathname;

  const footerGradientClassBlue =
    "from-alt-footer-gradient-from to-alt-footer-gradient-to";

  if (typeof window !== "undefined" && localStorage.getItem("nddToken")) {
    router.push("/alreadyloggedin", "/");

    return null;
  }

  return (
    <UserRegistrationHeadLayout>
      <Navbar navStyle={navStyleBlue} />
      <UserRegistration />
      <Footer
        footerGradientClass={footerGradientClassBlue}
        pathname={pathname}
      />
    </UserRegistrationHeadLayout>
  );
};

export default RegisterUser;
