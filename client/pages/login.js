import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

import { navStylePurple } from "../utils/styles";

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
  props.pathHistory.current = null;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

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

  // User account toast
  const chatToast = () =>
    toast("Please login to start chatting", {
      draggablePercent: 60,
      position: "top-center",
    });

  // Report ad toast
  const reportedAdToast = () =>
    toast("Please login to report an ad", {
      draggablePercent: 60,
      position: "top-center",
    });

  if (pathProp === "/postad") {
    setTimeout(() => postadToast(), 500);
  }

  if (pathProp === "/account") {
    setTimeout(() => userAccountToast(), 500);
  }

  if (pathProp === "/chat/[id]") {
    setTimeout(() => chatToast(), 500);
  }

  if (pathProp === "/reportad/[id]") {
    setTimeout(() => reportedAdToast(), 500);
  }

  return (
    <UserLoginHeadLayout>
      <Navbar navStyle={navStylePurple} />
      <div className="flex justify-center items-center h-screen bg-login-background bg-cover bg-no-repeat overflow-hidden -z-20">
        <div>
          <UserLogin pathProp={pathProp} />
        </div>
      </div>
    </UserLoginHeadLayout>
  );
};

export default Login;
