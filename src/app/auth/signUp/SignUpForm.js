import React from "react";
import AuthForm from "../AuthForm";

const SignUpForm = () => {
  return <AuthForm isSignUp initialRole={"patient"} />;
};

export default SignUpForm;
