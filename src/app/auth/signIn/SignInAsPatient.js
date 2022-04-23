import React from "react";
import SignInAs from "./SignInAs";

const SignInAsPatient = () => {
  return (
    <SignInAs
      role={"patient"}
      imgUrl={"/images/patient/patient-signIn-screen.png"}
      imgAlt={"patient-signIn-screen"}
    />
  );
};

export default SignInAsPatient;
