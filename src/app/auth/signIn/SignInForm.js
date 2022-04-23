import React from "react";
import AuthForm from "../AuthForm";

const SignInForm = ({ role, ...props }) => {
  return <AuthForm isSignUp={false} initialRole={role} />;
};

export default SignInForm;
