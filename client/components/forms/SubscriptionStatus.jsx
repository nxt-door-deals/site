import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Please enter your registered email")
    .email("Please enter a valid email address"),
});

const SubscriptionStatus = () => {
  const authContext = useContext(AuthContext);
  const { updateUserSubscription } = authContext;

  return (
    <div className="rounded-3xl mx-5 px-12 py-12 lg:px-20 lg:py-16 bg-white shadow-boxshadowlogin">
      <h1 className="font-semibold text-xl text-center text-brand-gray tracking-wide mb-6">
        Enter your registered email to unsubscribe from our mailing list
      </h1>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
      >
        {(props) => <Form></Form>}
      </Formik>
    </div>
  );
};

export default SubscriptionStatus;
