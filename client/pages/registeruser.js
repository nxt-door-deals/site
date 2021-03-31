import { useRouter } from "next/router";
import { navStyleBlue } from "../utils/styles";
import cookie from "../utils/cookieInit";

// Component import
import UserRegistrationHeadLayout from "../components/layout/UserRegistrationHeadLayout";
import UserRegistration from "../components/forms/UserRegistration";
import Navbar from "../components/layout/Navbar";

const RegisterUser = () => {
  const router = useRouter();
  const pathname = router.pathname;

  navStyleBlue["hrStyle"] = "border-blue-800 bg-blue-800 border-dotted";
  navStyleBlue["navBgColor"] = "lg:bg-indigo-100";
  navStyleBlue["navOverlayBgColor"] = "bg-indigo-100";
  navStyleBlue["pathname"] = pathname;

  if (typeof window !== "undefined" && localStorage.getItem("nddToken")) {
    router.push("/alreadyloggedin", "/");
  }

  return (
    <UserRegistrationHeadLayout>
      <Navbar navStyle={navStyleBlue} />
      {typeof window !== "undefined" && !localStorage.getItem("nddToken") && (
        <UserRegistration />
      )}
    </UserRegistrationHeadLayout>
  );
};

export default RegisterUser;
