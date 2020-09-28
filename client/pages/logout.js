import { useContext, useEffect } from "react";
import Router from "next/router";
import AuthContext from "../context/auth/authContext";

const logout = () => {
  const authContext = useContext(AuthContext);

  const { logout } = authContext;

  useEffect(() => {
    logout();
  }, []);

  Router.push("/login");

  return null;
};

export default logout;
