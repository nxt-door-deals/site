import { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { motion } from "framer-motion";

const loginValidationSchema = Yup.object({
  email: Yup.string().required("Please enter your registered email"),
  password: Yup.string().required("Please enter your password"),
});

const Login = () => {
  return (
    <Fragment>
      <div className="flex w-full">
        <motion.div
          className="absolute justify-start top-0 left-0 ml-2 lg:ml-4 lg:pl-4"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            type: "tween",
          }}
        >
          <Link href="/">
            <a>
              <img
                src="/brand.svg"
                alt="Logo for the NXT Door Deals brand"
                className="w-24 h-24 xl:w-28 xl:h-28 z-40"
              />
            </a>
          </Link>
        </motion.div>
        <div className="font-axiforma text-brand-gray justify-end absolute right-0 mr-6 mt-6 text-sm  lg:text-md">
          Don't have an account?{" "}
          <span className="ml-2 inline bg-opacity-25 bg-purple-400 p-3 cursor-pointer shadow-sm z-30">
            <Link href="/register">
              <a className="font-bold">Sign Up</a>
            </Link>
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen bg-login-background bg-cover bg-no-repeat overflow-x-hidden -z-20">
        <Formik
          initialValues={{ email: "", password: "" }}
          validation={loginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {(props) => (
            <div className="rounded-md shadow-boxshadow z-50 bg-white pt-10 pl-12 pr-12 pb-10 mt-6">
              <h2 className="font-axiforma font-bold text-3xl text-center text-brand-gray tracking-wide mb-6">
                Welcome Back!
              </h2>
              <Form>
                <div className="flex border-2 rounded-md border-gray-300 mb-6 w-100">
                  <img
                    src="/images/login/email.svg"
                    alt="email"
                    className="inline align-middle p-0 ml-2 stroke-current text-gray-300"
                    height="16px"
                    width="20px"
                  />
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    maxLength="50"
                    className="font-gotham p-3 w-11/12 lg:w-9/12 xl:w-11/12"
                  />
                </div>
                <div className="flex border-2 rounded-md border-gray-300 mb-6">
                  <img
                    src="/images/login/password.svg"
                    alt="email"
                    className="inline align-middle p-0 ml-2 stroke-current text-gray-300"
                    height="16px"
                    width="20px"
                  />
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    maxLength="50"
                    className="font-gotham p-3 w-11/12 lg:w-9/12 xl:w-11/12"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="mb-5 w-100 h-12 bg-purple-500 text-white font-gotham font-bold rounded-md"
                  >
                    Login
                  </button>
                </div>
              </Form>
              <div className="text-center font-gotham text-purple-600 text-sm tracking-wide">
                <Link href="/forgotpassword">
                  <a>Forgot password?</a>
                </Link>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default Login;
