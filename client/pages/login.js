import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

// Component import
import Navbar from "../components/layout/Navbar";
import UserLogin from "../components/forms/UserLogin";
import UserLoginHeadLayout from "../components/layout/UserLoginHeadLayout";

var cookie = new Cookies();

const Login = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  // Set a variable with the global prop and clear it since we do not want to carry the global prop forward
  const pathProp = props.pathHistory.current;
  props.pathHistory.current = "";

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

  if (cookie.get("nddToken")) {
    router.push("/alreadyloggedin", "/login");
  }

  // Postad toast
  const postadToast = () =>
    toast("Please login to post an ad", {
      draggablePercent: 60,
      position: "top-center",
    });

  // User account toast
  const userAccountToast = () =>
    toast("Please login to view your user profile", {
      draggablePercent: 60,
      position: "top-center",
    });

  if (pathProp === "/postad") {
    setTimeout(() => postadToast(), 500);
  }

  if (pathProp === "/account") {
    setTimeout(() => userAccountToast(), 500);
  }

  return (
    <UserLoginHeadLayout>
      <Navbar navStyle={navStyle} />
      <div className="flex justify-center items-center h-screen bg-login-background bg-cover bg-no-repeat overflow-hidden -z-20">
        <div>
          <UserLogin pathProp={pathProp} />
        </div>
      </div>
    </UserLoginHeadLayout>
  );
};

export default Login;
