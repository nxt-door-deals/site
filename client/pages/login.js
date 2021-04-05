import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { navStylePurple } from "../utils/styles";
import cookie from "../utils/cookieInit";

// Component import
import Navbar from "../components/layout/Navbar";
import UserLogin from "../components/forms/UserLogin";
import UserLoginHeadLayout from "../components/layout/UserLoginHeadLayout";

const Login = (props) => {
  const router = useRouter();
  const pathname = router.pathname;

  // Set a variable with the global prop and clear it since we do not want to carry the global prop forward
  const pathProp = props.pathHistory.current;
  props.pathHistory.current = null;

  navStylePurple["navTextColor"] = "text-brand-purple";
  navStylePurple["pathname"] = pathname;

  // Postad toast
  const postadToast = () =>
    toast("Please login to post an ad in your neighbourhood", {
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

  if (typeof window !== "undefined") {
    if (localStorage.getItem("nddToken")) router.push("/alreadyloggedin", "/");
  }

  return (
    <UserLoginHeadLayout>
      <Navbar navStyle={navStylePurple} />

      <UserLogin pathProp={pathProp} />
    </UserLoginHeadLayout>
  );
};

export default Login;
